import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  LANGUAGE_STORAGE_KEY,
  getSwappedAccentLanguage,
  isSupportedLanguage,
  persistLanguage,
  readStoredLanguage,
  resolveActiveLanguage,
} from "./config";
import english from "./translations/en.json";
import japanese from "./translations/ja.json";
import spanish from "./translations/es.json";

function getTranslationPaths(
  value: Record<string, unknown>,
  parentPath = "",
): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = parentPath ? `${parentPath}.${key}` : key;
    return typeof child === "object" && child !== null
      ? getTranslationPaths(child as Record<string, unknown>, path)
      : path;
  });
}

function getTranslationValues(value: Record<string, unknown>): string[] {
  return Object.values(value).flatMap((child) =>
    typeof child === "object" && child !== null
      ? getTranslationValues(child as Record<string, unknown>)
      : String(child),
  );
}

beforeEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

test("identifies the language used by intentionally swapped accents", () => {
  expect(getSwappedAccentLanguage("es")).toBe("ja");
  expect(getSwappedAccentLanguage("en")).toBe("ja");
  expect(getSwappedAccentLanguage("ja")).toBe("es");
});

describe("language persistence", () => {
  test("keeps English placeholder kanji aligned with Spanish", () => {
    expect(english.placeholder.glyphs).toEqual(spanish.placeholder.glyphs);
    expect(japanese.placeholder.glyphs).not.toEqual(spanish.placeholder.glyphs);
  });

  test("keeps yellow accent kanji in Spanish and English only", () => {
    const accents = (locale: typeof english) => ({
      about: locale.about.eyebrow,
      annualCourses: locale.courses.annual.catalogEyebrow,
      books: locale.resources.books.eyebrow,
      contact: locale.contact.eyebrow,
      courses: locale.courses.page.eyebrow,
      cta: locale.cta.eyebrow,
      homeCommunity: locale.home.community.eyebrow,
      homeHero: locale.home.hero.eyebrow,
      learnFree: locale.resources.free.eyebrow,
      materials: locale.resources.materials.eyebrow,
      notFound: locale.notFound.eyebrow,
      thematicCourses: locale.courses.thematic.catalogEyebrow,
    });

    expect(accents(english)).toEqual(accents(spanish));
    expect(accents(japanese)).toEqual({
      about: "Nosotros",
      annualCourses: "Un largo camino",
      books: "Leer",
      contact: "Contacto",
      courses: "Aprender",
      cta: "Paso a paso",
      homeCommunity: "Juntos",
      homeHero: "Bienvenido",
      learnFree: "Gratis",
      materials: "Práctica",
      notFound: "Perdido",
      thematicCourses: "Lo que te gusta",
    });
  });

  test.each([
    ["Spanish", spanish],
    ["Japanese", japanese],
  ])(
    "keeps every %s translation aligned with English keys",
    (_name, locale) => {
      expect(getTranslationPaths(locale)).toEqual(getTranslationPaths(english));
      expect(getTranslationValues(locale).every((value) => value.trim())).toBe(
        true,
      );
    },
  );

  test("validates supported locale values", () => {
    expect(isSupportedLanguage("es")).toBe(true);
    expect(isSupportedLanguage("ja")).toBe(true);
    expect(isSupportedLanguage("en")).toBe(true);
    expect(isSupportedLanguage("fr")).toBe(false);
  });

  test("reads a stored locale and falls back for invalid values", () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "en");
    expect(readStoredLanguage()).toBe("en");
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    expect(readStoredLanguage()).toBe("es");
  });

  test("falls back when storage cannot be read", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => {
      throw new Error("Storage unavailable");
    });
    expect(readStoredLanguage()).toBe("es");
  });

  test("persists supported locales and ignores unsupported values", () => {
    persistLanguage("ja");
    expect(document.documentElement.lang).toBe("ja");
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("ja");
    persistLanguage("fr");
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("ja");
  });

  test("keeps the document language when storage cannot be written", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => {
      throw new Error("Storage unavailable");
    });
    expect(() => persistLanguage("en")).not.toThrow();
    expect(document.documentElement.lang).toBe("en");
  });

  test("resolves the active locale from initialized and fallback values", () => {
    expect(resolveActiveLanguage("ja", "es")).toBe("ja");
    expect(resolveActiveLanguage(undefined, "es")).toBe("es");
  });
});

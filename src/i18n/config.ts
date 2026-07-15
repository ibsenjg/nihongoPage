import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./translations/en.json";
import spanish from "./translations/es.json";
import japanese from "./translations/ja.json";

export const LANGUAGE_STORAGE_KEY = "nihongo-language";
export const supportedLanguages = ["es", "ja", "en"] as const;
export type Language = (typeof supportedLanguages)[number];

export function isSupportedLanguage(value: unknown): value is Language {
  return supportedLanguages.includes(value as Language);
}

export function getSwappedAccentLanguage(language: Language): "es" | "ja" {
  return language === "ja" ? "es" : "ja";
}

export function readStoredLanguage(): Language {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(storedLanguage) ? storedLanguage : "es";
  } catch {
    return "es";
  }
}

export function persistLanguage(language: string): void {
  if (!isSupportedLanguage(language)) return;

  document.documentElement.lang = language;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Language selection still works when storage is unavailable.
  }
}

export function resolveActiveLanguage(
  resolvedLanguage: string | undefined,
  language: string,
): string {
  return resolvedLanguage ?? language;
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: english },
    es: { translation: spanish },
    ja: { translation: japanese },
  },
  lng: readStoredLanguage(),
  fallbackLng: "es",
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
  initAsync: false,
});

persistLanguage(resolveActiveLanguage(i18n.resolvedLanguage, i18n.language));
i18n.on("languageChanged", persistLanguage);

export default i18n;

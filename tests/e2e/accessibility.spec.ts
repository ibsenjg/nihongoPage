import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { axeTags, gotoRoute, routesWithNotFound } from "./test-data";

function relativeLuminance([red, green, blue]: readonly number[]) {
  const channels = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function parseColor(value: string) {
  const normalized = value.trim();
  const hex = normalized.match(/^#([\da-f]{6})$/i)?.[1];

  if (hex) {
    return [0, 2, 4].map((offset) =>
      Number.parseInt(hex.slice(offset, offset + 2), 16),
    );
  }

  return normalized.match(/\d+/g)!.slice(0, 3).map(Number);
}

function contrastRatio(foreground: string, background: string) {
  const first = relativeLuminance(parseColor(foreground));
  const second = relativeLuminance(parseColor(background));
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

test("testimonial quote marks meet large-text contrast", async ({ page }) => {
  await gotoRoute(page);

  const colors = await page
    .locator(".testimonial-grid blockquote > span")
    .evaluateAll((quoteMarks) =>
      quoteMarks.map((quoteMark) => ({
        background: getComputedStyle(quoteMark.parentElement!).backgroundColor,
        foreground: getComputedStyle(quoteMark).color,
      })),
    );

  expect(colors).toHaveLength(3);
  for (const color of colors) {
    expect(
      contrastRatio(color.foreground, color.background),
    ).toBeGreaterThanOrEqual(3);
  }
});

test("section subtitles retain readable typography", async ({ page }) => {
  await gotoRoute(page);

  const styles = await page
    .locator(".section-title > span")
    .evaluateAll((subtitles) =>
      subtitles.map((subtitle) => {
        const style = getComputedStyle(subtitle);
        return {
          display: style.display,
          fontSize: Number.parseFloat(style.fontSize),
          fontWeight: Number.parseInt(style.fontWeight, 10),
        };
      }),
    );

  expect(styles).toHaveLength(3);
  for (const style of styles) {
    expect(style.display).toBe("inline-block");
    expect(style.fontSize).toBeGreaterThanOrEqual(16);
    expect(style.fontWeight).toBeGreaterThanOrEqual(600);
  }
});

test("theme color pairs meet their required contrast", async ({ page }) => {
  await gotoRoute(page);

  const colors = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const style = (selector: string) =>
      getComputedStyle(document.querySelector(selector)!);
    const quoteMark = document.querySelector(
      ".testimonial-grid blockquote > span",
    )!;

    return {
      red: root.getPropertyValue("--red"),
      redDark: root.getPropertyValue("--red-dark"),
      blueDark: root.getPropertyValue("--blue-dark"),
      white: root.getPropertyValue("--white"),
      actualRedText: style(".section-title > span").color,
      actualRedTextBackground: style("body").backgroundColor,
      actualMutedText: style(".lead").color,
      actualMutedTextBackground: style("body").backgroundColor,
      actualYellowText: style(".japanese-kicker").color,
      actualYellowTextBackground: style(".hero-section").backgroundColor,
      actualQuote: getComputedStyle(quoteMark).color,
      actualQuoteBackground: getComputedStyle(quoteMark.parentElement!)
        .backgroundColor,
    };
  });

  expect(colors.red.trim()).toBe("#BC002D");
  expect(colors.redDark.trim()).toBe("#8D0022");
  expect(contrastRatio(colors.white, colors.red)).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(colors.white, colors.redDark)).toBeGreaterThanOrEqual(
    4.5,
  );
  expect(contrastRatio(colors.white, colors.blueDark)).toBeGreaterThanOrEqual(
    3,
  );
  expect(
    contrastRatio(colors.actualRedText, colors.actualRedTextBackground),
  ).toBeGreaterThanOrEqual(4.5);
  expect(
    contrastRatio(colors.actualMutedText, colors.actualMutedTextBackground),
  ).toBeGreaterThanOrEqual(4.5);
  expect(
    contrastRatio(colors.actualYellowText, colors.actualYellowTextBackground),
  ).toBeGreaterThanOrEqual(4.5);
  expect(
    contrastRatio(colors.actualQuote, colors.actualQuoteBackground),
  ).toBeGreaterThanOrEqual(3);
});

test("interactive controls use a two-color focus indicator", async ({
  page,
}) => {
  await gotoRoute(page);

  const languageSelect = page.getByLabel("Idioma");
  await languageSelect.focus();
  const focusStyle = await languageSelect.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      boxShadow: style.boxShadow,
      outlineColor: style.outlineColor,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });

  expect(focusStyle.outlineStyle).toBe("solid");
  expect(focusStyle.outlineWidth).toBe("3px");
  expect(focusStyle.outlineColor).toBe("rgb(255, 255, 255)");
  expect(focusStyle.boxShadow).toContain("rgb(4, 61, 134)");
  expect(focusStyle.boxShadow).toContain("6px");
});

for (const route of routesWithNotFound) {
  test(`Spanish ${route} has no automated WCAG A/AA violations`, async ({
    page,
  }, testInfo) => {
    await gotoRoute(page, route);
    await expect(page.locator("h1")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags([...axeTags])
      .analyze();
    await testInfo.attach(`axe-es-${route.replaceAll("/", "-") || "home"}`, {
      body: JSON.stringify(results, null, 2),
      contentType: "application/json",
    });
    expect(results.violations).toEqual([]);
  });
}

for (const locale of ["ja", "en"] as const) {
  for (const route of ["/", "/contact"] as const) {
    test(`${locale} ${route} has no automated WCAG A/AA violations`, async ({
      page,
    }, testInfo) => {
      await gotoRoute(page, route);
      await page.getByLabel("Idioma").selectOption(locale);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);

      const results = await new AxeBuilder({ page })
        .withTags([...axeTags])
        .analyze();
      await testInfo.attach(
        `axe-${locale}-${route.replaceAll("/", "-") || "home"}`,
        {
          body: JSON.stringify(results, null, 2),
          contentType: "application/json",
        },
      );
      expect(results.violations).toEqual([]);
    });
  }
}

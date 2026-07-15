import { expect, test } from "@playwright/test";
import { gotoRoute, waitForFonts } from "./test-data";

test.describe("visual regression", { tag: "@visual" }, () => {
  test("intermediate Spanish home hero", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "This regression sets an explicit 833 × 816 viewport and only needs one project host.",
    );
    await page.setViewportSize({ width: 833, height: 816 });
    await gotoRoute(page);
    await waitForFonts(page);

    await expect(page.locator(".hero-section")).toHaveScreenshot(
      "home-es-intermediate.png",
    );
  });

  test("intermediate Spanish about hero", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "This regression sets an explicit 926 × 715 viewport and only needs one project host.",
    );
    await page.setViewportSize({ width: 926, height: 715 });
    await gotoRoute(page, "/about");
    await waitForFonts(page);

    await expect(page.locator(".page-hero")).toHaveScreenshot(
      "about-es-intermediate.png",
    );
  });

  test("Spanish home", async ({ page }, testInfo) => {
    const viewport = testInfo.project.name;
    await gotoRoute(page);
    await waitForFonts(page);

    await expect(page.locator("header")).toHaveScreenshot(
      `navigation-es-${viewport}.png`,
    );
    await expect(page.locator(".hero-section")).toHaveScreenshot(
      `home-es-${viewport}.png`,
    );
    const sectionTitles = page.locator(".section-title");
    await expect(sectionTitles.nth(0)).toHaveScreenshot(
      `method-title-es-${viewport}.png`,
    );
    await expect(sectionTitles.nth(1)).toHaveScreenshot(
      `courses-title-es-${viewport}.png`,
    );
    await expect(page.locator(".testimonial-grid")).toHaveScreenshot(
      `testimonials-es-${viewport}.png`,
    );
  });

  test("Japanese home", async ({ page }, testInfo) => {
    const viewport = testInfo.project.name;
    await gotoRoute(page);
    await page.getByLabel("Idioma").selectOption("ja");
    await waitForFonts(page);

    await expect(page.locator(".hero-section")).toHaveScreenshot(
      `home-ja-${viewport}.png`,
    );
  });

  test("English kanji accents and placeholders", async ({ page }, testInfo) => {
    const viewport = testInfo.project.name;
    await gotoRoute(page);
    await page.getByLabel("Idioma").selectOption("en");
    await waitForFonts(page);

    await expect(page.locator(".hero-copy")).toHaveScreenshot(
      `home-copy-en-${viewport}.png`,
    );
    await expect(page.locator(".placeholder-teacher")).toHaveScreenshot(
      `teacher-en-${viewport}.png`,
    );

    await gotoRoute(page, "/courses");
    await expect(page.locator(".page-hero")).toHaveScreenshot(
      `courses-hero-en-${viewport}.png`,
    );
    const placeholders = page.locator(".course-card > .placeholder");
    await expect(placeholders.nth(0)).toHaveScreenshot(
      `course-annual-placeholder-en-${viewport}.png`,
    );
    await expect(placeholders.nth(1)).toHaveScreenshot(
      `course-thematic-placeholder-en-${viewport}.png`,
    );
  });

  test("courses", async ({ page }, testInfo) => {
    const viewport = testInfo.project.name;
    await gotoRoute(page, "/courses");
    await waitForFonts(page);

    if (viewport === "mobile") {
      const cards = page.locator(".course-card");
      await expect(cards.nth(0)).toHaveScreenshot("courses-es-mobile.png");
      await expect(cards.nth(1)).toHaveScreenshot(
        "courses-thematic-es-mobile.png",
      );
    } else {
      await expect(page.locator(".course-grid")).toHaveScreenshot(
        "courses-es-desktop.png",
      );
    }
  });

  test("submitted contact form", async ({ page }, testInfo) => {
    const viewport = testInfo.project.name;
    await gotoRoute(page, "/contact");
    await page.getByLabel("Nombre").fill("Ada");
    await page.getByLabel("Correo electrónico").fill("ada@example.com");
    await page.getByLabel("¿En qué podemos ayudarte?").fill("Cursos");
    await page.getByRole("button", { name: /Preparar mensaje/ }).click();
    await waitForFonts(page);

    await expect(page.locator(".contact-grid")).toHaveScreenshot(
      `contact-success-es-${viewport}.png`,
    );
  });

  test("English not-found page", async ({ page }, testInfo) => {
    const viewport = testInfo.project.name;
    await gotoRoute(page, "/missing-page");
    await page.getByLabel("Idioma").selectOption("en");
    await waitForFonts(page);

    await expect(page.locator(".not-found")).toHaveScreenshot(
      `not-found-en-${viewport}.png`,
    );
  });
});

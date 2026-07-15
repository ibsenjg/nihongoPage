import { expect, test } from "@playwright/test";
import { gotoRoute, legacyRoutes, publicRoutes } from "./test-data";

test.describe("public routes", () => {
  for (const [route, heading] of publicRoutes) {
    test(`${route} renders without horizontal overflow`, async ({ page }) => {
      await gotoRoute(page, route);

      await expect(
        page.getByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
    });
  }

  test("renders the translated not-found route", async ({ page }) => {
    await gotoRoute(page, "/missing-page");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Esta página se ha perdido por el camino.",
      }),
    ).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
  });
});

test.describe("legacy routes", () => {
  for (const [legacyRoute, targetRoute, heading] of legacyRoutes) {
    test(`${legacyRoute} redirects to ${targetRoute}`, async ({ page }) => {
      await gotoRoute(page, legacyRoute);

      await expect(
        page.getByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
      expect(new URL(page.url()).hash).toBe(`#${targetRoute}`);
    });
  }
});

test.describe("shared journeys", () => {
  test("uses kanji for every yellow accent in Spanish and English", async ({
    page,
  }) => {
    const routeAccents = [
      ["/", ["ようこそ", "いっしょに"], ["Bienvenido", "Juntos"]],
      ["/courses", ["学ぶ", "一歩ずつ"], ["Aprender", "Paso a paso"]],
      [
        "/courses/annual",
        ["長い道", "一歩ずつ"],
        ["Un largo camino", "Paso a paso"],
      ],
      [
        "/courses/thematic",
        ["好きなこと", "一歩ずつ"],
        ["Lo que te gusta", "Paso a paso"],
      ],
      ["/books", ["読む", "一歩ずつ"], ["Leer", "Paso a paso"]],
      ["/materials", ["練習", "一歩ずつ"], ["Práctica", "Paso a paso"]],
      ["/learn-free", ["無料"], ["Gratis"]],
      ["/about", ["私たち"], ["Nosotros"]],
      ["/contact", ["連絡"], ["Contacto"]],
      ["/missing-page", ["迷子"], ["Perdido"]],
    ] as const;

    for (const [route, kanjiAccents, japaneseAccents] of routeAccents) {
      await gotoRoute(page, route);
      const languageSelect = page.getByLabel(/Idioma|Language|言語/);
      const yellowAccents = page.locator(".japanese-kicker");

      await languageSelect.selectOption("es");
      expect(await yellowAccents.allTextContents()).toEqual(kanjiAccents);
      expect(
        await yellowAccents.evaluateAll((items) =>
          items.map((item) => item.getAttribute("lang")),
        ),
      ).toEqual(kanjiAccents.map(() => "ja"));

      await languageSelect.selectOption("en");
      expect(await yellowAccents.allTextContents()).toEqual(kanjiAccents);
      expect(
        await yellowAccents.evaluateAll((items) =>
          items.map((item) => item.getAttribute("lang")),
        ),
      ).toEqual(kanjiAccents.map(() => "ja"));

      await languageSelect.selectOption("ja");
      expect(await yellowAccents.allTextContents()).toEqual(japaneseAccents);
      expect(
        await yellowAccents.evaluateAll((items) =>
          items.map((item) => item.getAttribute("lang")),
        ),
      ).toEqual(japaneseAccents.map(() => "es"));
    }
  });

  test("bypasses repeated navigation with the keyboard", async ({ page }) => {
    await gotoRoute(page);

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", {
      name: "Saltar al contenido principal",
    });
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("main")).toBeFocused();
    expect(new URL(page.url()).hash).toBe("#/");
  });

  test("opens and focuses the newsletter through router navigation", async ({
    page,
  }) => {
    await gotoRoute(page, "/courses");

    const newsletterLink = page
      .locator("header")
      .getByRole("link", { name: "Newsletter", exact: true });
    await newsletterLink.press("Enter");

    await expect(page).toHaveURL(/#\/\?section=newsletter$/);
    const newsletterHeading = page.getByRole("heading", {
      level: 2,
      name: "Japonés sin agobios, directo a tu bandeja de entrada.",
    });
    await expect(newsletterHeading).toBeVisible();
    await expect(newsletterHeading).toBeFocused();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Esta página se ha perdido por el camino.",
      }),
    ).toHaveCount(0);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(newsletterHeading).not.toBeInViewport();
    await newsletterLink.press("Enter");

    await expect(newsletterHeading).toBeInViewport();
    await expect(newsletterHeading).toBeFocused();
  });

  test("preserves Japanese when opening the newsletter", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Locale preservation is exercised once in the desktop journey; responsive newsletter navigation is covered separately.",
    );
    await gotoRoute(page, "/courses");
    await page.getByLabel("Idioma").selectOption("ja");

    await page
      .locator("header")
      .getByRole("link", { name: "ニュースレター", exact: true })
      .press("Enter");

    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "無理なく学べる日本語を、あなたの受信箱へ。",
      }),
    ).toBeFocused();
  });

  test("uses the header and footer navigation", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "This journey targets the persistent desktop navigation; the mobile menu has its own keyboard test.",
    );
    await gotoRoute(page);

    await page
      .locator("header")
      .getByRole("link", { name: "Cursos", exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Cursos de japonés para cada etapa",
      }),
    ).toBeVisible();

    await page
      .locator("footer")
      .getByRole("link", { name: "Contacto", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Hablemos" }),
    ).toBeVisible();
  });

  test("operates the mobile menu with the keyboard", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile",
      "The collapsible menu control only exists in the mobile layout.",
    );
    await gotoRoute(page);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const openMenu = page.getByRole("button", { name: "Abrir menú" });
    await expect(openMenu).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("button", { name: "Cerrar menú" }),
    ).toHaveAttribute("aria-expanded", "true");

    await page
      .getByRole("navigation", { name: "Principal" })
      .getByRole("link", { name: "Cursos", exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Cursos de japonés para cada etapa",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Abrir menú" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  test("persists language and updates document metadata", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Persistence and document metadata are viewport-independent and run once on desktop.",
    );
    await gotoRoute(page);

    await page.getByLabel("Idioma").selectOption("ja");
    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "日本語は裏技では身につきません。一歩ずつ道を進むことで身につきます。",
      }),
    ).toBeVisible();
    await page.reload();
    await expect(page.getByLabel("言語")).toHaveValue("ja");

    await page.getByLabel("言語").selectOption("en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveTitle("Nihongo (日本語) · Learn Japanese online");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "An online Japanese school MVP with courses, materials, and free resources.",
    );
    expect(
      await page.evaluate(() =>
        window.localStorage.getItem("nihongo-language"),
      ),
    ).toBe("en");

    await gotoRoute(page, "/contact");
    await expect(page).toHaveTitle("Nihongo (日本語) · Contact");
    await expect(page.getByRole("status")).toHaveText("Page loaded: Contact");

    await gotoRoute(page, "/missing-page");
    await expect(page).toHaveTitle("Nihongo (日本語) · Page not found");
  });

  test("submits the newsletter and contact demo forms", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Form state is viewport-independent and runs once on desktop; submitted layouts have desktop and mobile visual coverage.",
    );
    await gotoRoute(page);

    await page.getByLabel("Nombre").fill("Ada");
    await page.getByLabel("Correo electrónico").fill("ada@example.com");
    await page.getByRole("button", { name: /Quiero mis snacks/ }).click();
    await expect(
      page.getByText(
        "¡Gracias! El formulario de demostración funciona; conectaremos el envío más adelante.",
      ),
    ).toBeVisible();

    await gotoRoute(page, "/contact");
    await page.getByLabel("Nombre").fill("Ada");
    await page.getByLabel("Correo electrónico").fill("ada@example.com");
    await page.getByLabel("¿En qué podemos ayudarte?").fill("Cursos");
    await page.getByRole("button", { name: /Preparar mensaje/ }).click();
    await expect(
      page.getByText(
        "Mensaje preparado. Conectaremos el envío real en una fase posterior.",
      ),
    ).toBeVisible();
  });

  test("keeps locale-sensitive placeholder accents and the Day kanji", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Locale-sensitive logo and badge behavior is viewport-independent and runs once on desktop.",
    );
    await gotoRoute(page, "/courses/thematic");

    expect(await page.locator(".logo-mark").allTextContents()).toEqual([
      "日",
      "日",
    ]);
    await page.getByLabel("Idioma").selectOption("ja");
    await expect(page.getByText("Viaje", { exact: true })).toHaveClass(
      /catalog-badge-latin/,
    );
    expect(await page.locator(".logo-mark").allTextContents()).toEqual([
      "日",
      "日",
    ]);
    await page.getByLabel("言語").selectOption("en");
    expect(await page.locator(".logo-mark").allTextContents()).toEqual([
      "日",
      "日",
    ]);
  });

  test("uses placeholder kanji in Spanish and English only", async ({
    page,
  }) => {
    await gotoRoute(page, "/courses");
    const courseGlyphs = page.locator(".course-grid .placeholder-glyph");

    expect(await courseGlyphs.allTextContents()).toEqual(["道", "好"]);
    expect(
      await courseGlyphs.evaluateAll((items) =>
        items.map((item) => item.getAttribute("lang")),
      ),
    ).toEqual(["ja", "ja"]);
    await expect(courseGlyphs.first()).not.toHaveClass(
      /placeholder-glyph-latin/,
    );

    await page.getByLabel("Idioma").selectOption("ja");
    expect(await courseGlyphs.allTextContents()).toEqual(["Ruta", "Tema"]);
    expect(
      await courseGlyphs.evaluateAll((items) =>
        items.map((item) => item.getAttribute("lang")),
      ),
    ).toEqual(["es", "es"]);
    await expect(courseGlyphs.first()).toHaveClass(/placeholder-glyph-latin/);

    await page.getByLabel("言語").selectOption("en");
    expect(await courseGlyphs.allTextContents()).toEqual(["道", "好"]);
    await expect(courseGlyphs.first()).not.toHaveClass(
      /placeholder-glyph-latin/,
    );

    await gotoRoute(page);
    await expect(
      page.locator(".placeholder-teacher .placeholder-glyph"),
    ).toHaveText("先生");
  });

  test("keeps the teacher glyph contained at responsive widths", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "This test sets its own 833–1920px viewport matrix, so running it from the mobile project would duplicate the same widths.",
    );

    for (const route of ["/", "/about"] as const) {
      for (const width of [833, 920, 921, 926, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        await gotoRoute(page, route);

        const glyphs = page.locator(
          ".placeholder-teacher:visible .placeholder-glyph:not(.placeholder-glyph-latin)",
        );
        const geometry = await glyphs.evaluateAll((visibleGlyphs) =>
          visibleGlyphs.map((glyph) => {
            const range = document.createRange();
            range.selectNodeContents(glyph);
            const textRect = range.getBoundingClientRect();
            const badgeRect = glyph.getBoundingClientRect();
            const style = getComputedStyle(glyph);
            const safeInset = 4;
            return {
              safeLeft:
                badgeRect.left +
                Number.parseFloat(style.borderLeftWidth) +
                safeInset,
              safeRight:
                badgeRect.right -
                Number.parseFloat(style.borderRightWidth) -
                safeInset,
              segments: range.getClientRects().length,
              textLeft: textRect.left,
              textRight: textRect.right,
            };
          }),
        );

        expect(geometry.length).toBeGreaterThan(0);
        for (const glyph of geometry) {
          expect(glyph.segments).toBe(1);
          expect(glyph.textLeft).toBeGreaterThanOrEqual(glyph.safeLeft);
          expect(glyph.textRight).toBeLessThanOrEqual(glyph.safeRight);
        }

        const widths = await page.evaluate(() => ({
          client: document.documentElement.clientWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        expect(widths.scroll).toBe(widths.client);
      }
    }
  });
});

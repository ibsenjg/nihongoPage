import { beforeEach, describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";
import i18n from "../i18n/config";
import { renderApp } from "../test/renderApp";

const publicRoutes = [
  [
    "/",
    "El japonés no se aprende con trucos. Se aprende recorriendo el camino.",
  ],
  ["/courses", "Cursos de japonés para cada etapa"],
  ["/courses/annual", "Cursos anuales: una ruta completa"],
  ["/courses/thematic", "Cursos temáticos: elige tu reto"],
  ["/books", "Libros para seguir aprendiendo"],
  ["/materials", "Materiales didácticos"],
  ["/learn-free", "Empieza a aprender gratis"],
  ["/about", "Mucho más que una pantalla con lecciones"],
  ["/contact", "Hablemos"],
] as const;

const legacyRoutes = [
  ["/cursos", "Cursos de japonés para cada etapa"],
  ["/cursos/anuales", "Cursos anuales: una ruta completa"],
  ["/cursos/tematicos", "Cursos temáticos: elige tu reto"],
  ["/libros", "Libros para seguir aprendiendo"],
  ["/materiales", "Materiales didácticos"],
  ["/aprende-gratis", "Empieza a aprender gratis"],
  ["/nosotros", "Mucho más que una pantalla con lecciones"],
  ["/contacto", "Hablemos"],
] as const;

beforeEach(async () => {
  window.localStorage.clear();
  await i18n.changeLanguage("es");
});

describe("route composition", () => {
  test("bypasses repeated navigation without changing routes", async () => {
    const screen = await renderApp();
    const skipLink = screen.getByRole("link", {
      name: "Saltar al contenido principal",
    });

    await expect.element(skipLink).toHaveAttribute("href", "#main-content");
    await userEvent.keyboard("{Tab}");
    await expect.element(skipLink).toHaveFocus();
    await userEvent.keyboard("{Enter}");

    await expect.element(screen.getByRole("main")).toHaveFocus();
    await expect
      .element(
        screen.getByRole("heading", {
          level: 1,
          name: "El japonés no se aprende con trucos. Se aprende recorriendo el camino.",
        }),
      )
      .toBeVisible();
  });

  test.each(publicRoutes)(
    "maps %s to its public page",
    async (route, heading) => {
      const screen = await renderApp(route);

      await expect
        .element(screen.getByRole("heading", { level: 1, name: heading }))
        .toBeVisible();
    },
  );

  test.each(legacyRoutes)(
    "redirects %s to its English route",
    async (route, heading) => {
      const screen = await renderApp(route);
      await expect
        .element(screen.getByRole("heading", { level: 1, name: heading }))
        .toBeVisible();
    },
  );

  test("renders the translated not-found route", async () => {
    const screen = await renderApp("/missing-page");
    await expect
      .element(
        screen.getByRole("heading", {
          level: 1,
          name: "Esta página se ha perdido por el camino.",
        }),
      )
      .toBeVisible();
  });
});

import type { Page } from "@playwright/test";

export const publicRoutes = [
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

export const legacyRoutes = [
  ["/cursos", "/courses", "Cursos de japonés para cada etapa"],
  ["/cursos/anuales", "/courses/annual", "Cursos anuales: una ruta completa"],
  ["/cursos/tematicos", "/courses/thematic", "Cursos temáticos: elige tu reto"],
  ["/libros", "/books", "Libros para seguir aprendiendo"],
  ["/materiales", "/materials", "Materiales didácticos"],
  ["/aprende-gratis", "/learn-free", "Empieza a aprender gratis"],
  ["/nosotros", "/about", "Mucho más que una pantalla con lecciones"],
  ["/contacto", "/contact", "Hablemos"],
] as const;

export const routesWithNotFound = [
  ...publicRoutes.map(([route]) => route),
  "/missing-page",
] as const;

export const axeTags = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
] as const;

export async function gotoRoute(page: Page, route = "/") {
  await page.goto(`./#${route}`);
}

export async function waitForFonts(page: Page) {
  await page.evaluate(() => document.fonts.ready.then(() => true));
}

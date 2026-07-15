import { expect, test } from "@playwright/test";
import { gotoRoute } from "./test-data";

test("renders the home route", async ({ page }) => {
  await gotoRoute(page);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "El japonés no se aprende con trucos. Se aprende recorriendo el camino.",
    }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("navigates through the public header", async ({ page }) => {
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
});

test("switches and persists the selected language", async ({ page }) => {
  await gotoRoute(page);

  await page.getByLabel("Idioma").selectOption("ja");
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await page.reload();
  await expect(page.getByLabel("言語")).toHaveValue("ja");
});

test("submits the newsletter and contact demo forms", async ({ page }) => {
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

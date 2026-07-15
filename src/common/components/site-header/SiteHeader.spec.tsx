import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import i18n from "../../../i18n/config";
import { SiteHeader } from "./SiteHeader";

beforeEach(async () => {
  window.localStorage.clear();
  await i18n.changeLanguage("es");
});

test("toggles and closes the navigation menu", async () => {
  const screen = await render(
    <MemoryRouter initialEntries={["/courses"]}>
      <SiteHeader />
    </MemoryRouter>,
  );

  await expect
    .element(screen.getByRole("link", { name: "Newsletter" }))
    .toHaveAttribute("href", "/?section=newsletter");
  await screen.getByRole("button", { name: "Abrir menú" }).click();
  await expect
    .element(screen.getByRole("button", { name: "Cerrar menú" }))
    .toHaveAttribute("aria-expanded", "true");
  await expect
    .element(screen.getByRole("link", { name: "Cursos" }))
    .toHaveClass("active");

  await screen
    .getByRole("navigation", { name: "Principal" })
    .getByRole("link", { name: "Libros" })
    .click();
  await expect
    .element(screen.getByRole("button", { name: "Abrir menú" }))
    .toHaveAttribute("aria-expanded", "false");
});

test("changes language from the accessible selector", async () => {
  const screen = await render(
    <MemoryRouter>
      <SiteHeader />
    </MemoryRouter>,
  );

  const languageSelect = screen.getByLabelText("Idioma");
  await expect
    .element(languageSelect)
    .toHaveAttribute("autocomplete", "language");
  await expect
    .element(screen.getByRole("option", { name: "日本語" }))
    .toHaveAttribute("lang", "ja");
  await languageSelect.selectOptions("ja");
  await expect.element(screen.getByLabelText("言語")).toHaveValue("ja");
  expect(document.documentElement.lang).toBe("ja");
});

import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import i18n from "../../i18n/config";
import { CatalogPage } from "./CatalogPage";

beforeEach(async () => {
  await i18n.changeLanguage("es");
});

test("renders annual catalog items without locale accents", async () => {
  const screen = await render(
    <MemoryRouter>
      <CatalogPage type="annual" />
    </MemoryRouter>,
  );

  await expect.element(screen.getByText("A1.1")).toBeVisible();
  await expect
    .element(screen.getByText("A1.1"))
    .not.toHaveClass("catalog-badge-latin");
});

test("marks Japanese thematic badges that contain Latin copy", async () => {
  await i18n.changeLanguage("ja");
  const screen = await render(
    <MemoryRouter>
      <CatalogPage type="thematic" />
    </MemoryRouter>,
  );

  await expect
    .element(screen.getByText("Viaje"))
    .toHaveClass("catalog-badge-latin");
});

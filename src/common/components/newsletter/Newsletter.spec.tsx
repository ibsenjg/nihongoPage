import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import i18n from "../../../i18n/config";
import { Newsletter } from "./Newsletter";

beforeEach(async () => {
  await i18n.changeLanguage("es");
});

test("replaces the demo form with its status after submission", async () => {
  const screen = await render(
    <MemoryRouter>
      <Newsletter />
    </MemoryRouter>,
  );

  await expect
    .element(screen.getByLabelText("Nombre"))
    .toHaveAttribute("id", "newsletter-name");
  await expect
    .element(screen.getByLabelText("Nombre"))
    .toHaveAttribute("autocomplete", "name");
  await expect
    .element(screen.getByLabelText("Correo electrónico"))
    .toHaveAttribute("id", "newsletter-email");
  await expect
    .element(screen.getByLabelText("Correo electrónico"))
    .toHaveAttribute("autocomplete", "email");

  await screen.getByLabelText("Nombre").fill("Ada");
  await screen.getByLabelText("Correo electrónico").fill("ada@example.com");
  await screen.getByRole("button", { name: /Quiero mis snacks/ }).click();

  await expect
    .element(screen.getByRole("status"))
    .toHaveTextContent(
      "¡Gracias! El formulario de demostración funciona; conectaremos el envío más adelante.",
    );
});

test("focuses its heading when selected through the route query", async () => {
  const screen = await render(
    <MemoryRouter initialEntries={["/?section=newsletter"]}>
      <Newsletter />
    </MemoryRouter>,
  );

  await expect
    .element(
      screen.getByRole("heading", {
        level: 2,
        name: "Japonés sin agobios, directo a tu bandeja de entrada.",
      }),
    )
    .toHaveFocus();
});

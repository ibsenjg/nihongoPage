import { beforeEach, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import i18n from "../../i18n/config";
import { ContactPage } from "./ContactPage";

beforeEach(async () => {
  await i18n.changeLanguage("es");
});

test("replaces the contact form with its status after submission", async () => {
  const screen = await render(<ContactPage />);

  await expect
    .element(screen.getByLabelText("Nombre"))
    .toHaveAttribute("id", "contact-name");
  await expect
    .element(screen.getByLabelText("Nombre"))
    .toHaveAttribute("autocomplete", "name");
  await expect
    .element(screen.getByLabelText("Correo electrónico"))
    .toHaveAttribute("id", "contact-email");
  await expect
    .element(screen.getByLabelText("Correo electrónico"))
    .toHaveAttribute("autocomplete", "email");
  await expect
    .element(screen.getByLabelText("¿En qué podemos ayudarte?"))
    .toHaveAttribute("id", "contact-message");

  await screen.getByLabelText("Nombre").fill("Ada");
  await screen.getByLabelText("Correo electrónico").fill("ada@example.com");
  await screen.getByLabelText("¿En qué podemos ayudarte?").fill("Cursos");
  await screen.getByRole("button", { name: /Preparar mensaje/ }).click();

  await expect
    .element(screen.getByRole("status"))
    .toHaveTextContent(
      "Mensaje preparado. Conectaremos el envío real en una fase posterior.",
    );
});

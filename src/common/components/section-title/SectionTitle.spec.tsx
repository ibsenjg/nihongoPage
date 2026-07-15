import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { SectionTitle } from "./SectionTitle";

test("renders a section title without an optional eyebrow", async () => {
  const screen = await render(<SectionTitle>Standalone heading</SectionTitle>);
  await expect
    .element(screen.getByRole("heading", { name: "Standalone heading" }))
    .toBeVisible();
  await expect.element(screen.getByText("Standalone heading")).toBeVisible();
});

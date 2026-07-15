import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { theme } from "../../styles/theme";
import { AppErrorBoundary } from "./AppErrorBoundary";
import { normalizeComponentStack } from "./normalizeComponentStack";

describe("AppErrorBoundary", () => {
  test("normalizes optional React component stacks for reporting", () => {
    expect(normalizeComponentStack("Component stack")).toBe("Component stack");
    expect(normalizeComponentStack(null)).toBe("");
  });

  test("renders children while no error is present", async () => {
    const screen = await render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <AppErrorBoundary>
            <p>Healthy content</p>
          </AppErrorBoundary>
        </ThemeProvider>
      </MemoryRouter>,
    );

    await expect.element(screen.getByText("Healthy content")).toBeVisible();
  });

  test("reports render errors, shows a fallback, and retries", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    let shouldThrow = true;
    function UnstableChild() {
      if (shouldThrow) {
        throw new Error("Expected test error");
      }
      return <p>Recovered content</p>;
    }

    const handleError = vi.fn(() => {
      shouldThrow = false;
    });

    const screen = await render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <AppErrorBoundary onError={handleError}>
            <UnstableChild />
          </AppErrorBoundary>
        </ThemeProvider>
      </MemoryRouter>,
    );

    await expect
      .element(
        screen.getByRole("heading", {
          name: "No hemos podido mostrar esta página.",
        }),
      )
      .toBeVisible();
    expect(handleError).toHaveBeenCalledOnce();

    await screen.getByRole("button", { name: "Intentar de nuevo" }).click();
    await expect.element(screen.getByText("Recovered content")).toBeVisible();
    consoleError.mockRestore();
  });

  test("shows the fallback without requiring an error reporter", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    function BrokenChild(): never {
      throw new Error("Expected test error without reporter");
    }

    const screen = await render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <AppErrorBoundary>
            <BrokenChild />
          </AppErrorBoundary>
        </ThemeProvider>
      </MemoryRouter>,
    );

    await expect
      .element(
        screen.getByRole("heading", {
          name: "No hemos podido mostrar esta página.",
        }),
      )
      .toBeVisible();
    consoleError.mockRestore();
  });
});

import { afterEach, describe, expect, test, vi } from "vitest";
import {
  reportCaughtError,
  reportRecoverableError,
  reportUncaughtError,
} from "./reportError";

afterEach(() => vi.restoreAllMocks());

describe("React error reporting", () => {
  test.each([
    [reportCaughtError, "[react:caught]"],
    [reportUncaughtError, "[react:uncaught]"],
    [reportRecoverableError, "[react:recoverable]"],
  ] as const)("reports through the configured category", (report, category) => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const error = new Error("Expected test error");
    report(error, { componentStack: "ComponentStack" });
    expect(consoleError).toHaveBeenCalledWith(category, {
      error,
      componentStack: "ComponentStack",
    });
  });
});

import type { ErrorInfo } from "react";

export function normalizeComponentStack(
  componentStack: ErrorInfo["componentStack"],
): string {
  return componentStack ?? "";
}

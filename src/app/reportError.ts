export type ReactErrorContext = {
  componentStack?: string;
};

function reportReactError(
  category: "caught" | "uncaught" | "recoverable",
  error: unknown,
  context: ReactErrorContext,
): void {
  console.error(`[react:${category}]`, { error, ...context });
}

export function reportCaughtError(
  error: unknown,
  context: ReactErrorContext,
): void {
  reportReactError("caught", error, context);
}

export function reportUncaughtError(
  error: unknown,
  context: ReactErrorContext,
): void {
  reportReactError("uncaught", error, context);
}

export function reportRecoverableError(
  error: unknown,
  context: ReactErrorContext,
): void {
  reportReactError("recoverable", error, context);
}

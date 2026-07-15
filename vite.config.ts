import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  base: "/nihongoPage/",
  plugins: [react()],
  test: {
    include: ["src/**/*.spec.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    testTimeout: 30_000,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      screenshotFailures: true,
    },
    coverage: {
      provider: "v8",
      include: [
        "src/app/**/*.{ts,tsx}",
        "src/routes/**/*.tsx",
        "src/common/components/**/*.tsx",
        "src/pages/**/*.{ts,tsx}",
        "src/i18n/config.ts",
      ],
      exclude: ["**/*.spec.{ts,tsx}", "src/main.tsx"],
      reporter: ["text", "html", "json-summary"],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});

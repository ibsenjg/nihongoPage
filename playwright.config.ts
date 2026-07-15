import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4173/nihongoPage/";
const webkitSmoke = /webkit-smoke\.spec\.ts/;

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "test-results",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFileName}/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    baseURL,
    browserName: "chromium",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      testIgnore: webkitSmoke,
      use: { viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "mobile",
      testIgnore: webkitSmoke,
      use: { viewport: { width: 390, height: 844 } },
    },
    {
      name: "webkit-smoke",
      testMatch: webkitSmoke,
      use: {
        browserName: "webkit",
        viewport: { width: 1440, height: 1000 },
      },
    },
  ],
  webServer: {
    command: "pnpm preview --host 127.0.0.1 --port 4173 --strictPort",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});

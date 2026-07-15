# Nihongo (日本語)

A responsive Japanese-language school MVP built with React, TypeScript, Vite, and pnpm. The application keeps Spanish as its default content language and also supports Japanese and English through JSON translation resources.

## Features

- Public, language-agnostic English routes for courses, books, materials, free resources, about, and contact pages.
- Spanish, Japanese, and English UI powered by `i18next` and `react-i18next`.
- Component and global styling powered by `styled-components`.
- Responsive navigation, interactive demo forms, translated metadata, and persisted language selection.
- Self-hosted Barlow and Coiny WOFF2 fonts with their SIL OFL 1.1 licenses.
- React error boundary plus React root error-reporting hooks, ready to connect to an external monitoring service.
- Vitest component coverage plus Playwright E2E journeys, WCAG A/AA checks, desktop/mobile visual baselines, and WebKit smoke coverage.

The demo forms do not transmit data. Classroom access, purchasing, and authentication remain clearly marked future features.

## Project structure

```text
src/
├── app/                 # Application composition, metadata, and error reporting
├── assets/fonts/        # Self-hosted WOFF2 files and font licenses
├── common/
│   ├── components/      # Components reused by more than one page
│   └── styles/          # Theme and styled-components global styles
├── i18n/                # i18next configuration and JSON translation resources
├── pages/               # Feature-first route pages
├── routes/              # Route definitions, legacy redirects, and route tests
└── test/                # Shared Vitest browser setup and render helpers
tests/
└── e2e/                 # Real-route Playwright journeys, axe scans, and visual baselines
docs/                    # Manual accessibility and maintenance guidance
scripts/                 # Repeatable local tooling helpers
```

Tests are colocated with the behavior they cover. The structure follows the useful parts of the external Sage folder guidance while remaining specific to this small Vite application.

## Routes

| Route               | Page                    |
| ------------------- | ----------------------- |
| `/`                 | Home                    |
| `/courses`          | Course overview         |
| `/courses/annual`   | Annual courses          |
| `/courses/thematic` | Thematic courses        |
| `/books`            | Books                   |
| `/materials`        | Materials               |
| `/learn-free`       | Free learning resources |
| `/about`            | About                   |
| `/contact`          | Contact                 |

The previous Spanish paths redirect to their English equivalents, so existing links continue to work. `HashRouter` keeps every route compatible with static GitHub Pages hosting.

## Development

```bash
pnpm install
pnpm exec playwright install chromium webkit
pnpm dev
```

Use the language selector in the header to switch among Spanish, Japanese, and English. The selection is stored under `localStorage['nihongo-language']`; Spanish is used when no supported preference exists.

## Verification

```bash
pnpm test:unit       # Run colocated Vitest component and composition tests
pnpm test:coverage   # Enforce 100% behavioral source coverage with Vitest
pnpm test:full       # Run Vitest coverage, then the Playwright E2E matrix
pnpm test:e2e        # Build and run the Playwright E2E matrix
pnpm test:e2e:ui     # Open Playwright UI Mode to run and inspect tests visually
pnpm test:e2e:headed # Watch the full E2E matrix run in a visible browser
pnpm test:e2e:update # Refresh only the Chromium visual spec baselines
pnpm test:e2e:update:container # Refresh visuals in the pinned CI image
pnpm test            # Run unit and E2E suites
pnpm verify          # Lint, formatting, coverage, build, and E2E checks
```

Coverage is a Vitest option, not a Playwright option. Do not append
`--coverage` to `pnpm test`: that command chains both runners, so trailing
options can reach Playwright. Use `pnpm test:coverage` for coverage only,
`pnpm test:full` for coverage plus E2E, or `pnpm verify` for the complete
quality gate.

Use `pnpm test:e2e:ui` for the clearest visual workflow. Playwright opens an
interactive test explorer where you can run one test or an entire group, watch
each action, inspect DOM snapshots, and review screenshot comparisons and
traces. Use `pnpm test:e2e:headed` when you simply want to watch the complete
desktop and mobile matrix execute sequentially.

The Chromium projects own the complete route, Axe, interaction, and visual
matrix. A deliberately small WebKit project smoke-tests Home, navigation,
language persistence, and both demo forms without duplicating the entire
Chromium suite. Nine Chromium project/test combinations are intentionally
skipped when a scenario belongs to only one viewport; every skip includes its
reason in the Playwright report.

Coverage includes application behavior, routes, shared components, pages, and i18n configuration. Styling, type declarations, generated translation data, and the browser bootstrap are intentionally outside the behavioral coverage denominator.

The critical visual matrix captures the following regions at `1440 × 1000` and `390 × 844`:

- Spanish navigation
- Spanish home page
- Japanese home page
- Spanish courses page
- Submitted Spanish contact form
- English not-found page

`pnpm test:e2e:update` updates only `tests/e2e/visual.spec.ts`; run the normal
`pnpm verify` afterward. For the same Linux rendering environment used in CI,
use `pnpm test:e2e:update:container` with Docker. Both CI and that helper pin
Playwright's `v1.61.1-noble` image.

Playwright owns the routed journeys and visual baselines. It saves failure-only screenshots, retains traces on failures, and embeds full axe JSON results in its HTML report. Vitest remains the sole coverage runner and still saves browser evidence for unexpected component-test failures. CI uploads both runners' failure artifacts and coverage output.

Automated accessibility checks use Axe WCAG 2.0, 2.1, and 2.2 A/AA tags on every Spanish public route at desktop and mobile sizes, plus critical Japanese and English states. They complement, but do not replace, keyboard and manual assistive-technology review.

Use the [manual accessibility checklist](docs/accessibility-checklist.md) for
VoiceOver/Safari, keyboard-only navigation, zoom, text spacing, forced colors,
reduced motion, and future ARC Toolkit findings.

## Deployment

Every pull request runs the complete verification gate in the pinned Playwright
container. Pushes to `master` and manual workflow runs deploy only after that
gate succeeds. The production bundle is published from `dist` to GitHub Pages.
Dependabot groups production and development dependency updates and checks
GitHub Actions monthly.

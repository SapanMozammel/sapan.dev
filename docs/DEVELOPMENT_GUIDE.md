# Development Guide

## Getting Started

```bash
pnpm install
pnpm run dev          # http://localhost:8000 (Turbopack)
```

---

## Scripts

### Development
```bash
pnpm run dev          # Dev server with Turbopack (port 8000)
pnpm run dev:webpack  # Fallback dev server using webpack
```

### Build & Production
```bash
pnpm run build
pnpm run start
```

### Code Quality
```bash
pnpm run type:check   # TypeScript (tsc --noEmit)
pnpm run lint         # ESLint
pnpm run lint:fix     # Auto-fix ESLint issues
pnpm run format       # Prettier
pnpm run format:all   # Organize imports + format + lint:fix
pnpm run check:all    # type:check + lint + format:check
```

### Testing — Vitest (unit + component)
```bash
pnpm run test            # Run all tests once (Vitest)
pnpm run test:watch      # Watch mode
pnpm run test:coverage   # With V8 coverage report
open coverage/index.html # Open HTML coverage report
```

### Testing — Playwright (e2e + a11y)
```bash
pnpm run test:e2e                              # All projects (CI matrix). Spawns its own dev server on port 8001.
pnpm run test:e2e -- --project=chromium-desktop  # Fast feedback on Chromium only
pnpm run test:e2e:ui                           # Interactive UI mode
pnpm run test:e2e:headed                       # Headed browser (visual debugging)
pnpm run test:e2e:debug                        # Step-through debugger (PWDEBUG=1)
pnpm run test:e2e:report                       # Open the last HTML report
pnpm run test:e2e:codegen                      # Codegen against http://localhost:8001
pnpm run test:e2e:install                      # Re-install Playwright browsers
```

**Port note:** Playwright spawns `pnpm next dev --port=8001 --turbo`, so your regular `pnpm dev` on port 8000 keeps running side-by-side. `webServer.reuseExistingServer` is on locally and off in CI.

### Analysis
```bash
pnpm run analyze         # Full bundle analysis (opens browser report)
pnpm run analyze:server  # Server bundle only
pnpm run analyze:browser # Client bundle only
```

---

## Project Structure

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout — html/body + fonts only
│   └── [locale]/
│       ├── layout.tsx                # Locale layout — Providers, Header, Footer, RTL dir
│       ├── (landing)/page.tsx        # Home page (no URL segment)
│       ├── articles/page.tsx         # Articles listing
│       ├── articles/[slug]/page.tsx  # Article detail
│       ├── error.tsx
│       └── loading.tsx
│
├── components/
│   ├── layout/                       # Page sections (each has index.tsx)
│   │   ├── Hero/
│   │   │   ├── index.tsx
│   │   │   └── HeroBackground.tsx
│   │   ├── Experience/
│   │   │   ├── index.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── particles/           # Three.js particle system
│   │   ├── Portfolio/               # Stacking card projects
│   │   ├── Technologies/            # Tech stack grid
│   │   ├── Testimonials/
│   │   │   └── TestimonialBackground.tsx
│   │   ├── Workflow/
│   │   │   ├── index.tsx
│   │   │   ├── WorkflowContent.tsx
│   │   │   └── WorkflowProgress.tsx
│   │   ├── Blog/                    # Blog cards section
│   │   ├── Faq/                     # Accordion FAQ
│   │   ├── Cta/
│   │   │   └── CtaBackground.tsx
│   │   ├── Header/
│   │   │   ├── index.tsx            # Server: logo, nav, switchers
│   │   │   ├── NavMenu.tsx          # Client: desktop nav + scroll-spy
│   │   │   └── MobileNav.tsx        # Client: sheet-based mobile nav
│   │   ├── Footer/
│   │   │   ├── FooterNav.tsx        # Client: section scroll navigation
│   │   │   └── FooterConnect.tsx    # Client: availability + social links
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Button/              # ButtonContent, ButtonShapeSvg, variants.ts
│   │       ├── ConnectButton.tsx
│   │       ├── SectionSeparator.tsx
│   │       ├── SectionTitle.tsx
│   │       ├── TextUnderline.tsx
│   │       ├── ThemeSwitcher.tsx
│   │       └── LanguageSwitcher.tsx
│   ├── ui/                          # shadcn/ui + custom UI components
│   │   ├── accordion.tsx
│   │   ├── blog-card.tsx
│   │   ├── contact-modal/           # index.tsx, ContactForm.tsx, ContactStatusStates.tsx
│   │   ├── timeline/                # index.tsx, TimelineItem.tsx, TimelineProgressBar.tsx, timeline-utils.ts
│   │   ├── diamond-grid.tsx
│   │   ├── gsap-marquee.tsx
│   │   ├── project-card.tsx
│   │   ├── technologies-display.tsx
│   │   ├── cursor-tooltip.tsx
│   │   ├── sheet.tsx
│   │   ├── dialog.tsx
│   │   ├── popover.tsx
│   │   └── tooltip.tsx
│   └── icons/                       # Custom SVG icons
│       ├── Logo.tsx
│       ├── Cloud.tsx
│       ├── Pattern.tsx
│       └── WorldMap.tsx
│
├── data/
│   ├── config/                      # languages.ts, routes.ts, technologies.ts
│   └── content/                     # experience.ts, portfolio.tsx, testimonials.ts,
│                                    # workflow.ts, faq.ts, blogs.ts
│
├── proxy.ts                          # next-intl locale detection & routing
├── i18n/
│   ├── routing.ts                   # defineRouting — locales, defaultLocale, localePrefix
│   ├── navigation.ts                # Typed Link, useRouter, usePathname
│   ├── request.ts                   # getRequestConfig — loads messages, falls back to en
│   └── locales/
│       ├── en/                      # Baseline (complete)
│       │   ├── common.json
│       │   ├── navigation.json
│       │   ├── home.json
│       │   └── blog.json
│       └── [fr|de|es|ar|...]/       # Partial — falls back to en per namespace
│
├── store/
│   ├── index.ts
│   ├── hooks/index.ts               # useAppDispatch, useAppSelector
│   └── slices/
│       ├── localeSlice.ts           # currentLocale, isRTL — persists to localStorage
│       └── uiSlice.ts               # isContactModalOpen
│
├── hooks/
│   ├── useContactForm.ts            # Form state, validation, Redux dispatch
│   └── useStackingCards.ts          # GSAP ScrollTrigger stacking (Portfolio)
│
├── lib/
│   └── utils/
│       ├── index.ts                 # cn() — clsx + tailwind-merge
│       ├── image.ts                 # getBlurDataURL, shimmer
│       ├── date.ts
│       ├── file.ts
│       └── string.ts
│
├── styles/
│   ├── global.scss                  # Tailwind imports + partials
│   ├── themes.scss                  # CSS variables (light/dark)
│   ├── animations.scss              # Keyframes
│   ├── components.scss
│   └── utilities.scss
│
├── types/                           # TypeScript type definitions
└── providers/index.tsx              # Theme + Redux providers
```

```
/  (root)
├── src/
├── tests/                           # Vitest test suites (outside Next.js compilation)
│   ├── setup.tsx                    # Global mocks
│   ├── test-utils.tsx               # Redux-wrapped render
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── store/
│   └── ui/
├── e2e/                             # Playwright E2E tests (when added)
└── vitest.config.ts
```

---

## E2E Architecture (Playwright)

End-to-end tests live in [`e2e/`](../e2e) at the project root, scoped via [`tsconfig.e2e.json`](../tsconfig.e2e.json) and excluded from the main TS build. The full sapan-canonical conventions live at [.claude/skills/workflow/e2e.md](../.claude/skills/workflow/e2e.md); this section is the operator-level summary.

### Layout

```
e2e/
├── fixtures.ts             # Extended `test` — mockContact, mockTurnstile, setLocale + reduced-motion default
├── pages/                  # Page Objects
│   ├── HomePage.ts         # 8 section locators + scrollToSection helper
│   └── ArticlesPage.ts     # Listing + goToArticle / firstArticleSlug helpers
└── *.spec.ts               # 8 specs: landing, navigation, responsive, accessibility, articles, i18n, theme, contact-modal
```

### Fixtures (extend `test` from `e2e/fixtures.ts`)

| Fixture | Signature | What it does |
|---|---|---|
| `mockContact` | `(mode: 'success' \| 'error') => Promise<void>` | Routes `**/api/contact` to a deterministic Resend stub. |
| `mockTurnstile` | `() => Promise<void>` | Pre-installs `window.turnstile.render(...)` via `addInitScript` so the synthetic widget invokes its success callback and the form submit button enables. |
| `setLocale` | `(locale: string) => Promise<void>` | Navigates to a locale-prefixed URL with the `NEXT_LOCALE` cookie set. |
| `mockGraphQL` | _reserved_ | Slot held for sibling PRD `apollo-client-integration` Step 26. |

The default `page` fixture also forces `prefers-reduced-motion: reduce` (so Framer Motion + GSAP entrances settle instantly) and rewrites `page.goto()` to default to `waitUntil: 'domcontentloaded'`. Sapan's home page keeps the network hot indefinitely (Three.js + fonts + analytics), so neither `'load'` nor `'networkidle'` is safe.

### Project matrix

`playwright.config.ts` defines 8 projects. PR runs hit `chromium-desktop` + `mobile-webkit`; the full matrix runs on push to `dev`:

- `chromium-desktop` / `firefox-desktop` / `webkit-desktop` (1280×800, locale `en`)
- `mobile-chromium` (Pixel 7) / `mobile-webkit` (iPhone 15)
- `i18n-rtl` (Chromium, locale `ar`, baseURL `/ar`)
- `dark-mode` (Chromium, `colorScheme: 'dark'`)
- `motion-on` (Chromium, no reduced-motion override) — runs only `motion.spec.ts` (deferred follow-up)

### Authoring rules (sapan-canonical)

- Import `test` and `expect` from `e2e/fixtures.ts`, never raw `@playwright/test`. The wrapper applies the reduced-motion default + the `domcontentloaded` goto policy.
- Wait on auto-waiting matchers (`toBeVisible`, `toHaveText`, `toHaveURL`). **Never** use `page.waitForTimeout(ms)` or `'networkidle'` — both are flake.
- Mock every external network call with `page.route()`. Resend, Cloudflare Turnstile, GraphQL (when Apollo lands) — no spec hits a real third party.
- Read asserted copy from source: `src/i18n/locales/<locale>/<namespace>.json` for translations, `src/data/content/*` for static content. Never hardcode strings.
- `<canvas>` for the Experience particle scene only mounts when reduced-motion is **off** AND the device is not coarse-pointer. Tests that need it call `page.emulateMedia({ reducedMotion: 'no-preference' })` and skip mobile projects via `test.skip(testInfo.project.name.startsWith('mobile-'), '...')`.
- Mobile-only or desktop-only specs gate via `test.beforeEach(({}, testInfo) => test.skip(condition, reason))`. The simpler `test.skip(callback)` overload has finicky TS narrowing under `exactOptionalPropertyTypes`.

### Known a11y exclusions (allow-listed in `accessibility.spec.ts`)

Tracked for follow-up PRDs because they reflect real source issues, not spec-side workarounds:

| Exclusion | Why | Follow-up |
|---|---|---|
| `header button[aria-controls]` + GitHub icon link | LanguageSwitcher / ThemeSwitcher / GitHubLink are icon-only without accessible names | `a11y-icon-only-controls` |
| `<fieldset> > input/textarea` in dialogs | `FormField` renders `<label>` and `<input>` as siblings without `htmlFor`/`id` association | `a11y-form-label-association` |
| `article pre`, `.rounded-xl > pre` | MDX code blocks scroll horizontally but are not focusable | `a11y-scrollable-pre-blocks` |
| `color-contrast` rule (global disable) | Gradient `bg-clip-text` headings render `text-transparent`; axe can't measure gradient contrast. Manual review covers the gradient stops. | None — accepted |

---

## Formatter & Linting Config

ESLint uses **flat config** at the project root (`eslint.config.js`). Prettier config lives in `.formatter/`:

```
eslint.config.js          # ESLint flat config (root)
.formatter/
├── .prettierrc.js        # Prettier config — used by all format scripts
└── sync.js               # Import organizer script — run by imports:organize
```

---

> **Code conventions** (components, styling, TypeScript, i18n) are documented in `CLAUDE.md` at the project root — loaded automatically by Claude Code every session.

---

## Troubleshooting

### Dev server misbehaving
```bash
rm -rf .next && pnpm run dev
```

### Type errors
```bash
pnpm run type:check
```

### Formatting issues
```bash
pnpm run format:all    # organize imports + prettier + eslint fix
```

### Tests failing after dependency update
Check `tests/setup.tsx` — mocks for `framer-motion`, `gsap`, `@react-three/fiber` may need updating if the package API changed.

### Playwright `webServer` boot timeout
Turbopack cold compile + Three.js hydration can exceed the default 60s. `playwright.config.ts` sets `webServer.timeout: 180_000`; the per-test timeout is 90s. If you see `page.goto: Test timeout` repeatedly, drop `workers` from 2 to 1 — parallel workers all hitting `/` simultaneously can saturate Turbopack's compile queue and back up the first hits.

### Playwright `<canvas>` not attached on Experience section
The R3F scene in `ParticleBackground` is gated behind `useReducedMotion()` and a coarse-pointer check. Tests that assert the canvas need:
- `await page.emulateMedia({ reducedMotion: 'no-preference' })` before `page.goto`
- `test.skip(testInfo.project.name.startsWith('mobile-'), ...)` since the source intentionally renders a CSS fallback (`bg-primary/45 dark:bg-success/45`) on mobile/coarse-pointer.

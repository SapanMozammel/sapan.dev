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
pnpm run dev:webpack  # Webpack-only fallback — use when Turbopack hits a regression or for stack traces from webpack-only deps
```

### Build & Production
```bash
pnpm run build           # Turbopack production build (default; staging-fast, no class mangling)
pnpm run build:mangled   # pnpm build + post-build Tailwind class mangler (production deploy path)
pnpm run mangle          # Re-run mangler against an existing .next/ (skip the build step)
pnpm run start           # Serve the built output
```

**Class mangling.** `pnpm build:mangled` runs `scripts/mangle.mjs` after the Turbopack build to rewrite Tailwind class names to short `tw-X` tokens in CSS, HTML, and JS chunks. Vercel deploys use this command via `vercel.json`'s `buildCommand` override — production sites ship mangled, local `pnpm build` stays un-mangled for fast iteration. The mapping is written to `.tw-patch/class-list.json` (gitignored, regenerated each run, uploaded as a CI artifact for prod-support reverse lookup). Full conventions: [.claude/skills/workflow/tailwind-mangle.md](../.claude/skills/workflow/tailwind-mangle.md). Pre-build sanity check: invoke the `tailwind-class-reviewer` agent.

**Reverse lookup.** When prod hits an issue referencing a `tw-abc` class: open `.tw-patch/class-list.json` (or download the `tw-class-list` CI artifact from the affected build), find the entry whose value is `tw-abc`, read the key.

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
pnpm run analyze         # Turbopack-native interactive analyzer at http://localhost:4000
pnpm run analyze:report  # Static analysis written to .next/diagnostics/analyze/ (no server)
```

Both run `next experimental-analyze --no-mangling` (mangling disabled so the analyzer shows source class identifiers, not the post-build `tw-X` tokens). The Turbopack-native analyzer replaced the old webpack-only `@next/bundle-analyzer` flow because sapan's `next build` defaults to Turbopack, on which the old plugin printed a warning and produced no report.

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
│   ├── layout/                       # Page sections (each has index.tsx). All filenames + folders are kebab-case.
│   │   ├── hero/
│   │   │   ├── index.tsx
│   │   │   └── hero-background.tsx
│   │   ├── experience/
│   │   │   ├── index.tsx
│   │   │   ├── particle-background.tsx
│   │   │   └── particles/           # Three.js particle system
│   │   ├── portfolio/               # Stacking card projects
│   │   ├── technologies/            # Tech stack grid
│   │   ├── testimonials/
│   │   │   └── testimonial-background.tsx
│   │   ├── workflow/
│   │   │   ├── index.tsx
│   │   │   ├── workflow-content.tsx
│   │   │   └── workflow-progress.tsx
│   │   ├── blog/                    # Blog cards section
│   │   ├── faq/                     # Accordion FAQ
│   │   ├── cta/
│   │   │   └── cta-background.tsx
│   │   ├── header/
│   │   │   ├── index.tsx            # Server: logo, nav, switchers
│   │   │   ├── nav-menu.tsx         # Client: desktop nav + scroll-spy
│   │   │   └── mobile-nav.tsx       # Client: sheet-based mobile nav
│   │   ├── footer/
│   │   │   └── index.tsx
│   │   └── common/
│   │       ├── button/              # index.tsx + button-content, button-shape-svg, variants.ts
│   │       ├── connect-button.tsx
│   │       ├── section-separator.tsx
│   │       ├── section-title.tsx
│   │       ├── text-underline.tsx
│   │       ├── theme-switcher.tsx
│   │       └── language-switcher.tsx
│   ├── ui/                          # shadcn/ui + custom UI components (kebab-case)
│   │   ├── accordion.tsx
│   │   ├── blog-card.tsx
│   │   ├── contact-modal/           # index.tsx, contact-form.tsx, contact-status-states.tsx
│   │   ├── timeline/                # index.tsx, timeline-item.tsx, timeline-progress-bar.tsx, timeline-utils.ts
│   │   ├── diamond-grid.tsx
│   │   ├── marquee.tsx
│   │   ├── project-card.tsx
│   │   ├── technologies-display.tsx
│   │   ├── cursor-tooltip.tsx
│   │   ├── sheet.tsx
│   │   ├── dialog.tsx
│   │   ├── popover.tsx
│   │   └── tooltip.tsx
│   └── icons/                       # Custom SVG icons (kebab-case files)
│       ├── logo.tsx
│       ├── pattern.tsx
│       ├── world-map.tsx
│       └── projects/<brand>/logo.tsx  # 9 brand logos (better-links, betterdocs, ..., x-cloud)
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
│       ├── locale-slice.ts          # currentLocale, isRTL — persists to localStorage
│       └── ui-slice.ts              # isContactModalOpen
│
├── hooks/
│   ├── use-contact-form.ts          # Form state, validation, Redux dispatch
│   └── use-stacking-cards.ts        # GSAP ScrollTrigger stacking (Portfolio)
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

End-to-end tests live in [`e2e/`](../e2e) at the project root, scoped via [`tsconfig.e2e.json`](../tsconfig.e2e.json) and excluded from the main TS build. **Canonical conventions** — project matrix, fixture catalog, wait strategy, mock-everything rule, locale-aware specs, page objects, source-of-truth reads — live at [.claude/skills/workflow/e2e.md](../.claude/skills/workflow/e2e.md). This section covers operator-only material the skill doesn't.

**Port registry:** dev `8000` · e2e `8001` · lhci `8002` · analyze `4000`. Playwright spawns its own dev server via `webServer.command: 'pnpm next dev --port=8001 --turbo'` so `pnpm dev` on `8000` keeps running side-by-side. `webServer.reuseExistingServer` is on locally and off in CI.

```bash
pnpm run test:e2e                              # All projects (CI matrix)
pnpm run test:e2e -- --project=chromium-desktop  # Fast feedback on Chromium only
pnpm run test:e2e:ui                           # Interactive UI mode
pnpm run test:e2e:headed                       # Headed browser (visual debugging)
pnpm run test:e2e:debug                        # Step-through debugger (PWDEBUG=1)
pnpm run test:e2e:report                       # Open the last HTML report
pnpm run test:e2e:codegen                      # Codegen against http://localhost:8001
pnpm run test:e2e:install                      # Re-install Playwright browsers
```

### Known a11y exclusions (allow-listed in `accessibility.spec.ts`)

Only the gradient `color-contrast` exception remains — the three a11y follow-up PRDs (`a11y-icon-only-controls`, `a11y-form-label-association`, `a11y-scrollable-pre-blocks`) all landed and removed their respective `.exclude()` entries.

| Exclusion | Why | Follow-up |
|---|---|---|
| `color-contrast` rule (global disable) | Gradient `bg-clip-text` headings render `text-transparent`; axe can't measure gradient contrast. Manual review covers the gradient stops. | None — accepted |

### Lighthouse CI

Performance + accessibility + best-practices + SEO budget gating via `@lhci/cli`. Spawns its own dev server on **port 8002** (sapan dev = 8000, e2e = 8001, lhci = 8002 — port registry is the single source of truth).

```bash
pnpm run lhci          # autorun: collect → assert → upload (3 runs × 2 URLs, median)
pnpm run lhci:collect  # collect only — skip assertions
pnpm run lhci:assert   # rerun assertions against the existing collection
```

`/lhci` slash command wraps `pnpm run lhci` and adds: persisting the previous run for delta comparison, parsing per-URL median scores, and surfacing the top failing audits.

**Current thresholds** (`.lighthouserc.json`, deliberately relaxed for first 2 weeks):

| Category | Level | Min score |
|---|---|---|
| performance | `warn` | 0.80 |
| accessibility | `error` | 0.95 |
| best-practices | `error` | 0.90 |
| seo | `warn` | 0.90 |

`performance` and `seo` are `warn` not `error` because:
- **Homepage perf** is bound by Three.js + R3F + GSAP cold-start; sits ~0.68 in dev mode, climbs in production but stays borderline. Promote to `error` after a perf-tuning pass.
- **Homepage seo** sits ~0.92 because of two real findings — `link-text` (Lighthouse's heuristic doesn't credit `aria-label` for icon-only `<a>`) and `robots-txt` validity. Track in micro-PRDs and promote `seo` to `error 0.95` once both are clean.

**CI:** `.github/workflows/ci.yml` has a `lighthouse` job that runs `pnpm exec lhci autorun` after `build`, with `continue-on-error: true` for the first 2 weeks. Promote to blocking after threshold tuning is complete.

---

## Apollo Client (GraphQL Foundation)

Apollo Client 4.x is wired as foundation only — `<ApolloWrapper>` mounts on every page but the scaffold is **inert by default**: no queries shipped, `NEXT_PUBLIC_GRAPHQL_ENDPOINT` blank in `.env.example`, the runtime throws a clear error if any query fires without an endpoint set.

**Canonical conventions** — RSC vs Client decision tree, fragment colocation, auth boundary, codegen flow, mock patterns — live at [.claude/skills/architecture/data-graphql.md](../.claude/skills/architecture/data-graphql.md). Reference for general Apollo 4.x patterns: [.claude/skills/external/data/apollo-client/](../.claude/skills/external/data/apollo-client/). This section covers operator-only material the skill doesn't.

### Provider ordering

Locale layout chain (`src/app/[locale]/layout.tsx`) — this nesting is load-bearing for Suspense hydration and Redux/i18n availability inside Apollo error boundaries:

```
<Providers>                          # Redux + NextThemes
  <NextIntlClientProvider>           # next-intl
    <ApolloWrapper>                  # innermost — Suspense hydration close to consumers
      <Header />
      {children}
      <Footer />
    </ApolloWrapper>
  </NextIntlClientProvider>
</Providers>
```

### Codegen tsconfig workaround

Run `pnpm gql:codegen` (or `/gql-codegen`) after editing any `.graphql` file. Output goes to `src/types/graphql/` (gitignored).

> **Note:** `src/types/graphql/` is excluded from `tsconfig.json` until a real operation lands — the empty `client-preset` stub trips `noUnusedLocals` (`import * as types` declared but unused). Once the first operation references `types`, lift this exclusion in the feature PRD.

### Endpoint policy (open question)

Three plausible candidates, decided in the first feature PRD that uses Apollo:

| Candidate | URL | Auth pattern |
|---|---|---|
| Hashnode | `https://gql.hashnode.com/` | None (fully public) |
| GitHub | `https://api.github.com/graphql` | Server-only PAT via `GRAPHQL_AUTH_TOKEN`; query via RSC only |
| Custom backend | TBD | Cookie session or server-only token |

Until the endpoint is decided, the scaffold ships inert — the runtime is wired, the agent + commands + tests are in place, but no queries fire.

---

## Formatter & Linting Config

ESLint uses **flat config** at the project root (`eslint.config.js`). Prettier config lives in `.formatter/`:

```
eslint.config.js          # ESLint flat config (root) — generated, do not edit
.formatter/
├── .prettierrc.js        # Prettier config — used by all format scripts
└── sync.js               # Template source for eslint.config.js, .prettierrc.js, .vscode/settings.json, etc. Run `pnpm run sync` after changes.
```

**Tailwind diagnostics in CI parity with the IDE.** `eslint-plugin-better-tailwindcss` is wired into the TS layer with four rules — `enforce-consistent-important-position` (1a), `no-deprecated-classes` (1b), `enforce-canonical-classes` (1c), `no-conflicting-classes` (cssConflict). The `callees: ['cn','cva','tv','clsx']` option mirrors VS Code's `tailwindCSS.classFunctions`, and `entryPoint: 'src/styles/global.scss'` mirrors `tailwindCSS.experimental.configFile`. `pnpm run lint:fix` (which `format:all` invokes) auto-applies every canonical-class rewrite the v4 generator knows about. See [.claude/skills/workflow/tailwind-diagnostics.md](../.claude/skills/workflow/tailwind-diagnostics.md).

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

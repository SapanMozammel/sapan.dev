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

### Testing
```bash
pnpm run test            # Run all tests once (Vitest)
pnpm run test:watch      # Watch mode
pnpm run test:coverage   # With V8 coverage report
open coverage/index.html # Open HTML coverage report
```

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

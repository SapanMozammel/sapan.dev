# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-04-16

### Added

- **Full i18n across 16 locales** — wire `next-intl` through the entire user-facing surface (header, hero, 7 home sections, CTA, footer, project/blog cards, timeline, articles pages, error/404/loading pages, contact modal) with 15 new locale bundles alongside English (`en`, `fr`, `de`, `es`, `ar`, `zh-CN`, `pt-BR`, `ja`, `nl`, `it`, `ru`, `hi`, `no`, `tr`, `ko`, `bn`).
- **`HtmlLocaleSync`** — client component that syncs `<html>` `dir`/`lang`/font on locale change so Arabic RTL and language switches apply without a reload.
- **`/audit-i18n` command + workflow skill** — detects hardcoded strings, over-translation, and orphan keys, producing three PRDs for review.
- **Typography utility classes** — `text-heading-*` and `text-paragraph-*` `@utility` presets in `utilities.scss` bundling font family, size, weight, and line-height. `cn()` is extended via `tailwind-merge` to classify them as `font-size`.
- **Glow-blob utilities** — `glow-blob-primary`, `glow-blob-danger`, `glow-blob-primary-sm`.
- **UI primitives** — `Badge`, `CTALink`, `FormField`, `MetaLabel`, `StatusDot`, `StatusMessage`, `BulletList`, `Marquee`, `StackingCardWrapper` — replace repeated inline patterns across blog cards, contact form, timeline, and project cards.
- **Blog library expansion** — 17 new frontend-engineering posts across React / CSS / TypeScript / Performance / Tooling (23 posts total, 4–5 per category).
- **Header `GitHubLink`** — dedicated client component.

### Changed

- **GSAP → Framer Motion migration (complete)** — stacking cards (declarative `useScroll`/`useTransform` replacing `ScrollTrigger` pin + ticker), testimonial marquee (`MotionValue` + `useAnimationFrame` replacing timeline + modifiers), testimonial background (per-line `MotionValue` lerp replacing `gsap.quickTo` on ~400 SVG paths). **`gsap` dropped from dependencies** — client chunks shrink by ~100 KB uncompressed (~60 KB gzipped).
- **Stacking cards wrapper** — split into `LastCard` / `DefaultCard` / `StaticCard` variants so each subscribes only to MotionValues it reads. MotionValue graph drops from 27 nodes to 9, halves DOM writes per scroll frame, and respects `useReducedMotion`.
- **Admin-dashboard mock data** moved to `src/data/content/admin-dashboard.tsx`.
- **Landing page** — below-fold client components lazy-loaded with `next/dynamic`.
- **Status pages (error/loading/not-found)** — adopt design system utilities, replace inline styles with `glow-blob-*` and `text-heading-*`/`text-paragraph-*`.
- **Typography** — enforce explicit `font-cg`/`font-hg`/`font-dm` classes across components ("never inherit silently"); remove Hanken Grotesk weight 600 (`font-semibold` unused throughout); Hero `font-extrabold` → `font-bold` (`font-hg` only loads 500/600/700); `SectionTitle` watermark `font-bold` → `font-medium` (Cormorant Garamond has no weight 700).
- **Providers restructure** — `NextThemesProvider` no longer re-runs its FOUC-prevention script on locale change.
- **`TestimonialCard`** extracted to its own file.
- **`TestimonialBackground`** — throttle `mousemove` with RAF + `gsap.quickTo` for smoother animation (prior to full migration).
- **Docs synced** — `CLAUDE.md`, `CLAUDE_SETUP.md`, `DEVELOPMENT_GUIDE.md`, README, and skill files updated for Next.js 16 layouts, current utils paths, data dirs, styles list, typography rules, and ESLint flat config.

### Fixed

- **Next.js 16 compliance** — moved `<html>` and `<body>` to root layout (`app/layout.tsx`) with dynamic `lang`/`dir` via `getLocale()`.
- **React 19 compatibility** — upgraded `next-themes` to `1.0.0-beta.0` to fix script tag rendering error in client components.
- **Header hydration mismatch** — extracted Tooltip+GitHub link into a dedicated client component to prevent Radix Slot from picking up the wrong element across the RSC boundary.
- **`tailwind-merge` regex** — add `paragraph` prefix so `text-paragraph-*` utilities are no longer stripped by `cn()`.
- **Image qualities** — add missing 85 / 90 to `next.config.ts`.
- **`TextUnderline` SVG** — fix width.
- **Diamond-grid `Image`** — add `sizes='(max-width: 768px) 25vw, 20vw'` so Next.js picks a smaller srcset entry.

### Performance

- **Cursor tooltip** — drive position with `useSpring` MotionValues via `style` instead of `useState`; removes ~60–120 React re-renders per second during hover.
- **Workflow autoplay** — wrap `handleStepClick` in `useCallback` so `WorkflowProgress` memoization is no longer defeated by a fresh function reference each tick.
- **Particles** — replace `isRevealing` `useState` with `useRef` to avoid unnecessary re-renders.

### Removed

- **`gsap`** from dependencies.
- **Deprecated utils** — `date.ts`, `file.ts`, `string.ts` (`lib/utils`), `routes.ts` (`data/config`), `components.scss` (`styles`), `LoadingSpinner.tsx`, `Hero/admin/data.tsx`.
- **Orphan translation keys** — 14 unreferenced keys across locale bundles.

## [0.1.0] - 2026-04-09

Initial launch of sapan.dev — full portfolio site v1.

### Added

- **Next.js 16 App Router** with `[locale]` dynamic segment, React 19, TypeScript 6, Tailwind CSS v4 (CSS `@theme` config), SCSS, Redux Toolkit, next-intl, next-themes, Framer Motion, GSAP, Three.js / R3F, shadcn/ui (new-york, Tabler icons).
- **Landing sections** — Hero (with admin dashboard mock UI), Technologies, Portfolio, Experience (particle background), Testimonials, Workflow (stacking cards), Blog, FAQ (accordion), CTA, Header, Footer.
- **Articles** — listing (`/articles`) with category filter and pagination, detail page (`/articles/[slug]`) with "More in category" section.
- **Contact modal** — form with validation, loading/success/error states, Redux-backed open/close via `uiSlice`.
- **Cursor tooltip** — hover-driven cursor affordance using Framer Motion.
- **Design system** — primary/success/info/danger tokens with dark-mode swap (`text-primary dark:text-success`), Hanken Grotesk / Cormorant Garamond / DM Sans / Bungee / Noto Sans Arabic fonts.
- **RTL support** — Arabic locale with `dir="rtl"` and `rtl:` Tailwind variants.
- **Theme switcher** — light / dark / system via `next-themes` with keyboard shortcut (⌘⌥T / Ctrl+Alt+T).
- **Language switcher** — scaffolding for 16 locales (actual translations landed in 0.2.0).
- **Redux store** — `localeSlice` (persists to localStorage), `uiSlice` (contact modal state).
- **Particle background** (Experience section) using R3F.
- **GSAP-driven stacking cards, testimonial marquee, and testimonial background** (migrated to Framer Motion in 0.2.0).
- **Status pages** — error, not-found, loading.
- **Metadata / SEO** — page title/description/keywords, OG + Twitter card, OG image, favicon set, web app manifest.
- **Testing infra** — Vitest + Testing Library, component tests for Header, MobileNav, NavMenu.
- **Docs** — `README.md`, `CLAUDE.md`, `docs/CLAUDE_SETUP.md`, `docs/DEVELOPMENT_GUIDE.md`.
- **Claude Code configuration** — skill files (colors, typography, spacing, component-patterns, routing, data, state, testing, feature-planning) and commands (`/audit`, `/plan`, `/implement`, `/commit`, `/commit-staged`, `/pr`).
- **Tooling** — ESLint flat config, Prettier with import organizer, `format:all` script, `tsc --noEmit` type-check.
- **Next-intl `proxy.ts`** (renamed from `middleware.ts`) for locale detection and routing.

### Notable refactors and fixes during 0.1.0 development

- Replace Sora / EB Garamond with Hanken Grotesk / Cormorant Garamond; replace Tektur with Bungee.
- Migrate all className concatenation to `cn()` utility.
- Replace hardcoded hex colors with CSS custom properties and design tokens across components.
- Replace `next/navigation` with `@/i18n/navigation` for locale-aware routing.
- Move tests from `src/__tests__` to top-level `tests/`.
- Use local portfolio images and technology SVGs (drop unused remote image domains).
- Add `memo()` wrappers to `ThemeSwitcher` and `LanguageSwitcher`.
- Consolidate section spacing and complete design-system skill files.

[0.2.0]: https://github.com/sapan-dev/sapan.dev/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/sapan-dev/sapan.dev/releases/tag/v0.1.0

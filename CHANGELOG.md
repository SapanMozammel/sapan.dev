# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-04-24

### Added

- **Hero AboutScreen** — interactive tabbed About panel (About / Experience / Education / Skills) replacing the decorative admin-dashboard mock. Surfaces bio, availability pill, industries chip row, strengths chip row, social links (Email / LinkedIn / GitHub / Portfolio), quick facts (years of experience, 9+ products shipped, 6M+ users · 180+ countries), work history with auto-computed role tenure + achievement highlight + top technology chips, education + certifications, skill groups, featured projects with external links, and spoken languages. Decorated with `PhotoCard`, `ExperienceCircle` (years + rotating "EXPERIENCE · YEARS ·" textPath), and `StatsHalfCircle` ("6M+ Users Reached").
- **`AboutTabs` ARIA tablist** — arrow/Home/End keyboard navigation, `role="tab"` / `role="tabpanel"` wiring, `focus-visible` outlines, `aria-label="(opens in new tab)"` on external links, `aria-hidden` on decorative icons, `sr-only` "Current role." for the pulse dot, `motion-safe:animate-pulse` so reduced-motion users opt out.
- **`getRoleDuration()` util** — formats a start/end month pair into `Xy Ym` / `Ym` / `Xy` for the experience tenure pill. 8 unit tests covering whole-year, sub-year, open-ended, and malformed-input paths.
- **`getYearsOfExperience()` unit tests** — 3 cases covering anniversary-month rollover and pre-start `now` values.
- **`CERTIFICATIONS_DATA`** (`src/data/content/education.ts`) — 4 certifications (AI & ML, Interactivity with JavaScript, Mobile Game Development, Mobile Game Graphics).
- **Types** — `Certification`, `SocialLink`; extended `AboutData` with `strengths`, `socials`, `industries`; optional `tags` on `ExperienceItem`.
- **Resume build system** (`resume/`) — `content.py` (editable text) + `resume.html` (pure template) + `build.sh` render a one-page Prime-style PDF via Chrome headless. Output PDFs archived under `public/resume/` for direct recruiter sharing; intermediate HTML gitignored.
- **Hero `Download Resume` CTA** — replaces the "Let's Connect" CTA, points at `resume-3` via a native anchor with `download` attribute. `Button` gains a `download` prop that bypasses locale-prefixed routing so the static PDF path stays intact. Translated across 16 locales.
- **Contact form — real email delivery** — replace the `setTimeout` stub with a Resend-backed route, gated by honeypot + Upstash rate limit (3 req / 10 min per IP) + Cloudflare Turnstile.
- **CTA card — themed animated ASCII sphere** — theme-aware sphere on the dark hero card as an ambient right-side feature.

### Changed

- **Hero admin-dashboard mock → AboutScreen** — `AdminScreen`, `AdminSidebar`, `AdminEmailList`, `AdminEmailPreview`, `AdminTravelCard`, `AdminDecorations`, `AdminPerformanceCircle`, `AdminHalfWaveCircle`, and `admin-dashboard.tsx` removed. `AdminScreen.test.tsx` replaced by a smoke test for `AboutScreen` inside `Hero.test.tsx`.
- **About section copy is hardcoded English** — tab labels, role titles/companies/tech names, certifications, industries, strengths, and social labels are not localised (recruiter-facing surface; locale of the UI shouldn't translate proper nouns, tech stacks, or role titles). All `hero.about.*` keys removed from the 16 locale bundles.
- **Design-system alignment (About screen)**:
  - `bg-success` → `bg-primary dark:bg-success` on availability pill and current-role pulse (were rendering the dark-mode teal in light mode).
  - `text-info` → `text-primary dark:text-success` on accent text (company, institution, certificate icon, highlight check icon).
  - `hover:text-info` / `hover:border-info/60` / `focus-visible:outline-info` → accent-token swap across social icons, project cards, and sidebar tabs.
  - `bg-white/40 dark:bg-black/40` → `bg-white/50 dark:bg-black/50` (availability pill, tech chips).
  - Explicit `font-dm` on every panel root; explicit `font-hg` on `StatsHalfCircle` and `ExperienceCircle` roots (the rule: "never inherit font silently").
  - `font-extrabold` / `font-semibold` under `font-hg` scope → `font-bold` (HG is loaded at 500/700 only).
- **Position title** — "Frontend Engineer" → "Frontend Developer" in `EXPERIENCE_DATA` and resume content.
- **Project cards** — per-breakpoint `min-h-*` and `shrink-0` on the content column plus `line-clamp-6` on description so cards have consistent heights across viewports.
- **Contact modal** — moved `mx-4` inset from `DialogContent` onto the border/content layers so the shell spans `w-screen` on small screens.
- **`colors.md`** — documented `bg-white/30 dark:bg-black/30` pair with context.

### Fixed

- **ParticleBackground on mobile GPUs** — simulation FBO switched from `FloatType` to `HalfFloatType` (RGBA32F requires `EXT_color_buffer_float`, which older iOS A-series and mid-tier Android GPUs don't expose even on WebGL 2, so the canvas was silently rendering blank). Added a capability probe + CSS `glow-blob-primary` fallback so devices without WebGL 2 get a graceful gradient instead of an empty rectangle. Probe runs in `useEffect` (not a `useState` initializer) so SSR and client first-render agree — avoids hydration mismatch. Particle grid halves on sub-`lg` viewports (512² → 256²) for mobile thermal/battery budgets. Gated on `useReducedMotion()` so motion-sensitive users also get the fallback.
- **Portfolio card exit reverse-scale** — point every card's `triggerRef` at the last card so the reverse-scale `useScroll` range (`stickyTop + indexOffset → stickyTop`) tracks the last card rather than each card's own trigger.
- **`next-themes` re-upgraded to `1.0.0-beta.0`** — resolves the "Encountered a script tag while rendering React component" warning that resurfaced after an earlier silent downgrade to `0.4.6`. The beta line is the only `next-themes` version compatible with React 19's stricter rules.

### Removed

- **Hero admin-dashboard mock** — `AdminScreen`, all `admin/*` components, `admin-dashboard.tsx`, `AdminScreen.test.tsx`, and the `hero.admin.*` locale keys.
- **`hero.about.*` locale keys** in all 16 bundles — About section is hardcoded English.
- **`LanguagesPanel`** — folded into `SkillsPanel` as a bottom section; the About sidebar stays at four tabs.

### Chore

- **Portfolio images normalized** — four non-PNG screenshots (`easyjobs.jpeg`, `templately.jpeg`, `xcloud.jpg`, `tubeonai.webp`) converted to PNG and run through `pngquant --quality 65-85 --strip`; TubeOnAI additionally downsized.

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

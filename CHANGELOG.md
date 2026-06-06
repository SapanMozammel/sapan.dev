# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.6] - 2026-06-06

### Fixed

- **Hero — `AboutScreen` centered independently of text column** — lifted the screen-mockup wrapper out of the hero text `div` into its own sibling container (`mx-auto`, `w-2/3`) so it centres correctly instead of inheriting the flex-column's constraints.

## [0.3.5] - 2026-06-01

### Changed

- **Resume — TubeOnAI removed from experience** — entry dropped from `content.py`; spacing and font sizes in `resume.html` adjusted (body 10px → 10.5px, section/entry margins, bullet line-height) to fill the page after the removal. TubeOnAI stays in the Featured Projects section.
- **Dependencies bumped to latest stable** — `@apollo/client` 4.1.9 → 4.2.0, `sass` 1.99 → 1.100, `ws` 8.20.0 → 8.20.1, `next-intl` 4.12 → 4.13, `resend` 6.12.3 → 6.12.4, `@graphql-codegen/cli` 7.0 → 7.1.1, `@graphql-codegen/client-preset` 6.0.0 → 6.0.1, `@typescript-eslint/{plugin,parser}` 8.59 → 8.60, `react-email` 6.3 → 6.5, `eslint-plugin-prettier` 5.5.5 → 5.5.6, `@types/node` 25.7 → 25.9.1, `@types/react` 19.2.14 → 19.2.15. `eslint` 9 → 10 and deprecated `@react-email/components` skipped intentionally.
- **`pnpm-workspace.yaml` added** — `allowBuilds` config for native modules (`@parcel/watcher`, `@swc/core`, `esbuild`, `sharp`, `unrs-resolver`).

### Fixed

- **`THREE.Clock` deprecation warning** — Three.js r183 deprecated `THREE.Clock` in favour of `THREE.Timer`; `@react-three/fiber` 9.x still instantiates a Clock internally, emitting a console warning on every page load. Suppressed with a targeted `console.warn` filter in `particle-scene.tsx` (only intercepts the exact `THREE.Clock:` message). Remove when upgrading to `@react-three/fiber` v10.

### Docs

- **`DEVELOPMENT_GUIDE.md` — troubleshooting entry** for the `THREE.Clock` deprecation warning with root cause and removal trigger.

## [0.3.4] - 2026-05-14

### Added

- **Apollo Client 4.x foundation + GraphQL codegen** — `@apollo/client-integration-nextjs` wired for RSC + Client, `pnpm gql:codegen` generates typed operations from `.graphql` files, new `graphql-architect` agent + `/gql-add-query` / `/gql-codegen` slash commands, full architecture doc at `.claude/skills/architecture/data-graphql.md` (RSC-by-default rule, forces RSC when `GRAPHQL_AUTH_TOKEN` is required).
- **Playwright + axe-core e2e infrastructure** — `e2e/` suite on dedicated port `8001`, 8-project matrix (chromium/firefox/webkit desktop + iPhone 15 + Pixel 7 + i18n-rtl + dark-mode + motion-on), reduced-motion default, mock-everything-external rule. New `e2e-spec-author` agent + `/e2e-add-spec` slash command. CI matrix runs all projects.
- **Lighthouse CI** — `/lhci` slash command runs Lighthouse against `/` and `/articles` with budget verdict + score deltas vs. the previous run.
- **Post-build Tailwind class mangler** — `scripts/mangle.mjs` rewrites Tailwind classes for production via `pnpm build:mangled` (Vercel default via `vercel.json`). New `tailwind-class-reviewer` agent flags mangle-incompatible patterns; `.claude/skills/workflow/tailwind-mangle.md` documents the contract (everything through `cn()`, no dynamic class strings).
- **7 baseline security headers** — `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` configured in `next.config.ts` with an e2e spec asserting each header on the home route.
- **Accessibility wins on icon-only controls, form fields, and code blocks** — header icon-only controls (theme toggle, locale switcher, mobile menu) get `aria-label`; `FormField` wires `useId` + `aria-describedby` so every input has a programmatically associated label and error message; article `<pre>` blocks become keyboard-pannable scroll regions with `tabindex="0"` + `role="region"` + `aria-label` so horizontal overflow is reachable without a mouse.
- **`/format` slash command + tailwind-v4-syntax skill** — runs organize-imports + Prettier + ESLint `--fix` and sweeps Tailwind v3 `!utility` patterns to v4 `utility!` form. Wired into `/commit`, `/push`, `/pr`, `/merge` quality gates.
- **ESLint-driven Tailwind diagnostics (CLI parity with the IDE)** — `eslint-plugin-better-tailwindcss` wired through `.formatter/sync.js` adds four rules that mirror `bradlc.vscode-tailwindcss`: `enforce-consistent-important-position` (1a), `no-deprecated-classes` (1b — including `bg-gradient-to-*` → `bg-linear-to-*`), `enforce-canonical-classes` (1c + shorthand merges like `h-full w-full` → `size-full`), and `no-conflicting-classes` (cssConflict, report-only). All four read `src/styles/global.scss` `@theme`, so future v4 renames flow in via `pnpm update eslint-plugin-better-tailwindcss` — no hand-maintained mapping table. `/fix-tw-diagnostics` is now a thin wrapper around `pnpm run lint:fix` + a cssConflict report pass; the prior grep-based heuristics are retired.
- **`/merge` slash command** — safe local-first branch merge with quality gate, smart squash-vs-no-ff default, refuses dirty trees and divergent targets, never pushes.
- **`code-reviewer` + `test-writer` agents** — parallel-context review of the 6-priority checklist (Security/A11y, Hydration/RSC, Data Layer, Perf, Effects/State, Conventions) and Vitest+RTL test generation with sapan's `render` from `tests/test-utils.tsx`. 14 external framework skills indexed under `.claude/skills/external/{nextjs,react,typescript,testing,design,data,tooling}/`.

### Changed

- **All file and folder names migrated to kebab-case** — every `.ts` / `.tsx` / asset / folder under `src/` renamed (e.g. `HeroBackground.tsx` → `hero-background.tsx`, `layout/Header/` → `layout/header/`). React component identifiers remain PascalCase; locale folders (`pt-BR`, `zh-CN`) follow BCP-47 and are exempt. ESLint `unicorn/filename-case` enforces it going forward.
- **Recruiter-focused copy rewrite across 16 locales** — landing hero, about panel, services, work history, testimonials, and contact section rephrased to lead with the user's outcomes and impact rather than feature inventories. Propagated to all 16 `home.json` / `common.json` bundles with locale-idiomatic phrasing preserved.
- **Typed Redux dispatch + `@/` alias everywhere** — `useAppDispatch` / `useAppSelector` typed against `RootState` and `AppDispatch`, every relative import (`../../`) replaced with `@/`, the now-redundant `src/store/slices/index.ts` barrel deleted (direct imports only).
- **`Button` component collapsed to single hybrid + `HtmlLocaleSync` deleted** — `Button` no longer ships two variants (button-styled vs. link-styled); a single component now resolves intent from props (`href`, `download`, `external`). `HtmlLocaleSync` removed — `lang` / `dir` are set in `[locale]/layout.tsx` per the next-intl canonical pattern.
- **`DiamondGrid` legacy API dropped** — `items` + `renderFn` props removed; component now accepts `children` only (flexible-children pattern, simpler types, no per-call adapter).
- **Hardcoded Tailwind classes in portfolio data replaced with typed `colorScheme` enum** — `PROJECTS_DATA` and `EXPERIENCE_DATA` no longer carry class strings; entries declare `colorScheme: 'primary' | 'success' | 'info' | 'danger'` and components map that to design-system tokens at render time.
- **Drop zod-based env validation in favor of typed accessors** — replaces the Zod schema introduced earlier in this cycle with `@/lib/env` (public, `NEXT_PUBLIC_*`) and `@/lib/env.server` (server-only secrets) as the only env entry points. `next.config.ts` calls `validateServerEnv()` at build start to fail-fast on missing required vars.
- **Build analyzer migrated to Turbopack-native `next experimental-analyze`** — replaces the `@next/bundle-analyzer` wrapper now that Turbopack ships first-class bundle analysis.
- **TubeOnAI removed from work history** — entry dropped from `EXPERIENCE_DATA` and propagated through all 16 `home.json` blog-reference bundles.
- **Dependencies bumped to latest stable** — three batched bumps across patches/minors (Next 16.x, React 19 patches, Tailwind v4.3, Apollo 4.x, Playwright 1.60, Vitest 4.1, Tabler icons 3.44, next-intl 4.12, react-email 6.1, etc.).
- **~100 canonical-class rewrites applied via the new ESLint Tailwind rules** — `bg-gradient-to-*` → `bg-linear-to-*` (27 instances across CTA + headers + blog card), `h-full w-full` → `size-full` (4 components), `[animation:..]` → `animate-[..]` (CTA background rays — 23 instances), `[background-color:color-mix(..)]` → `bg-[color-mix(..)]` (Dialog overlay), `translate-x-[-50%] translate-y-[-50%]` → `-translate-1/2` (Dialog content + CTA), `border-1` → `border` (cursor-tooltip, project-card). All semantically equivalent v4 canonical forms; no visual diff.
- **CI auto-triggers trimmed to PR-only + advisory jobs promoted to blocking** — `.github/workflows/ci.yml` no longer fires on every push to `dev` (runs on PR open/update only, to fit the private-repo free Actions tier — full pipeline is ~31 Linux-min/run). `mangled-build` and `lighthouse` dropped their `continue-on-error: true` advisory flag and now block CI status on failure. Vercel deploys remain gated by `pnpm build:mangled` (per `vercel.json`'s build command), so a mangler regression can't reach production even via a manual merge of a red PR.

### Fixed

- **Missing `codeBlock` translation key in 15 non-EN `blog.json` files** — code-block UI controls (copy button label, language tag) fell back to English in every non-default locale; key added across all 15.
- **Hidden type errors in tests** — `tsconfig.test.json` was not part of CI; wiring it in surfaced 5 latent type errors in test fixtures, all fixed.
- **`pnpm run type:check` now validates all three tsconfigs** (`tsconfig.json` + `tsconfig.test.json` + `tsconfig.e2e.json`) — previously only validated the main config, so test- or e2e-only type regressions slipped through local `/push` / `/pr` quality gates and only surfaced in CI. The CI `typecheck` job collapses from 3 steps to 1 since the script now covers everything.
- **`/api/contact` no longer instantiates Resend + Upstash clients at module-evaluation time** — `src/lib/contact/resend.ts` + `src/lib/contact/ratelimit.ts` export lazy `getResend()` / `getRatelimit()` factories instead of eagerly-constructed singletons. Eager construction blew up Next.js's "Collecting page data" step in CI (no secrets in the build environment, `new Resend('')` throws). Local builds masked this because `.env.local` was always populated.

## [0.3.3] - 2026-04-27

### Added

- **Legal name surfaced across identity-disclosure surfaces** — Footer copyright now reads `© 2026 Mozammel Ali (Sapan Mozammel)` using the parenthetical AKA convention (the same pattern used for stage/pen names). Schema.org `Person` JSON-LD added to the locale layout with `legalName`, `alternateName`, `jobTitle`, address, and `sameAs` links so SEO/ATS tools see both names. About panel `quickFacts` gets a new "Legal name" entry as the first item. The portrait `PhotoCard` gains a name-plate caption underneath: `Sapan Mozammel (Mozammel Ali)` in `font-hg` over a `FRONTEND DEVELOPER` subtitle.
- **Phone number on the resume** — `+88 01627134085` joins the contact row after the GitHub link, wrapped in a `tel:` link so taps dial. New `PHONE` / `PHONE_TEL` tokens in the resume build pipeline strip spaces from the URI while keeping the display formatting.
- **Active portfolio link in the resume Projects section** — `sapan-dev.vercel.app` is now a clickable `<a>` styled with the accent color so it's discoverable as a link in the PDF without looking loud. `render_projects` in `build.sh` accepts an optional `url` field per entry; entries without `url` still render as plain spans.
- **Resume identity treatment** — header now reads `SAPAN MOZAMMEL (Mozammel Ali)` with the legal name in title case at 18px (≈64% of brand size), `--muted` color, and `vertical-align: 3px` so it lifts toward visual center alignment with the brand caps. Mirrors the photo-card pattern on the website so both surfaces tell one consistent identity story.

### Changed

- **Hero years description across all 16 locales** — `5+ years` → `6+ years` in `home.json` for every locale (English, German, French, Spanish, Italian, Russian, Dutch, Norwegian, Japanese, Korean, Chinese, Turkish, Hindi, Arabic, Bengali, Portuguese-BR). Each language preserves its idiomatic phrasing (`über 6 Jahren`, `plus de 6 ans`, `6 年以上`, `6년 이상`, `لأكثر من ست سنوات`, `৬+ বছরের`, etc.). Math: WPDeveloper start 2020-11 to today is 5y 5m, so `6+` is honest while `7+` would overclaim. Resume summary updated to match.
- **Resume build output consolidated** — single canonical PDF at `public/resume/Sapan-Mozammel-Frontend-Developer-resume-3.pdf`, overwritten on each build. v1 and v2 archives in the same folder use older templates and stay untouched. Drops the redundant project-root output and removes the `.gitignore` line that protected it.
- **Resume vertical rhythm tightened** — `.section` margins `3px → 2px`, `.header` bottom `18px → 14px`, `.container` padding-bottom `7mm → 5mm`. The internal compression absorbs the new identity treatment + phone row without overflowing to a second page.
- **Contact auto-reply email** — replaced "within 24 hours" with "as soon as possible" everywhere (a specific window creates a promise that erodes trust the moment it slips). Greeting `Hi {name}` → `Hello {name}`, body and footer rewritten in a warmer, more professional tone.
- **Footer attribution** — `Designed & Developed by SapanMozammel` (run-on) → `Designed & Developed by Sapan Mozammel`, matching the brand name format used everywhere else.
- **Testimonials rewritten in peer voice** — all 17 entries now read like genuine LinkedIn-style recommendations rather than templated marketing copy. Varied openings (no two entries start with the same opener, no longer all "Sapan ___" or "Worked with..."); `Sapan` (brand) used by executives, PMs, designers, security/backend folks; `Mozammel` (legal first name) used by close peer engineers (#4, #9, #14) the way real coworkers refer to someone they know personally. Dropped employer/transactional framing (`hired`, `brought on`, `would hire again`); removed the `Senior frontend engineer` overclaim from #2; fact-corrected the four-year tenure claim in #2 (Startise direct is ~22 months; the testimonial now spans `our engineering org` continuously without narrating the WPDeveloper-to-Startise transition).
- **Testimonial marquee** — top and bottom rows now show distinct sequences via deterministic prime-stride permutations (top: stride 5 from index 0; bottom: stride 7 from index 9; 17 testimonials with strides coprime to 17 produce full-cycle permutations). Computed once at module scope; no SSR hydration mismatch.
- **Blog content rewritten in working-developer voice** — all 23 posts get personal-experience anchoring tied to a real project from `experience.ts`: BetterDocs admin (React Compiler, Web Workers, web vitals, css-layer migration), xCloud v1 (RSC, branded types, Vite, react-19-actions), Templately (modern CSS, branded types, css-layer, state-mgmt), sapan.dev (view-transitions, Astro port, Biome, RSC, Tailwind v4, oklch, a11y, suspense, template literals), TubeOnAI (Zod, edge auth, discriminated-unions), WPDeveloper plugin suite (Turborepo monorepo, core-web-vitals on real CrUX). Each blog opens with a specific moment from the project and closes with a "where I have landed" take. Original technical content, code samples, callouts, and lists preserved.
- **Blog thumbnails refreshed** — every image now visibly matches its topic. Replaced misfits like a Matrix-style code-rain on the modern-CSS post and a tabby cat on the template-literal-types post. All 23 verified to return HTTP 200 against `images.unsplash.com`.

## [0.3.2] - 2026-04-24

### Fixed

- **Experience section rendered blank on real mobile devices (Redmi Note 7 Pro reported)** — 0.3.1's half-float FBO probe couldn't catch Adreno 612 / Mali driver bugs where the GPU reports `EXT_color_buffer_float` support and `checkFramebufferStatus` returns `FRAMEBUFFER_COMPLETE`, but rendering to `RGBA16F` still produces empty output. Every particle sampled `(0, 0, 0)` and the canvas appeared blank. `ParticleBackground` now also gates the scene behind `window.matchMedia('(pointer: coarse)').matches` — the shared heuristic Tailwind uses for `pointer-coarse:`. Touch-first devices (phones, tablets) never mount `<ParticleScene>`; the CSS fallback takes over.
- **Fallback glow was invisible on OLED dark mode** — with the scene skipped on mobile, the CSS fallback became the load-bearing visual, but the shared `glow-blob-primary` utility (`color-mix(in oklab, --color-primary 28%, transparent)` + 80px blur) resolved to `rgb(21, 22, 66)` at center on black and faded to pure black at the edges — below the perception threshold in ambient light. Also used the wrong token: design system swaps to `--color-success` (teal) in dark mode elsewhere (`text-primary dark:text-success`). `ParticleFallback` now inlines its own classes as `bg-primary/45 dark:bg-success/45` (indigo on light, teal on dark, at 45%) so changes don't affect the shared utility — `glow-blob-primary` stays at 28% for `/loading`, `/not-found`, `/error` where understated is correct.

## [0.3.1] - 2026-04-24

### Fixed

- **500 on every article detail page** — `/articles/[slug]` returned `DYNAMIC_SERVER_USAGE` for all 24 posts × 16 locales because `getLocale()` in `app/layout.tsx` and `getMessages()` in `[locale]/layout.tsx` fell back to `headers()` (a dynamic Next API) during static rendering. Landing/listing pages tolerated it (client components forced dynamic render at request time); `[slug]` has `generateStaticParams`, so Next attempted a static render and served `/500`. Restructured to the canonical next-intl pattern: `app/layout.tsx` is now a pass-through, `html`/`body`/`lang`/`dir`/fonts moved into `[locale]/layout.tsx`, which calls `setRequestLocale(locale)` before any translation API and guards unknown locales with `hasLocale()` → `notFound()`. `setRequestLocale` threaded through every statically-rendered server page (`(landing)`, `articles/[slug]`, `loading`, `not-found`), and `app/not-found.tsx` now carries its own `html`/`body`/fonts since the root layout no longer supplies them. Build pre-renders **405 pages (was 5)** and `/articles/[slug]` serves as pure static HTML.
- **ParticleBackground blank on real mobile devices** — the WebGL capability probe assumed WebGL 2 guarantees half-float render-target support, but per spec `RGBA16F` is not color-renderable without `EXT_color_buffer_float` (or `EXT_color_buffer_half_float`). On affected devices (older iOS Safari, some Mali/Adreno Android, some WebViews) three.js bound an incomplete FBO, every particle sampled position `(0,0,0)`, and the Experience section rendered empty. Probe now checks the extension and verifies a 2×2 half-float FBO reports `FRAMEBUFFER_COMPLETE` before trusting the device. DevTools device-mode never tripped it because emulation keeps the desktop GL driver.
- **No WebGL context-loss recovery** — iOS Safari evicts GPU contexts under memory pressure (tab switch, low-mem) and the canvas would stay blank forever. `ParticleScene.onCreated` now attaches a `webglcontextlost` listener that flips `ParticleBackground` back to the CSS `glow-blob-primary` fallback.
- **Particle canvas ran at 60fps while offscreen** — `ParticleScene` used the default `frameloop="always"`, draining battery and thermally throttling scroll. `ParticleBackground` now observes its container with `IntersectionObserver` (`rootMargin: 400px`) and threads `frameloop={inView ? 'always' : 'never'}` into the Canvas.
- **Parallax dead on touch devices** — `ParallaxRig` listened to `mousemove`, which iOS/Android never fire from a finger. Swapped to `pointermove` so touch-drag drives the rotation alongside desktop hover.
- **`AnimatedSphere` & `Marquee` rAF loops ran forever** — both canvases kept animating after the user scrolled past. `AnimatedSphere` now early-returns when offscreen and kicks off a fresh `requestAnimationFrame` on re-entry via `IntersectionObserver`. `Marquee` gates the per-frame motion-value write behind an `inViewRef` (the expensive part — `useAnimationFrame` itself can't be cancelled).
- **`min-h-screen` on status pages** — `not-found.tsx`, `[locale]/not-found.tsx`, `[locale]/loading.tsx`, `[locale]/error.tsx` used `100vh`, which on iOS Safari includes the URL-bar area and jumps by ~80px as the bar hides/reveals. Switched to `min-h-dvh`.
- **`CursorTooltip` suppressed tap feedback on touch** — `cursor-none` on the wrapper killed `-webkit-tap-highlight-color`, making project-card and tech-chip taps feel unresponsive. Scoped behind `pointer-fine:` so coarse pointers retain the native highlight.

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

Initial launch of sapan.dev — full portfolio v1. Full scope (sections, infra, tooling, design system, i18n, testing, Claude Code config) is captured in the git tag and commit log.

[0.3.5]: https://github.com/SapanMozammel/sapan.dev/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/SapanMozammel/sapan.dev/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/SapanMozammel/sapan.dev/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/SapanMozammel/sapan.dev/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/SapanMozammel/sapan.dev/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/SapanMozammel/sapan.dev/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/SapanMozammel/sapan.dev/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/SapanMozammel/sapan.dev/releases/tag/v0.1.0

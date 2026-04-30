# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## Commands

```bash
# Run after every change
pnpm run type:check    # TypeScript (tsc --noEmit)
pnpm run lint:fix      # Auto-fix ESLint
pnpm run format:all    # Organize imports + Prettier + ESLint fix

# Test & build
pnpm run test          # Vitest (run once)
pnpm run build         # Production build
```

> Full script reference → `docs/DEVELOPMENT_GUIDE.md`

---

## Stack

Next.js 16 · React 19 · TypeScript 6 · Tailwind CSS v4 · SCSS · Redux Toolkit · next-intl · next-themes · Framer Motion · GSAP · Three.js / R3F · shadcn/ui (new-york, Tabler icons)

---

## Project Structure

```
src/
├── app/[locale]/           # App Router — all routes under locale segment
│   ├── (landing)/page.tsx  # Home (no URL segment)
│   ├── articles/           # Listing + [slug] detail
│   └── layout.tsx          # Locale layout: Providers, Header, Footer, metadata
├── app/layout.tsx          # Root layout: html/body, fonts, RTL dir via getLocale(), global.scss
├── proxy.ts                 # next-intl locale detection & routing
├── components/
│   ├── layout/             # Page sections (each: index.tsx + sub-files)
│   ├── layout/common/      # Shared: Button, SectionSeparator, SectionTitle, ConnectButton,
│   │                       # LanguageSwitcher, ThemeSwitcher, TextUnderline
│   ├── ui/                 # shadcn/ui base + custom: contact-modal, timeline, accordion,
│   │                       # blog-card, project-card, gsap-marquee, cursor-tooltip,
│   │                       # diamond-grid, technologies-display, dialog, popover,
│   │                       # sheet, tooltip
│   └── icons/              # SVG icons: Logo, Cloud, Pattern, WorldMap
├── data/
│   ├── content/            # admin-dashboard, experience, portfolio, testimonials, faq, blogs, workflow
│   └── config/             # languages, technologies
├── i18n/                   # next-intl: routing.ts, navigation.ts, request.ts, locales/
├── store/                  # Redux: localeSlice, uiSlice
├── hooks/                  # useContactForm, useStackingCards
├── lib/utils/              # cn() (index.ts), image utilities: getBlurDataURL(), getOptimizedImageProps(), TECH_LOGOS, etc. (image.ts)
├── styles/                 # global.scss, themes.scss, utilities.scss, animations.scss
└── types/                  # TypeScript types
tests/                      # Vitest suites (root-level, outside Next.js compilation)
```

---

## Server vs Client Components

| | Server (default) | Client |
|--|--|--|
| Directive | none | `'use client'` at top |
| Hooks / state | ✗ | ✓ |
| `memo()` | ✗ | ✓ + set `displayName` |
| When to use | Purely presentational | Needs interactivity, hooks, or events |

Server CAN import Client. Client CANNOT import Server.

---

## Styling

- Tailwind CSS v4 — no `tailwind.config.js`, config lives in CSS `@theme`
- SCSS in `src/styles/` for globals, CSS variables, keyframes
- **Never** build Tailwind class names dynamically via template literals — strings must be static
- Dark mode via `.dark` class strategy (`next-themes`)

### Design System Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | #4a4ded | Light-mode accent |
| `--color-success` | #43ead4 | Dark-mode accent (mirrors primary) |
| `--color-info` | #1f8fff | Hero glow, brand gradient |
| `--color-danger` | #f56565 | Errors, validation |

**Dark mode swap:** `text-primary dark:text-success` · `bg-primary/10 dark:bg-success/10`

### Fonts

| Class | Font | Use for |
|-------|------|---------|
| `font-dm` | DM Sans | Body copy, UI labels |
| `font-hg` | Hanken Grotesk | Nav, buttons, badges |
| `font-cg` | Cormorant Garamond | Headings, CTAs, display |
| `font-bungee` | Bungee | Logo + brand watermark only |
| `font-arabic` | Noto Sans Arabic | RTL (Arabic locale) |

### Animation Durations

| Interaction | Duration | Library |
|-------------|----------|---------|
| Hover | 150ms | CSS |
| Button | 200ms | Framer Motion |
| Card / panel | 300ms | Framer Motion |
| Section entrance | 500ms | Framer Motion |
| Page transition | 800ms | Framer Motion |
| Scroll sequences | variable | GSAP + ScrollTrigger |
| 3D | — | Three.js / R3F |

---

## State & i18n

**Redux** (`src/store/`): `localeSlice` (locale + RTL, persists to localStorage) · `uiSlice` (contact modal)
Always use `useAppDispatch()` / `useAppSelector()` — never raw Redux hooks.
**Theme**: `next-themes` — not Redux.

**i18n** (next-intl): 16 locales — `en` (default, no URL prefix), `fr`, `de`, `es`, `ar`, `zh-CN`, `pt-BR`, `ja`, `nl`, `it`, `ru`, `hi`, `no`, `tr`, `ko`, `bn`
Translation files: `src/i18n/locales/[locale]/[namespace].json` (4 namespaces: common, navigation, home, blog)
Internal routes: `import { Link } from '@/i18n/navigation'` — external links (`https://`, `mailto:`, `tel:`): `import NextLink from 'next/link'`
Arabic (`ar`): `dir="rtl"`, use `rtl:` Tailwind variant

---

## Image Handling

```ts
import { getBlurDataURL } from '@/lib/utils/image'
// <Image placeholder="blur" blurDataURL={getBlurDataURL()} />
```

Allowed remote domains: `images.unsplash.com`

---

## Code Conventions

- Arrow functions only — never `function Foo() {}`
- `type` only — never `interface` for props or any TypeScript definitions
- `cn()` from `@/lib/utils` for all className composition — never string-concatenate
- Design system tokens only — no hardcoded colors or hex values
- `@/` alias for all internal imports
- No `any` types — TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`, `exactOptionalPropertyTypes`)
- `export default ComponentName` at the bottom of every component file — never both `export const` and `export default` for the same component
- PRD history is sacred — never overwrite or remove completed (`[✅]`) steps when updating a plan; use `[⬜]` / `[🔄]` / `[✅]` markers, never `[x]`

---

## Slash Commands

Project-level commands live in `.claude/commands/`. Each is invoked as `/<name> [args]`.

| Command | Purpose |
|---|---|
| `/plan [feature]` | Explore code + load skills + write a PRD at `.claude/plans/[kebab-name]/prd.md`. No code written. |
| `/implement [plan-name]` | Read the PRD, execute step-by-step, run quality gates, mark progress. |
| `/review [scope?]` | 6-priority code review (Security/A11y, Hydration/RSC, Data Layer, Perf, Effects/State, Conventions). Auto-writes a follow-up PRD on Critical/Warning findings. **Replaces deprecated `/audit`**. |
| `/review-i18n` | Translation parity audit — produces three PRDs: `missing-translations-audit`, `over-translation-audit`, `orphan-translation-keys-audit`. **Renamed from `/audit-i18n`**. |
| `/fix-issue [num\|description]` | TDD-first bug fix flow — write failing test, fix smallest unit, re-run gate. Optional `gh issue view` integration. |
| `/test [unit\|e2e\|i18n\|<file>]` | Run a test suite OR generate Vitest+RTL / Playwright tests for a target. |
| `/commit [message?]` | Smart commit with secret-scan, type(scope) prefix, HEREDOC body, sapan co-author trailer. |
| `/commit-staged [message?]` | Commit only what's already staged (no auto-staging). |
| `/push [flags?]` | Safe push — quality gate, branch guard, refuses force-push to default branch. |
| `/pr [base?]` | Create a structured PR with quality gate, auto-detected change categories, suggested merge-commit message. |
| `/translate [locale?]` | i18n translation helper. |
| `/new-component [Name]` | Scaffold a new component per sapan conventions. |
| `/new-section [Name]` | Scaffold a new page section per sapan conventions. |
| `/generate-config [skill\|command\|all?]` | Config scaffolding helper. |
| `/update-setup [section?]` | Update `docs/CLAUDE_SETUP.md`. |

**Removed:** `/audit` (subsumed by `/review`). **Renamed:** `/audit-i18n` → `/review-i18n`. **Not adopted:** R&D's standalone `/feature` (merged into `/plan`).

## Agents

Custom agents live in `.claude/agents/`. Invoked via the Agent tool with the matching `subagent_type`.

| Agent | When to invoke |
|---|---|
| `code-reviewer` | Before commit / before PR — runs the same 6-priority checklist as `/review`, but in a parallel agent context. Auto-writes PRD on violations. |
| `test-writer` | When adding/changing components or fixing bugs TDD-style. Generates Vitest+RTL tests with sapan's `render` from `tests/test-utils.tsx`. Apollo `MockedProvider` patterns gated until `apollo-client-integration` ships; Playwright e2e gated until `test-infra-integration` ships. |

## External Skills Library

Framework-level reference skills live in `.claude/skills/external/{nextjs,react,typescript,testing,design,data,tooling}/`. Sapan rules in `.claude/skills/{architecture,design-system,workflow}/` are **authoritative** — when external guidance conflicts with sapan rules, sapan wins.

See [`.claude/skills/external/README.md`](.claude/skills/external/README.md) for the full index, source attribution, and per-category overlap notes.

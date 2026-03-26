# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm run dev          # Start dev server on port 8000 with Turbopack
pnpm run dev:webpack  # Fallback dev server using webpack

# Build & Production
pnpm run build
pnpm run start

# Type checking & linting
pnpm run type:check   # tsc --noEmit
pnpm run lint         # ESLint
pnpm run lint:fix     # Auto-fix ESLint issues
pnpm run check:all    # type:check + lint + format:check

# Formatting
pnpm run format       # Prettier
pnpm run format:all   # imports:organize → format → lint:fix

# Cache reset (if dev server misbehaves)
rm -rf .next && pnpm run dev
```

## Architecture

This is a **Next.js 15 portfolio/marketing website** using the App Router, TypeScript, Tailwind CSS v4, and SCSS.

### Routing

- `src/app/[locale]/(landing)/page.tsx` — Home page (route group with i18n, no URL segment)
- `src/app/[locale]/articles/[slug]/page.tsx` — Dynamic article routes
- `src/app/[locale]/articles/page.tsx` — Articles listing
- `src/app/[locale]/layout.tsx` — Locale layout (Providers, Header, Footer, NextIntlClientProvider)
- `src/app/layout.tsx` — Root layout (imports global SCSS)

### Component Organization

- `src/components/layout/` — Page sections. Each is a directory with `index.tsx`:
  - **Server Components** (no hooks, no 'use client'): Hero, Experience, Blog, Faq, Cta, Footer, Header
  - **Client Components** ('use client'): Technologies, Portfolio, Testimonials, Workflow
- `src/components/layout/common/` — Shared layout pieces: Button, ConnectButton, SectionSeparator, SectionTitle, TextUnderline, ThemeSwitcher, LanguageSwitcher
- `src/components/ui/` — shadcn/ui base components (new-york style, Tabler icons) + custom UI: contact-modal, timeline, accordion, blog-card, diamond-grid, gsap-marquee, cursor-tooltip, project-card, technologies-display
- `src/components/icons/` — Custom SVG icon components (Logo, Cloud, Pattern, WorldMap)

### Sub-component Structure

Large components are split into sub-components in their own files:
- `Hero/admin/` — AdminSidebar, AdminEmailList, AdminEmailPreview, AdminDecorations, data.tsx
- `Hero/` — AdminScreen, HeroBackground
- `Cta/` — CtaBackground
- `Workflow/` — WorkflowContent, WorkflowProgress
- `Testimonials/` — TestimonialBackground
- `Experience/particles/` — Particles, ParticleScene, shader files

### Data / Content

Static data is organized in `src/data/`:
- `src/data/content/` — Site content: experience, portfolio, testimonials, faq, blogs, workflow
- `src/data/config/` — App configuration: routes, languages, technologies

Types for data are in `src/types/` (e.g., `experience.ts`, `technology.ts`, `portfolio.ts`, `contact.ts`).

### Server vs Client Components

- **Server Components** render on the server with zero client JS. Use arrow functions, no `memo()`, no `'use client'`.
- **Client Components** must have `'use client'` at the top. Use `memo()` for memoization where needed.
- Server Components CAN import Client Components. The reverse is not true.
- Prefer Server Components for purely presentational sections. Only use `'use client'` when hooks, state, or event handlers are required.

### Styling

- **Tailwind CSS v4** is primary; configured via `@tailwindcss/postcss` (no `tailwind.config.js` — config is in CSS `@theme`)
- **SCSS files** in `src/styles/`: `global.scss` imports Tailwind + partials; `themes.scss` defines CSS variables for light/dark; `animations.scss` for CSS keyframes
- Use `cn()` from `src/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional classNames
- shadcn/ui components configured in `components.json` with path aliases
- Design system colors: `--color-primary` (blue/purple), `--color-success` (teal), `--color-info` (blue), `--color-danger` (red)

### Path Aliases

`@/*` maps to `src/*` — use this for all internal imports.

### State Management

Redux Toolkit store in `src/store/` with two slices:
- `localeSlice` — current locale, RTL detection, localStorage persistence
- `uiSlice` — contact modal open/close state

Most page content reads directly from `src/data/` constants, not Redux.

### TypeScript

Strict mode with `noUnusedLocals`, `noUnusedParameters`, and `exactOptionalPropertyTypes` enabled. All new code must satisfy these constraints.

### Code Conventions

- Use **arrow functions** for all components (`const Foo = () => { ... }`)
- Server Components: no `memo()`, no `'use client'`, export with `export default ComponentName`
- Client Components: `'use client'` directive, `memo()` where beneficial
- Use design system tokens (`--color-primary`, `--color-success`) over hardcoded colors
- Light/dark mode: use `dark:` variant with design system colors (e.g., `text-primary dark:text-success`)

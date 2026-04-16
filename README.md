# sapan.dev

Personal portfolio of **[Sapan Mozammel](https://sapan-dev.vercel.app)** — Frontend Developer based in Dhaka, Bangladesh.

Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and a focus on modern, performant, and visually engaging web experiences.

**Live → [sapan-dev.vercel.app](https://sapan-dev.vercel.app)**

---

## Features

- **Multi-section landing page** — Hero, Technologies, Portfolio, Experience, Testimonials, Workflow, Blog, FAQ, CTA
- **Blog** — Article listing and individual article pages
- **Contact modal** — Redux-managed form with validation
- **Internationalization** — 16 locales via next-intl, RTL support for Arabic
- **Dark mode** — System-aware, toggleable via next-themes
- **Animations** — GSAP ScrollTrigger, Framer Motion, Three.js / R3F particle system
- **Fully typed** — TypeScript strict mode, no `any`
- **Tested** — 26 Vitest test suites across components, store, and utilities
- **SEO** — Dynamic sitemap, robots.txt, Open Graph, Twitter card metadata

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 6 — strict mode |
| Styling | Tailwind CSS v4 + SCSS |
| Animation | Framer Motion · GSAP 3 · Three.js / React Three Fiber |
| State | Redux Toolkit |
| i18n | next-intl — 16 locales |
| Theme | next-themes (`.dark` class strategy) |
| UI | shadcn/ui (new-york) · Radix UI · Tabler Icons |
| Testing | Vitest · React Testing Library |
| Deployment | Vercel |

---

## Getting Started

**Requirements:** Node.js ≥ 20, pnpm

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start dev server (http://localhost:8000)
pnpm run dev
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site — used for sitemap, canonical URLs, and OG tags |
| `ANALYZE` | Set to `true` to enable bundle analysis during build |

---

## Scripts

| Command | Description |
|---|---|
| `pnpm run dev` | Dev server with Turbopack on port 8000 |
| `pnpm run dev:webpack` | Dev server with webpack (fallback) |
| `pnpm run build` | Production build |
| `pnpm run start` | Start production server |
| `pnpm run type:check` | TypeScript — `tsc --noEmit` |
| `pnpm run lint` | ESLint |
| `pnpm run lint:fix` | ESLint with auto-fix |
| `pnpm run format` | Prettier |
| `pnpm run format:all` | Organize imports + Prettier + ESLint fix |
| `pnpm run check:all` | Type check + lint + format check |
| `pnpm run test` | Vitest (run once) |
| `pnpm run test:watch` | Vitest in watch mode |
| `pnpm run test:coverage` | Vitest with V8 coverage report |
| `pnpm run analyze` | Full bundle analysis |

---

## Internationalization

16 locales supported via next-intl with `localePrefix: 'as-needed'` (English has no URL prefix).

| Locale | Language | Notes |
|---|---|---|
| `en` | English | Default |
| `fr` | Français | |
| `de` | Deutsch | |
| `es` | Español | |
| `ar` | العربية | RTL |
| `zh-CN` | 中文 (简体) | |
| `pt-BR` | Português (Brasil) | |
| `ja` | 日本語 | |
| `nl` | Nederlands | |
| `it` | Italiano | |
| `ru` | Русский | |
| `hi` | हिन्दी | |
| `no` | Norsk | |
| `tr` | Türkçe | |
| `ko` | 한국어 | |
| `bn` | বাংলা | |

Arabic triggers `dir="rtl"` on the `<html>` element and uses the `font-arabic` (Noto Sans Arabic) class.

Internal links use `import { Link } from '@/i18n/navigation'`. External links (`https://`, `mailto:`, `tel:`) use `import NextLink from 'next/link'`.

---

## Testing

```bash
pnpm run test              # Run all tests
pnpm run test:watch        # Watch mode
pnpm run test:coverage     # Coverage report → ./coverage
```

Tests live in `tests/` (outside Next.js compilation). 26 test files cover components, Redux store slices, data validation, and utility functions. A Redux-wrapped render helper is available at `tests/test-utils.tsx`.

---

## Documentation

| Document | Description |
|---|---|
| [Development Guide](docs/DEVELOPMENT_GUIDE.md) | Workflow, scripts, formatter setup, troubleshooting |
| [CLAUDE.md](CLAUDE.md) | Claude Code conventions for this repo |

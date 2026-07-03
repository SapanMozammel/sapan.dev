# sapan.dev

Personal portfolio of **[Sapan Mozammel](https://sapan-dev.vercel.app)** — Frontend Developer based in Dhaka, Bangladesh.

Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and a focus on modern, performant, and visually engaging web experiences.

**Live → [sapan-dev.vercel.app](https://sapan-dev.vercel.app)**

---

## Features

- **Multi-section landing page** — Hero (with interactive About panel), Technologies, Portfolio, Experience, Testimonials, Workflow, Blog, FAQ, CTA
- **Blog** — 23 articles with article listing and individual article pages
- **Contact form with real email delivery** — Resend-backed API route, gated by honeypot + Upstash rate limit (3 req/10 min per IP) + Cloudflare Turnstile, with auto-reply emails
- **Resume PDF** — One-click download from the Hero CTA; reproducible build pipeline at `.claude/resume/` (Python content + HTML template + Chrome headless print)
- **Internationalization** — 16 locales via next-intl, RTL support for Arabic
- **Dark mode** — System-aware, toggleable via next-themes
- **Animations** — GSAP ScrollTrigger, Framer Motion, Three.js / R3F particle system
- **Fully typed** — TypeScript strict mode, no `any`
- **Tested** — comprehensive Vitest suite + Playwright e2e on 8-project matrix (chromium/firefox/webkit desktop + iPhone 15 + Pixel 7 + i18n-rtl + dark-mode + motion-on); axe-core a11y + Lighthouse CI perf budgets
- **SEO** — Dynamic sitemap, robots.txt, Open Graph, Twitter card metadata, Schema.org `Person` JSON-LD

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 6 — strict mode |
| Styling | Tailwind CSS v4 + SCSS |
| Animation | Framer Motion · GSAP 3 · Three.js / React Three Fiber |
| State | Redux Toolkit |
| Data fetching | Apollo Client 4.x (foundation only — no live queries until first feature) |
| i18n | next-intl — 16 locales |
| Theme | next-themes (`.dark` class strategy) |
| UI | shadcn/ui (new-york) · Radix UI · Tabler Icons |
| Validation | Zod (env modules + form schemas) |
| Email | Resend (transactional + auto-reply) |
| Anti-spam | Cloudflare Turnstile + Upstash Redis rate limit |
| Testing | Vitest · React Testing Library · Playwright + axe-core |
| Performance | Lighthouse CI (perf / a11y / best-practices / SEO budgets) |
| Linting | ESLint 9 (flat config) + `eslint-plugin-unicorn` filename-case |
| Production | Post-build Tailwind class mangling (`scripts/mangle.mjs`) |
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

See [.env.example](.env.example) for the full template.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site — used for sitemap, canonical URLs, and OG tags |
| `ANALYZE` | Set to `true` to enable bundle analysis during build |
| `RESEND_API_KEY` | Resend API key for contact-form email delivery |
| `CONTACT_TO_EMAIL` | Inbox where contact submissions are sent |
| `CONTACT_FROM_EMAIL` | Sender address used by Resend (must be a verified domain) |
| `CONTACT_REPLY_TO` | Reply-to header on outbound auto-reply emails |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL for contact-form rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token (server-only) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (server-only) |
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT` | Apollo Client endpoint (browser-visible URL only); blank by default until first GraphQL feature lands |
| `GRAPHQL_AUTH_TOKEN` | Server-only token for authenticated GraphQL — never prefix with `NEXT_PUBLIC_`; only `createServerLinks()` reads it |

---

## Scripts

**Dev**
| Command | Description |
|---|---|
| `pnpm run dev` | Dev server with Turbopack on port 8000 |
| `pnpm run dev:webpack` | Dev server with webpack (fallback) |

**Build**
| Command | Description |
|---|---|
| `pnpm run build` | Production build (Turbopack, no class mangling — fast staging) |
| `pnpm run build:mangled` | Production build + post-build Tailwind class mangler (Vercel deploy path) |
| `pnpm run mangle` | Re-run mangler against an existing `.next/` (skip rebuild) |
| `pnpm run start` | Start production server |

**Test (Vitest unit + component, port-free)**
| Command | Description |
|---|---|
| `pnpm run test` | Vitest run-once |
| `pnpm run test:watch` | Vitest watch mode |
| `pnpm run test:coverage` | Vitest with V8 coverage → `./coverage/index.html` |

**Test (Playwright e2e + axe-core a11y, port 8001)**
| Command | Description |
|---|---|
| `pnpm run test:e2e` | All projects (8-project matrix) |
| `pnpm run test:e2e:ui` | Interactive UI mode |
| `pnpm run test:e2e:headed` | Headed browser (visual debugging) |
| `pnpm run test:e2e:debug` | Step-through debugger (`PWDEBUG=1`) |
| `pnpm run test:e2e:report` | Open the last HTML report |
| `pnpm run test:e2e:codegen` | Codegen against `http://localhost:8001` |
| `pnpm run test:e2e:install` | Re-install Playwright browsers |

**Quality**
| Command | Description |
|---|---|
| `pnpm run type:check` | TypeScript — `tsc --noEmit` |
| `pnpm run type:check:tests` | TypeScript on `tests/` via `tsconfig.test.json` |
| `pnpm run lint` | ESLint (incl. `unicorn/filename-case` kebab-case enforcement) |
| `pnpm run lint:fix` | ESLint with auto-fix |
| `pnpm run format` | Prettier |
| `pnpm run format:all` | Organize imports + Prettier + ESLint fix |
| `pnpm run check:all` | Type check + lint + format check |
| `pnpm run sync` | Regenerate ESLint / Prettier / EditorConfig from `.formatter/` template |

**Analysis & Performance**
| Command | Description |
|---|---|
| `pnpm run analyze` | Turbopack-native interactive analyzer at `http://localhost:4000` |
| `pnpm run analyze:report` | Static analysis output to `.next/diagnostics/analyze/` |
| `pnpm run lhci` | Lighthouse CI autorun (port 8002) — collect → assert → upload |
| `pnpm run lhci:collect` | LHCI collect only |
| `pnpm run lhci:assert` | LHCI assertions against existing collection |

**GraphQL**
| Command | Description |
|---|---|
| `pnpm gql:codegen` | Regenerate `src/types/graphql/` from `.graphql` operations + schema |

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

Tests live in `tests/` (outside Next.js compilation), covering components, Redux store slices, data validation, utilities, and the Apollo client. A Redux-wrapped render helper is available at `tests/test-utils.tsx`. Playwright e2e specs live in `e2e/` and run on a dedicated dev server (port 8001) across an 8-project matrix; see [docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) and [.claude/skills/workflow/e2e.md](.claude/skills/workflow/e2e.md) for the canonical e2e conventions.

---

## Resume Build

The downloadable resume PDF is generated from a content/template split at [.claude/resume/](.claude/resume/) — `content.py` holds all the text, `resume.html` is the template, and `build.sh` renders to a one-page A4 PDF via Chrome headless. After editing content, run from the project root:

```bash
bash .claude/resume/build.sh
```

Output overwrites `public/resume/Sapan-Mozammel-Frontend-Developer.pdf` in place. Full pipeline notes in [.claude/resume/README.md](.claude/resume/README.md).

---

## Documentation

| Document | Description |
|---|---|
| [Development Guide](docs/DEVELOPMENT_GUIDE.md) | Comprehensive project tree, scripts, formatter, port registry, Lighthouse CI thresholds, Apollo provider chain, troubleshooting |
| [Claude Code Setup](.claude/README.md) | AI tooling — skills, slash commands, sub-agents, PRD plans |
| [Resume Build System](.claude/resume/README.md) | How the downloadable resume PDF is rendered |
| [CHANGELOG](CHANGELOG.md) | Release history (Keep a Changelog format) |
| [CLAUDE.md](CLAUDE.md) | Claude Code conventions for this repo |

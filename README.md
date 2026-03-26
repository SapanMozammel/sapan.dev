# sapan.dev

A modern portfolio and marketing website built with Next.js 15, TypeScript, Tailwind CSS v4, and SCSS.

## Quick Start

```bash
pnpm install
pnpm run dev        # http://localhost:8000
```

## Scripts

| Command | Description |
|---|---|
| `pnpm run dev` | Start dev server (Turbopack, port 8000) |
| `pnpm run build` | Production build |
| `pnpm run start` | Start production server |
| `pnpm run type:check` | TypeScript type checking |
| `pnpm run lint` | ESLint |
| `pnpm run format` | Prettier |
| `pnpm run check:all` | Type check + lint + format check |
| `pnpm run test` | Run unit tests |
| `pnpm run test:watch` | Tests in watch mode |
| `pnpm run test:coverage` | Tests with coverage report |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.8 (strict mode)
- **Styling**: Tailwind CSS v4 + SCSS
- **State**: Redux Toolkit
- **Animation**: Framer Motion, GSAP, Three.js
- **i18n**: next-intl (16 languages)
- **Testing**: Vitest + React Testing Library
- **UI**: shadcn/ui (new-york style, Tabler icons)

## Documentation

| Document | Description |
|---|---|
| [Architecture](docs/ARCHITECTURE.md) | Project structure, component organization, conventions |
| [Development](docs/DEVELOPMENT.md) | Development workflow, troubleshooting, best practices |
| [Testing](docs/TESTING.md) | Test setup, writing tests, coverage reports |
| [i18n PRD](docs/PRD.md) | Internationalization requirements and implementation status |
| [CLAUDE.md](CLAUDE.md) | AI assistant instructions (Claude Code) |

# Development Guide

## Getting Started

```bash
pnpm install
pnpm run dev          # http://localhost:8000 (Turbopack)
```

## Available Scripts

### Development
```bash
pnpm run dev          # Dev server with Turbopack (port 8000)
pnpm run dev:webpack  # Fallback dev server using webpack
```

### Build and Production
```bash
pnpm run build        # Production build
pnpm run start        # Start production server
```

### Code Quality
```bash
pnpm run type:check   # TypeScript (tsc --noEmit)
pnpm run lint         # ESLint
pnpm run lint:fix     # Auto-fix ESLint issues
pnpm run format       # Prettier
pnpm run format:all   # Organize imports + format + lint fix
pnpm run check:all    # type:check + lint + format:check
```

### Testing
```bash
pnpm run test            # Run all tests once
pnpm run test:watch      # Watch mode
pnpm run test:coverage   # With coverage report
```

### Analysis
```bash
pnpm run analyze         # Bundle analysis
```

## Code Conventions

### Components
- **Arrow functions** for all components
- **Server Components**: No `'use client'`, no `memo()`, no hooks
- **Client Components**: `'use client'` directive, `memo()` where beneficial
- Use `cn()` from `@/lib/utils` for conditional class names

### Styling
- Tailwind CSS v4 as primary styling approach
- Design system tokens over hardcoded colors (`--color-primary`, `--color-success`)
- Light/dark mode via `dark:` variant

### TypeScript
- Strict mode with `noUnusedLocals`, `noUnusedParameters`, `exactOptionalPropertyTypes`
- Types in `src/types/` directory
- Path alias `@/*` for `src/*`

### Data Organization
- Static content in `src/data/content/` (experience, portfolio, testimonials, etc.)
- App config in `src/data/config/` (languages, routes, technologies)

## Troubleshooting

### Dev server issues
```bash
rm -rf .next && pnpm run dev    # Clear cache and restart
```

### Type errors
```bash
pnpm run type:check             # Check for TypeScript errors
```

### Formatting issues
```bash
pnpm run format:all             # Fix all formatting in one go
```

## Tailwind CSS v4 Notes

- No `tailwind.config.js` -- configuration lives in CSS via `@theme`
- Class detection is automatic via source file scanning
- Never construct Tailwind class names dynamically via template literal concatenation (e.g., `` `${prefix}fill-secondary` ``). Complete class strings must appear as static string literals so Tailwind can detect them at build time.
- Ternary operators with complete static strings are fine: `condition ? 'bg-primary' : 'bg-secondary'`

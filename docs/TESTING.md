# Testing Guide

This document covers the testing setup, conventions, and workflow for the sapan.dev project.

## Stack

| Tool | Purpose |
|---|---|
| [Vitest](https://vitest.dev) | Test runner and assertion library |
| [React Testing Library](https://testing-library.com/react) | Component rendering and DOM queries |
| [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) | Simulating user interactions |
| [jsdom](https://github.com/jsdom/jsdom) | Browser environment for Node.js |
| [@vitest/coverage-v8](https://vitest.dev/guide/coverage) | Code coverage reporting |

## Commands

```bash
# Run all tests once
pnpm run test

# Watch mode — re-runs tests on file changes
pnpm run test:watch

# Run with coverage report
pnpm run test:coverage

# Open HTML coverage report after running coverage
open coverage/index.html
```

## Project Structure

```
src/
├── __tests__/
│   ├── setup.tsx              # Global mocks and test environment setup
│   ├── test-utils.tsx         # Custom render with Redux Provider
│   ├── components/            # Component tests
│   │   ├── Accordion.test.tsx
│   │   ├── AdminScreen.test.tsx
│   │   ├── Button.test.tsx
│   │   ├── ConnectButton.test.tsx
│   │   ├── Cta.test.tsx
│   │   ├── CtaBackground.test.tsx
│   │   ├── Experience.test.tsx
│   │   ├── Faq.test.tsx
│   │   ├── Footer.test.tsx
│   │   ├── Hero.test.tsx
│   │   ├── HeroBackground.test.tsx
│   │   ├── SectionSeparator.test.tsx
│   │   ├── SectionTitle.test.tsx
│   │   └── TextUnderline.test.tsx
│   ├── data/                  # Data integrity tests
│   │   ├── config.test.ts
│   │   └── content.test.ts
│   ├── lib/                   # Utility function tests
│   │   ├── image.test.ts
│   │   └── utils.test.ts
│   ├── store/                 # Redux slice tests
│   │   ├── localeSlice.test.ts
│   │   └── uiSlice.test.ts
│   └── ui/                    # UI utility tests
│       ├── button-variants.test.ts
│       └── timeline-utils.test.ts
```

## Configuration

### `vitest.config.ts`

- **Environment**: `jsdom` for browser API simulation
- **Globals**: `true` — `describe`, `it`, `expect`, `vi` available without imports
- **Path aliases**: `@/*` maps to `src/*`, matching `tsconfig.json`
- **CSS**: Disabled in tests (not needed for unit tests)
- **Coverage**: V8 provider with text, HTML, and LCOV reporters

### `setup.tsx`

The setup file runs before every test suite. It provides global mocks for:

| Mock | Why |
|---|---|
| `next/link` | Renders as plain `<a>` tag |
| `next/image` | Renders as plain `<img>` tag |
| `next-themes` | Returns `dark` theme by default |
| `next-intl` | Returns translation keys as-is |
| `framer-motion` | Renders motion elements as plain HTML, strips animation props |
| `gsap` / `ScrollTrigger` | No-op functions to prevent DOM measurement errors |
| `@react-three/fiber` | Renders Canvas as a `<div>` |
| `@react-three/drei` | No-op hooks |
| `matchMedia` | Standard mock for responsive queries |
| `IntersectionObserver` | No-op observer |
| `ResizeObserver` | No-op observer |

### `test-utils.tsx`

Custom `render` function that wraps components with the Redux `Provider`. Use this instead of the default `render` when testing components that use Redux (e.g., `ConnectButton`, `Hero`, `Cta`).

```tsx
// Components that use Redux store
import { render, screen } from '../test-utils';

// Components that don't use Redux
import { render, screen } from '@testing-library/react';
```

## Writing Tests

### File Naming

Test files are placed in `src/__tests__/` and follow the pattern `ComponentName.test.tsx` or `utilName.test.ts`.

### Basic Component Test

```tsx
import MyComponent from '@/components/layout/MyComponent';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('MyComponent', () => {
  it('renders heading text', () => {
    render(<MyComponent />);
    expect(screen.getByRole('heading')).toHaveTextContent('Expected Text');
  });
});
```

### Testing User Interactions

```tsx
import userEvent from '@testing-library/user-event';

it('handles click', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Click</Button>);
  await user.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledOnce();
});
```

### Testing Components with Redux

```tsx
import { render, screen } from '../test-utils'; // <-- custom render

it('dispatches action on click', async () => {
  const user = userEvent.setup();
  render(<ConnectButton />);
  await user.click(screen.getByRole('button'));
  // Verify the component renders without errors after dispatch
});
```

### Testing Redux Slices

```ts
import reducer, { someAction } from '@/store/slices/mySlice';

it('handles action', () => {
  const state = reducer(initialState, someAction(payload));
  expect(state.field).toBe(expectedValue);
});
```

### Testing Utility Functions

```ts
import { myUtil } from '@/lib/utils/myUtil';

it('returns expected result', () => {
  expect(myUtil('input')).toBe('output');
});
```

## Test Categories

### 1. Component Tests (`__tests__/components/`)

Verify that components:
- Render correct text, headings, and elements
- Apply conditional classes and props
- Handle user interactions (click, toggle)
- Render children and pass-through props
- Show correct state (loading, disabled, open/closed)

### 2. Utility Tests (`__tests__/lib/`)

Verify that pure functions:
- Return correct output for given inputs
- Handle edge cases (empty input, undefined)
- Produce valid formats (base64, data URIs, SVG)

### 3. Store Tests (`__tests__/store/`)

Verify that Redux slices:
- Have correct initial state
- Handle actions and produce correct state transitions
- Support round-trip operations (open → close)

### 4. Data Tests (`__tests__/data/`)

Verify that static data:
- Has expected number of items
- Contains required fields (no missing data)
- Has unique identifiers where needed
- Maintains sequential ordering (workflow steps)

### 5. UI Logic Tests (`__tests__/ui/`)

Verify component logic extracted into utilities:
- Button variant config returns correct classes for all 8 combinations
- Timeline direction alternates correctly
- SVG path generation produces valid output

## Coverage Reports

After running `pnpm run test:coverage`:

- **Terminal**: Summary table printed to console
- **HTML**: Open `coverage/index.html` for interactive line-by-line report
- **LCOV**: `coverage/lcov.info` for CI tool integration

The `coverage/` directory is gitignored.

## Tips

- Prefer `screen.getByRole()` and `screen.getByText()` over `querySelector` — they reflect how users interact with the page
- Use `getAllByText()` when text appears multiple times (e.g., watermark + subtitle)
- Don't test implementation details (internal state, class names) — test visible behavior
- Keep tests focused: one assertion per `it()` block when possible
- Mock only what's necessary — the setup file handles most external dependencies

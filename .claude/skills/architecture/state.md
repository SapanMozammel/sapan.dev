# Architecture — State Management

## Redux Store (`src/store/`)

### Slices

**`localeSlice`** — `src/store/slices/localeSlice.ts`
- State: `currentLocale`, `isRTL`
- Persists to `localStorage` key `preferred-language`
- Updated when user switches language via `LanguageSwitcher`

**`uiSlice`** — `src/store/slices/uiSlice.ts`
- State: `isContactModalOpen`
- Controls the contact modal open/close state

### Typed Hooks (always use these — never raw Redux)

```tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const dispatch = useAppDispatch()
const isOpen = useAppSelector((state) => state.ui.isContactModalOpen)
```

**Never** use `useDispatch()` or `useSelector()` directly.

### State Ownership Rules

| State | Owner |
|---|---|
| Contact modal open/close | Redux (`uiSlice`) |
| Current locale + RTL flag | Redux (`localeSlice`) |
| Color theme (light/dark) | `next-themes` — NOT Redux |
| Form field state | local `useState` inside component |
| Animation state | local `useState` or Framer Motion |

---

## Theme — next-themes

```tsx
// Provider configured in src/providers/index.tsx
<ThemeProvider defaultTheme="system" attribute="class">
```

- Adds `.dark` class to `<html>` when dark mode is active
- Access theme: `const { theme, setTheme } = useTheme()` from `next-themes`
- Do not store theme in Redux

---

## Custom Hooks (`src/hooks/`)

**`useContactForm`** — `src/hooks/useContactForm.ts`
- Form state, validation, and submission
- Dispatches to Redux for modal state

**`useStackingCards`** — `src/hooks/useStackingCards.ts`
- GSAP ScrollTrigger stacking animation for Portfolio section
- Returns ref to attach to card container

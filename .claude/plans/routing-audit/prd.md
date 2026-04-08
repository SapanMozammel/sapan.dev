# Feature: Routing Skill Audit

## Context
The routing.md skill file has an incorrect layout hierarchy description. The root layout is a bare fragment with global styles, while the locale layout handles html/body/fonts/providers — opposite of what's documented.

## Affected Files
- `.claude/skills/architecture/routing.md` — stale layout hierarchy section

## New Files
None

## Implementation Steps

### Round 1 — Fix layout hierarchy docs
- [✅] Step 1: Updated routing.md layout hierarchy diagram — root layout is `<>{children}</>` + global.scss, locale layout has html, body, fonts, RTL dir, NextIntlClientProvider, Providers, Header, Footer, metadata
- [✅] Step 2: Updated routing.md description lines — corrected both bullet points to match actual behavior

### Round 1 — Finalize
- [✅] Step 3: Run pnpm run type:check — 0 errors
- [✅] Step 4: Run pnpm run test — 190 passed

## Verification
- [✅] pnpm run type:check — 0 errors
- [✅] pnpm run test — 190 passed

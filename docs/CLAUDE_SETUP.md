# Claude Code Setup — sapan.dev

A setup guide for the `.claude/` configuration in this project.

---

## Directory Structure

```
.claude/
├── commands/
│   ├── plan.md             # /plan [feature description]
│   ├── implement.md        # /implement [plan-name]
│   ├── audit.md            # /audit
│   ├── new-section.md      # /new-section [Name]
│   ├── new-component.md    # /new-component [Name]
│   ├── translate.md        # /translate [locale?]
│   ├── test.md             # /test [unit|e2e|i18n?]
│   ├── commit.md           # /commit [message?] — stage all changes and commit
│   ├── commit-staged.md    # /commit-staged [message?] — commit only staged changes
│   ├── pr.md               # /pr [base-branch?] — create a pull request
│   ├── update-setup.md     # /update-setup — sync CLAUDE_SETUP.md with current project state
│   └── generate-config.md  # /generate-config — materialize .claude/ files from CLAUDE_SETUP.md
├── skills/
│   ├── design-system/
│   │   ├── colors.md       # Tokens, dark mode pairs, gradients, fills
│   │   ├── typography.md   # Fonts, roles, size scale
│   │   └── spacing.md      # Containers, section padding, gap scale
│   ├── architecture/
│   │   ├── component-patterns.md  # Server/Client rules, cn(), buttons, animations
│   │   ├── routing.md             # App Router, i18n, next-intl usage
│   │   ├── state.md               # Redux slices, typed hooks, next-themes
│   │   └── data.md                # src/data/ structure, types, utilities
│   └── workflow/
│       ├── feature-planning.md    # Plan file format + planning rules
│       └── testing.md             # What to test, patterns, file locations
├── plans/
│   └── [plan-name]/
│       └── prd.md          # Auto-created by /plan — one folder per feature
└── settings.local.json     # Update with hooks (see below)
```

---

## Source of Truth

| Layer | File | Loaded |
|-------|------|--------|
| Baseline | `CLAUDE.md` (root) | Always — every conversation |
| Detailed reference | `.claude/skills/**/*.md` | On demand — when Claude detects relevance or user invokes |
| Workflow | `.claude/commands/*.md` | When user runs `/command-name [args]` |
| Feature plans | `.claude/plans/*.md` | When user runs `/implement [plan-name]` |

If `CLAUDE.md` and a skill conflict, **the skill wins** — it is more specific.

---

## Formatter & Linting Config

All formatter/linter configuration lives in `.formatter/` (not at the project root):

```
.formatter/
├── .eslintrc.js      # ESLint rules — extended by root .eslintrc.js
├── .prettierrc.js    # Prettier config — referenced by all format scripts
└── sync.js           # Import organizer — run by pnpm run imports:organize
```

The root `.eslintrc.js` is a thin wrapper that requires `.formatter/.eslintrc.js`. This keeps the root clean while allowing Next.js and editors to find ESLint from the project root.

When running formatting commands in hooks or manually:
- `pnpm run lint:fix` — ESLint with auto-fix (uses `.formatter/.eslintrc.js` via root wrapper)
- `pnpm run format` — Prettier (uses `.formatter/.prettierrc.js`)
- `pnpm run format:all` — imports:organize → format → lint:fix (full pipeline)

---

## Step 1 — Create Skills

Skills are reference docs Claude loads automatically. Keep them factual and specific — no workflow instructions, just knowledge.

### `skills/design-system/colors.md`
- Semantic color tokens table
- Secondary scale
- All dark mode pairs (backgrounds, text, hover, borders, shadows, rings, misc)
- Gradients section
- Fills & strokes section

### `skills/design-system/typography.md`
- Font families table
- Role assignments (which font for which UI element)
- Text sizing scale (mobile-first)
- Rules: never inherit font silently, always explicit

### `skills/design-system/spacing.md`
- Container utility definitions (`.container`, `.container-fluid`)
- Section spacing patterns
- Content gaps and card padding
- Responsive breakpoints

### `skills/architecture/component-patterns.md`
Source: current knowledge of the project patterns
- Server vs Client classification (explicit lists)
- Component anatomy (Server and Client code templates)
- `cn()` usage rule
- Common UI patterns (border, shadow, hover, active, focus, error, disabled)
- Section structure (SectionSeparator + SectionTitle)
- Button system (8 variants)
- Animation library selection and duration standards
- File organization table
- Pre-write checklist (11 items)

### `skills/architecture/routing.md`
- Route structure table (paths, file locations, types)
- Layout hierarchy (two-layer: root layout = bare fragment + global.scss; locale layout = html/body, fonts, RTL, providers, header, footer)
- i18n: 16 locales, next-intl@4.x, `localePrefix: 'as-needed'` (English = no prefix)
- Translation file structure: `src/i18n/locales/[locale]/[namespace].json`
- 4 namespaces (current): `common` · `navigation` · `home` · `blog`
- Locale detection priority: URL segment → localStorage (`preferred-language`) → `Accept-Language` header → `en`
- Navigation imports: `@/i18n/navigation` for internal routes, `NextLink from 'next/link'` for external. Both can coexist.
- RTL support: Arabic sets `dir="rtl"` in `[locale]/layout.tsx`; use `rtl:` Tailwind variant in components
- Graceful fallback: missing locale namespace files fall back to English automatically
- Static generation with `generateStaticParams()`

### `skills/architecture/state.md`
- Redux store: `localeSlice` + `uiSlice`
- Typed hooks: `useAppDispatch`, `useAppSelector` (never raw Redux)
- Custom hooks: `useContactForm`, `useStackingCards`
- Theme: `next-themes`, `defaultTheme="system"`, `attribute="class"`
- Rules: modal state → Redux, locale state → Redux, theme → next-themes

### `skills/architecture/data.md`
- `src/data/content/` files and their exports
- `src/data/config/` files
- `src/types/` directory listing
- `src/lib/utils/` utilities
- Data flow: static files → Server Component → props
- Rules: no `any`, portfolio uses `.tsx` (JSX icons), others `.ts`

### `skills/workflow/feature-planning.md`
- Plan file format (the template Claude fills in for `/plan`)
- Planning rules (read before write, reuse over create, minimal footprint, no speculative features)
- Plan file location: `.claude/plans/[kebab-feature-name]/prd.md`
- Task checkbox convention (see Feature Plan File Format below)

### `skills/workflow/testing.md`
- **Stack:** Vitest + React Testing Library + `@testing-library/user-event` + jsdom + `@vitest/coverage-v8`
- **Commands:** `pnpm run test` · `pnpm run test:watch` · `pnpm run test:coverage`
- **Test directory:** `tests/` at project root (outside `src/` — not processed by Next.js)
  ```
  tests/
  ├── setup.tsx          # Global mocks (run before every suite)
  ├── test-utils.tsx     # Custom render wrapping Redux Provider
  ├── components/        # Component tests
  ├── data/              # Data integrity tests
  ├── lib/               # Utility function tests
  ├── store/             # Redux slice tests
  └── ui/                # UI logic tests (variants, timeline utils)
  ```
- **`setup.tsx` mocks** (applied globally — do not re-mock in individual tests):
  `next/link`, `next/image`, `next-themes`, `next-intl`, `next/navigation`, `framer-motion`, `gsap`/`ScrollTrigger`, `@react-three/fiber`, `@react-three/drei`, `matchMedia`, `IntersectionObserver`, `ResizeObserver`
- **`test-utils.tsx`:** use instead of default `render` for any component that uses Redux store
- **What to test:**
  - Utilities (`src/lib/utils/`) — pure functions, edge cases
  - Redux slices — initial state, actions, state transitions
  - Components — rendered text, conditional classes, user interactions, state (open/closed, loading)
  - Data integrity — required fields, unique IDs, sequential ordering
  - i18n completeness — all locale namespaces have all keys present in `en/` baseline
- **What NOT to test:**
  - Purely presentational Server Components (no logic)
  - Static data shape — TypeScript strict mode covers this
  - Animations and visual details
- **Rules:** Prefer `getByRole()` / `getByText()` over `querySelector`. One assertion per `it()`. Never mock internal utilities — mock only at system boundaries (fetch, localStorage, router).

---

## Step 2 — Create Commands

Commands are workflow prompts invoked via `/command-name`. They tell Claude *what to do*, not *what to know* — that's the skills' job.

### `commands/plan.md` — `/plan [feature description]`

**Purpose:** Explore code, load skills, write a plan file. No code written.

Steps Claude must follow:
1. Restate feature in one sentence — ask to clarify if vague
2. Ask the user: "Should I create a new branch for this?" — if yes, ask for a branch name (suggest `feature/[kebab-feature-name]` as default)
3. If user wants a new branch, create it from the current branch before proceeding
4. Glob + Grep to find affected files — never assume paths
5. Read every affected file before proposing changes
6. Load relevant skills: always `component-patterns`; conditionally `colors`, `typography`, `spacing`, `routing`, `state`, `data`
7. Load `skills/workflow/feature-planning.md` for the plan format
8. Decide Server vs Client with explicit reasoning
9. Write plan to `.claude/plans/[kebab-feature-name]/prd.md` — if a PRD already exists, preserve completed tasks (`[✅]`) and append new steps
10. Report: feature (1 sentence), branch name (if created), affected files, new files, step count, plan path
11. Prompt: `"Ready? Run /implement [plan-name]"`

**Rules:** No code written during planning. No extra features. No new dependencies unless unavoidable.

---

### `commands/implement.md` — `/implement [plan-name]`

**Purpose:** Read a plan and implement it step by step.

Steps Claude must follow:
1. Read `.claude/plans/[plan-name]/prd.md` fully before any code
2. Read all files listed under Affected Files and New Files
3. Load all skills: `component-patterns.md`, `colors.md`, `typography.md`, `spacing.md`, `routing.md`, `state.md`, `data.md`
4. Execute each step in order — before starting a step, add subtasks if it needs breakdown; mark `[🔄]` while running, `[✅]` when done; update `prd.md` in place. Never overwrite or remove completed (`[✅]`) steps
5. Apply pre-write checklist (from `component-patterns.md`) to every component touched
6. Run `pnpm run format:all` — auto-format all touched files
7. Run `pnpm run type:check` — fix all errors before continuing
8. Run `pnpm run test` — fix any broken tests before finishing
9. Report: files created, files modified, type check result, test result, verification steps

**Rules:** Implement only what's in the plan. Ask before guessing ambiguous steps. Do not add unrequested features.

---

### `commands/audit.md` — `/audit`

**Purpose:** Check a file against all design system and architecture rules.

Steps Claude must follow:
1. Target = `$ARGUMENTS` if provided, otherwise the file currently open in the editor
2. Read the file fully
3. Load: `colors.md`, `typography.md`, `spacing.md`, `component-patterns.md`
4. Check every rule in the pre-write checklist
5. Report violations by category:
   - **Design System** — hardcoded colors, wrong font class, arbitrary spacing
   - **Architecture** — missing `'use client'`, missing `memo()`, wrong import path
   - **TypeScript** — `any` types, missing types, `interface` used instead of `type`
   - **Pass** — what's already correct
6. For each violation: `file:line` — rule broken — fix
7. If violations found: create or update a PRD at `.claude/plans/[audit-scope]-audit/prd.md` with all violations as implementation steps

**Rules:** Report numbered, actionable fixes only. No full rewrites unless asked. Do not auto-apply fixes — present them for review. Always generate a PRD after the audit so violations can be fixed via `/implement`.

---

### `commands/new-section.md` — `/new-section [Name]`

**Purpose:** Scaffold a new landing page section.

Steps Claude must follow:
1. Confirm `Name` is provided — ask if missing
2. Read an existing similar section for reference (e.g. `src/components/layout/Faq/`)
3. Load `component-patterns.md` and `spacing.md`
4. Decide Server vs Client based on whether interactivity is needed
5. Create `src/components/layout/[Name]/index.tsx`:
   - Correct component type
   - `SectionSeparator` + `SectionTitle` structure
   - Section spacing: `py-8 sm:py-12 lg:py-16`
   - `cn()` for all classNames, design system tokens only
6. If data needed: create `src/data/content/[name].ts` + `src/types/[name].ts`
7. Add translation key stubs to the relevant `src/i18n/locales/en/[namespace].json`
8. Show the import line for `src/app/[locale]/(landing)/page.tsx`

**Rules:** Always use SectionSeparator + SectionTitle structure. Design system tokens only — no hardcoded values. Default to Server Component unless interactivity is explicitly required.

---

### `commands/new-component.md` — `/new-component [Name]`

**Purpose:** Scaffold a reusable UI component.

Steps Claude must follow:
1. Confirm `Name` is provided — ask if missing
2. Ask: Server or Client? (default: Server)
3. Read a similar component in `src/components/ui/` for reference
4. Load `component-patterns.md`
5. Create `src/components/ui/[kebab-name]/index.tsx`:
   - Correct component type
   - Props type — no `any`
   - `cn()` for all classNames
   - `memo()` + `displayName` if Client
   - `export default ComponentName`
6. Apply pre-write checklist before finishing

**Rules:** No `any` types. Props type is required (`type Props = { ... }`, never `interface`). `memo()` + `displayName` mandatory for Client Components. Export default at the bottom.

---

### `commands/translate.md` — `/translate [locale?]`

**Purpose:** Translate i18n message files across all locales (or one specific locale) in parallel using subagents.

Steps Claude must follow:
1. If `$ARGUMENTS` is a locale code (e.g. `fr`, `ar`): translate only that locale
2. If `$ARGUMENTS` is empty: translate all 16 locales in parallel
3. Read all files in `src/i18n/locales/en/` as the source of truth (4 namespace files)
4. For each target locale, spawn a **parallel subagent** with:
   - The full English namespace files
   - The existing target locale files (to preserve already-translated keys)
   - The locale name and RTL flag (`ar` is RTL)
   - Instruction: translate only keys missing or marked as stale; do not overwrite existing translations
5. Each subagent writes its output to `src/i18n/locales/[locale]/[namespace].json`
6. After all subagents complete, report: locales updated, keys added per locale, any failures

**Rules:**
- Never translate proper nouns: site name, technology names, company names
- Preserve all interpolation placeholders exactly: `{name}`, `{count}`, etc.
- Arabic (`ar`): right-to-left, use formal Modern Standard Arabic
- For locales with regional variants (`zh-CN`, `pt-BR`): use the specified regional form

---

### `commands/test.md` — `/test [unit|e2e|i18n?]`

**Purpose:** Run the appropriate test suite, analyze failures, and fix them.

Steps Claude must follow:
1. Load `skills/workflow/testing.md`
2. Determine scope from `$ARGUMENTS`:
   - `unit` → `pnpm run test`
   - `e2e` → `pnpm run test:e2e`
   - `i18n` → compare all locale files in `src/i18n/locales/` against `en/` baseline, report missing keys
   - empty → run `pnpm run test` then `pnpm run test:e2e`
3. Run the command and capture output
4. If all pass: report summary (suites, tests, duration)
5. If failures: for each failing test:
   - Show test name + file location
   - Read the relevant source file
   - Diagnose root cause (logic bug, type mismatch, missing mock, stale snapshot)
   - Apply a fix
   - Re-run only the failed test to confirm it passes
6. Final report: tests fixed, tests still failing (if any), next steps

**Rules:** Fix the real issue — do not delete or skip failing tests. Do not widen types to silence errors.

---

### `commands/commit.md` — `/commit [message?]`

**Purpose:** Stage all changes and create a commit.

Steps Claude must follow:
1. Run `git status` and `git diff` to review changes
2. Run `git log --oneline -5` to match commit message style
3. Stage relevant files with specific names — never `git add -A`
4. Draft or use provided commit message; append co-author trailer
5. Create the commit; verify with `git status`

**Rules:** Never `git add -A`. Never amend unless asked. Never skip hooks. Never push unless asked. Warn on secret files.

---

### `commands/commit-staged.md` — `/commit-staged [message?]`

**Purpose:** Commit only what is already staged — do not modify the staging area.

Steps Claude must follow:
1. Run `git status` to confirm staged changes exist
2. Run `git diff --cached` to review staged changes
3. Draft or use provided commit message; append co-author trailer
4. Create the commit; verify with `git status`

**Rules:** Never stage additional files. Never amend unless asked. Never skip hooks. Never push unless asked.

---

### `commands/pr.md` — `/pr [base-branch?]`

**Purpose:** Create a pull request from the current branch to the base branch.

Steps Claude must follow:
1. Check git status, current branch, remote tracking
2. Run `git diff <base>...HEAD` and `git log --oneline <base>..HEAD` to analyze ALL commits
3. If uncommitted changes exist, ask user whether to commit first
4. Draft title (under 70 chars) and summary (1-3 bullets) + test plan
5. Push with `-u` if needed; create PR via `gh pr create`

**Rules:** Never force-push. Confirm before PRing to `main`/`master`. Analyze all commits, not just the latest.

---

### `commands/update-setup.md` — `/update-setup [section?]`

**Purpose:** Keep `docs/CLAUDE_SETUP.md` in sync with the current project state — update stale conventions, add newly discovered patterns, remove outdated guidance.

Steps Claude must follow:
1. Read `docs/CLAUDE_SETUP.md` fully
2. Read `CLAUDE.md` to cross-check for conflicts or gaps
3. If `$ARGUMENTS` targets a section (e.g. `colors`, `routing`, `commands`): scope the update to that section only
4. If `$ARGUMENTS` is empty: scan all skill descriptions and command steps for staleness
5. For each stale item: read the relevant source files to verify the current truth
6. Apply updates — correct token values, file paths, patterns, conventions
7. Flag any conflict between `CLAUDE.md` and a skill description — do not silently overwrite; report it
8. Report: sections updated, items corrected, conflicts found (if any)

**Rules:** Never remove a section — only update content. Do not add speculative guidance. Every change must be grounded in the current codebase.

---

### `commands/generate-config.md` — `/generate-config [skill|command|all?]`

**Purpose:** Materialize the actual `.claude/` files (skills + commands) from the specifications in `docs/CLAUDE_SETUP.md`.

Steps Claude must follow:
1. Read `docs/CLAUDE_SETUP.md` fully
2. Determine scope from `$ARGUMENTS`:
   - `skill` → generate only `.claude/skills/**/*.md` files
   - `command` → generate only `.claude/commands/*.md` files
   - `all` or empty → generate both
3. For each file to generate:
   - Check if the file already exists
   - If it exists: diff against the spec — update only sections that have changed
   - If it does not exist: create it from the spec
4. For skill files: extract the exact content described in the Step 1 skill specifications
5. For command files: write the Steps + Rules exactly as documented in Step 2
6. After generation, run `pnpm run type:check` to confirm nothing broke
7. Report: files created, files updated, files skipped (already up to date)

**Rules:** Never delete existing `.claude/` files — only create or update. Do not invent content not described in `CLAUDE_SETUP.md`. Preserve any manual additions already in a skill file that are not contradicted by the spec.

---

## Background & Scheduled Tasks

For tasks that run on a schedule or need to repeat automatically (e.g. nightly data refresh, sitemap rebuild, periodic translation sync), use the built-in **schedule skill**.

```
/schedule          # Create or manage scheduled remote agents
```

The schedule skill creates cron-based triggers that run a Claude agent automatically. Useful for:
- Syncing new translation keys across locales on a schedule
- Periodic `pnpm run build` health checks
- Any recurring task that shouldn't require manual invocation

**Agent files are not needed for any of this.** Parallel work is handled by Claude's built-in Agent tool (spawned inside commands like `/translate`). Scheduled work is handled by the schedule skill. There is no use case for `.claude/agents/` files in this project.

---

## Step 3 — Update settings.local.json

Add hooks to auto-lint and type-check after every file edit. Tests are **not** run on every save (too slow) — run `/test` explicitly or at the end of `/implement`.

```json
{
  "permissions": {
    "allow": [
      "WebSearch",
      "WebFetch(domain:*)",
      "Bash(git:*)",
      "Bash(pnpm run:*)",
      "Bash(pnpm add:*)",
      "Bash(pnpm remove:*)",
      "Bash(pnpm list:*)",
      "Bash(pnpm outdated:*)",
      "Bash(pnpm dlx:*)",
      "Bash(pnpm next:*)",
      "Bash(pnpm test:*)",
      "Bash(npx tsc:*)",
      "Bash(npx prettier:*)",
      "Bash(python3:*)",
      "Bash(grep:*)",
      "Bash(cat:*)",
      "Bash(open:*)",
      "Bash(wc:*)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm run lint:fix 2>&1 | tail -10"
          },
          {
            "type": "command",
            "command": "pnpm run type:check 2>&1 | tail -20"
          }
        ]
      }
    ]
  }
}
```

> Hooks run in the project root automatically — no `cd` or absolute paths needed.

---

## Pre-write Checklist

Used by `/implement`, `/new-section`, `/new-component`, and `/audit`:

- [ ] `cn()` from `@/lib/utils` for all classNames — never string-concatenate
- [ ] Design system tokens only — no hardcoded colors or hex values
- [ ] `dark:` variant on every color class
- [ ] Mobile-first breakpoints (`sm:`, `md:`, `lg:`)
- [ ] Server Component by default — `'use client'` only when hooks/events required
- [ ] If Client: `memo()` + `ComponentName.displayName = 'ComponentName'`
- [ ] Navigation: `import { Link } from '@/i18n/navigation'` for internal routes. For external links (`https://`, `mailto:`, `tel:`), use `import NextLink from 'next/link'`. Both can coexist in the same file.
- [ ] All imports use `@/` alias
- [ ] No `any` types
- [ ] `export default ComponentName` at the bottom — never both `export const` and `export default` for the same component

---

## Feature Plan File Format

Written by `/plan` to `.claude/plans/[plan-name]/prd.md`, read by `/implement`.

### Task Status Convention

| Symbol | Meaning |
|--------|---------|
| `- [⬜]` | Pending — not started |
| `- [🔄]` | Running — in progress |
| `- [✅]` | Done — complete |

Subtasks are indented two spaces under their parent task. Claude adds subtasks inline while implementing — if a step turns out to need multiple smaller actions, break it down before starting:

```markdown
- [🔄] Step 1: Build the component
  - [✅] Create index.tsx
  - [🔄] Add props type
  - [⬜] Wire translations
- [⬜] Step 2: Add data file
```

Claude updates task and subtask status as `/implement` runs each step.

**Important:** When updating a PRD (e.g. after a re-audit), always preserve previously completed tasks (marked `[✅]`). Add new steps below or in a new "Round N" section — never overwrite done steps.

---

```markdown
# Feature: [Name]

## Context
What this feature does and why it's needed.

## Component Type Decision
- Server or Client? — [answer + reason]
- Placement: src/components/layout/[Section]/ or src/components/ui/[name]/

## Affected Files
- src/path/to/file.tsx — what changes and why

## New Files
- src/path/to/new-file.tsx — what it contains

## Data & Types
- New types: src/types/[name].ts
- New data: src/data/content/[name].ts or src/data/config/[name].ts

## Design System
- Colors: exact tokens (e.g. text-primary dark:text-success)
- Typography: font classes + where used
- Spacing: container/section patterns
- Animations: library + duration

## i18n
- Translation keys needed
- RTL considerations (if any)

## Implementation Steps
- [⬜] Step 1: ...
- [⬜] Step 2: ...
- [⬜] Step 3: ...

## Verification
- [⬜] pnpm run dev → navigate to...
- [⬜] Check dark mode
- [⬜] Check mobile at 375px
- [⬜] pnpm run type:check
- [⬜] pnpm run test (if logic/utilities were added or changed)
```

---

## Usage Examples

### Commands

**Plan a new feature**
```
/plan add a services section with animated cards
```
→ Claude explores the codebase, loads relevant skills, writes `.claude/plans/services-section/prd.md`, reports affected files, prompts to run `/implement`.

---

**Implement a plan**
```
/implement services-section
```
→ Claude reads `plans/services-section/prd.md`, marks tasks `[🔄]` as it goes, `[✅]` when done, runs `type:check` and `test` at the end.

---

**Commit all changes**
```
/commit
/commit fix: resolve hydration mismatch in ThemeSwitcher
```
→ Stages relevant files, drafts (or uses provided) commit message, creates commit with co-author trailer.

---

**Commit only staged changes**
```
/commit-staged
```
→ Commits exactly what's staged — does not touch the staging area.

---

**Create a pull request**
```
/pr
/pr main
```
→ Analyzes all commits on the branch, drafts PR title + summary + test plan, pushes and creates PR via `gh`.

---

**Scaffold a new section**
```
/new-section Services
```
→ Creates `src/components/layout/Services/index.tsx` with SectionSeparator + SectionTitle, adds data/type stubs, shows import line.

---

**Scaffold a reusable component**
```
/new-component TagBadge
```
→ Creates `src/components/ui/tag-badge/index.tsx` with props type, `cn()`, dark mode, pre-write checklist applied.

---

**Audit an existing file**
```
/audit src/components/layout/Hero/index.tsx
```
→ Loads all design-system + architecture skills, checks every rule, reports violations with `file:line` references. Generates a PRD for fixes. No auto-fix.

---

**Translate a single locale**
```
/translate fr
```
→ Reads all `en/` namespace files, spawns a subagent for French, fills missing keys only, preserves existing translations.

**Translate all locales**
```
/translate
```
→ Same but 16 parallel subagents, one per locale.

---

**Run tests**
```
/test unit
/test i18n
/test
```
→ Runs the relevant suite, diagnoses failures, applies fixes, re-runs to confirm. `/test i18n` compares all locales against `en/` baseline.

---

**Update the setup doc**
```
/update-setup
/update-setup colors
```
→ Reads `CLAUDE_SETUP.md` + `CLAUDE.md`, checks against current codebase, corrects stale values. Scoped version targets one section only.

---

**Generate `.claude/` files from the setup**
```
/generate-config
/generate-config skill
/generate-config command
```
→ Reads `CLAUDE_SETUP.md`, creates or updates all `.claude/skills/` and `.claude/commands/` files. Skips files already up to date. Scoped version generates only skills or only commands.

---

### Skills

Skills load automatically when Claude detects relevance. You can also invoke them directly:

```
What color token should I use for a disabled button border?
```
→ Claude loads `skills/design-system/colors.md` automatically.

```
How should I structure a new Redux slice?
```
→ Claude loads `skills/architecture/state.md` automatically.

```
What's the routing pattern for a new page?
```
→ Claude loads `skills/architecture/routing.md` automatically.

You can also reference them explicitly:
```
Using the component-patterns skill, review this component.
```

---

### Plans

A plan in `.claude/plans/contact-form/prd.md` might look like:

```markdown
# Feature: Contact Form Redesign

## Context
Replace the current modal with an inline section form.

## Component Type Decision
- Client — needs form state and submission handling
- Placement: src/components/layout/Contact/

## Affected Files
- src/components/ui/contact-modal/index.tsx — remove modal wrapper

## New Files
- src/components/layout/Contact/index.tsx — new inline section
- src/components/layout/Contact/ContactForm.tsx — form client component

## Implementation Steps
- [✅] Read existing contact-modal to extract form logic
- [✅] Create Contact/index.tsx as Server Component wrapper
- [🔄] Create ContactForm.tsx as Client Component
  - [✅] Port form fields from modal
  - [🔄] Add validation
  - [⬜] Wire submission handler
- [⬜] Remove modal from uiSlice
- [⬜] Add i18n keys to contact.json

## Verification
- [⬜] pnpm run dev → navigate to /#contact
- [⬜] Check dark mode
- [⬜] Check mobile at 375px
- [⬜] pnpm run type:check
- [⬜] pnpm run test
```

---

> **Project knowledge** (fonts, colors, animations, i18n, conventions) lives in `CLAUDE.md` and `.claude/skills/` — not here. This file is setup instructions only.

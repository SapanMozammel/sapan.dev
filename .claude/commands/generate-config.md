# /generate-config [skill|command|all?]

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

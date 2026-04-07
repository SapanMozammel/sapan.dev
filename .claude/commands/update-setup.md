# /update-setup [section?]

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

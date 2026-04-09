# /plan [feature description]

**Purpose:** Explore code, load skills, write a plan file. No code written.

Steps Claude must follow:
1. Restate feature in one sentence — ask to clarify if vague
2. Ask the user: "Should I create a new branch for this? (yes/no)" — if yes, suggest `feature/[kebab-feature-name]` and ask to confirm or rename
3. If user wants a new branch, create it from the current branch before proceeding
4. Glob + Grep to find affected files — never assume paths
5. Read every affected file before proposing changes
6. Load relevant skills: always `component-patterns`; conditionally `colors`, `typography`, `spacing`, `routing`, `state`, `data`
7. Load `skills/workflow/feature-planning.md` for the plan format
8. Decide Server vs Client with explicit reasoning
9. Write plan to `.claude/plans/[kebab-feature-name]/prd.md` — if a PRD already exists, preserve completed tasks (`[✅]`) and append new steps
10. Report: feature (1 sentence), branch name (if created), affected files, new files, step count, plan path
11. Prompt: "Ready? Run /implement [plan-name]"

**Rules:** No code written during planning. No extra features. No new dependencies unless unavoidable.

# /plan [feature description]

**Purpose:** Explore code, load skills, write a plan file. No code written.

Steps Claude must follow:
1. Restate feature in one sentence — ask to clarify if vague
2. Glob + Grep to find affected files — never assume paths
3. Read every affected file before proposing changes
4. Load relevant skills: always `component-patterns`; conditionally `colors`, `typography`, `spacing`, `routing`, `state`, `data`
5. Load `skills/workflow/feature-planning.md` for the plan format
6. Decide Server vs Client with explicit reasoning
7. Write plan to `.claude/plans/[kebab-feature-name]/prd.md`
8. Report: feature (1 sentence), affected files, new files, step count, plan path
9. Prompt: "Ready? Run /implement [plan-name]"

**Rules:** No code written during planning. No extra features. No new dependencies unless unavoidable.

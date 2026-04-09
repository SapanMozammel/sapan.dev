# /commit [message?]

**Purpose:** Stage all changes and create a commit.

Steps Claude must follow:
1. Run `git status` to see all modified and untracked files
2. Run `git diff` to review unstaged changes
3. Run `git log --oneline -5` to match the repo's commit message style
4. Analyze all changes — do NOT commit files that likely contain secrets (`.env`, credentials, etc.)
5. Stage relevant files with `git add` — prefer specific file names over `git add -A`
6. If `$ARGUMENTS` is provided, use it as the commit message
7. If `$ARGUMENTS` is empty, draft a concise commit message (1-2 sentences) focusing on the "why" not the "what"
8. Create the commit using a HEREDOC format, appending the co-author trailer
9. Run `git status` after commit to verify success
10. Report: commit hash, files committed, branch name

**Commit message format:**
```
<type>: <short description>

<optional body — what changed and why>

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

**Types:** `feat` (new feature), `fix` (bug fix), `refactor`, `chore`, `docs`, `test`, `style`

**Rules:**
- Never use `git add -A` or `git add .` — stage specific files
- Never amend previous commits unless explicitly asked
- Never skip hooks (`--no-verify`)
- Never push unless explicitly asked
- If pre-commit hook fails, fix the issue and create a NEW commit
- Warn if staging files that may contain secrets

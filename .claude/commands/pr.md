# /pr [base-branch?]

**Purpose:** Create a pull request from the current branch to the base branch.

Steps Claude must follow:
1. Run in parallel:
   - `git status` to check for uncommitted changes
   - `git log --oneline -10` to see commit history
   - `git branch --show-current` to get current branch name
   - Check if branch tracks a remote and is up to date
2. Determine base branch: use `$ARGUMENTS` if provided, otherwise `main`
3. Run `git diff <base-branch>...HEAD` to see all changes included in the PR
4. Run `git log --oneline <base-branch>..HEAD` to see all commits in the PR
5. If there are uncommitted changes, ask the user whether to commit first or proceed without them
6. Analyze ALL commits (not just the latest) and draft:
   - **Title:** under 70 characters, descriptive
   - **Summary:** 1-3 bullet points covering the key changes
   - **Test plan:** checklist of verification steps
7. Push to remote with `-u` flag if needed
8. Create the PR using `gh pr create`:

```bash
gh pr create --title "the pr title" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Test plan
<bulleted markdown checklist>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

9. Report: PR URL, title, base branch, number of commits, files changed

**Rules:**
- Never force-push
- Never create PRs to `main`/`master` without confirming with the user
- If the current branch IS `main`/`master`, ask the user to create a feature branch first
- Include all commits in the analysis, not just the most recent one
- Do not push if the user hasn't asked — ask first if unsure

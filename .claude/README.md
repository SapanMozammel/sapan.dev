# Claude Code Workspace

This directory contains the Claude Code workspace for sapan.dev — conventions, slash commands, sub-agents, PRD plans, and the resume build pipeline. Everything Claude Code needs to work productively in this repo lives under `.claude/`.

## Layout

| Sub-tree | Purpose |
|---|---|
| [`skills/`](skills/) | Conventions Claude loads on demand. Authoritative for project rules: architecture (`component-patterns`, `routing`, `state`, `data`, `data-graphql`), design-system (`colors`, `typography`, `spacing`), workflow (`e2e`, `testing`, `feature-planning`, `no-use-effect`, `tailwind-mangle`, `tailwind-v4-syntax`, `i18n-audit`). Framework-level guidance lives under [`skills/external/`](skills/external/README.md) — see its README for the authority gradient and per-category index. |
| [`commands/`](commands/) | Slash commands (20 files). Planning: `/plan`, `/implement`. Review: `/review`, `/review-i18n`, `/lhci`. Git: `/commit`, `/commit-staged`, `/push`, `/pr`, `/merge`. Test/scaffold: `/test`, `/fix-issue`, `/e2e-add-spec`, `/gql-add-query`, `/gql-codegen`, `/new-component`, `/new-section`, `/translate`. Build/format: `/format`, `/build-mangle`. |
| [`agents/`](agents/) | Sub-agents invoked via the Agent tool: `code-reviewer`, `test-writer`, `e2e-spec-author`, `graphql-architect`, `tailwind-class-reviewer`. Spawned by slash commands or directly when `/implement` decides delegation is appropriate. |
| [`plans/`](plans/) | PRDs (sapan convention: `[kebab-name]/prd.md`). Active and historical work — completed `[✅]` steps are preserved; never overwrite history. |
| [`resume/`](resume/) | Resume PDF build pipeline (Python content + HTML template + Chrome headless print). See [`resume/README.md`](resume/README.md) for files, build command, and the v3 PDF slot override behavior. |

## Authority

Sapan rules in [`skills/{architecture,design-system,workflow}/`](skills/) and project root [`CLAUDE.md`](../CLAUDE.md) are authoritative. When external guidance under `skills/external/` conflicts with sapan rules, sapan wins.

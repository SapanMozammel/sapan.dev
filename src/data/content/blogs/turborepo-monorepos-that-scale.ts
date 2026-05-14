import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'turborepo-monorepos-that-scale',
	title: 'Turborepo: Monorepos That Actually Scale',
	excerpt:
		'The WPDeveloper plugin suite — BetterDocs, NotificationX, SchedulePress, BetterLinks, and a few smaller ones — was a monorepo that took close to 8 minutes for a clean build. After Turborepo with remote caching, the same build dropped to ~40 seconds on warm caches. Notes on what actually moved the needle.',
	thumbnail: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80',
	category: 'Tooling',
	tags: ['Turborepo', 'Monorepo', 'Tooling', 'Performance'],
	readTime: 7,
	publishedAt: '2026-01-28',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'The WPDeveloper plugin suite — BetterDocs, NotificationX, SchedulePress, BetterLinks, and a few smaller ones — shared a monorepo with shared UI components, shared TypeScript types, and shared tooling. Clean builds were taking close to 8 minutes by the time we had ~12 plugins in there, which meant CI was the bottleneck on PR feedback. Adding Turborepo with remote caching dropped warm-cache builds to about 40 seconds. That changed how the team worked — PRs got reviewed faster, hotfixes went out faster, and we stopped scheduling builds around lunch breaks.',
		},
		{
			type: 'paragraph',
			text: 'Monorepos promise shared code, unified tooling, and atomic changes across packages. They deliver — until the repo grows large enough that builds take 10 minutes and CI costs spiral. Turborepo is a build orchestrator designed to keep monorepos fast as they scale, using aggressive caching and dependency-aware task graphs.',
		},
		{
			type: 'heading',
			text: 'The Caching Model',
		},
		{
			type: 'paragraph',
			text: 'Turborepo caches the output of every task keyed on the task inputs — source files, dependencies, and config. If nothing relevant has changed, the task is skipped entirely and its cached output is restored. This turns most CI runs into glorified cache restores.',
		},
		{
			type: 'code',
			language: 'json',
			code: `// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "package.json", "tsconfig.json"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**", "tests/**"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "inputs": ["src/**", ".eslintrc*"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: '^build means "the build task of this package\'s dependencies must run first". This dependency graph is what lets Turborepo parallelize tasks across packages while respecting order.',
		},
		{
			type: 'heading',
			text: 'Remote Caching',
		},
		{
			type: 'paragraph',
			text: 'Local caching helps a single developer. Remote caching helps an entire team. When one engineer builds a package, the cache uploads to a shared store. Every other engineer — and every CI run — can restore that cache instead of rebuilding. Cold CI runs become warm.',
		},
		{
			type: 'code',
			language: 'bash',
			code: `# Link your repo to Vercel for free remote caching
npx turbo login
npx turbo link

# Or self-host with the open-source server
# https://turbo.build/docs/cache/self-hosted

# Run with remote cache enabled
turbo run build`,
		},
		{
			type: 'heading',
			text: 'Filter and Scope',
		},
		{
			type: 'paragraph',
			text: 'Turborepo can run tasks only for packages affected by your changes. Combine filters with git to build exactly what changed in a PR, not the entire repo.',
		},
		{
			type: 'code',
			language: 'bash',
			code: `# Build only the web package
turbo run build --filter=web

# Build web and everything it depends on
turbo run build --filter=web...

# Build everything that depends on the ui package
turbo run build --filter=...ui

# Build only packages changed since main
turbo run build --filter=[origin/main]

# In CI — build everything affected by the PR
turbo run build test --filter=[HEAD^1]`,
		},
		{
			type: 'heading',
			text: 'Recommended Repo Structure',
		},
		{
			type: 'paragraph',
			text: 'The de-facto standard for Turborepo monorepos is an apps/ directory for runnable projects and a packages/ directory for shared code. This maps cleanly to most workflows and keeps the task graph interpretable.',
		},
		{
			type: 'code',
			language: 'text',
			code: `my-monorepo/
├── apps/
│   ├── web/           # Next.js app
│   ├── docs/          # Astro docs site
│   └── mobile/        # React Native app
├── packages/
│   ├── ui/            # Shared component library
│   ├── config-eslint/ # Shared ESLint config
│   ├── config-tsconfig/
│   └── core/          # Shared business logic
├── turbo.json
├── package.json
└── pnpm-workspace.yaml`,
		},
		{
			type: 'heading',
			text: 'pnpm vs npm vs yarn',
		},
		{
			type: 'paragraph',
			text: 'Turborepo works with any workspace-aware package manager, but pnpm has become the consensus choice. It installs faster, uses less disk, and its strict node_modules layout catches phantom dependencies that npm hoisting would hide.',
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Use pnpm workspaces with a shared tsconfig.base.json and centralized ESLint config. Each package extends the base. This keeps per-package config minimal and upgrades affect the whole repo in one commit.',
		},
		{
			type: 'heading',
			text: 'Measuring the Win',
		},
		{
			type: 'paragraph',
			text: 'For a medium monorepo (20 packages, 100k lines), typical numbers after adopting Turborepo with remote caching: CI build time drops from 8 minutes to 90 seconds on cache hits. Local turbo run test goes from 45 seconds to instant when you have not touched anything. The compounding effect on developer productivity is dramatic.',
		},
		{
			type: 'heading',
			text: 'Common Pitfalls',
		},
		{
			type: 'list',
			items: [
				'Forgetting to declare outputs in turbo.json — tasks run but their artifacts are not cached',
				'Missing files in inputs — cache hits when you should have rebuilt (silent incorrectness)',
				'Overly broad inputs — cache invalidates too easily, defeating the point',
				'Relying on untracked environment variables — declare them with passThroughEnv',
				'Running persistent tasks (dev servers) through turbo run in CI — use watch mode instead',
			],
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'On the WPDeveloper plugin monorepo, getting the Turborepo config right took a couple of iterations — we had a few packages with sloppy "inputs" declarations that were invalidating caches more than necessary. Once we tightened those up, the cache hit rate went above 80% on regular CI runs. The key insight is that the cache is only as good as your config: be honest about what each task actually depends on, and the speedup is so significant it feels like cheating. After this migration I reach for Turborepo on every monorepo I touch.',
		},
	],
};

export default post;

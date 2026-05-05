import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'vite-6-state-of-frontend-builds',
	title: 'Vite 6 and the State of Frontend Builds in 2026',
	excerpt:
		'The xCloud v1 frontend runs on Vue 3 + Vite + a Laravel API — the Vite dev server is what makes that loop tolerable. Notes on what Vite 6 ships, where Rolldown changes things, and the few cases where I still hit friction.',
	thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
	category: 'Tooling',
	tags: ['Vite', 'Build Tools', 'Rolldown', 'Performance'],
	readTime: 6,
	publishedAt: '2026-01-12',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'On the xCloud v1 frontend, the dev loop is Vue 3 hot-reloading against a Laravel API in another tab. The whole thing only works because Vite starts the dev server in well under a second and reflects file changes near-instantly. After years of Webpack projects where dev startup took 30 seconds and HMR had a noticeable lag, this still feels suspiciously fast. Vite 6 is the maturity release that solidifies why the ecosystem has shifted.',
		},
		{
			type: 'paragraph',
			text: 'Five years ago, Webpack was the answer to every build question. Today, Vite is the default for virtually every new React, Vue, and Svelte project, and its ecosystem has absorbed the best ideas from every previous generation of tooling. Vite 6 is the maturity release — stable internals, a unified environment model, and a path to Rust-powered bundling.',
		},
		{
			type: 'heading',
			text: 'Why Vite Won',
		},
		{
			type: 'paragraph',
			text: 'Vite splits development from production. In development, it serves source files through native ESM — no bundling at all. In production, it uses Rollup (and soon Rolldown) for an optimized build. This split is what makes startup instant and HMR sub-100ms regardless of project size.',
		},
		{
			type: 'list',
			items: [
				'Dev server starts in milliseconds, not seconds',
				'HMR updates are sub-100ms even in 1000+ file projects',
				'Native ESM means the browser only loads what the page needs',
				'Production builds use Rollup for well-optimized output',
				'Plugin API is cross-compatible with most Rollup plugins',
			],
		},
		{
			type: 'heading',
			text: 'The Environment API',
		},
		{
			type: 'paragraph',
			text: 'Vite 6 introduces the Environment API — a first-class abstraction for server-side rendering, edge runtimes, and workers. Before this, plugins had to detect environments from context. Now environments are explicit, with their own module graphs and transformations.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// vite.config.ts
export default {
  environments: {
    client: {
      build: {
        outDir: 'dist/client',
      },
    },
    ssr: {
      build: {
        outDir: 'dist/server',
        ssr: true,
      },
      resolve: {
        conditions: ['node'],
      },
    },
    edge: {
      build: {
        outDir: 'dist/edge',
        rollupOptions: {
          output: { format: 'esm' },
        },
      },
      resolve: {
        conditions: ['worker', 'browser'],
      },
    },
  },
};`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'The Environment API is how frameworks like Nuxt, SvelteKit, and Astro will increasingly interoperate. One Vite config, multiple output environments, each with correct semantics.',
		},
		{
			type: 'heading',
			text: 'Rolldown: Rust-Powered Production Builds',
		},
		{
			type: 'paragraph',
			text: 'Rolldown is a Rust rewrite of Rollup by the Vite team. It is API-compatible with Rollup but 10-20x faster on large projects. Vite 6 ships with Rolldown behind a flag; Vite 7 will make it the default.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Enable Rolldown in Vite 6
import { defineConfig } from 'vite';

export default defineConfig({
  experimental: {
    rolldown: true,
  },
});`,
		},
		{
			type: 'heading',
			text: 'What About Turbopack?',
		},
		{
			type: 'paragraph',
			text: 'Turbopack is Vercel/Next.js-specific. For Next.js apps, Turbopack is now the default dev server and increasingly solid for production. For anything else — Vite is the universal option. Vue, Svelte, Solid, SvelteKit, Nuxt, Astro all use Vite. The Next.js Turbopack split is unique to that ecosystem.',
		},
		{
			type: 'heading',
			text: 'Migrating from Webpack',
		},
		{
			type: 'paragraph',
			text: 'For a standard React app with Create React App or a custom Webpack config, migration is usually a day of work. The biggest gotcha is how Vite handles environment variables (import.meta.env instead of process.env) and how it treats non-JS imports (explicit ?url or ?raw suffixes).',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Before — Webpack
import logo from './logo.svg';
const apiUrl = process.env.REACT_APP_API_URL;

// After — Vite
import logo from './logo.svg';
const apiUrl = import.meta.env.VITE_API_URL;

// Non-JS imports with query suffixes
import logoUrl from './logo.svg?url';      // URL string
import logoRaw from './logo.svg?raw';      // Raw file content
import logoData from './logo.svg?inline';  // base64 data URL`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Use vite-plugin-svgr if you need SVG as React components. The import syntax stays identical to CRA, so your existing imports keep working during migration.',
		},
		{
			type: 'heading',
			text: 'Plugin Ecosystem',
		},
		{
			type: 'paragraph',
			text: 'Vite plugins are Rollup-compatible by default, so the existing Rollup plugin ecosystem mostly works. Vite-specific plugins add dev-server hooks and HMR APIs. The essentials: @vitejs/plugin-react, vite-plugin-svgr, vite-tsconfig-paths, and vite-plugin-pwa cover 90% of real-world needs.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: "On xCloud v1, Vite is doing real work — fast cold starts in dev, fast HMR while we are wiring complex dashboard state, and a production build that never feels slow even as the app grows. Vite 6 solidifies its position as the default JavaScript build tool for everything that is not Next.js. The Environment API unifies SSR, edge, and worker builds. Rolldown will close the production-build speed gap that has been Webpack's last holdout. For new projects, Vite is the answer unless you have a specific reason to choose otherwise.",
		},
	],
};

export default post;

import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'tailwind-css-v4-complete-guide',
	title: 'Tailwind CSS v4: A Complete Guide to the New Architecture',
	excerpt:
		'sapan.dev runs on Tailwind v4 — no `tailwind.config.js`, the design tokens live in CSS, and the build is dramatically faster. Notes from the migration off v3 and what the new architecture actually changes day-to-day.',
	thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
	category: 'CSS',
	tags: ['Tailwind CSS', 'CSS', 'Styling', 'Frontend'],
	readTime: 7,
	publishedAt: '2026-02-08',
	featured: true,
	content: [
		{
			type: 'paragraph',
			text: 'When I rebuilt sapan.dev, I jumped straight to Tailwind v4 without a v3 phase. The thing that surprised me most: there is no `tailwind.config.js` at all anymore. The design tokens are CSS custom properties declared in `@theme`, and they become utilities automatically. After years of bouncing between a `tailwind.config.js` and a `globals.css` to keep tokens in sync, this single-source-of-truth feels like a meaningful simplification.',
		},
		{
			type: 'paragraph',
			text: 'Tailwind CSS v4 is not a minor update — it is a ground-up rewrite. The configuration moves from JavaScript to CSS, the build engine is rewritten in Rust (via Lightning CSS), and many conventions that felt essential in v3 are now replaced with better defaults.',
		},
		{
			type: 'heading',
			text: 'The New CSS-First Configuration',
		},
		{
			type: 'paragraph',
			text: 'In v3, all configuration lived in tailwind.config.js. In v4, configuration lives in your CSS file using @theme. This is a fundamental shift that makes your design tokens real CSS custom properties from the start.',
		},
		{
			type: 'code',
			language: 'css',
			code: `/* v4 configuration in CSS */
@import "tailwindcss";

@theme {
  --font-display: "Inter", sans-serif;
  --color-brand: oklch(62% 0.2 240);
  --spacing-18: 4.5rem;
  --radius-card: 1rem;
}`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'Every @theme variable is automatically available as a utility class. --color-brand becomes bg-brand, text-brand, border-brand — no plugin required.',
		},
		{
			type: 'heading',
			text: 'Native Cascade Layers',
		},
		{
			type: 'paragraph',
			text: 'Tailwind v4 uses CSS cascade layers natively, which means Tailwind utilities no longer fight with your custom CSS for specificity. Base styles, components, and utilities are in separate layers, so override order is predictable and explicit.',
		},
		{
			type: 'code',
			language: 'css',
			code: `/* Tailwind internally uses layers */
@layer base { ... }
@layer components { ... }
@layer utilities { ... }

/* Your custom component — always wins over utilities */
@layer components {
  .card {
    background: white;
    border-radius: var(--radius-card);
  }
}`,
		},
		{
			type: 'heading',
			text: 'New Dynamic Utilities',
		},
		{
			type: 'paragraph',
			text: 'v4 introduces a new set of utilities that were either impossible or impractical in v3. These include native container queries, data-* attribute variants, and arbitrary value support that actually understands CSS functions.',
		},
		{
			type: 'list',
			items: [
				'@container queries without a plugin: @lg:flex-row',
				'Data attribute variants: data-[state=open]:block',
				'OKLCH color support in arbitrary values: text-[oklch(70%_0.2_200)]',
				'Logical properties: ms-4, me-4, ps-4, pe-4',
				'Wide gamut colors using the new color-* utilities',
			],
		},
		{
			type: 'heading',
			text: 'Migrating from v3',
		},
		{
			type: 'paragraph',
			text: 'Tailwind provides an official migration guide and codemod. The biggest changes to watch for are the removal of the JIT toggle (always on in v4), the configuration format change, and renamed utilities.',
		},
		{
			type: 'code',
			language: 'bash',
			code: `# Run the official upgrade codemod
npx @tailwindcss/upgrade@next

# Or install manually
npm install tailwindcss@next @tailwindcss/vite`,
		},
		{
			type: 'callout',
			variant: 'warning',
			text: 'The shadow-sm, rounded-sm, and blur-sm utilities now map to larger values than in v3. Test your UI after migrating — visual regressions in these areas are common.',
		},
		{
			type: 'heading',
			text: 'Performance',
		},
		{
			type: 'paragraph',
			text: 'The Lightning CSS-powered engine is dramatically faster. Full rebuilds that took 400ms in v3 now complete in under 50ms. Incremental rebuilds are nearly instant. For large projects, this meaningfully improves developer experience.',
		},
		{
			type: 'heading',
			text: 'Where I Have Landed',
		},
		{
			type: 'paragraph',
			text: 'On sapan.dev with v4, the design system is entirely in CSS — `--color-primary`, `--color-success`, the dark-mode swap pairs (e.g., `text-primary dark:text-success`) — and there is no JavaScript build step for tokens. The `data-[state=open]` variants made the popovers and sheets cleaner. Native container queries with `@lg:flex-row` removed a couple of plugin dependencies. Worth migrating if you are starting fresh; the codemod handles most of the upgrade if you have an existing v3 codebase, but expect to do a visual regression pass afterwards (the renamed shadow/rounded/blur utilities will catch you out).',
		},
	],
};

export default post;

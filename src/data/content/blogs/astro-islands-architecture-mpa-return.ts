import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'astro-islands-architecture-mpa-return',
	title: 'Astro Islands and the Return of the MPA',
	excerpt:
		'Spent a weekend rebuilding the static parts of sapan.dev in Astro to see what the islands model actually feels like. TTI dropped from ~600ms to ~150ms, the JS bundle went from 240KB to 11KB — and there were a few sharp edges that made me appreciate what Next.js handles for free.',
	thumbnail: 'https://images.unsplash.com/photo-1614028480987-73081d86a38b?w=800&q=80',
	category: 'Tooling',
	tags: ['Astro', 'Architecture', 'Islands', 'Performance'],
	readTime: 7,
	publishedAt: '2026-03-22',
	featured: false,
	content: [
		{
			type: 'paragraph',
			text: 'Out of curiosity, I spent a weekend rebuilding the static parts of sapan.dev in Astro. The portfolio is built in Next.js 16 with App Router, but most pages are content-heavy — bio, project lists, the blog index — with only a handful of truly interactive surfaces (theme switcher, language switcher, contact modal). I wanted to see whether the islands model would meaningfully change anything in that shape of project.',
		},
		{
			type: 'paragraph',
			text: 'The numbers were striking on the landing page: TTI dropped from around 600ms to 150ms, and the JS bundle went from 240KB to 11KB. Most of that delta came from React not shipping at all on pages where nothing was actually interactive.',
		},
		{
			type: 'paragraph',
			text: 'Every time a web framework trend cycles, the underlying question is the same — where does the work happen, server or client? Astro takes a pragmatic position. Most pages are mostly static. Ship static HTML. Hydrate only the components that actually need interactivity. Everything else stays HTML.',
		},
		{
			type: 'heading',
			text: 'What an Island Actually Is',
		},
		{
			type: 'paragraph',
			text: 'An island is a single interactive component embedded in an otherwise static page. Each island has its own JavaScript bundle and hydrates independently. The rest of the page — layout, copy, images — is HTML. No virtual DOM, no hydration cost, no framework runtime.',
		},
		{
			type: 'code',
			language: 'astro',
			code: `---
// Server-only code runs at build time
import NavBar from '../components/NavBar.astro';
import SearchBox from '../components/SearchBox.jsx';
import Newsletter from '../components/Newsletter.jsx';

const posts = await fetch('https://cms/posts').then((r) => r.json());
---

<html>
  <body>
    <NavBar /> <!-- Static HTML, zero JS -->

    <main>
      <!-- Interactive island — hydrates in browser -->
      <SearchBox client:load />

      <ul>
        {posts.map((p) => <li>{p.title}</li>)}
      </ul>

      <!-- Hydrates only when visible in viewport -->
      <Newsletter client:visible />
    </main>
  </body>
</html>`,
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'The client:* directives are the key insight. client:load hydrates immediately, client:idle hydrates when the browser is idle, client:visible hydrates when the component enters the viewport, and client:media hydrates based on a media query.',
		},
		{
			type: 'heading',
			text: 'Framework-Agnostic Components',
		},
		{
			type: 'paragraph',
			text: 'Astro runs React, Vue, Svelte, Solid, and Preact components side by side on the same page. You can use a React component library for your complex widgets and ship lightweight Preact for the rest. Each framework contributes its runtime only to its own islands.',
		},
		{
			type: 'heading',
			text: 'When Astro Wins',
		},
		{
			type: 'list',
			items: [
				'Content-heavy sites: blogs, documentation, marketing, portfolios',
				'E-commerce where product pages are mostly static with interactive widgets',
				'Sites where Lighthouse scores and Core Web Vitals matter for SEO',
				'Projects where most pages do not need any client-side JavaScript at all',
				'Teams who want to mix React, Vue, and Svelte without friction',
			],
		},
		{
			type: 'heading',
			text: 'When Next.js Wins',
		},
		{
			type: 'list',
			items: [
				'Highly interactive apps: dashboards, collaborative tools, design tools',
				'Applications where client-side navigation between pages must feel instant',
				'Projects already committed to React Server Components and streaming',
				'Teams leveraging the Next.js + Vercel deployment pipeline',
				'Apps where 80%+ of pages have complex state and handlers',
			],
		},
		{
			type: 'heading',
			text: 'The Critical Difference in Data Fetching',
		},
		{
			type: 'paragraph',
			text: 'Astro builds at build time by default, with SSR available on demand. Next.js defaults to server-rendering with static generation opt-in. For a documentation site that updates weekly, Astro is dramatically simpler. For a dashboard with per-user data, Next.js is the right tool.',
		},
		{
			type: 'heading',
			text: 'Migration Strategy',
		},
		{
			type: 'paragraph',
			text: 'If you have a Gatsby or Hugo site, Astro is an obvious migration — MDX, file-based routing, and content collections all map over cleanly. If you have a Next.js site that is 90% static content, consider splitting — keep the app in Next.js and move the marketing/blog sections to Astro.',
		},
		{
			type: 'code',
			language: 'typescript',
			code: `// Astro Content Collections — typed frontmatter
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };`,
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'For a hybrid strategy, deploy both. Astro on astro.yourdomain.com for marketing/docs, Next.js on app.yourdomain.com for the product. Each framework does what it is best at.',
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'I am not migrating sapan.dev to Astro full-time. The i18n story for 16 locales is a lot smoother in Next.js (next-intl is doing real work there), and React Server Components in App Router cover most of what islands solve for me without leaving the React mental model. The sharp edges I hit in the weekend port were mostly around the i18n routing and around React Query for the contact form — both solvable, neither delightful.',
		},
		{
			type: 'paragraph',
			text: 'But for content-heavy sites where the interactive parts are isolated — a documentation site, a marketing landing page, a single-purpose blog — Astro is genuinely better than what we are doing in Next.js right now. Worth knowing about, even if it is not your daily framework.',
		},
	],
};

export default post;

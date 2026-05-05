import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
	slug: 'mastering-react-server-components-nextjs-15',
	title: 'Mastering React Server Components in Next.js 15',
	excerpt:
		'sapan.dev is built server-component-first across all 16 locales. Notes from designing it that way: the bundle savings, the patterns I keep reaching for, and the moments I had to pull back from "everything server" because the UX needed it.',
	thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
	category: 'React',
	tags: ['React', 'Next.js', 'Server Components', 'Performance'],
	readTime: 8,
	publishedAt: '2026-03-10',
	featured: true,
	content: [
		{
			type: 'paragraph',
			text: "When I rebuilt sapan.dev on Next.js App Router, I went server-component-first by default — every component is a Server Component unless it has a real reason to be a Client Component. After several months in production across 16 locales, the bundle is significantly smaller than the previous Pages Router version, and the patterns have settled into something I would now reach for on most new React projects. Below is what I have learned, including the spots where I had to pull back from 'everything server' because the UX needed local state.",
		},
		{
			type: 'paragraph',
			text: 'React Server Components (RSC) represent one of the most significant architectural shifts in React since hooks. With Next.js 15 making them the default, understanding how to use them effectively is no longer optional — it is essential.',
		},
		{
			type: 'heading',
			text: 'What Are React Server Components?',
		},
		{
			type: 'paragraph',
			text: 'Server Components are React components that run exclusively on the server. They can directly access databases, file systems, and internal services without any client-side JavaScript. Unlike traditional SSR, they do not hydrate on the client — what the server renders is what the browser receives as static HTML.',
		},
		{
			type: 'callout',
			variant: 'info',
			text: 'Key insight: Server Components reduce your JavaScript bundle size dramatically. A component that imports a 200KB markdown parser only ships that parser to the server, not the browser.',
		},
		{
			type: 'heading',
			text: 'Server vs Client Components',
		},
		{
			type: 'paragraph',
			text: 'The distinction between Server and Client components comes down to interactivity and data access. Server Components excel at data fetching and static rendering, while Client Components handle user interaction, browser APIs, and stateful logic.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// Server Component (default in Next.js 15)
async function BlogPost({ slug }: { slug: string }) {
  // Direct database access — no API route needed
  const post = await db.posts.findOne({ slug });

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// Client Component — use only when needed
'use client';

import { useState } from 'react';

function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? 'Liked!' : 'Like'}
    </button>
  );
}`,
		},
		{
			type: 'heading',
			text: 'Patterns for Composing Server and Client Components',
		},
		{
			type: 'paragraph',
			text: 'The most powerful pattern is passing Server Components as children to Client Components. This keeps your interactive wrappers lean while allowing rich server-rendered content inside them.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// ✅ Correct: Pass server component as children
function Page() {
  return (
    <InteractiveWrapper>
      <ServerRenderedContent /> {/* runs on server */}
    </InteractiveWrapper>
  );
}

// ❌ Incorrect: Import server component inside client component
'use client';

import ServerRenderedContent from './ServerRenderedContent'; // breaks!`,
		},
		{
			type: 'heading',
			text: 'Data Fetching Without useEffect',
		},
		{
			type: 'paragraph',
			text: 'Server Components enable a return to simplicity. Instead of managing loading states, error boundaries, and useEffect chains, you write async/await at the component level.',
		},
		{
			type: 'list',
			items: [
				'Fetch data directly in the component — no more prop drilling',
				'Parallel data fetching with Promise.all for performance',
				'Streaming with Suspense boundaries for progressive loading',
				'Automatic request deduplication within a render pass',
			],
		},
		{
			type: 'callout',
			variant: 'tip',
			text: 'Use generateStaticParams() for static pages and revalidate for ISR. This gives you the best of both worlds — static speed with fresh data.',
		},
		{
			type: 'heading',
			text: 'Caching Strategy in Next.js 15',
		},
		{
			type: 'paragraph',
			text: 'Next.js 15 changed the default caching behavior significantly. fetch() calls are no longer cached by default — you must opt in explicitly. This makes caching behavior more predictable and easier to reason about.',
		},
		{
			type: 'code',
			language: 'tsx',
			code: `// Static — cached indefinitely (SSG behavior)
fetch(url, { cache: 'force-cache' })

// Dynamic — no cache (SSR behavior)
fetch(url, { cache: 'no-store' })

// ISR — revalidate every 60 seconds
fetch(url, { next: { revalidate: 60 } })`,
		},
		{
			type: 'heading',
			text: 'Conclusion',
		},
		{
			type: 'paragraph',
			text: 'On sapan.dev, the server-first approach paid off in three concrete ways: the JS bundle is roughly half what the Pages Router version shipped, the locale-aware metadata generates entirely on the server (no flash of wrong language), and a lot of pages now ship with zero client JS at all. Where I pulled back: the contact modal, theme switcher, language switcher, and a handful of GSAP/Three.js scenes — all genuinely local-state interactive, all kept as Client Components without guilt. The mental model that worked best: design the tree as Server Components, and pinpoint Client islands where interactivity actually starts. RSC is not just a perf win — it is a different shape of React, and once you stop fighting it the simpler patterns return.',
		},
	],
};

export default post;

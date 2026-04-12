import type { BlogPost } from '@/types/blog';

export const BLOG_POSTS: BlogPost[] = [
	{
		slug: 'mastering-react-server-components-nextjs-15',
		title: 'Mastering React Server Components in Next.js 15',
		excerpt: 'React Server Components fundamentally change how we think about rendering. Learn how to leverage RSC in Next.js 15 to ship less JavaScript and build faster apps.',
		thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
		category: 'Next.js',
		tags: ['React', 'Next.js', 'Server Components', 'Performance'],
		readTime: 8,
		publishedAt: '2026-03-10',
		featured: true,
		content: [
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
				text: 'React Server Components are not just a performance optimization — they are a new mental model for building web applications. Embrace the server-first mindset, use Client Components sparingly for interactivity, and leverage the full power of async/await for data fetching. The result is faster apps, smaller bundles, and simpler code.',
			},
		],
	},
	{
		slug: 'typescript-5-new-features',
		title: 'TypeScript 5.0: Features That Changed How I Write Code',
		excerpt: 'From const type parameters to variadic tuple types, TypeScript 5.x shipped a wave of features that make the type system more expressive and ergonomic. Here are the ones I reach for every day.',
		thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
		category: 'TypeScript',
		tags: ['TypeScript', 'JavaScript', 'Developer Experience'],
		readTime: 6,
		publishedAt: '2026-02-22',
		featured: true,
		content: [
			{
				type: 'paragraph',
				text: 'TypeScript has been on a remarkable trajectory. Each release brings features that feel like they should have existed from the start. TypeScript 5.x in particular delivered several quality-of-life improvements that I now consider essential in every project.',
			},
			{
				type: 'heading',
				text: 'Const Type Parameters',
			},
			{
				type: 'paragraph',
				text: 'Before const type parameters, getting TypeScript to infer literal types from generic functions required awkward workarounds. Now you can annotate a type parameter with const and TypeScript infers the narrowest possible type.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// Before: TypeScript infers string[]
function makeArray<T>(items: T[]): T[] {
  return items;
}
const arr = makeArray(['a', 'b']); // string[]

// After: TypeScript infers ["a", "b"]
function makeArray<const T extends readonly unknown[]>(items: T): T {
  return items;
}
const arr = makeArray(['a', 'b'] as const); // readonly ["a", "b"]`,
			},
			{
				type: 'heading',
				text: 'Decorators (The Real Ones)',
			},
			{
				type: 'paragraph',
				text: 'TypeScript 5.0 finally shipped the TC39 Stage 3 decorators spec, replacing the experimental decorators that required a compiler flag. This means your decorators are now standards-compliant and future-proof.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `function log(target: any, context: ClassMethodDecoratorContext) {
  return function (this: any, ...args: any[]) {
    console.log(\`Calling \${String(context.name)}\`);
    return target.call(this, ...args);
  };
}

class UserService {
  @log
  getUser(id: string) {
    return fetch(\`/api/users/\${id}\`);
  }
}`,
			},
			{
				type: 'heading',
				text: 'The satisfies Operator',
			},
			{
				type: 'paragraph',
				text: 'The satisfies operator validates that a value conforms to a type without widening it. This is incredibly useful for configuration objects where you want both type safety and inference of literal types.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type Colors = 'red' | 'green' | 'blue';
type ColorConfig = { [K in Colors]?: string };

// Without satisfies: palette.red is string | undefined
const palette: ColorConfig = { red: '#ff0000', green: '#00ff00' };

// With satisfies: palette.red is "#ff0000" (literal type)
const palette = {
  red: '#ff0000',
  green: '#00ff00',
} satisfies ColorConfig;`,
			},
			{
				type: 'heading',
				text: 'Using Declarations',
			},
			{
				type: 'paragraph',
				text: 'TypeScript 5.2 added the using keyword, implementing the TC39 Explicit Resource Management proposal. Resources with a [Symbol.dispose]() method are automatically cleaned up when they leave scope.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `function getConnection() {
  const conn = openDBConnection();
  return {
    query: conn.query.bind(conn),
    [Symbol.dispose]() {
      conn.close();
    },
  };
}

function processData() {
  using conn = getConnection(); // auto-closes on scope exit
  return conn.query('SELECT * FROM users');
}`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Enable useDefineForClassFields and the new decorator support in your tsconfig. Set target to ES2022 or later for the best compatibility with modern decorators.',
			},
			{
				type: 'heading',
				text: 'Performance Improvements',
			},
			{
				type: 'paragraph',
				text: 'Beyond language features, TypeScript 5.x brought significant build performance improvements. The new module resolution modes (bundler, node16, nodenext) more accurately reflect how modern bundlers resolve modules, reducing false type errors.',
			},
			{
				type: 'list',
				items: [
					'--moduleResolution bundler for Vite, esbuild, and similar tools',
					'Project references for monorepo type-checking parallelism',
					'skipLibCheck improvements to speed up initial type checking',
					'Isolated declarations for faster parallel builds',
				],
			},
		],
	},
	{
		slug: 'tailwind-css-v4-complete-guide',
		title: 'Tailwind CSS v4: A Complete Guide to the New Architecture',
		excerpt:
			'Tailwind v4 rewrites the engine from scratch with a CSS-first configuration, native cascade layers, and zero config defaults. Here is everything you need to know to migrate and take advantage of what is new.',
		thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
		category: 'CSS',
		tags: ['Tailwind CSS', 'CSS', 'Styling', 'Frontend'],
		readTime: 7,
		publishedAt: '2026-02-08',
		featured: true,
		content: [
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
		],
	},
	{
		slug: 'building-accessible-ui-components',
		title: 'Building Accessible UI Components: Beyond ARIA Labels',
		excerpt:
			'Accessibility is not a checklist — it is a design constraint that improves the experience for everyone. Learn the patterns that separate truly accessible components from ones that just pass automated audits.',
		thumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
		category: 'Accessibility',
		tags: ['Accessibility', 'HTML', 'ARIA', 'UX'],
		readTime: 9,
		publishedAt: '2026-01-20',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'Most developers learn accessibility from automated auditing tools like axe or Lighthouse. These tools are useful, but they only catch about 30% of real accessibility issues. The rest require understanding what assistive technology users actually experience.',
			},
			{
				type: 'heading',
				text: 'The Focus Management Problem',
			},
			{
				type: 'paragraph',
				text: 'Poor focus management is the most common accessibility failure in modern web apps. When a modal opens, focus must move into it. When it closes, focus must return to the element that triggered it. When a route changes, focus must land somewhere meaningful.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `function Modal({ isOpen, onClose, triggerRef, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus first focusable element in modal
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (firstFocusable as HTMLElement)?.focus();
    } else {
      // Return focus to trigger on close
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  ) : null;
}`,
			},
			{
				type: 'heading',
				text: 'Keyboard Navigation Patterns',
			},
			{
				type: 'paragraph',
				text: 'Different UI patterns have established keyboard interaction models defined by the ARIA Authoring Practices Guide (APG). Following these conventions means keyboard users can predict how your UI behaves without reading documentation.',
			},
			{
				type: 'list',
				items: [
					'Tabs: Arrow keys navigate between tabs, Tab moves focus out of the tab list',
					'Menus: Arrow keys navigate items, Escape closes and returns focus, Home/End jump to first/last',
					'Combobox: Up/Down opens dropdown, Enter selects, Escape cancels',
					'Tree: Arrow keys expand/collapse nodes and move between siblings',
					'Data Grid: Arrow keys move between cells, Enter/Space activate cells',
				],
			},
			{
				type: 'heading',
				text: 'Live Regions for Dynamic Content',
			},
			{
				type: 'paragraph',
				text: "When content updates without a page reload, screen readers need to be told about it. ARIA live regions create a pipeline from your DOM to the screen reader's announcement queue.",
			},
			{
				type: 'code',
				language: 'tsx',
				code: `// Announce non-critical updates (polite — waits for current speech)
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Announce critical updates immediately (interrupts current speech)
<div role="alert">
  {errorMessage}
</div>

// Announce list count changes
<ul aria-live="polite" aria-label={\`\${results.length} search results\`}>
  {results.map(r => <li key={r.id}>{r.title}</li>)}
</ul>`,
			},
			{
				type: 'callout',
				variant: 'warning',
				text: 'Avoid injecting content into live regions on page load — screen readers ignore initial live region content. Only updates after mount trigger announcements.',
			},
			{
				type: 'heading',
				text: 'Color Contrast and Text Sizing',
			},
			{
				type: 'paragraph',
				text: 'WCAG 2.1 AA requires a contrast ratio of 4.5:1 for normal text and 3:1 for large text. But contrast ratios alone do not tell the full story — font weight, letter spacing, and line height also affect readability for people with low vision.',
			},
			{
				type: 'heading',
				text: 'Testing with Real Assistive Technology',
			},
			{
				type: 'paragraph',
				text: 'Automated tools cannot replace testing with actual screen readers. The major combinations are NVDA + Firefox on Windows, JAWS + Chrome on Windows, and VoiceOver + Safari on macOS/iOS. Each has slightly different behavior — test the most common first.',
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Use the Accessibility Insights for Web extension for a guided manual testing workflow. It walks you through the most impactful checks that automated tools miss.',
			},
		],
	},
	{
		slug: 'web-performance-core-web-vitals-2025',
		title: 'Web Performance in 2025: Core Web Vitals and What Actually Matters',
		excerpt:
			"Google's Core Web Vitals are now a significant ranking signal. But beyond SEO, performance directly affects conversion and retention. Here is how to measure, diagnose, and fix the issues that matter most.",
		thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
		category: 'Performance',
		tags: ['Performance', 'Core Web Vitals', 'LCP', 'INP', 'CLS'],
		readTime: 10,
		publishedAt: '2026-01-05',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'Web performance is a user experience problem before it is a technical problem. A 100ms delay in response time causes a 1% drop in revenue at Amazon scale. For most sites, the opportunity cost of poor performance is invisible — but it is always there.',
			},
			{
				type: 'heading',
				text: 'The Three Core Web Vitals',
			},
			{
				type: 'paragraph',
				text: 'Google measures three dimensions of user experience: loading performance (LCP), interactivity (INP), and visual stability (CLS). Each maps to a real user frustration.',
			},
			{
				type: 'list',
				items: [
					'LCP (Largest Contentful Paint): Time until main content is visible. Target: < 2.5s',
					'INP (Interaction to Next Paint): Delay between input and visual response. Target: < 200ms',
					'CLS (Cumulative Layout Shift): Unexpected layout shifts during page lifetime. Target: < 0.1',
				],
			},
			{
				type: 'heading',
				text: 'Fixing LCP: The Low-Hanging Fruit',
			},
			{
				type: 'paragraph',
				text: 'LCP is typically your hero image or largest heading text. The most impactful optimizations are preloading the LCP resource and eliminating render-blocking resources that delay it.',
			},
			{
				type: 'code',
				language: 'html',
				code: `<!-- Preload LCP image — critical for hero sections -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />

<!-- Avoid lazy loading above-the-fold images -->
<img src="/hero.webp" alt="..." loading="eager" fetchpriority="high" />

<!-- Inline critical CSS to eliminate render-blocking -->
<style>
  /* Only the CSS needed for above-the-fold content */
</style>`,
			},
			{
				type: 'heading',
				text: 'INP: The Replacement for FID',
			},
			{
				type: 'paragraph',
				text: 'INP replaced First Input Delay (FID) as a Core Web Vital in 2024. Unlike FID, which measured only the first interaction, INP measures the worst interaction throughout the page lifetime. Long tasks on the main thread are the primary cause of poor INP.',
			},
			{
				type: 'code',
				language: 'javascript',
				code: `// Break up long tasks with scheduler.yield()
async function processLargeDataset(items) {
  const results = [];

  for (let i = 0; i < items.length; i++) {
    results.push(expensiveOperation(items[i]));

    // Yield to the browser every 50 items
    if (i % 50 === 0) {
      await scheduler.yield();
    }
  }

  return results;
}`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Use the Chrome DevTools Performance panel with CPU 4x slowdown to simulate a mid-range Android device. This reveals long tasks that are invisible on developer hardware.',
			},
			{
				type: 'heading',
				text: 'Preventing CLS',
			},
			{
				type: 'paragraph',
				text: 'Layout shift happens when elements change position without user interaction. The most common causes are images without dimensions, dynamically injected content above existing content, and web fonts that cause FOUT.',
			},
			{
				type: 'list',
				items: [
					'Always specify width and height on images — or use aspect-ratio CSS',
					'Reserve space for ads and embeds before they load',
					'Use font-display: optional or swap with size-adjust to prevent FOUT',
					'Avoid inserting content above the fold after load completes',
					'Use CSS transforms for animations instead of properties that trigger layout',
				],
			},
			{
				type: 'heading',
				text: 'Measuring in the Real World',
			},
			{
				type: 'paragraph',
				text: 'Lab data (Lighthouse) and field data (CrUX) often disagree. Lab data is reproducible and actionable; field data reflects real user conditions including device diversity, network quality, and geographic distribution. Both are necessary.',
			},
			{
				type: 'code',
				language: 'javascript',
				code: `// Measure Web Vitals in production with the web-vitals library
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToAnalytics({ name, value, id }) {
  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify({ name, value, id, url: location.href }),
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);`,
			},
		],
	},
	{
		slug: 'state-management-2025-zustand-jotai-redux',
		title: 'State Management in 2025: Zustand, Jotai, and Redux Toolkit',
		excerpt: "The state management landscape has matured significantly. Redux is no longer the only serious option, and choosing the right tool depends on your app's complexity, team size, and data access patterns.",
		thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
		category: 'React',
		tags: ['React', 'State Management', 'Zustand', 'Jotai', 'Redux'],
		readTime: 8,
		publishedAt: '2025-12-15',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'The state management conversation in the React ecosystem has changed dramatically. Context API closed the gap for simple cases, React Query and SWR own server state, and the remaining client state problem is served by a range of lean, focused libraries.',
			},
			{
				type: 'heading',
				text: 'Server State vs Client State',
			},
			{
				type: 'paragraph',
				text: 'Before comparing libraries, the most impactful architectural decision is separating server state from client state. Server state (remote data, async operations) belongs in React Query, SWR, or RTK Query. Client state (UI state, user preferences, shopping cart) belongs in a state manager.',
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'If you are using Redux to store API responses and manage loading states, migrate to React Query first. You may find that very little Redux remains afterward.',
			},
			{
				type: 'heading',
				text: 'Zustand: Simple, Flat, Minimal',
			},
			{
				type: 'paragraph',
				text: 'Zustand is a 1KB state manager built around a single hook. You define a store as a function that returns state and actions — no reducers, no action types, no boilerplate.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `import { create } from 'zustand';

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
};

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  total: () => get().items.reduce((sum, item) => sum + item.price, 0),
}));

// Usage
function CartSummary() {
  const total = useCartStore((state) => state.total());
  return <span>Total: \${total}</span>;
}`,
			},
			{
				type: 'heading',
				text: 'Jotai: Atomic State for Fine-Grained Reactivity',
			},
			{
				type: 'paragraph',
				text: 'Jotai takes a different approach — rather than a single store, you compose state from atoms. Components subscribe only to the atoms they use, minimizing re-renders. This makes it excellent for complex UIs with many independent pieces of state.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `import { atom, useAtom, useAtomValue } from 'jotai';

const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

// Derived async atom
const userAtom = atom(async (get) => {
  const id = get(userIdAtom);
  return fetch(\`/api/users/\${id}\`).then((r) => r.json());
});

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubled = useAtomValue(doubledAtom);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <span>Doubled: {doubled}</span>
    </div>
  );
}`,
			},
			{
				type: 'heading',
				text: 'Redux Toolkit: When You Need the Big Gun',
			},
			{
				type: 'paragraph',
				text: 'Redux Toolkit (RTK) remains the right choice for large applications with complex state interactions, time-travel debugging requirements, or existing Redux codebases. RTK Query in particular is an excellent solution for API state management.',
			},
			{
				type: 'heading',
				text: 'Decision Framework',
			},
			{
				type: 'list',
				items: [
					'Simple app, few global states → Zustand or Context API',
					'Complex UI with many independent states → Jotai',
					'Large team, enterprise app, existing Redux → Redux Toolkit',
					'Server state (API data) → React Query or RTK Query',
					'Form state → React Hook Form (not a state manager)',
				],
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Start with Zustand. It has the lowest learning curve, the smallest bundle, and can scale further than most apps ever need. Switch to RTK if you genuinely need devtools, middleware, or the Redux ecosystem.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'There is no single correct answer for state management in 2025. The question is matching the tool to the problem. Separate server state from client state first, then pick the library that fits your complexity level. The best state manager is the one your team understands and maintains well.',
			},
		],
	},
];

export const FEATURED_BLOGS = BLOG_POSTS.filter((post) => post.featured);
export const BLOGS_PER_PAGE = 6;

export const CATEGORY_COLORS: Record<string, string> = {
	'Next.js': 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
	TypeScript: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
	CSS: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
	Accessibility: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
	Performance: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
	React: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
};

export const DEFAULT_CATEGORY_COLOR = 'bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400';

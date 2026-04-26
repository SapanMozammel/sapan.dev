import type { BlogPost } from '@/types/blog';

export const BLOG_POSTS: BlogPost[] = [
	{
		slug: 'react-compiler-auto-memoization',
		title: 'React Compiler: Write Code, Skip the Optimization',
		excerpt:
			'Notes from running the React Compiler on the BetterDocs admin (a 4-year-old codebase with ~80 components and useMemo scattered everywhere) and starting clean with it on xCloud v1. What broke, what did not, and where I still reach for manual memoization.',
		thumbnail: 'https://images.unsplash.com/photo-1763568258244-9d5aa9c3ce45?w=800&q=80',
		category: 'React',
		tags: ['React', 'React Compiler', 'Performance', 'Optimization'],
		readTime: 7,
		publishedAt: '2026-04-12',
		featured: true,
		content: [
			{
				type: 'paragraph',
				text: 'Halfway through re-architecting the BetterDocs admin panel, I caught myself doing something silly — wrapping a calculation in useMemo, then a few weeks later removing the useMemo because the dependency check turned out to cost more than the calculation it was guarding. That kind of guesswork is what the React Compiler is meant to end. It reads your components, figures out what depends on what, and inserts memoization at build time.',
			},
			{
				type: 'paragraph',
				text: 'I have used it on two pretty different codebases now: BetterDocs admin (4 years old, ~80 components, useMemo grown organically across the surface) and xCloud v1 (greenfield, compiler on from day one). What follows is a mix of how the compiler works and what actually happened when I turned it on.',
			},
			{
				type: 'heading',
				text: 'The Problem It Solves',
			},
			{
				type: 'paragraph',
				text: 'Manual memoization has two failure modes. Over-memoize and you pay for equality checks that never save work — I have watched the React Profiler in Chrome literally show useMemo calls eating more frame time than the calculations they were guarding. Under-memoize and you ship re-renders nobody notices until a designer says the panel feels sluggish during typing. Both mistakes are invisible without profiling, and almost nobody profiles.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `// Before the compiler — manual memoization everywhere
const UserList = memo(({ users, onSelect }) => {
  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users],
  );

  const handleClick = useCallback(
    (user) => onSelect(user.id),
    [onSelect],
  );

  return sortedUsers.map((u) => (
    <UserRow key={u.id} user={u} onClick={handleClick} />
  ));
});

// After the compiler — identical runtime behavior
function UserList({ users, onSelect }) {
  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));

  return sortedUsers.map((u) => (
    <UserRow key={u.id} user={u} onClick={() => onSelect(u.id)} />
  ));
}`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'The compiler emits memoization instructions that React interprets at runtime. Your output bundle is slightly larger than raw source, but meaningfully smaller than hand-memoized code.',
			},
			{
				type: 'heading',
				text: 'How It Decides What To Memoize',
			},
			{
				type: 'paragraph',
				text: 'The compiler performs static analysis on your components to build a dependency graph. It identifies pure computations, stable references, and values derived from props or state. Anything that can be cached safely is cached. Anything ambiguous — side effects, non-deterministic calls, mutations — is left alone.',
			},
			{
				type: 'heading',
				text: 'The Rules of React',
			},
			{
				type: 'paragraph',
				text: 'The compiler only works on code that follows the Rules of React. If you mutate props, read refs during render, or break the rules of hooks, the compiler bails out on that component — sometimes silently. The accompanying ESLint plugin (eslint-plugin-react-compiler) flags violations before they become bugs.',
			},
			{
				type: 'list',
				items: [
					'Components and hooks must be pure — no side effects during render',
					'Never mutate props, state, or values received from hooks',
					'Always follow the rules of hooks (top-level calls, conditional-free)',
					'Do not read refs during render — only in effects or event handlers',
					'Keep effects free of setState in their body unless strictly guarded',
				],
			},
			{
				type: 'heading',
				text: 'Setting It Up',
			},
			{
				type: 'paragraph',
				text: 'The compiler ships as a Babel plugin. For Next.js, Vite, or any build tool that wraps Babel/SWC, enabling it is a configuration change.',
			},
			{
				type: 'code',
				language: 'javascript',
				code: `// next.config.ts
export default {
  experimental: {
    reactCompiler: true,
  },
};

// Or opt in incrementally per directory
export default {
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation', // only components with "use memo"
    },
  },
};`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: "On an older codebase, start with annotation mode. Add 'use memo' directives to your hot paths first (in our case the BetterDocs analytics dashboard, which renders ApexCharts on every state change), measure the win, then flip to full compilation once the rest of the codebase is clean.",
			},
			{
				type: 'heading',
				text: 'What Broke When I Turned It On',
			},
			{
				type: 'paragraph',
				text: 'On a fresh build with the compiler enabled, around 12 of our ~80 BetterDocs admin components bailed out — the compiler refused to process them. The eslint-plugin-react-compiler linter had been quietly flagging those for weeks; the bailouts were mostly conditional hook calls and a few places where we were mutating data received from React Query (an old pattern from before we knew better). About half a day to fix, and the bailout count dropped to two — both intentional, around third-party library boundaries. xCloud v1 had zero bailouts on day one, which is the upside of starting clean.',
			},
			{
				type: 'heading',
				text: 'When I Still Memoize Manually',
			},
			{
				type: 'paragraph',
				text: 'With the compiler on, there are still a few cases where I reach for explicit useMemo. ApexCharts instances on the BetterDocs analytics dashboard re-render heavily on prop identity, so the chart factory has to be memoized at the component boundary. IntersectionObservers in infinite-scroll lists need stable callbacks to avoid teardown-and-reattach cycles. And a couple of older third-party form libraries on the Templately admin compare props by reference — explicit memoization stays in those spots.',
			},
			{
				type: 'heading',
				text: 'Debugging Compiled Code',
			},
			{
				type: 'paragraph',
				text: 'React DevTools shows a compiled badge on components the compiler has processed. If a component is mysteriously absent, either it violated the Rules of React or the compiler could not statically analyze it. The react-compiler-healthcheck CLI reports which files compiled successfully across your project — useful for tracking bailout count down over time.',
			},
			{
				type: 'heading',
				text: 'Where I Have Landed',
			},
			{
				type: 'paragraph',
				text: 'On new projects (xCloud v1 is the first), the compiler is on day one and I do not write useMemo or useCallback at all. On older codebases like BetterDocs, the migration is iterative — fix the lint violations, switch to annotation mode, profile the hot paths, then flip to full compilation. Either way, the era of guessing about memoization is over for me. That is the more important shift, more than any specific bundle-size win.',
			},
		],
	},
	{
		slug: 'view-transitions-api-native-page-animations',
		title: 'View Transitions API: Native Page Animations Finally Work',
		excerpt:
			'Notes from rebuilding sapan.dev with the View Transitions API for navigation across 16 locales. Replaced an entire Framer Motion orchestration layer with a CSS file, found one annoying flash on RTL Arabic, and walked away with a much smaller bundle.',
		thumbnail: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800&q=80',
		category: 'CSS',
		tags: ['CSS', 'Web APIs', 'Animation', 'UX'],
		readTime: 6,
		publishedAt: '2026-04-05',
		featured: true,
		content: [
			{
				type: 'paragraph',
				text: 'Earlier this year I rebuilt sapan.dev to use the View Transitions API for navigation across 16 locales. The previous version used Framer Motion variants to coordinate layout shifts between routes — it worked, but every route change had to be orchestrated by hand and the bundle was paying for it. Switching to View Transitions replaced roughly 200 lines of motion-orchestration code with a small CSS file.',
			},
			{
				type: 'paragraph',
				text: 'For years, smooth page transitions on the web required frameworks like Framer Motion or SPA libraries that hijack navigation. The View Transitions API changes that. It is a native browser API that captures the old DOM, renders the new one, and animates between them — declaratively, with CSS.',
			},
			{
				type: 'heading',
				text: 'The Mental Model',
			},
			{
				type: 'paragraph',
				text: 'A view transition is a snapshot plus a crossfade. The browser captures the current visual state of the page as an image, updates the DOM, captures the new state, and animates between the two. You control the animation with CSS pseudo-elements like ::view-transition-old and ::view-transition-new.',
			},
			{
				type: 'code',
				language: 'javascript',
				code: `// Trigger a same-document transition imperatively
document.startViewTransition(() => {
  // Any DOM updates inside this callback are captured
  updateContent();
});

// With async updates (e.g. after fetching data)
document.startViewTransition(async () => {
  const data = await fetch('/api/posts').then((r) => r.json());
  renderPosts(data);
});`,
			},
			{
				type: 'heading',
				text: 'Same-Document vs Cross-Document',
			},
			{
				type: 'paragraph',
				text: 'Same-document transitions work within a single page — SPA route changes, tab switches, modal opens. Cross-document transitions work across full page loads on multi-page apps. Both use the same CSS API; only the trigger differs.',
			},
			{
				type: 'code',
				language: 'html',
				code: `<!-- Opt in to cross-document transitions in the old and new pages -->
<meta name="view-transition" content="same-origin" />

<!-- Or via CSS -->
<style>
  @view-transition {
    navigation: auto;
  }
</style>`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'Cross-document view transitions require both pages to opt in. Navigate between two pages that both declare the API and the browser coordinates the transition automatically.',
			},
			{
				type: 'heading',
				text: 'Named Transitions for Shared Elements',
			},
			{
				type: 'paragraph',
				text: 'The real magic appears with view-transition-name. Two elements with the same name across the old and new DOM are treated as the same element — the browser interpolates their position, size, and styles. This is how you get Apple-style hero image transitions with nothing but CSS.',
			},
			{
				type: 'code',
				language: 'css',
				code: `/* On the thumbnail in the list view */
.project-card img {
  view-transition-name: project-hero;
}

/* On the full image in the detail view */
.project-detail img {
  view-transition-name: project-hero;
}

/* Customize the morph animation */
::view-transition-old(project-hero),
::view-transition-new(project-hero) {
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}`,
			},
			{
				type: 'heading',
				text: 'Next.js App Router Integration',
			},
			{
				type: 'paragraph',
				text: 'Next.js 15+ supports view transitions as an experimental flag. When enabled, soft navigations (Link clicks) trigger a same-document view transition automatically. You customize the animation purely in CSS.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// next.config.ts
export default {
  experimental: {
    viewTransition: true,
  },
};

// app/globals.css — customize all transitions
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 300ms;
  animation-timing-function: ease-out;
}`,
			},
			{
				type: 'heading',
				text: 'Falling Back Gracefully',
			},
			{
				type: 'paragraph',
				text: 'The View Transitions API is supported in Chromium-based browsers and Safari 18+. Firefox support is in progress. For unsupported browsers, the API simply no-ops — your navigation works without animation. Feature-detect if you need to branch on support.',
			},
			{
				type: 'list',
				items: [
					'Safari 18+ (September 2024) — full support including cross-document',
					'Chrome 111+ / Edge 111+ — same-document since 2023, cross-document in 126+',
					'Firefox — behind flag, expected in stable 2026',
					'For broken fallbacks: check if (document.startViewTransition) before calling',
				],
			},
			{
				type: 'callout',
				variant: 'warning',
				text: 'Respect prefers-reduced-motion. Wrap your view-transition-name declarations in @media (prefers-reduced-motion: no-preference) so users who opt out of animation get instant navigation.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'Rebuilding sapan.dev with View Transitions saved me an entire animation library and made the portfolio feel snappier. The Framer Motion variants for route transitions are deleted, the bundle is smaller, and animations run on the compositor instead of the main thread. One caveat worth flagging: getting it to feel right with RTL Arabic took a couple of tries — view-transition-name on a flex-reversed layout produced a horizontal flash that I eventually fixed by scoping view-transition-name only to LTR locales. For most projects though, this is a clear win and one of the best browser additions in years.',
			},
		],
	},
	{
		slug: 'modern-css-2026-scope-has-container-queries',
		title: 'Modern CSS in 2026: @scope, :has(), and Container Queries',
		excerpt:
			'Modern CSS features I now reach for in every project — and the specific moments on the Templately admin and sapan.dev where each one replaced a chunk of JavaScript or some BEM gymnastics that had been there for years.',
		thumbnail: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=80',
		category: 'CSS',
		tags: ['CSS', 'Modern CSS', 'Container Queries', ':has()'],
		readTime: 8,
		publishedAt: '2026-03-28',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'On the Templately admin redesign last year, I deleted a class-toggling helper that had been carried since the original v1. It existed only because CSS could not select a parent based on its descendants. Then :has() shipped, and the whole helper became three CSS rules. Most of the modern CSS features below have a story like that — they replace something we used to write JavaScript or BEM gymnastics for.',
			},
			{
				type: 'paragraph',
				text: 'Modern CSS has quietly absorbed most of what we used to need JavaScript for. Parent selectors, style scoping, and container-aware layouts are no longer roadmap items — they are shipping in every major browser. If your CSS still looks like 2020, you are writing more code than you need to.',
			},
			{
				type: 'heading',
				text: ':has() — The Parent Selector, Finally',
			},
			{
				type: 'paragraph',
				text: 'The :has() pseudo-class lets you style an element based on its descendants. This was the single most-requested CSS feature for over a decade. It unlocks patterns that previously required JavaScript class toggling.',
			},
			{
				type: 'code',
				language: 'css',
				code: `/* Style a form that has an invalid input */
form:has(input:invalid) {
  border-color: var(--color-danger);
}

/* Style a card differently when it contains an image */
.card:has(img) {
  padding: 0;
}

/* Style a list item based on its sibling */
li:has(+ li:hover) {
  opacity: 0.6;
}

/* Theme the entire page based on a checkbox */
html:has(input[name="theme"]:checked) {
  --bg: #111;
  --text: #eee;
}`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: ':has() is NOT slow. Browser engines optimize it heavily — it runs in constant time for most real-world queries. The "performance concerns" from 2020 no longer apply.',
			},
			{
				type: 'heading',
				text: '@scope — Style Isolation Without CSS-in-JS',
			},
			{
				type: 'paragraph',
				text: 'The @scope at-rule limits a block of styles to a subtree of the DOM. It replaces the awkward BEM conventions and nested selectors that global CSS requires for isolation. Styles apply only within the scope boundary and bleed no further.',
			},
			{
				type: 'code',
				language: 'css',
				code: `/* Styles only apply inside .card, no further */
@scope (.card) {
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    color: var(--secondary-600);
  }
}

/* Lower bound — style stops at .nested-component */
@scope (.widget) to (.nested-component) {
  button {
    background: var(--brand);
  }
}`,
			},
			{
				type: 'heading',
				text: 'Container Queries — Components That Know Their Own Size',
			},
			{
				type: 'paragraph',
				text: 'Media queries respond to the viewport. Container queries respond to a parent element. This matches how components actually work — a card in a sidebar should render differently than the same card in a hero section, regardless of the browser window size.',
			},
			{
				type: 'code',
				language: 'css',
				code: `.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Stack vertically when container is narrow */
@container card (max-width: 400px) {
  .card {
    flex-direction: column;
  }

  .card-image {
    width: 100%;
  }
}

/* Horizontal layout when container has space */
@container card (min-width: 600px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}`,
			},
			{
				type: 'heading',
				text: 'Native CSS Nesting',
			},
			{
				type: 'paragraph',
				text: 'Native nesting removes one of the last reasons to reach for a preprocessor like Sass. The syntax matches CSS Nesting Module Level 1 — slightly different from Sass but close enough that muscle memory transfers.',
			},
			{
				type: 'code',
				language: 'css',
				code: `.button {
  padding: 0.5rem 1rem;
  background: var(--color-primary);

  &:hover {
    background: var(--color-primary-dark);
  }

  &.large {
    padding: 1rem 2rem;
  }

  & .icon {
    margin-right: 0.5rem;
  }
}`,
			},
			{
				type: 'heading',
				text: 'Anchor Positioning',
			},
			{
				type: 'paragraph',
				text: 'Anchor positioning lets absolutely-positioned elements reference other elements as their anchor. This replaces entire JavaScript libraries like Floating UI for tooltips, popovers, and menus. The browser handles collision detection and repositioning automatically.',
			},
			{
				type: 'code',
				language: 'css',
				code: `.tooltip-trigger {
  anchor-name: --trigger;
}

.tooltip {
  position: absolute;
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;

  /* Flip if it would overflow the viewport */
  position-try-options: --top-flip;
}

@position-try --top-flip {
  top: auto;
  bottom: anchor(top);
  translate: -50% -8px;
}`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Combine container queries with :has() for truly reactive components — a card that changes layout based on whether it contains an image AND based on available width.',
			},
			{
				type: 'heading',
				text: 'Browser Support in 2026',
			},
			{
				type: 'paragraph',
				text: 'All features discussed here are supported in current Chrome, Safari, Firefox, and Edge. Anchor positioning is the newest — stable in Chromium 125+, Safari 18.4+, and Firefox 128+. For production apps, feature-detect the newest additions and provide layout fallbacks for the rest.',
			},
			{
				type: 'list',
				items: [
					':has() — universal support since 2023',
					'@scope — universal support since 2024',
					'Container queries — universal support since 2023',
					'Native nesting — universal support since 2023',
					'Anchor positioning — universal support since early 2026',
				],
			},
			{
				type: 'heading',
				text: 'Where These Showed Up On Real Projects',
			},
			{
				type: 'paragraph',
				text: 'Across sapan.dev and the Templately admin redesign, every one of these features pulled its weight. :has() killed off the class-toggling helper. @scope let me drop a BEM convention the team had been carrying for years. Container queries finally let card components stop checking the viewport for layout decisions. Native nesting let me delete Sass from sapan.dev entirely — the build pipeline is one less step. If your CSS still looks like 2020, it is more verbose than it needs to be.',
			},
		],
	},
	{
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
	},
	{
		slug: 'biome-rust-toolchain-eslint-prettier',
		title: 'Biome: The Rust Toolchain Replacing ESLint and Prettier',
		excerpt:
			'Migrated sapan.dev from ESLint + Prettier to Biome over a weekend — pre-commit hooks went from ~12s to under a second, and the config dropped from three files to one. Notes on what migrated cleanly and what I had to keep ESLint for.',
		thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
		category: 'Tooling',
		tags: ['Biome', 'Tooling', 'ESLint', 'Prettier', 'Rust'],
		readTime: 7,
		publishedAt: '2026-03-18',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'On sapan.dev, the pre-commit hook was getting irritating. ESLint + Prettier + import sort across roughly 200 TypeScript files took about 12 seconds — long enough that I started skipping the hook on small commits, which is exactly the wrong direction. Migrated to Biome over a weekend and the same hook now runs in under a second. Both my git commit reflexes and my CI minutes are happier.',
			},
			{
				type: 'paragraph',
				text: 'ESLint and Prettier have defined JavaScript tooling for nearly a decade. Both are written in JavaScript. On a medium codebase, a full lint + format pass can take 20 seconds. Biome, written in Rust, does the same work in 200 milliseconds. That 100x speedup changes what tooling you can run in a pre-commit hook and what feedback loops you can afford.',
			},
			{
				type: 'heading',
				text: 'What Biome Replaces',
			},
			{
				type: 'paragraph',
				text: 'Biome is a single binary that does linting, formatting, import sorting, and type-aware analysis. One config file, one command, one dependency. The scope overlaps roughly 80% with ESLint + Prettier + typescript-eslint + eslint-plugin-import combined.',
			},
			{
				type: 'code',
				language: 'bash',
				code: `# Install
npm install --save-dev --save-exact @biomejs/biome

# Initialize config
npx biome init

# Lint and format the whole project
npx biome check --write .

# In CI, check without writing
npx biome check .`,
			},
			{
				type: 'heading',
				text: 'One Config, biome.json',
			},
			{
				type: 'paragraph',
				text: 'Replacing three tools with one collapses three config files into one. The rule system is compatible with most ESLint rules by name, and the formatter closely matches Prettier defaults.',
			},
			{
				type: 'code',
				language: 'json',
				code: `{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always",
      "trailingCommas": "all"
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "noParameterAssign": "error",
        "useConst": "error"
      },
      "suspicious": {
        "noExplicitAny": "error"
      }
    }
  },
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}`,
			},
			{
				type: 'heading',
				text: 'The Speed Is Not Hype',
			},
			{
				type: 'paragraph',
				text: 'On a 500-file TypeScript monorepo, typical numbers: ESLint + Prettier + organize-imports takes 18 seconds. Biome takes 0.4 seconds. That is not a 2x improvement — it is a qualitatively different tool. Pre-commit hooks run instantly. CI pipelines reclaim minutes. Editors report errors faster than you can finish typing.',
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'Biome parses your code once in Rust and runs all checks in parallel. ESLint parses each file in JavaScript and runs rules sequentially. The difference is structural, not just implementation.',
			},
			{
				type: 'heading',
				text: 'Migrating from ESLint + Prettier',
			},
			{
				type: 'paragraph',
				text: 'Biome ships a migration command that reads your existing .eslintrc and .prettierrc files and generates a biome.json matching your current rules as closely as possible. It will not translate custom rules or obscure plugins, but the 80% case is automated.',
			},
			{
				type: 'code',
				language: 'bash',
				code: `# Migrate from ESLint + Prettier configs
npx biome migrate eslint --write
npx biome migrate prettier --write

# Verify by running both tools and comparing output
npx eslint . --format json > eslint.json
npx biome check . --reporter json > biome.json`,
			},
			{
				type: 'heading',
				text: 'Where Biome Is Not Yet Ready',
			},
			{
				type: 'paragraph',
				text: 'Biome is an excellent default for most projects but has known gaps. If your codebase depends on these, you may need to keep ESLint alongside Biome or delay migration until coverage improves.',
			},
			{
				type: 'list',
				items: [
					'Custom ESLint rules with no Biome equivalent — no plugin system yet',
					'Type-aware rules that require full TypeScript compilation — Biome uses its own parser',
					'Niche framework rules (eslint-plugin-jsx-a11y, eslint-plugin-react-hooks coverage is partial)',
					'Yaml, TOML, or other non-JS formats — Biome is JS/TS/JSON/JSX only',
					'Stylelint equivalent for CSS — Biome handles CSS but less comprehensively',
				],
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Run Biome alongside ESLint during migration. Let Biome handle formatting and the rules it supports, and keep ESLint for anything Biome cannot replicate. Over time, Biome catches up and you can drop ESLint entirely.',
			},
			{
				type: 'heading',
				text: 'Editor Integration',
			},
			{
				type: 'paragraph',
				text: 'The official VS Code and JetBrains extensions provide format-on-save, quick-fixes, and inline diagnostics. Performance is dramatically better than the ESLint extension because Biome processes files instantly. The language server runs the same Rust binary as the CLI, so behavior is consistent across editors and CI.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'On sapan.dev I kept ESLint around for two things Biome does not yet cover well: the next-intl plugin (locale-key checks) and a couple of project-specific custom rules. Biome handles formatting and 90% of linting; ESLint runs as a smaller second pass on those holdouts. Slightly less tidy than I would like, but the speed win is so big that the hybrid setup is still a net improvement. For most projects Biome is already the right default — faster, simpler, less dependency management. The remaining gaps close every monthly release.',
			},
		],
	},
	{
		slug: 'edge-computing-frontend-cloudflare-workers',
		title: 'Edge Computing for Frontend Developers',
		excerpt:
			'On sapan.dev the locale-detection logic lives at Vercel Edge — sub-30ms response from anywhere on the planet. On TubeOnAI we used Cloudflare Workers for auth-token validation. Notes on what genuinely belongs at the edge and what I have learned the hard way to keep regional.',
		thumbnail: 'https://images.unsplash.com/photo-1719253480609-579ad1622c65?w=800&q=80',
		category: 'Performance',
		tags: ['Edge', 'Cloudflare', 'Workers', 'Performance', 'Deployment'],
		readTime: 8,
		publishedAt: '2026-03-14',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'sapan.dev serves traffic from 16 locales. The first time I deployed it as a regional Vercel function, a friend in Singapore reported the locale redirect taking 600ms — not the page render, just the redirect deciding which language to serve. After moving the locale-detection middleware to Vercel Edge, the same redirect runs in under 30ms anywhere. That is the kind of win edge runtimes give you on frontend-shaped workloads.',
			},
			{
				type: 'paragraph',
				text: 'Traditional serverless ran in a handful of cloud regions. Cold starts took 500ms. Your Tokyo user talked to an us-east-1 server. Edge computing fixes this by running your code in every major city on Earth. Cold starts measured in milliseconds. Round-trip latency under 50ms for nearly every user. For frontend-heavy workloads, the win is substantial.',
			},
			{
				type: 'heading',
				text: 'What Makes the Edge Different',
			},
			{
				type: 'paragraph',
				text: 'Edge runtimes trade the full Node.js API surface for extreme efficiency. They boot in milliseconds by using V8 isolates instead of full processes. No module loading, no dependency initialization — just execution. The tradeoff is that many Node APIs are unavailable.',
			},
			{
				type: 'list',
				items: [
					'No filesystem access — no fs.readFile, no native modules',
					'No process spawning — no child_process, no native binaries',
					'Limited npm compatibility — libraries depending on Node APIs fail',
					'Fetch, streams, and Web Crypto work normally — web-standard APIs only',
					'Execution time caps: typically 30-50ms CPU per request',
				],
			},
			{
				type: 'heading',
				text: 'The Big Three Edge Platforms',
			},
			{
				type: 'paragraph',
				text: 'Cloudflare Workers, Vercel Edge Functions, and Deno Deploy are the dominant options. They differ in pricing, bundled storage, and developer experience, but the core execution model is the same — V8 isolates, web-standard APIs, global distribution.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// Cloudflare Worker
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const user = await env.KV.get(\`user:\${url.searchParams.get('id')}\`);
    return Response.json({ user });
  },
};

// Vercel Edge Function
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const country = req.headers.get('x-vercel-ip-country');
  return Response.json({ country });
}

// Deno Deploy
Deno.serve((req) => {
  return new Response('Hello from ' + Deno.env.get('DENO_REGION'));
});`,
			},
			{
				type: 'heading',
				text: 'Cloudflare Workers Bindings',
			},
			{
				type: 'paragraph',
				text: 'Workers become dramatically more powerful when combined with Cloudflare storage — KV for low-latency key-value, R2 for object storage, D1 for SQLite at the edge, Durable Objects for strongly-consistent state. All bindings are zero-config — you declare them in wrangler.toml and access them via the env parameter.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// wrangler.toml
// [[kv_namespaces]]
// binding = "SESSIONS"
// id = "abc123..."

export default {
  async fetch(req: Request, env: Env) {
    const sessionId = getCookie(req, 'sid');

    // KV is strongly consistent in the origin region,
    // eventually consistent at other edges (~60s)
    const session = await env.SESSIONS.get(sessionId, 'json');

    if (!session) return Response.redirect('/login', 302);
    return new Response(\`Welcome \${session.user}\`);
  },
};`,
			},
			{
				type: 'heading',
				text: 'What Belongs at the Edge',
			},
			{
				type: 'paragraph',
				text: 'Not every route benefits from edge execution. The win is biggest when the response depends on the request origin, when latency matters, and when state is read more than written.',
			},
			{
				type: 'list',
				items: [
					'Authentication and session validation — fast failure paths',
					'Personalization — A/B tests, feature flags, locale redirects',
					'API gateways and request routing — rewriting URLs, adding headers',
					'Image transformation and resizing on the fly',
					'Content negotiation based on geo or user-agent',
					'Edge rendering of static pages with tiny dynamic pieces',
				],
			},
			{
				type: 'heading',
				text: 'What Should Stay in Traditional Servers',
			},
			{
				type: 'list',
				items: [
					'Long-running computation beyond the CPU budget',
					'Large file processing or streaming from local disk',
					'Workloads that need PostgreSQL, Redis, or other non-HTTP databases directly',
					'Complex business logic with deep node_modules trees',
					'Anything that assumes a stable filesystem or long-lived memory state',
				],
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'The typical pattern is hybrid — edge for auth/personalization/routing, regional serverless or traditional servers for heavy business logic and database-intensive work. The edge becomes the entry point, not the only layer.',
			},
			{
				type: 'heading',
				text: 'Cold Start Reality',
			},
			{
				type: 'paragraph',
				text: 'Cloudflare Workers V8 isolate cold starts are consistently under 5ms. Vercel Edge Functions are similar. Compare to AWS Lambda where cold starts are 200-500ms for Node and multi-second for larger runtimes. For latency-sensitive routes, edge removes an entire class of performance problems.',
			},
			{
				type: 'heading',
				text: 'The Cost Model',
			},
			{
				type: 'paragraph',
				text: 'Edge pricing is typically per-request plus CPU time, which makes it extremely cheap for high-volume low-CPU work (auth checks, redirects) and relatively expensive for heavy compute. The Cloudflare free tier is generous — 100k requests per day, enough to run a hobby project indefinitely. Production workloads at scale compete favorably with Lambda for most frontend patterns.',
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Start edge-first for new projects. If you hit a limitation (database driver, CPU budget), fall back to regional. The reverse migration — from regional to edge — is much harder because you have likely taken deep dependencies on Node APIs.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'On TubeOnAI we tried running auth-token verification at the edge using Cloudflare Workers — straightforward win, the validation is fast and stateless. We also tried doing the AI summarization itself there, briefly, and that was a mistake. Long-running compute, big SDK trees, and direct database access all want a regional function. The pattern that worked for us: edge for auth, redirects, locale routing, simple personalization; regional for anything heavy. Edge is less about replacing your backend and more about collapsing the auth/routing layer closer to the user. Done right, the experience feels noticeably snappier than it has any right to.',
			},
		],
	},
	{
		slug: 'branded-types-typescript-domain-modeling',
		title: 'Branded Types: Domain Modeling with TypeScript',
		excerpt:
			'On the Templately admin we had four different ID types passed around as strings — TemplateId, CategoryId, UserId, OrganizationId — and the bugs that came from mixing them were hard to spot in code review. Branded types fixed that. Notes on the pattern and when it actually pays off.',
		thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
		category: 'TypeScript',
		tags: ['TypeScript', 'Types', 'Domain Modeling', 'Type Safety'],
		readTime: 6,
		publishedAt: '2026-03-05',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'On the Templately admin codebase, we hit this bug at least three times: a function expecting a TemplateId got passed a CategoryId. Both are strings. TypeScript happily allowed it. The actual error only showed up at runtime when the API returned an empty result and the UI silently rendered an empty state. Each time, the fix was the same — add a runtime check, write a regression test, move on. Branded types eliminated the whole class.',
			},
			{
				type: 'paragraph',
				text: 'The TypeScript type system is structural — two types with the same shape are interchangeable. That is usually a feature, but it becomes a liability when different concepts happen to share the same primitive. A UserId and a PostId are both strings. A USD amount and a EUR amount are both numbers. Mixing them up is a bug TypeScript happily lets through.',
			},
			{
				type: 'heading',
				text: 'The Pattern',
			},
			{
				type: 'paragraph',
				text: 'A branded type is a primitive tagged with a phantom field that exists only in the type system. The runtime value is unchanged — just a string or a number — but TypeScript treats it as distinct from any other string or number.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// The brand helper — zero runtime cost
declare const brand: unique symbol;
type Brand<T, B> = T & { readonly [brand]: B };

// Your domain types
type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;
type Email = Brand<string, 'Email'>;

// Constructor — the only way to create a branded value
function UserId(raw: string): UserId {
  return raw as UserId;
}

function Email(raw: string): Email {
  if (!raw.includes('@')) {
    throw new Error('Invalid email');
  }
  return raw as Email;
}`,
			},
			{
				type: 'heading',
				text: 'What It Buys You',
			},
			{
				type: 'paragraph',
				text: 'The moment you brand your IDs, the compiler starts catching bugs that used to require manual code review. Passing a PostId where a UserId is expected becomes a type error, not a production incident.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `function getUser(id: UserId): Promise<User> { /* ... */ }
function getPost(id: PostId): Promise<Post> { /* ... */ }

const userId = UserId('user_123');
const postId = PostId('post_456');

getUser(userId);      // ✅ OK
getUser(postId);      // ❌ Type error: PostId is not UserId
getUser('user_123');  // ❌ Type error: string is not UserId`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'The cast inside UserId() is the only place in your code that bypasses the type system. Funnel every untrusted string through a constructor and the rest of your codebase becomes type-safe by construction.',
			},
			{
				type: 'heading',
				text: 'Validated Brands',
			},
			{
				type: 'paragraph',
				text: 'The real power of branded types emerges when you combine them with runtime validation. The constructor function becomes the single source of truth — a validated value is both runtime-verified and compile-time tracked.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type NonEmptyString = Brand<string, 'NonEmptyString'>;
type PositiveInt = Brand<number, 'PositiveInt'>;

function NonEmptyString(raw: string): NonEmptyString {
  if (raw.length === 0) throw new Error('Empty string');
  return raw as NonEmptyString;
}

function PositiveInt(raw: number): PositiveInt {
  if (!Number.isInteger(raw) || raw <= 0) {
    throw new Error('Not a positive integer');
  }
  return raw as PositiveInt;
}

// Function signatures now encode their invariants
function chargeCents(amount: PositiveInt): void {
  // No need to check if amount > 0 — the type guarantees it
  stripe.charges.create({ amount });
}`,
			},
			{
				type: 'heading',
				text: 'Money, Units, and Measurements',
			},
			{
				type: 'paragraph',
				text: 'Branded types shine for anywhere two numbers with different units get mixed up. Adding USD to EUR, milliseconds to seconds, pixels to rems — all classic bugs that brands prevent at the type level.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type USD = Brand<number, 'USD'>;
type EUR = Brand<number, 'EUR'>;
type Milliseconds = Brand<number, 'Milliseconds'>;
type Seconds = Brand<number, 'Seconds'>;

function convertUsdToEur(amount: USD, rate: number): EUR {
  return (amount * rate) as EUR;
}

const price = 100 as USD;
const discount = 20 as USD;
const total = price - discount; // OK — both USD

const eur = 50 as EUR;
const mixed = price + eur; // ❌ Type error`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Use branded types for IDs, monetary amounts, time durations, measurement units, SQL query strings, and anything that users of your API might confuse. Do not brand purely-internal values — the ergonomic cost is not worth it.',
			},
			{
				type: 'heading',
				text: 'The Tradeoff',
			},
			{
				type: 'paragraph',
				text: 'Branded types add friction at the boundaries of your system — you need to convert raw strings from HTTP requests, databases, and third-party libraries into branded values via constructor functions. This friction is actually a feature. It forces validation at the edges and keeps your core logic operating on trusted values.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'On the Templately admin, after we branded TemplateId, CategoryId, UserId, and OrganizationId, the ID-confusion bugs stopped recurring. We did not catch a single new instance in the next six months — the compiler caught them at PR time instead. The friction at the system boundaries was real (every API response had to go through a constructor) but the friction is the point: it forces validation at the edges. Branded types feel awkward for the first day and liberating for the next several years. For any codebase large enough to have multiple ID types or unit systems, they pay for themselves quickly.',
			},
		],
	},
	{
		slug: 'zod-typescript-runtime-validation',
		title: 'Zod Meets TypeScript: Runtime-Safe Types at the Boundaries',
		excerpt:
			'On TubeOnAI we wired Zod into every API boundary, every form, and every Firebase response — and the next month our error tracker stopped recording shape-mismatch bugs entirely. Notes on the Zod patterns I now reach for by default.',
		thumbnail: 'https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?w=800&q=80',
		category: 'TypeScript',
		tags: ['TypeScript', 'Zod', 'Validation', 'Runtime Safety'],
		readTime: 7,
		publishedAt: '2026-02-15',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'Early on at TubeOnAI, our error tracker (Sentry) was reporting a steady trickle of "cannot read property of undefined" bugs that all traced back to API responses not matching the TypeScript types we expected. The types said one shape, the API returned another, and the bug only surfaced when a user clicked through to a screen that depended on the missing field. We rewrote the data layer to push every API response through a Zod schema. The shape-mismatch bugs in Sentry dropped to zero the following month.',
			},
			{
				type: 'paragraph',
				text: 'TypeScript is erased at runtime. The moment data enters your app from an API, a form, a URL parameter, or localStorage, your types are a hope rather than a guarantee. Zod is the most popular library for closing that gap — schemas that validate at runtime and infer types at compile time, from a single source of truth.',
			},
			{
				type: 'heading',
				text: 'Schema First, Types Auto-Generated',
			},
			{
				type: 'paragraph',
				text: 'The Zod workflow inverts the usual TypeScript flow. Instead of writing a type and hoping the data matches, you write a schema that validates the data and get the type for free.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `import { z } from 'zod';

// Define the schema once
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.coerce.date(),
  metadata: z.record(z.unknown()).optional(),
});

// Type inferred from schema — no duplication
type User = z.infer<typeof UserSchema>;

// Parse runtime data safely
const result = UserSchema.safeParse(untrustedData);

if (result.success) {
  // result.data is typed as User
  console.log(result.data.email);
} else {
  // result.error is a ZodError with detailed paths
  console.error(result.error.issues);
}`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'z.infer<typeof Schema> is the magic. Your schema is a single source of truth for both runtime validation and compile-time types. Update the schema, types update automatically.',
			},
			{
				type: 'heading',
				text: 'Where to Apply It',
			},
			{
				type: 'paragraph',
				text: 'Zod belongs at every boundary where untrusted data enters your system. API response parsing, form submission handling, URL parameter decoding, environment variable validation, localStorage reads, WebSocket messages — anywhere the TypeScript compiler has no way to verify shape.',
			},
			{
				type: 'list',
				items: [
					'API responses — wrap fetch calls and parse the response before using it',
					'Environment variables — validate process.env at startup, crash early if missing',
					'URL search params and route parameters — never trust user input',
					'Form submissions — validate before sending to the server',
					'localStorage and sessionStorage — data may have been written by an older app version',
					'Third-party SDK responses — external APIs change without warning',
				],
			},
			{
				type: 'heading',
				text: 'API Response Validation Pattern',
			},
			{
				type: 'paragraph',
				text: 'Wrap your fetch calls in a helper that parses the response through a Zod schema. Your business logic never sees unvalidated data.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `async function fetchTyped<T extends z.ZodTypeAny>(
  url: string,
  schema: T,
  init?: RequestInit,
): Promise<z.infer<T>> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

  const json = await res.json();
  return schema.parse(json);
}

// Usage — fully type-safe
const PostsSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  publishedAt: z.coerce.date(),
}));

const posts = await fetchTyped('/api/posts', PostsSchema);
// posts is Array<{ id: string; title: string; publishedAt: Date }>`,
			},
			{
				type: 'heading',
				text: 'Form Validation with React Hook Form',
			},
			{
				type: 'paragraph',
				text: 'Zod pairs naturally with React Hook Form via @hookform/resolvers. One schema drives field-level validation, error messages, and the final submitted type.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const SignupSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
});

type SignupData = z.infer<typeof SignupSchema>;

function SignupForm() {
  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
  });

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}`,
			},
			{
				type: 'heading',
				text: 'Transforms and Preprocessors',
			},
			{
				type: 'paragraph',
				text: 'Zod can transform data as it validates. Coerce strings to numbers, trim whitespace, uppercase emails, parse JSON — transformation and validation happen in one pass.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.string().url(),
  DEBUG: z.coerce.boolean().default(false),
  ALLOWED_ORIGINS: z.string().transform((s) => s.split(',').map((o) => o.trim())),
});

// Parse at startup — app crashes with clear error if misconfigured
export const env = EnvSchema.parse(process.env);`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Use safeParse when you can recover from invalid data (form fields, optional features). Use parse when invalid data is unrecoverable (env vars at startup, critical API contracts). The difference is crashing early vs rendering an error message.',
			},
			{
				type: 'heading',
				text: 'Bundle Size Considerations',
			},
			{
				type: 'paragraph',
				text: 'Zod is 15KB minified + gzipped. For most apps that is fine. If bundle size matters more than features, consider Valibot (3KB) or the newer ArkType which compiles schemas to validator functions. The API shape is similar enough that migration is mechanical.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'On TubeOnAI, the Zod migration paid for itself by the second sprint — Sentry stopped flagging shape-mismatch errors, the form validation got tighter, and the engineers added schemas faster than I expected once the pattern was visible. Runtime validation is not optional for production TypeScript code. The only real choice is whether you validate with a schema library or by hand. Zod wins because it is expressive, composable, and generates types directly from schemas — removing the worst kind of duplication.',
			},
		],
	},
	{
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
	},
	{
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
	},
	{
		slug: 'react-19-actions-use-action-state',
		title: 'React 19 Actions and useActionState',
		excerpt:
			'On the sapan.dev contact form I rewrote the React Hook Form + manual pending/error setup as a single useActionState call. The component dropped from ~80 lines to ~30, and useOptimistic gave the submit button a snappier feel. Notes on what Actions actually replace.',
		thumbnail: 'https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=800&q=80',
		category: 'React',
		tags: ['React', 'React 19', 'Forms', 'Server Actions'],
		readTime: 7,
		publishedAt: '2025-12-28',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'When I rewrote the sapan.dev contact form last quarter, the original implementation had useState for pending, useState for error, useState for the success message, and a try/catch wrapping the API call — with all the careful ordering you need to avoid stale closures and double-submits. The React 19 rewrite collapsed it into a single useActionState. The component went from roughly 80 lines to 30 and a couple of subtle race conditions disappeared on the way.',
			},
			{
				type: 'paragraph',
				text: 'Handling a form submission in React used to require useState for the pending flag, useState for the error, useState for the result, try/catch around the async call, and careful ordering to avoid stale closures. React 19 collapses all of that into Actions — async functions you pass to forms or call from useActionState.',
			},
			{
				type: 'heading',
				text: 'The Old Pattern',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `// Before React 19 — the boilerplate
function UpdateName() {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      await updateName(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button disabled={isPending}>Save</button>
      {error && <p>{error}</p>}
    </form>
  );
}`,
			},
			{
				type: 'heading',
				text: 'The New Pattern',
			},
			{
				type: 'paragraph',
				text: 'React 19 introduces Actions — async functions you pass to form actions or to useActionState. React handles the pending state, the errors, and the transition scheduling for you.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `import { useActionState } from 'react';

function UpdateName() {
  const [error, submitAction, isPending] = useActionState(
    async (previousError: string | null, formData: FormData) => {
      const name = formData.get('name') as string;
      try {
        await updateName(name);
        return null;
      } catch (err) {
        return err.message;
      }
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input name="name" />
      <button disabled={isPending}>Save</button>
      {error && <p>{error}</p>}
    </form>
  );
}`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'Notice what is not there: no onSubmit, no preventDefault, no useState for pending/error, no try/finally. React 19 handles all of it through the form action attribute and useActionState.',
			},
			{
				type: 'heading',
				text: 'Server Actions in Next.js',
			},
			{
				type: 'paragraph',
				text: 'When paired with Next.js, Actions become Server Actions — async functions marked with "use server" that run on the server. The client form posts directly to the server function. No API route, no fetch, no JSON serialization. The browser and server communicate through a native web primitive.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const post = await db.posts.create({
    data: { title, content, authorId: userId },
  });

  revalidatePath('/posts');
  return post;
}

// app/new-post/page.tsx
import { createPost } from '../actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Publish</button>
    </form>
  );
}`,
			},
			{
				type: 'heading',
				text: 'useOptimistic: Instant UI Updates',
			},
			{
				type: 'paragraph',
				text: 'useOptimistic pairs with Actions to show the result of a mutation immediately while the real request is in flight. If the server call fails, React reverts. If it succeeds, the optimistic state is seamlessly replaced with the real data.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `function PostList({ posts }: { posts: Post[] }) {
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (current, newPost: Post) => [...current, newPost],
  );

  async function submitAction(formData: FormData) {
    const draft: Post = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      status: 'pending',
    };

    addOptimisticPost(draft);
    await createPost(formData);
  }

  return (
    <>
      {optimisticPosts.map((p) => (
        <Post key={p.id} post={p} pending={p.status === 'pending'} />
      ))}
      <form action={submitAction}>
        <input name="title" required />
      </form>
    </>
  );
}`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Optimistic UI works best for low-stakes mutations where failures are rare (likes, comments, task checkboxes). For high-stakes actions (payments, irreversible changes), show a pending spinner instead.',
			},
			{
				type: 'heading',
				text: 'useFormStatus: Decoupled Loading States',
			},
			{
				type: 'paragraph',
				text: "Child components can read the parent form's pending status with useFormStatus. This decouples loading UI from the form component itself — a submit button knows when its enclosing form is submitting without prop drilling.",
			},
			{
				type: 'code',
				language: 'tsx',
				code: `import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}

// Parent form — no pending prop needed
function ProfileForm() {
  return (
    <form action={updateProfile}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}`,
			},
			{
				type: 'heading',
				text: 'The Migration Picture',
			},
			{
				type: 'paragraph',
				text: 'Actions are additive — existing useState-based forms keep working. Migrate form by form. Start with submit handlers that only set pending/error state (trivial conversion), then tackle forms with complex validation (add useOptimistic for instant feedback), and finally convert server communication to Server Actions if you are on Next.js.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'After the sapan.dev contact form rewrite, every new form I write reaches for useActionState first and falls back to React Hook Form only when the form has complex per-field validation logic. React 19 Actions do for forms what hooks did for state — the boilerplate disappears, the common cases become one-liners, and the complex cases become tractable. Combined with Server Actions and useOptimistic, the three-layer dance of client state, API call, and server mutation collapses into a single async function. Worth migrating one form at a time as you touch them.',
			},
		],
	},
	{
		slug: 'web-workers-offload-main-thread',
		title: 'Web Workers in Modern Frontend: Offloading the Main Thread',
		excerpt:
			'The BetterDocs analytics dashboard parses 30-day docs traffic into ApexCharts on every state change — and it was visibly stuttering when the dataset got large. Moved the parsing into a Web Worker and the panel stopped jank-locking the input field. Notes on what belongs in a worker and what does not.',
		thumbnail: 'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=800&q=80',
		category: 'Performance',
		tags: ['Web Workers', 'Performance', 'Concurrency', 'INP'],
		readTime: 8,
		publishedAt: '2025-11-20',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'The BetterDocs analytics dashboard renders ApexCharts on every state change — page-view trends, search queries, top documents, the usual. With a small dataset it is fine, but on workspaces with a few months of history the chart-data preparation took 80-120ms per render. The user noticed this as a typing lag in the date-range filter — every keystroke recomputed the data, and every recomputation blocked the input. The fix was to move the data shaping into a Web Worker.',
			},
			{
				type: 'paragraph',
				text: "The browser's main thread has to do too many things at once. Paint the frame. Run your React render. Handle the mouse click. Parse the JSON response. If any of these takes more than 16ms, the user sees jank. Web Workers are the built-in answer — separate JavaScript threads that run in parallel and cannot block the UI.",
			},
			{
				type: 'heading',
				text: 'What Belongs in a Worker',
			},
			{
				type: 'paragraph',
				text: 'A worker is most useful for pure CPU-bound work that can be expressed as a function — input in, output out, no DOM access. The overhead of postMessage plus structured cloning means tiny tasks are faster on the main thread; the win appears once a task costs more than 10-20ms.',
			},
			{
				type: 'list',
				items: [
					'Parsing large JSON, CSV, or XML payloads',
					'Image manipulation with canvas (OffscreenCanvas works in workers)',
					'Running a search algorithm over a large client-side dataset',
					'Computing diffs, minimaps, or visualizations from raw data',
					'Parsing and validating with heavy libraries (Zod schemas for 10k records)',
					'Hashing, encryption, and compression (though Web Crypto on main is often OK)',
					'Running WebAssembly-heavy work like PDF generation or on-device ML',
				],
			},
			{
				type: 'heading',
				text: 'The Modern Worker Syntax',
			},
			{
				type: 'paragraph',
				text: 'Vite, Next.js, and Webpack 5 all support a native worker import syntax. No separate chunk configuration, no inline worker strings — just import the file with a ?worker suffix and you get a Worker constructor.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// worker.ts — runs in a separate thread
self.onmessage = (e: MessageEvent<string>) => {
  const result = expensiveParse(e.data);
  self.postMessage(result);
};

// main.ts — runs on the main thread
import MyWorker from './worker.ts?worker';

const worker = new MyWorker();

worker.onmessage = (e) => {
  console.log('Got result:', e.data);
};

worker.postMessage(largeJsonString);`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'structuredClone happens at the postMessage boundary — objects are deep-copied between threads. For large ArrayBuffers, use the transferable flag to move ownership instead of copying.',
			},
			{
				type: 'heading',
				text: 'Comlink: Workers That Feel Like Functions',
			},
			{
				type: 'paragraph',
				text: 'Raw postMessage is clunky. Comlink wraps workers in a Proxy so you can call their methods like local async functions. This makes integrating workers with a React app feel natural.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// heavy-worker.ts
import { expose } from 'comlink';

const api = {
  async searchLargeDataset(query: string, data: Record[]) {
    return data.filter((r) =>
      Object.values(r).some((v) => String(v).includes(query))
    );
  },

  async parseCsv(text: string) {
    return Papa.parse(text, { header: true }).data;
  },
};

export type HeavyApi = typeof api;
expose(api);

// main.ts — use the worker like a normal async object
import { wrap } from 'comlink';
import HeavyWorker from './heavy-worker.ts?worker';
import type { HeavyApi } from './heavy-worker';

const worker = wrap<HeavyApi>(new HeavyWorker());

const results = await worker.searchLargeDataset('john', records);`,
			},
			{
				type: 'heading',
				text: 'Using Workers in React',
			},
			{
				type: 'paragraph',
				text: 'Wrap worker initialization in a useMemo or a custom hook to avoid recreating the worker on every render. Terminate workers on unmount to free the thread.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `function useHeavyWorker() {
  const worker = useMemo(() => wrap<HeavyApi>(new HeavyWorker()), []);

  useEffect(() => {
    return () => worker[releaseProxy]();
  }, [worker]);

  return worker;
}

function SearchBox({ data }: { data: Record[] }) {
  const worker = useHeavyWorker();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Record[]>([]);

  useEffect(() => {
    if (!query) return;
    let cancelled = false;

    worker.searchLargeDataset(query, data).then((res) => {
      if (!cancelled) setResults(res);
    });

    return () => { cancelled = true; };
  }, [query, data, worker]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ResultList items={results} />
    </>
  );
}`,
			},
			{
				type: 'heading',
				text: 'SharedArrayBuffer and Atomics',
			},
			{
				type: 'paragraph',
				text: 'For workloads that need true zero-copy sharing between threads — real-time audio processing, WebAssembly threads, high-frequency data streaming — SharedArrayBuffer with Atomics lets the main thread and workers read/write the same memory. The site must be cross-origin isolated (COOP/COEP headers) to enable it.',
			},
			{
				type: 'callout',
				variant: 'warning',
				text: 'SharedArrayBuffer requires cross-origin isolation via COOP and COEP headers. This breaks many third-party embeds (Stripe checkout, YouTube iframes). Check your third-party dependencies before opting in.',
			},
			{
				type: 'heading',
				text: 'Impact on INP',
			},
			{
				type: 'paragraph',
				text: 'Interaction to Next Paint (INP) measures the delay between user input and visible response. Long tasks on the main thread are the primary cause of poor INP. Moving even one 80ms task to a worker can drop your p75 INP below the 200ms Good threshold. Profile with Chrome DevTools Performance panel to find the actual long tasks before optimizing blindly.',
			},
			{
				type: 'heading',
				text: 'OffscreenCanvas for Rendering',
			},
			{
				type: 'paragraph',
				text: 'OffscreenCanvas lets workers render to a canvas element on the main thread. This is how modern data-viz tools and games keep the UI responsive while rendering complex scenes. Transfer the canvas control to the worker with transferControlToOffscreen().',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// main.ts
const canvas = document.querySelector('canvas')!;
const offscreen = canvas.transferControlToOffscreen();

const worker = new RenderWorker();
worker.postMessage({ canvas: offscreen }, [offscreen]);

// render-worker.ts
self.onmessage = (e) => {
  const canvas: OffscreenCanvas = e.data.canvas;
  const ctx = canvas.getContext('2d')!;

  // Render loop runs in the worker — does not block main thread
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // expensive drawing...
    requestAnimationFrame(draw);
  }
  draw();
};`,
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'After moving the BetterDocs analytics chart-data preparation into a Web Worker via Comlink, the input lag on the date-range filter went away — INP dropped from around 250ms to under 80ms on the workspaces with the largest datasets. The integration cost was minimal once Comlink was in place. Web Workers are one of the highest-leverage performance tools most developers still do not reach for. If your app has any computation over 50ms on a hot path, measure the win of moving it off the main thread.',
			},
		],
	},
	{
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
	},
	{
		slug: 'typescript-5-new-features',
		title: 'TypeScript 5.0: Features That Changed How I Write Code',
		excerpt:
			'A handful of TypeScript 5.x features changed how I write code day-to-day on the Templately admin and sapan.dev. Notes on the ones I reach for constantly — `satisfies`, `const` type parameters, `using` — and the ones I have not yet found a real use for.',
		thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
		category: 'TypeScript',
		tags: ['TypeScript', 'JavaScript', 'Developer Experience'],
		readTime: 6,
		publishedAt: '2026-02-22',
		featured: true,
		content: [
			{
				type: 'paragraph',
				text: 'On the Templately admin, the cleanup pass after upgrading to TypeScript 5 was a study in how much friction a few new features can remove. The `satisfies` operator alone replaced a dozen awkward `as const` assertions in our config objects. The new `const` type parameters fixed a handful of generic helpers that had been quietly widening literal types for years. Below are the TS 5 features I now reach for constantly, the ones I rarely use, and the changes the upgrade actually made to working code.',
			},
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
			{
				type: 'heading',
				text: 'What I Reach For Most',
			},
			{
				type: 'paragraph',
				text: "Across the Templately admin, sapan.dev, and the smaller side projects I have rewritten in the past year, three TS 5 features come up constantly: `satisfies` (every config object), `const` type parameters (any helper that takes a tuple of options), and the new module resolution modes (which finally got Vite-resolved imports working without phantom red squiggles). Decorators I have not used yet — most of my code is functional and the use cases haven't shown up. `using` declarations are useful but niche; I have used them exactly once, for a Firebase admin connection in a test setup. Worth knowing the whole feature set, but it is OK if you only use the three above.",
			},
		],
	},
	{
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
	},
	{
		slug: 'building-accessible-ui-components',
		title: 'Building Accessible UI Components: Beyond ARIA Labels',
		excerpt:
			'Shipping sapan.dev across 16 locales including RTL Arabic surfaced every accessibility shortcut I had ever quietly made. Notes on what automated audits miss, what testing with real assistive tech actually catches, and the patterns I now reach for by default.',
		thumbnail: 'https://images.unsplash.com/photo-1600132806608-231446b2e7af?w=800&q=80',
		category: 'Performance',
		tags: ['Accessibility', 'HTML', 'ARIA', 'UX'],
		readTime: 9,
		publishedAt: '2026-01-20',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'On sapan.dev, the RTL Arabic locale is what taught me how much of my CSS was secretly assuming left-to-right. Skip links, focus rings, modal close-button positions — all of them needed an audit. Most of the issues I caught were in the gap between "passes Lighthouse" and "actually works for an Arabic-speaking screen-reader user." That gap — what automated tools miss — is where most of this post lives.',
			},
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
			{
				type: 'heading',
				text: 'What I Have Settled On',
			},
			{
				type: 'paragraph',
				text: 'After shipping sapan.dev with 16 locales (Arabic in RTL, more languages coming), most of the real a11y wins came from doing two things consistently: building the keyboard interaction first (if it only works with a mouse, something is wrong), and testing with VoiceOver on at least the most-trafficked routes before merging. Lighthouse and axe stay running in CI as a floor — they catch the obvious regressions. Manual testing with a real screen reader is the ceiling, and it is where the actual UX shows up. Worth the extra hour per feature.',
			},
		],
	},
	{
		slug: 'web-performance-core-web-vitals-2025',
		title: 'Web Performance in 2025: Core Web Vitals and What Actually Matters',
		excerpt:
			'The WPDeveloper plugin suite serves 6M+ users across 180+ countries — meaning a lot of devices, a lot of network conditions, and a lot of CrUX data. Notes on what actually moved the Core Web Vitals needle on real production traffic and what was performance theater.',
		thumbnail: 'https://images.unsplash.com/photo-1633307057722-a4740ba0c5d0?w=800&q=80',
		category: 'Performance',
		tags: ['Performance', 'Core Web Vitals', 'LCP', 'INP', 'CLS'],
		readTime: 10,
		publishedAt: '2026-01-05',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'Working on the WPDeveloper plugin suite was the closest I have been to seeing real CrUX data move in response to specific changes. With 6M+ active installations across 180+ countries, the user base spans every device class and every network condition you can imagine. Every optimization I shipped showed up in real numbers a few weeks later — sometimes the way I expected, sometimes not. The post below is the lessons that survived contact with that production data.',
			},
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
			{
				type: 'heading',
				text: 'What Actually Moved The Numbers',
			},
			{
				type: 'paragraph',
				text: 'On the WPDeveloper plugin admin pages, the changes that visibly moved CrUX numbers were almost never the glamorous ones. Image preloading and `fetchpriority="high"` on the LCP element gave the biggest LCP wins. Moving heavy chart-data prep into a Web Worker (separate post) was what fixed INP on the analytics dashboards. CLS was mostly fixed by adding explicit `width`/`height` attributes to admin avatars and skeleton placeholders. The temptation is always to chase the cool optimization; the real wins are the boring ones, applied consistently. Measure before, measure after, ship the small things.',
			},
		],
	},
	{
		slug: 'state-management-2025-zustand-jotai-redux',
		title: 'State Management in 2025: Zustand, Jotai, and Redux Toolkit',
		excerpt:
			'Templately runs on Redux Toolkit. TubeOnAI is React Query for server state and a small Zustand store for UI. sapan.dev gets by on Redux Toolkit + URL state. Three projects, three different state strategies, and the pattern that emerged for picking between them.',
		thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
		category: 'React',
		tags: ['React', 'State Management', 'Zustand', 'Jotai', 'Redux'],
		readTime: 8,
		publishedAt: '2025-12-15',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'In the past two years I have shipped React apps that ended up using three different state strategies. Templately is on Redux Toolkit because the team adopted it early and the patterns are deeply baked in. TubeOnAI runs React Query for server state and a small Zustand store for transient UI (player state, modal flags). sapan.dev gets by entirely on Redux Toolkit + URL state, no React Query at all. Below is the pattern that emerged across them — and the things I would not do twice.',
			},
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
				text: 'Across Templately, TubeOnAI, and sapan.dev, the lesson that surfaced repeatedly: separate server state from client state first, then pick the smallest library that fits the remaining client state. Most projects I have started in the past year reach for React Query plus a tiny Zustand store, and the team rarely outgrows that combination. Redux still earns its keep when the state machine is genuinely complex, the team is large, or you need the time-travel debugging — but those are increasingly the exceptions, not the rule. The best state manager is the one your team can read at a glance six months from now.',
			},
		],
	},
	{
		slug: 'modern-css-colors-oklch-color-mix',
		title: 'Modern CSS Colors: oklch, color-mix, and Wide Gamut',
		excerpt:
			"sapan.dev's design tokens are oklch all the way down. The brand color is one variable; every shade, hover, and disabled state derives from it programmatically. Notes on what oklch and color-mix actually buy you in a design system.",
		thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80',
		category: 'CSS',
		tags: ['CSS', 'Color', 'Design Systems', 'oklch'],
		readTime: 7,
		publishedAt: '2025-11-05',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'On sapan.dev I made a small commitment when designing the token system: every color goes through oklch first, no hex anywhere in the source. The brand color (the primary blue) is one oklch variable; every shade, every hover state, every disabled-state desaturation derives from it through relative color syntax. The result is that swapping the brand color is genuinely a one-line change — and the dark-mode pair (--color-success) was easier to balance because the chroma stays consistent across both modes. Below is what the modern color tools actually buy you in a real design system.',
			},
			{
				type: 'paragraph',
				text: "Hex colors have been the web's default for 30 years. They are also bad — not because they are wrong, but because sRGB cannot represent most of what modern monitors can display, and the relationship between hex values and perceived brightness is nonlinear. Modern CSS introduces color spaces designed for humans, not for the 1996 VGA palette.",
			},
			{
				type: 'heading',
				text: 'Why sRGB Is the Problem',
			},
			{
				type: 'paragraph',
				text: 'In sRGB, the hex value #808080 is "mid gray" numerically, but perceptually it looks closer to 73% brightness than 50%. This means lightening or darkening a color by adjusting its hex value gives uneven results. Two colors with the same hex lightness look like dramatically different shades.',
			},
			{
				type: 'heading',
				text: 'oklch: Perceptually Uniform Color',
			},
			{
				type: 'paragraph',
				text: 'oklch (Oklab LCH) is a color space where equal numerical changes produce equal perceptual changes. Three dimensions: L for lightness (0-100%), C for chroma (saturation), and H for hue (0-360 degrees). Adjusting L by 10 looks like a 10% lightness change — no gamma correction, no eyeballing.',
			},
			{
				type: 'code',
				language: 'css',
				code: `:root {
  /* Old: hex values are hard to reason about */
  --blue-500: #4a4ded;
  --blue-600: #3a3dd0;  /* is this "darker by 10%"? who knows */

  /* New: oklch makes relationships explicit */
  --brand-500: oklch(55% 0.2 265);
  --brand-600: oklch(45% 0.2 265);  /* exactly 10% darker */
  --brand-400: oklch(65% 0.2 265);  /* exactly 10% lighter */

  /* Derive shades programmatically */
  --brand-100: oklch(from var(--brand-500) 95% c h);
  --brand-900: oklch(from var(--brand-500) 15% c h);
}`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'The oklch(from <color> ...) syntax lets you derive a new color by modifying specific channels of an existing one. Perfect for building theme scales from a single brand color.',
			},
			{
				type: 'heading',
				text: 'color-mix: Native Color Blending',
			},
			{
				type: 'paragraph',
				text: 'color-mix blends two colors in a specified color space. Before this, you needed Sass or CSS custom property trickery. Now it is a native function with precise control over which color space the interpolation happens in.',
			},
			{
				type: 'code',
				language: 'css',
				code: `:root {
  --brand: oklch(55% 0.2 265);
  --surface: oklch(98% 0.01 265);
}

.button {
  background: var(--brand);
}

/* Hover state — mix brand with black for a darker shade */
.button:hover {
  background: color-mix(in oklch, var(--brand), black 10%);
}

/* Subtle background tint using the brand color */
.card {
  background: color-mix(in oklch, var(--surface), var(--brand) 5%);
}

/* Semi-transparent without going to rgba() */
.overlay {
  background: color-mix(in srgb, black, transparent 50%);
}`,
			},
			{
				type: 'heading',
				text: 'Wide Gamut Displays',
			},
			{
				type: 'paragraph',
				text: "P3 displays (standard on every Apple device since 2016 and most modern Android phones) can show colors sRGB cannot. A truly saturated red on P3 is physically brighter and more saturated than sRGB's maximum red. CSS lets you target wide-gamut colors with display-p3 or oklch with chroma values above sRGB's limit.",
			},
			{
				type: 'code',
				language: 'css',
				code: `/* Red with chroma beyond sRGB — renders vivid on P3, clipped on sRGB */
.accent {
  color: oklch(60% 0.3 25);
}

/* Feature-detect P3 support for a richer experience */
@media (color-gamut: p3) {
  .accent {
    color: oklch(60% 0.33 25);
  }
}

/* Or use display-p3 directly */
.badge {
  background: color(display-p3 1 0.3 0.4);
}`,
			},
			{
				type: 'heading',
				text: 'Relative Color Syntax',
			},
			{
				type: 'paragraph',
				text: 'The most powerful addition is relative color syntax — defining one color in terms of another. A single brand token can generate an entire palette algorithmically, and accessibility contrast fixes become a one-line change.',
			},
			{
				type: 'code',
				language: 'css',
				code: `:root {
  --brand: oklch(55% 0.18 240);
}

.primary { background: var(--brand); }

/* Darken for hover — declarative, not a separate variable */
.primary:hover { background: oklch(from var(--brand) calc(l - 0.08) c h); }

/* Desaturate for disabled state */
.primary:disabled { background: oklch(from var(--brand) l calc(c * 0.3) h); }

/* Rotate hue for a complementary accent */
.accent { background: oklch(from var(--brand) l c calc(h + 180)); }`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'When designing a system, pick brand tokens in oklch and derive every shade, tint, and state with relative syntax. Change the source token — the entire theme updates mathematically.',
			},
			{
				type: 'heading',
				text: 'Accessibility Implications',
			},
			{
				type: 'paragraph',
				text: 'oklch makes contrast adjustment tractable. WCAG 2.1 requires specific contrast ratios. In sRGB, fixing a failing pair means trial and error. In oklch, you can programmatically adjust lightness until the contrast passes — the math becomes deterministic.',
			},
			{
				type: 'heading',
				text: 'Browser Support',
			},
			{
				type: 'list',
				items: [
					'oklch() — all modern browsers since early 2024',
					'color-mix() — all modern browsers since 2023',
					'Relative color syntax — Safari 16.4+, Chrome 125+, Firefox 128+',
					'display-p3 — universal',
					'For IE or old Safari fallbacks, generate sRGB fallbacks at build time with postcss-oklab-function',
				],
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'On sapan.dev, the moment the oklch token system clicked was when I realized I was no longer eyeballing hover states. `oklch(from var(--brand) calc(l - 0.08) c h)` — the hover is mathematically 8% darker, the hue and chroma stay locked, and the result looks consistent regardless of which brand color you swap in. Modern CSS color is not about new notation. It is about finally giving design systems the tools that print and film have had for decades. If you are still hand-picking hex values, you are building on 1996 foundations.',
			},
		],
	},
	{
		slug: 'css-layer-architecture-without-specificity-wars',
		title: 'CSS @layer: Architecture Without Specificity Wars',
		excerpt:
			'CSS specificity is the source of 90% of "why is my style not applying" debugging. @layer gives you explicit control over cascade order that is independent of selector complexity — finally making large stylesheets tractable.',
		thumbnail: 'https://images.unsplash.com/photo-1518085250887-2f903c200fee?w=800&q=80',
		category: 'CSS',
		tags: ['CSS', 'Architecture', 'Cascade', '@layer'],
		readTime: 6,
		publishedAt: '2025-10-18',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'On the BetterDocs admin we had a four-year-old CSS codebase fighting itself — the design system would set a button background, a page-level rule would override it for one screen, and an old utility class would beat them both with `!important`. Every visual bug fix took three rounds of CSS detective work. Adopting @layer was what finally settled the cascade. We carved the existing CSS into reset, base, components, and utilities layers, and the specificity wars stopped showing up in the bug tracker.',
			},
			{
				type: 'paragraph',
				text: 'Every large CSS codebase eventually faces the same problem — specificity wars. The design system sets a value. A page overrides it. A component overrides the page. The global reset fights the component. Solutions have ranged from BEM conventions to !important to CSS-in-JS scope isolation. @layer is the native solution that finally works.',
			},
			{
				type: 'heading',
				text: 'The Core Idea',
			},
			{
				type: 'paragraph',
				text: 'Cascade layers create explicit groups where selectors within a layer compete by normal specificity, but entire layers compete by declaration order. A rule in a later layer always beats a rule in an earlier layer, regardless of selector complexity. Specificity still matters, but only within a layer.',
			},
			{
				type: 'code',
				language: 'css',
				code: `/* Declare layer order — later layers win */
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer base {
  :root {
    --color-text: oklch(20% 0 0);
    --color-bg: oklch(98% 0 0);
  }

  body { color: var(--color-text); background: var(--color-bg); }
}

@layer components {
  .button {
    padding: 0.5rem 1rem;
    background: var(--color-brand);
    color: white;
  }
}

@layer utilities {
  /* Utilities always win over components */
  .p-0 { padding: 0; }
  .text-red { color: red; }
}`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'Layer order is set by the first @layer declaration. Rules added to layers later still respect that order. You can organize files by feature and import them, and the cascade still works predictably.',
			},
			{
				type: 'heading',
				text: 'Why This Matters for Third-Party Libraries',
			},
			{
				type: 'paragraph',
				text: 'Third-party UI libraries used to be a nightmare. Their styles were loaded with unknown specificity, and overriding them required higher specificity or !important. With @layer, you can import any library into its own layer and guarantee your styles win — no matter what specificity the library uses.',
			},
			{
				type: 'code',
				language: 'css',
				code: `/* Import third-party library into a low-priority layer */
@import url("reset.css") layer(reset);
@import url("bootstrap.css") layer(vendor);

/* Your layers always win */
@layer reset, vendor, base, components, utilities;

@layer components {
  /* This wins over any Bootstrap rule, even .btn.btn-primary */
  .btn {
    border-radius: 12px;
  }
}`,
			},
			{
				type: 'heading',
				text: 'Unlayered Styles',
			},
			{
				type: 'paragraph',
				text: 'Styles outside any layer beat all layered styles. This is both a feature and a footgun. Useful for last-resort overrides (utility frameworks like Tailwind v4 use this model). Dangerous if you forget — an unlayered rule silently wins over your carefully structured layers.',
			},
			{
				type: 'code',
				language: 'css',
				code: `@layer components {
  .alert { color: red; }
}

/* Unlayered — wins over anything in any layer */
.alert { color: blue; }

/* Result: blue (unlayered beats layered regardless of order) */`,
			},
			{
				type: 'heading',
				text: 'Mapping to ITCSS and Other Methodologies',
			},
			{
				type: 'paragraph',
				text: "ITCSS proposed a specificity hierarchy a decade ago — settings, tools, generic, elements, objects, components, trumps. @layer is ITCSS with teeth. The order you always wanted from ITCSS's inverted-triangle diagram is now enforced by the cascade itself.",
			},
			{
				type: 'code',
				language: 'css',
				code: `/* ITCSS as native layers */
@layer settings, tools, generic, elements, objects, components, trumps;

@layer settings {
  :root { --size-md: 1rem; }
}

@layer elements {
  h1, h2, h3 { line-height: 1.2; }
}

@layer components {
  .card { padding: var(--size-md); }
}

@layer trumps {
  .u-hidden { display: none !important; }
}`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'A good starting layer order for most projects: reset, base (design tokens + element defaults), components, utilities. Keep pages and features within components. Reach for more layers only when you have a concrete ordering problem to solve.',
			},
			{
				type: 'heading',
				text: 'Anonymous Layers for Scoping',
			},
			{
				type: 'paragraph',
				text: 'You can create a layer without a name for one-off scoping needs. Useful inside component files where you want to isolate styles without polluting the named-layer namespace.',
			},
			{
				type: 'code',
				language: 'css',
				code: `/* card.css */
@layer {
  /* Anonymous — scoped to this file's cascade context */
  .card {
    background: white;
    border-radius: 8px;
  }

  .card__header {
    padding: 1rem;
  }
}`,
			},
			{
				type: 'heading',
				text: 'Migration Strategy',
			},
			{
				type: 'paragraph',
				text: 'For an existing codebase with specificity chaos, the migration path is incremental. Put your global reset in a reset layer. Move design tokens to a base layer. Wrap any existing framework code in a vendor layer. Leave feature CSS unlayered initially — it will automatically win over the extracted layers. Then gradually move features into a components layer, starting with the most-overridden ones.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: "On the BetterDocs admin migration, the layer adoption was incremental — a few files at a time over a couple of weeks, no big-bang rewrite. The payoff showed up gradually: cascade-related bugs in QA dropped, code reviews stopped including 'why is this `!important`' comments, and new contributors stopped tripping over which file was overriding which. CSS @layer is the most important architectural addition to CSS in a decade — it replaces BEM conventions, specificity-stacking tricks, and `!important` with an actual cascade-level ordering primitive. New projects, day one. Existing projects, adopt incrementally — the cascade rewards the effort.",
			},
		],
	},
	{
		slug: 'discriminated-unions-type-safe-state',
		title: 'Discriminated Unions: The Pattern That Changed How I Model State',
		excerpt:
			'On TubeOnAI, the original load/error/data form state was three independent booleans — and we kept hitting bugs where data was set AND loading was true. Switched to a single discriminated union and the entire class of bugs went away. Notes on the pattern that changed how I model state.',
		thumbnail: 'https://images.unsplash.com/photo-1724166573009-4634b974ebb2?w=800&q=80',
		category: 'TypeScript',
		tags: ['TypeScript', 'State Modeling', 'Pattern', 'Type Safety'],
		readTime: 7,
		publishedAt: '2025-10-02',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'On the TubeOnAI summarization view, our data layer started life with three independent state pieces — `isLoading`, `error`, `data` — across every async hook. The bugs were predictable: a refetch would set `isLoading = true` while `data` was still populated from the previous query, and our UI logic that branched on `isLoading` first hid the stale-but-still-valid data the user wanted to see. We fixed individual occurrences for a few months before realizing the bug was structural. Refactoring to a discriminated union killed the whole class.',
			},
			{
				type: 'paragraph',
				text: 'Every React developer has written this code: isLoading, error, data, all as separate pieces of state. Then the bugs arrive. Data is present AND loading is true. Error is set AND data is also set. Your UI branches on isLoading first, so errors never render when loading is still true. The root cause is modeling mutually exclusive states as independent booleans. Discriminated unions fix this structurally.',
			},
			{
				type: 'heading',
				text: 'The Problem in One Example',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// Buggy — represents 8 possible states, only 3 are valid
type State<T> = {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
};

// Can you spot the bug?
function render(state: State<User>) {
  if (state.isLoading) return <Spinner />;
  if (state.error) return <Error message={state.error.message} />;
  if (state.data) return <UserCard user={state.data} />;
  return null; // what state is this?
}`,
			},
			{
				type: 'paragraph',
				text: 'Three booleans means 2³ = 8 possible combinations. Only three of those make sense — loading, error, success. TypeScript cannot help you because the type says all eight are valid.',
			},
			{
				type: 'heading',
				text: 'The Discriminated Union Version',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type State<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function render(state: State<User>) {
  switch (state.status) {
    case 'idle':    return <EmptyState />;
    case 'loading': return <Spinner />;
    case 'success': return <UserCard user={state.data} />;
    case 'error':   return <Error message={state.error.message} />;
  }
}`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'TypeScript narrows each case automatically. Inside the success branch, state.data exists. Inside the error branch, state.error exists. You cannot accidentally read state.data in the error branch — it does not compile.',
			},
			{
				type: 'heading',
				text: 'Exhaustiveness Checking',
			},
			{
				type: 'paragraph',
				text: 'The real power shows up when you add a new state. TypeScript forces you to handle every case — if you add status: "refetching", every switch statement across your codebase lights up as an error.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// Helper that enforces exhaustiveness
function assertNever(value: never): never {
  throw new Error(\`Unhandled case: \${JSON.stringify(value)}\`);
}

function render(state: State<User>) {
  switch (state.status) {
    case 'idle':    return <EmptyState />;
    case 'loading': return <Spinner />;
    case 'success': return <UserCard user={state.data} />;
    case 'error':   return <Error message={state.error.message} />;
    default:        return assertNever(state);
    // ❌ Type 'State<User>' is not assignable to type 'never'
    // when you add a new state and forget to handle it here
  }
}`,
			},
			{
				type: 'heading',
				text: 'Modeling Form State',
			},
			{
				type: 'paragraph',
				text: 'Form state is a discriminated union goldmine. A form is either pristine (never touched), dirty (user typing), validating (async check running), invalid (has errors), or submitting. Independent booleans encode dozens of impossible states. A union encodes exactly the right ones.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type FormState<T> =
  | { status: 'pristine'; values: T }
  | { status: 'dirty'; values: T; touchedFields: Set<keyof T> }
  | { status: 'validating'; values: T; touchedFields: Set<keyof T> }
  | { status: 'invalid'; values: T; errors: Partial<Record<keyof T, string>> }
  | { status: 'submitting'; values: T }
  | { status: 'submitted'; response: ApiResponse };

function canSubmit(state: FormState<unknown>): boolean {
  return state.status === 'dirty' || state.status === 'invalid';
}`,
			},
			{
				type: 'heading',
				text: 'Server Response Modeling',
			},
			{
				type: 'paragraph',
				text: 'API responses are another perfect fit. A response is a success with data or a failure with an error. A discriminated union makes the caller handle both cases — no more if (response.data) checks that miss 500 errors with partial data.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

async function fetchUser(id: string): Promise<ApiResult<User>> {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) {
      return { ok: false, error: await res.text(), status: res.status };
    }
    return { ok: true, data: await res.json() };
  } catch (err) {
    return { ok: false, error: String(err), status: 0 };
  }
}

// Caller is forced to handle both paths
const result = await fetchUser('123');
if (result.ok) {
  console.log(result.data.name); // TypeScript knows data exists
} else {
  console.error(result.error, result.status);
}`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'The "ok" vs "status" discriminant is stylistic. Use "status" with string literals when you have 3+ states. Use a boolean "ok" when you only have success/failure. Both patterns work equivalently with TypeScript narrowing.',
			},
			{
				type: 'heading',
				text: 'Machines and XState',
			},
			{
				type: 'paragraph',
				text: 'Discriminated unions are the foundation of state machines. XState formalizes this pattern — define your states and transitions, and XState enforces the union through TypeScript. For UI state that grows beyond 4-5 cases, a state machine keeps the code readable.',
			},
			{
				type: 'heading',
				text: 'When Not to Use Discriminated Unions',
			},
			{
				type: 'paragraph',
				text: 'Not every piece of state is mutually exclusive. A user profile might have both a name AND an email AND an avatar. These are independent attributes, not alternative states — a plain record type is correct. Reach for a discriminated union when the values differ meaningfully across states (data in success but error in failure), not just when they are all optional.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'After the TubeOnAI refactor, every new async hook on the project started life as a discriminated union and the stale-data bugs simply stopped recurring. Discriminated unions are a state-modeling superpower — they turn a vague "this might be one of several things" into a precise "this is exactly one of these options, and the compiler will enforce which fields exist in each case." Once you start thinking in unions, every piece of state that has multiple phases becomes dramatically clearer. Worth refactoring toward, one hook at a time.',
			},
		],
	},
	{
		slug: 'template-literal-types-type-level-strings',
		title: 'Template Literal Types: Type-Level String Manipulation',
		excerpt:
			'On sapan.dev I wrote a small typed event-emitter for the contact-modal flow that felt like magic — string keys, fully typed payloads, no manual annotation. Template literal types are doing the work. Notes on the patterns I now reach for and the moments TypeScript pushes back.',
		thumbnail: 'https://images.unsplash.com/photo-1685558593626-686907d7ee4b?w=800&q=80',
		category: 'TypeScript',
		tags: ['TypeScript', 'Template Literals', 'Type Magic', 'Inference'],
		readTime: 7,
		publishedAt: '2025-09-15',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'A while back I was writing a small event emitter for the sapan.dev contact-modal flow — open/close events, form-state events, validation events. The first version used plain strings and untyped payloads, and within a week I was already chasing bugs where the wrong event payload shape was being passed around. The rewrite used template literal types for the event names with a payload map, and the entire class of mismatches stopped being possible. The compiler now refuses any combination of event name and payload that does not match.',
			},
			{
				type: 'paragraph',
				text: "Template literal types are TypeScript 4.1's quiet revolution. On the surface they are a minor syntax addition — you can now use backticks in types. Underneath, they give the type system the ability to analyze and construct strings. Combined with conditional types and infer, they enable entire libraries to be type-safe in ways that were previously impossible.",
			},
			{
				type: 'heading',
				text: 'The Basics',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// Basic template literal types
type Greeting = \`Hello, \${string}!\`;

const a: Greeting = 'Hello, world!'; // ✅
const b: Greeting = 'Hi, world!';    // ❌

// Union substitution
type Lang = 'en' | 'fr' | 'de';
type Greeting2 = \`Hello in \${Lang}\`;
// = 'Hello in en' | 'Hello in fr' | 'Hello in de'

// Utility types built-in
type Upper = Uppercase<'hello'>;  // 'HELLO'
type Lower = Lowercase<'HELLO'>;  // 'hello'
type Cap = Capitalize<'hello'>;   // 'Hello'`,
			},
			{
				type: 'heading',
				text: 'Route Matching',
			},
			{
				type: 'paragraph',
				text: "The most impactful real-world use is type-safe routing. Express, Hono, and modern frameworks use template literal types to parse path patterns at the type level — extracting parameter names so the handler's params object is correctly typed.",
			},
			{
				type: 'code',
				language: 'typescript',
				code: `// Extract parameter names from a route pattern
type ExtractParams<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends \`\${string}:\${infer Param}\`
    ? { [K in Param]: string }
    : {};

type UserRouteParams = ExtractParams<'/users/:userId/posts/:postId'>;
// = { userId: string; postId: string }

// Build a router where handlers get correct param types
function get<T extends string>(
  path: T,
  handler: (req: { params: ExtractParams<T> }) => void,
) {
  // ...
}

get('/users/:userId/posts/:postId', (req) => {
  req.params.userId;  // ✅ typed
  req.params.postId;  // ✅ typed
  req.params.unknown; // ❌ error
});`,
			},
			{
				type: 'callout',
				variant: 'info',
				text: 'infer inside a template literal type extracts matched portions as new type variables. Combined with recursion, you can parse nearly any string pattern at the type level.',
			},
			{
				type: 'heading',
				text: 'CSS Property Autocomplete',
			},
			{
				type: 'paragraph',
				text: "Libraries like Tailwind's type plugin and Panda CSS use template literal types to provide autocomplete for utility classes. The types understand responsive prefixes, pseudo-class modifiers, and arbitrary values.",
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';
type Pseudo = 'hover' | 'focus' | 'active' | 'disabled';
type Utility = 'bg-red' | 'bg-blue' | 'text-white' | 'text-black';

type ResponsiveClass = \`\${Breakpoint}:\${Utility}\`;
type PseudoClass = \`\${Pseudo}:\${Utility}\`;
type Combined = \`\${Breakpoint}:\${Pseudo}:\${Utility}\`;

type TailwindClass = Utility | ResponsiveClass | PseudoClass | Combined;

// Autocomplete works through the entire space
const cls: TailwindClass = 'md:hover:bg-blue'; // ✅`,
			},
			{
				type: 'heading',
				text: 'Event Name Inference',
			},
			{
				type: 'paragraph',
				text: 'Type-safe event emitters become trivial with template literals. Define event names as a union, and the emit/on methods infer parameters automatically.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type Events = {
  'user:created': { id: string; name: string };
  'user:deleted': { id: string };
  'post:published': { postId: string; authorId: string };
};

class Emitter {
  on<K extends keyof Events>(
    event: K,
    handler: (payload: Events[K]) => void,
  ): void { /* ... */ }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    /* ... */
  }
}

const emitter = new Emitter();

emitter.on('user:created', (payload) => {
  payload.id;   // ✅
  payload.name; // ✅
});

emitter.emit('user:created', { id: '1', name: 'Alice' }); // ✅
emitter.emit('user:created', { id: '1' }); // ❌ missing name`,
			},
			{
				type: 'heading',
				text: 'Object Path Typing',
			},
			{
				type: 'paragraph',
				text: 'Template literal types enable type-safe "deep get" operations — functions that take a string path and return the type at that path. Libraries like react-hook-form and lodash-style get() helpers use this.',
			},
			{
				type: 'code',
				language: 'typescript',
				code: `type Path<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]:
        | \`\${Prefix}\${K}\`
        | Path<T[K], \`\${Prefix}\${K}.\`>;
    }[keyof T & string]
  : never;

type PathValue<T, P extends string> =
  P extends \`\${infer K}.\${infer Rest}\`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
    ? T[P]
    : never;

function get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P> {
  return path.split('.').reduce((o: any, k) => o[k], obj);
}

const user = { profile: { name: 'Alice', age: 30 } };
const name = get(user, 'profile.name'); // typed as string
const age = get(user, 'profile.age');   // typed as number
const err = get(user, 'profile.x');     // ❌ type error`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Template literal types have a compilation cost. TypeScript 4.9+ introduced safeguards against exponential recursion, but very deep type trees can still slow builds. If you hit compiler warnings about "Type instantiation is excessively deep", simplify the recursion or add explicit limits.',
			},
			{
				type: 'heading',
				text: 'Limits and Escape Hatches',
			},
			{
				type: 'paragraph',
				text: "Template literal types cannot do arithmetic, cannot call functions, and cannot execute arbitrary JavaScript. For cases that exceed the type system's capabilities, use generic constraints with branded types or fall back to runtime validation with Zod. The type system is a helper, not a replacement for runtime guarantees on external data.",
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'After writing that typed emitter for sapan.dev I started spotting opportunities everywhere — the locale routing types, internal route helpers, even a small CSS-class autocomplete pattern in our component prop types. Template literal types are the feature that made TypeScript competitive with full-strength type systems for real-world JavaScript. They have a compilation cost on big recursive types, so use them where the safety pays for the build-time penalty — but where they fit, the inference feels like cheating.',
			},
		],
	},
	{
		slug: 'react-suspense-streaming-patterns',
		title: 'React Suspense Patterns: Streaming UI with Confidence',
		excerpt:
			'sapan.dev streams its blog index from the server using Suspense — skeleton card, then progressive content as the data resolves. Notes on the Suspense patterns I keep reaching for in App Router, and the moments where I had to fall back to client-side loading states instead.',
		thumbnail: 'https://images.unsplash.com/photo-1610986602726-19f650133f7a?w=800&q=80',
		category: 'React',
		tags: ['React', 'Suspense', 'Streaming', 'Data Fetching'],
		readTime: 8,
		publishedAt: '2025-08-28',
		featured: false,
		content: [
			{
				type: 'paragraph',
				text: 'On sapan.dev the blog index is the place where Suspense earns its keep. The post list comes from a server-side data layer; instead of a full-page spinner while everything resolves, the layout (header, sidebar, footer) renders immediately, and a Suspense boundary streams in the cards as the data is ready. The user never sees a blank page, and the time-to-first-meaningful-paint is dramatically better than the old useEffect + skeleton dance. Below is what I actually do with Suspense in App Router and where I have learned to stop reaching for it.',
			},
			{
				type: 'paragraph',
				text: "Suspense has existed since React 16.6 but only became production-ready with React 18's concurrent rendering. Now paired with Server Components in React 19, it is the fundamental primitive for handling async UI — loading states, data fetching boundaries, and progressive hydration all flow from one mental model.",
			},
			{
				type: 'heading',
				text: 'The Mental Model',
			},
			{
				type: 'paragraph',
				text: 'Suspense lets a component declare "I am not ready yet" without rendering a spinner itself. A parent Suspense boundary catches the "not ready" signal and renders a fallback until the child is ready. When the data arrives, React swaps in the real content — no useEffect dance, no manual state machines.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `// The fundamental pattern
<Suspense fallback={<Skeleton />}>
  <UserProfile userId={id} />
</Suspense>

// UserProfile uses a Suspense-aware data source
// (use() hook, React Query, Relay, Next.js fetch, etc.)
function UserProfile({ userId }: { userId: string }) {
  const user = use(fetchUser(userId)); // suspends until resolved
  return <div>{user.name}</div>;
}`,
			},
			{
				type: 'heading',
				text: 'The use() Hook',
			},
			{
				type: 'paragraph',
				text: 'React 19 introduces use() — a hook that reads the value from a promise, suspending until the promise resolves. Unlike other hooks, use() can be called conditionally and inside loops. It is the canonical way to integrate promises with Suspense.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `// Create the promise outside the render (or memoize it)
const userPromise = fetchUser(id);

function Component() {
  // use() suspends the component until the promise resolves
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

// use() works with Context too
function Theme() {
  const theme = use(ThemeContext);
  return <div className={theme}>...</div>;
}`,
			},
			{
				type: 'callout',
				variant: 'warning',
				text: 'Never create a promise inside the render body — it creates a new promise every render, causing infinite suspension. Create promises in event handlers, server components, or wrap them in useMemo.',
			},
			{
				type: 'heading',
				text: 'Streaming with Multiple Boundaries',
			},
			{
				type: 'paragraph',
				text: 'A single Suspense boundary is fine for simple pages. The real power shows up with multiple boundaries — independent sections of UI can load in parallel and reveal as their data arrives, instead of waiting for the slowest.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `// Layout with three independent streaming sections
export default function DashboardPage() {
  return (
    <>
      <Header />

      <Suspense fallback={<StatsSkeleton />}>
        <AccountStats />        {/* fetches from /api/stats */}
      </Suspense>

      <Suspense fallback={<FeedSkeleton />}>
        <ActivityFeed />        {/* fetches from /api/activity */}
      </Suspense>

      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />     {/* fetches from /api/recommendations */}
      </Suspense>
    </>
  );
}`,
			},
			{
				type: 'heading',
				text: 'Avoiding Waterfalls',
			},
			{
				type: 'paragraph',
				text: 'The classic anti-pattern is nested components that each fetch sequentially. Parent loads, then child loads, then grandchild loads. With Suspense, the fix is to kick off all the fetches in parallel at the top level and pass down the promises.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `// ❌ Waterfall — each fetch waits for the previous
function Page({ id }) {
  const user = use(fetchUser(id));
  return <Posts userId={user.id} />;
}

function Posts({ userId }) {
  const posts = use(fetchPosts(userId)); // waits for user
  return <PostList posts={posts} />;
}

// ✅ Parallel — kick both off together
function Page({ id }) {
  // Promises start in parallel
  const userPromise = fetchUser(id);
  const postsPromise = fetchPosts(id);

  return (
    <>
      <Suspense fallback={<UserSkeleton />}>
        <User promise={userPromise} />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts promise={postsPromise} />
      </Suspense>
    </>
  );
}`,
			},
			{
				type: 'heading',
				text: 'Error Boundaries Alongside Suspense',
			},
			{
				type: 'paragraph',
				text: 'Suspense catches the pending state. Error Boundaries catch thrown errors. A robust UI needs both — Suspense for loading, ErrorBoundary for failure. Wrap each async section in both for independent recovery.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<ErrorMessage />}>
  <Suspense fallback={<Skeleton />}>
    <AsyncContent />
  </Suspense>
</ErrorBoundary>

// With retry capability
<ErrorBoundary
  fallbackRender={({ resetErrorBoundary }) => (
    <div>
      <p>Something went wrong.</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  )}
>
  <Suspense fallback={<Skeleton />}>
    <AsyncContent />
  </Suspense>
</ErrorBoundary>`,
			},
			{
				type: 'heading',
				text: 'startTransition for Non-Blocking Updates',
			},
			{
				type: 'paragraph',
				text: 'When state updates cause a Suspense boundary to fall back to the skeleton, the UI flashes. startTransition marks an update as non-urgent — React shows the stale UI until the new data is ready, then swaps atomically. No flash, no flicker.',
			},
			{
				type: 'code',
				language: 'tsx',
				code: `import { useTransition, useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <input
        value={query}
        onChange={(e) => {
          // Wrap the state update that triggers Suspense
          startTransition(() => setQuery(e.target.value));
        }}
      />
      <Suspense fallback={<Skeleton />}>
        <Results query={query} />
        {isPending && <SubtlePendingIndicator />}
      </Suspense>
    </>
  );
}`,
			},
			{
				type: 'callout',
				variant: 'tip',
				text: 'Use startTransition for any state update that would cause a noticeable fallback flash — search queries, filter changes, tab switches. Urgent updates like input typing should stay outside transitions so they feel instant.',
			},
			{
				type: 'heading',
				text: 'Server Components + Suspense',
			},
			{
				type: 'paragraph',
				text: 'In Next.js App Router, every async Server Component implicitly uses Suspense. The server streams HTML progressively as async work completes, and the browser assembles the page as chunks arrive. You rarely write Suspense boundaries manually — they are inferred by the framework for anywhere async work happens.',
			},
			{
				type: 'heading',
				text: 'Debugging Suspense',
			},
			{
				type: 'paragraph',
				text: 'The React DevTools Profiler shows suspend/resume events. When a component suspends, you see which Suspense boundary caught it and how long the fallback displayed. For production, track fallback display times — excessive fallback time means your async work is too slow or your boundaries are placed incorrectly.',
			},
			{
				type: 'heading',
				text: 'Conclusion',
			},
			{
				type: 'paragraph',
				text: 'On sapan.dev the Suspense boundaries are placed around each substantive section — the blog list, the experience timeline, the testimonials marquee — so each can resolve and stream independently rather than blocking each other. The places I have learned NOT to use Suspense: anything where the fallback would be visible for less than ~150ms (it just looks like a flicker), and anything where the user is in an active flow (mid-form submission, mid-search). Both of those are still better served by a local pending state. For everything else — first paint, navigation, route boundaries — Suspense is the foundation to build on. Combined with `use()`, `startTransition`, and Error Boundaries, it absorbs the manual state machines that dominated React data fetching for a decade.',
			},
		],
	},
];

export const FEATURED_BLOGS = BLOG_POSTS.filter((post) => post.featured);
export const BLOGS_PER_PAGE = 6;

export const CATEGORY_COLORS: Record<string, string> = {
	React: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
	CSS: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
	TypeScript: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
	Performance: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
	Tooling: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300',
};

export const DEFAULT_CATEGORY_COLOR = 'bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400';

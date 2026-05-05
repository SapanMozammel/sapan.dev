import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
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
};

export default post;

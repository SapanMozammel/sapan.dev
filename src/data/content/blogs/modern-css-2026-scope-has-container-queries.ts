import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
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
};

export default post;

import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
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
};

export default post;

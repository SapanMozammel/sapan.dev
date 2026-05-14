import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
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
};

export default post;

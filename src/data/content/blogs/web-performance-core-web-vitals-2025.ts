import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
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
};

export default post;

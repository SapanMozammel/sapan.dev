import type { BlogPost } from '@/types/blog';

const post: BlogPost = {
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
};

export default post;

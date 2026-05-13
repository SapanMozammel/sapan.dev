import { renderBlock } from '@/app/[locale]/articles/[slug]/render-block';
import type { ContentBlock } from '@/types/blog';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

const CALLOUT_LABELS = { info: 'Info', warning: 'Warning', tip: 'Tip' };

describe('renderBlock — code variant', () => {
	const codeBlock: ContentBlock = {
		type: 'code',
		language: 'tsx',
		code: "const greeting = 'hello world';",
	};

	it('renders the <pre> with tabIndex="0" so keyboard users can pan horizontal overflow', () => {
		render(<>{renderBlock(codeBlock, 0, 'Code block', CALLOUT_LABELS)}</>);
		const pre = screen.getByRole('region', { name: /code block/i });
		expect(pre.tagName.toLowerCase()).toBe('pre');
		expect(pre).toHaveAttribute('tabindex', '0');
	});

	it('renders the <pre> with role="region" and a non-empty aria-label', () => {
		render(<>{renderBlock(codeBlock, 0, 'Code block', CALLOUT_LABELS)}</>);
		const pre = screen.getByRole('region', { name: /code block/i });
		const ariaLabel = pre.getAttribute('aria-label');
		expect(ariaLabel).toBeTruthy();
		expect(ariaLabel?.length).toBeGreaterThan(0);
	});

	it('preserves the focus-visible ring tokens on the <pre>', () => {
		render(<>{renderBlock(codeBlock, 0, 'Code block', CALLOUT_LABELS)}</>);
		const pre = screen.getByRole('region', { name: /code block/i });
		const className = pre.className;
		expect(className).toMatch(/focus-visible:ring-2/);
		expect(className).toMatch(/focus-visible:ring-primary/);
		expect(className).toMatch(/dark:focus-visible:ring-success/);
		expect(className).toMatch(/focus-visible:outline-none/);
	});

	it('still renders the code text inside the <pre>', () => {
		render(<>{renderBlock(codeBlock, 0, 'Code block', CALLOUT_LABELS)}</>);
		expect(screen.getByText("const greeting = 'hello world';")).toBeInTheDocument();
	});
});

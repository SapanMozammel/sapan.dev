import SectionSeparator from '@/components/layout/common/section-separator';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('SectionSeparator', () => {
	it('renders children', () => {
		render(
			<SectionSeparator>
				<div data-testid='child'>Content</div>
			</SectionSeparator>
		);
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});

	it('renders top-left star when lts is true', () => {
		const { container } = render(<SectionSeparator lts />);
		const stars = container.querySelectorAll('svg');
		expect(stars.length).toBe(1);
	});

	it('renders all four stars', () => {
		const { container } = render(<SectionSeparator lts rts lbs rbs />);
		const stars = container.querySelectorAll('svg');
		expect(stars.length).toBe(4);
	});

	it('renders top line when tl is true', () => {
		const { container } = render(<SectionSeparator tl />);
		const lines = container.querySelectorAll('span');
		expect(lines.length).toBe(1);
		expect(lines[0].className).toContain('border-t');
	});

	it('renders all four lines', () => {
		const { container } = render(<SectionSeparator tl bl ll rl />);
		const lines = container.querySelectorAll('span');
		expect(lines.length).toBe(4);
	});

	it('renders nothing when all props are false', () => {
		const { container } = render(<SectionSeparator />);
		expect(container.querySelectorAll('svg').length).toBe(0);
		expect(container.querySelectorAll('span').length).toBe(0);
	});

	it('applies section-separator class', () => {
		const { container } = render(<SectionSeparator />);
		expect(container.firstChild).toHaveClass('section-separator');
	});
});

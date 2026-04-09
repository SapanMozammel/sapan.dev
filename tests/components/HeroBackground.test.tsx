import HeroBackground from '@/components/layout/Hero/HeroBackground';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('HeroBackground', () => {
	it('renders children', () => {
		render(
			<HeroBackground>
				<div data-testid='child'>Content</div>
			</HeroBackground>
		);
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});

	it('renders background container with pointer-events-none', () => {
		const { container } = render(<HeroBackground>Content</HeroBackground>);
		const bg = container.querySelector('.pointer-events-none');
		expect(bg).toBeInTheDocument();
	});

	it('applies custom className', () => {
		const { container } = render(<HeroBackground className='custom'>Content</HeroBackground>);
		const bg = container.querySelector('.pointer-events-none');
		expect(bg).toHaveClass('custom');
	});
});

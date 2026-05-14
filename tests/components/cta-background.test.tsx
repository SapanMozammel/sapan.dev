import CtaBackground from '@/components/layout/cta/cta-background';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('CtaBackground', () => {
	it('renders all decorative elements as aria-hidden', () => {
		const { container } = render(<CtaBackground />);
		const ariaHidden = container.querySelectorAll('[aria-hidden]');
		expect(ariaHidden.length).toBeGreaterThan(20); // rays + dots + grid + gradient
	});

	it('renders all elements as pointer-events-none', () => {
		const { container } = render(<CtaBackground />);
		const elements = container.querySelectorAll('.pointer-events-none');
		expect(elements.length).toBeGreaterThan(20);
	});

	it('renders the blur overlay', () => {
		const { container } = render(<CtaBackground />);
		const blur = container.querySelector('.blur-\\[100px\\]');
		expect(blur).toBeInTheDocument();
	});

	it('renders ray animations', () => {
		const { container } = render(<CtaBackground />);
		const rays = container.querySelectorAll('[class*="cta-ray"]');
		expect(rays.length).toBeGreaterThan(0);
	});

	it('renders dot animations', () => {
		const { container } = render(<CtaBackground />);
		const dots = container.querySelectorAll('[class*="cta-dot"]');
		expect(dots.length).toBeGreaterThan(0);
	});
});

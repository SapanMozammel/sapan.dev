import Technologies from '@/components/layout/technologies';
import { TECH_STACK } from '@/data/config/technologies';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('Technologies', () => {
	it('renders within a section element with id="technologies"', () => {
		const { container } = render(<Technologies />);
		const section = container.querySelector('section#technologies');
		expect(section).toBeInTheDocument();
	});

	it('renders the section title', () => {
		render(<Technologies />);
		expect(screen.getByText("I'm an Expertise In")).toBeInTheDocument();
	});

	it('renders one cell per TECH_STACK item', () => {
		render(<Technologies />);
		// Each tech with logo has its name in an `sr-only` span; without logo, in a visible span.
		TECH_STACK.forEach((tech) => {
			const matches = screen.getAllByText(tech.name);
			expect(matches.length).toBeGreaterThan(0);
		});
	});

	it('renders an image alt for every logo-bearing tech', () => {
		const { container } = render(<Technologies />);
		const techWithLogo = TECH_STACK.filter((t) => t.logo);
		techWithLogo.forEach((tech) => {
			const img = container.querySelector(`img[alt="${tech.name} logo"]`);
			expect(img).toBeInTheDocument();
		});
	});
});

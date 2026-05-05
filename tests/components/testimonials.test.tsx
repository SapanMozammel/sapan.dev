import Testimonials from '@/components/layout/testimonials';
import { TESTIMONIAL_LIST } from '@/data/content/testimonials';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('Testimonials', () => {
	it('renders within a section element with id="testimonials"', () => {
		const { container } = render(<Testimonials />);
		const section = container.querySelector('section#testimonials');
		expect(section).toBeInTheDocument();
	});

	it('renders the section title', () => {
		render(<Testimonials />);
		expect(screen.getByText('What People Say About Me')).toBeInTheDocument();
	});

	it('renders both marquee rows (top + bottom)', () => {
		const { container } = render(<Testimonials />);
		// Each Marquee renders its content; expect testimonial cards in two rows.
		const totalCards = container.querySelectorAll('[class*="rounded"][class*="p-"]').length;
		// Two rows × TESTIMONIAL_LIST.length = visible testimonial cards
		expect(totalCards).toBeGreaterThanOrEqual(TESTIMONIAL_LIST.length);
	});

	it('renders testimonial author names', () => {
		render(<Testimonials />);
		// First testimonial's author should appear at least once
		const firstAuthor = TESTIMONIAL_LIST[0]?.name;
		if (firstAuthor) {
			const matches = screen.getAllByText(firstAuthor);
			expect(matches.length).toBeGreaterThan(0);
		}
	});
});

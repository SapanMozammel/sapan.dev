import Portfolio from '@/components/layout/portfolio';
import { PORTFOLIO_DISPLAY_PROJECTS } from '@/data/content/portfolio';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('Portfolio', () => {
	it('renders within a section element with id="portfolio"', () => {
		const { container } = render(<Portfolio />);
		const section = container.querySelector('section#portfolio');
		expect(section).toBeInTheDocument();
	});

	it('renders the section title', () => {
		render(<Portfolio />);
		expect(screen.getByText('My Recent Works')).toBeInTheDocument();
	});

	it('renders all displayed project descriptions', () => {
		render(<Portfolio />);
		PORTFOLIO_DISPLAY_PROJECTS.forEach((project) => {
			expect(screen.getByText(project.description)).toBeInTheDocument();
		});
	});

	it('renders one project image alt per displayed project', () => {
		const { container } = render(<Portfolio />);
		const images = container.querySelectorAll('img[alt$="-image"]');
		expect(images.length).toBe(PORTFOLIO_DISPLAY_PROJECTS.length);
	});

	it('renders Learn More CTAs for each displayed project', () => {
		render(<Portfolio />);
		const learnMoreLinks = screen.getAllByText('Learn More');
		expect(learnMoreLinks.length).toBe(PORTFOLIO_DISPLAY_PROJECTS.length);
	});
});

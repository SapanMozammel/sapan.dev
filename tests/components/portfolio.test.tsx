import Portfolio from '@/components/layout/portfolio';
import { PORTFOLIO_PROJECTS } from '@/data/content/portfolio';
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

	it('renders all project descriptions', () => {
		render(<Portfolio />);
		PORTFOLIO_PROJECTS.forEach((project) => {
			expect(screen.getByText(project.description)).toBeInTheDocument();
		});
	});

	it('renders one project image alt per project', () => {
		const { container } = render(<Portfolio />);
		const images = container.querySelectorAll('img[alt$="-image"]');
		expect(images.length).toBe(PORTFOLIO_PROJECTS.length);
	});

	it('renders Learn More CTAs for each project', () => {
		render(<Portfolio />);
		const learnMoreLinks = screen.getAllByText('Learn More');
		expect(learnMoreLinks.length).toBe(PORTFOLIO_PROJECTS.length);
	});
});

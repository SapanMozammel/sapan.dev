import NavMenu from '@/components/layout/Header/NavMenu';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('NavMenu', () => {
	it('renders a nav element', () => {
		const { container } = render(<NavMenu />);
		expect(container.querySelector('nav')).toBeInTheDocument();
	});

	it('renders all nav items', () => {
		render(<NavMenu />);
		expect(screen.getByText('Portfolio')).toBeInTheDocument();
		expect(screen.getByText('Experience')).toBeInTheDocument();
		expect(screen.getByText('Workflow')).toBeInTheDocument();
		expect(screen.getByText('Articles')).toBeInTheDocument();
	});

	it('renders section links pointing to home', () => {
		render(<NavMenu />);
		const portfolioLink = screen.getByText('Portfolio').closest('a');
		expect(portfolioLink).toHaveAttribute('href', '/');
	});

	it('renders Articles link with correct href', () => {
		render(<NavMenu />);
		const articlesLink = screen.getByText('Articles').closest('a');
		expect(articlesLink).toHaveAttribute('href', '/articles');
	});

	it('is hidden on mobile (has md:flex)', () => {
		const { container } = render(<NavMenu />);
		const nav = container.querySelector('nav');
		expect(nav?.className).toContain('hidden');
		expect(nav?.className).toContain('md:flex');
	});
});

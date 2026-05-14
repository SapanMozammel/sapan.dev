import Header from '@/components/layout/header';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { render } from '../test-utils';

describe('Header', () => {
	it('renders a header element', () => {
		const { container } = render(<Header />);
		expect(container.querySelector('header')).toBeInTheDocument();
	});

	it('renders the logo link to home', () => {
		render(<Header />);
		const logoLink = screen.getByRole('link', { name: /sapan\.dev/i });
		expect(logoLink).toHaveAttribute('href', '/');
	});

	it('renders the site name', () => {
		render(<Header />);
		expect(screen.getByText('sapan.dev')).toBeInTheDocument();
	});

	it('renders the GitHub link', () => {
		const { container } = render(<Header />);
		const githubLink = container.querySelector('a[href="https://github.com/SapanMozammel"]');
		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute('target', '_blank');
	});
});

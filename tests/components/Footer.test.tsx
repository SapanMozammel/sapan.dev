import Footer from '@/components/layout/Footer';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Footer', () => {
	it('renders footer element', () => {
		const { container } = render(<Footer />);
		expect(container.querySelector('footer')).toBeInTheDocument();
	});

	it('renders copyright text with current year', () => {
		render(<Footer />);
		const year = new Date().getFullYear().toString();
		expect(screen.getByText(new RegExp(`${year}.*All rights reserved`))).toBeInTheDocument();
	});

	it('renders the developer credit', () => {
		render(<Footer />);
		expect(screen.getByText(/Designed & Developed by SapanMozammel/i)).toBeInTheDocument();
	});
});

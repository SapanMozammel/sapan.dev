import Footer from '@/components/layout/Footer';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Footer', () => {
	it('renders footer element', async () => {
		const { container } = render(await Footer());
		expect(container.querySelector('footer')).toBeInTheDocument();
	});

	it('renders copyright text with current year', async () => {
		render(await Footer());
		const year = new Date().getFullYear().toString();
		expect(screen.getByText(new RegExp(`${year}.*All rights reserved`))).toBeInTheDocument();
	});

	it('renders the developer credit', async () => {
		render(await Footer());
		expect(screen.getByText(/Designed & Developed by Sapan Mozammel/i)).toBeInTheDocument();
	});
});

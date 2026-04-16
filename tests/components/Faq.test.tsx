import Faq from '@/components/layout/Faq';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Faq', () => {
	it('renders FAQ section title', async () => {
		render(await Faq());
		expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
	});

	it('renders first FAQ question', async () => {
		render(await Faq());
		expect(screen.getByText(/Are you available for freelance/i)).toBeInTheDocument();
	});

	it('renders within a section element', async () => {
		const { container } = render(await Faq());
		expect(container.querySelector('section')).toBeInTheDocument();
	});
});

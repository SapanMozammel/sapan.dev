import Faq from '@/components/layout/Faq';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Faq', () => {
	it('renders FAQ section title', () => {
		render(<Faq />);
		expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
	});

	it('renders first FAQ question', () => {
		render(<Faq />);
		expect(screen.getByText(/Are you available for freelance/i)).toBeInTheDocument();
	});

	it('renders within a section element', () => {
		const { container } = render(<Faq />);
		expect(container.querySelector('section')).toBeInTheDocument();
	});
});

import Hero from '@/components/layout/Hero';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('Hero', () => {
	it('renders the sr-only heading', () => {
		render(<Hero />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveClass('sr-only');
	});

	it('renders the main tagline', () => {
		render(<Hero />);
		expect(screen.getByText(/shaping the future of web development/i)).toBeInTheDocument();
	});

	it('renders JavaScript with underline', () => {
		render(<Hero />);
		expect(screen.getByText('JavaScript')).toBeInTheDocument();
	});

	it('renders the description paragraph', () => {
		render(<Hero />);
		expect(screen.getByText(/5\+ years of dynamic experience/i)).toBeInTheDocument();
	});

	it('renders connect button', () => {
		render(<Hero />);
		expect(screen.getByText("Let's Connect")).toBeInTheDocument();
	});

	it('renders within a section element', () => {
		const { container } = render(<Hero />);
		expect(container.querySelector('section')).toBeInTheDocument();
	});
});

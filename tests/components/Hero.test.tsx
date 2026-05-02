import Hero from '@/components/layout/Hero';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../test-utils';

vi.mock('@/components/layout/Hero/about/AboutScreen', () => ({
	default: () => <div data-testid='about-screen-stub' />,
}));

describe('Hero', () => {
	it('renders the sr-only heading', async () => {
		render(await Hero());
		expect(screen.getByRole('heading', { level: 1 })).toHaveClass('sr-only');
	});

	it('renders the main tagline', async () => {
		render(await Hero());
		expect(screen.getByText(/shaping the future of web development/i)).toBeInTheDocument();
	});

	it('renders JavaScript with underline', async () => {
		render(await Hero());
		expect(screen.getByText('JavaScript')).toBeInTheDocument();
	});

	it('renders the description paragraph', async () => {
		render(await Hero());
		expect(screen.getByText(/6\+ years of dynamic experience/i)).toBeInTheDocument();
	});

	it('renders the download resume button', async () => {
		render(await Hero());
		expect(screen.getByText('Download Resume')).toBeInTheDocument();
	});

	it('renders within a section element', async () => {
		const { container } = render(await Hero());
		expect(container.querySelector('section')).toBeInTheDocument();
	});

	it('renders the About screen', async () => {
		render(await Hero());
		expect(screen.getByTestId('about-screen-stub')).toBeInTheDocument();
	});
});

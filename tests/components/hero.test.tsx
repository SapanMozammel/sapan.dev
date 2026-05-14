import Hero from '@/components/layout/hero';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../test-utils';

vi.mock('@/components/layout/hero/about/about-screen', () => ({
	default: () => <div data-testid='about-screen-stub' />,
}));

describe('Hero', () => {
	it('renders the main tagline', async () => {
		render(await Hero());
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/scalable, high-performance web applications/i);
	});

	it('renders the heading highlight word', async () => {
		render(await Hero());
		expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0);
	});

	it('renders the description paragraph', async () => {
		render(await Hero());
		expect(screen.getByText(/admin dashboards, SaaS Frontend/i)).toBeInTheDocument();
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

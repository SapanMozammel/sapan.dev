import Cta from '@/components/layout/Cta';
import { render, screen } from '../test-utils';
import { describe, expect, it } from 'vitest';

describe('Cta', () => {
	it('renders CTA heading', () => {
		render(<Cta />);
		expect(screen.getByText(/Have a project in mind/i)).toBeInTheDocument();
	});

	it('renders collaboration message', () => {
		render(<Cta />);
		expect(screen.getByText(/Let's build it together/i)).toBeInTheDocument();
	});

	it('renders description text', () => {
		render(<Cta />);
		expect(screen.getByText(/Whether you need a full product/i)).toBeInTheDocument();
	});

	it('renders connect button', () => {
		render(<Cta />);
		expect(screen.getByText("Let's Connect")).toBeInTheDocument();
	});

	it('renders within a section element', () => {
		const { container } = render(<Cta />);
		expect(container.querySelector('section')).toBeInTheDocument();
	});

	it('renders logo', () => {
		const { container } = render(<Cta />);
		const svgs = container.querySelectorAll('svg');
		expect(svgs.length).toBeGreaterThan(0);
	});
});

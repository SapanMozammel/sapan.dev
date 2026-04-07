import Experience from '@/components/layout/Experience';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Experience', () => {
	it('renders section title', () => {
		render(<Experience />);
		expect(screen.getByText('Evolution as a Developer')).toBeInTheDocument();
	});

	it('renders subtitle', () => {
		render(<Experience />);
		// "Experience" appears as both watermark and subtitle
		expect(screen.getAllByText('Experience').length).toBeGreaterThanOrEqual(2);
	});

	it('renders within a section element', () => {
		const { container } = render(<Experience />);
		expect(container.querySelector('section')).toBeInTheDocument();
	});
});

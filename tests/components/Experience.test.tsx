import Experience from '@/components/layout/Experience';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Experience', () => {
	it('renders section title', async () => {
		render(await Experience());
		expect(screen.getByText('Evolution as a Developer')).toBeInTheDocument();
	});

	it('renders subtitle', async () => {
		render(await Experience());
		// "Experience" appears as both watermark and subtitle
		expect(screen.getAllByText('Experience').length).toBeGreaterThanOrEqual(2);
	});

	it('renders within a section element', async () => {
		const { container } = render(await Experience());
		expect(container.querySelector('section')).toBeInTheDocument();
	});
});

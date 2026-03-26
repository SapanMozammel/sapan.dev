import Footer from '@/components/layout/Footer';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Footer', () => {
	it('renders footer element', () => {
		const { container } = render(<Footer />);
		expect(container.querySelector('footer')).toBeInTheDocument();
	});
});

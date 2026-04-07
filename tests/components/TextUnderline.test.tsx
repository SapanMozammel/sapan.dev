import TextUnderline from '@/components/layout/common/TextUnderline';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('TextUnderline', () => {
	it('renders children text', () => {
		render(<TextUnderline>Hello</TextUnderline>);
		expect(screen.getByText('Hello')).toBeInTheDocument();
	});

	it('renders SVG underline decoration', () => {
		const { container } = render(<TextUnderline>Text</TextUnderline>);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('applies custom className', () => {
		const { container } = render(<TextUnderline className='my-class'>Text</TextUnderline>);
		const span = container.firstChild as HTMLElement;
		expect(span).toHaveClass('relative');
		expect(span).toHaveClass('my-class');
	});

	it('contains gradient definition', () => {
		const { container } = render(<TextUnderline>Text</TextUnderline>);
		const gradient = container.querySelector('linearGradient');
		expect(gradient).toBeInTheDocument();
	});
});

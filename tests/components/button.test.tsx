import { Button } from '@/components/layout/common/button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Button', () => {
	it('renders children text', () => {
		render(<Button>Click Me</Button>);
		expect(screen.getByText('Click Me')).toBeInTheDocument();
	});

	it('renders as a button element by default', () => {
		render(<Button>Btn</Button>);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('renders as a link when "to" prop is provided', () => {
		render(<Button to='/about'>About</Button>);
		expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
	});

	it('calls onClick handler', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Click</Button>);
		await user.click(screen.getByRole('button'));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('disables button when disabled prop is true', () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('shows loading state', () => {
		render(<Button loading>Submit</Button>);
		expect(screen.getByText('loading...')).toBeInTheDocument();
	});

	it('applies pointer-events-none when loading', () => {
		render(<Button loading>Submit</Button>);
		expect(screen.getByRole('button').className).toContain('pointer-events-none');
	});

	it('renders SVG shape elements', () => {
		const { container } = render(<Button>Test</Button>);
		const svgs = container.querySelectorAll('svg');
		expect(svgs.length).toBeGreaterThanOrEqual(3); // left, center, right
	});

	it('renders gradient definitions for gradient variant', () => {
		const { container } = render(<Button gradient>Grad</Button>);
		const gradients = container.querySelectorAll('linearGradient');
		expect(gradients.length).toBeGreaterThan(0);
	});

	it('does not render gradient definitions for solid variant', () => {
		const { container } = render(<Button>Solid</Button>);
		const gradients = container.querySelectorAll('linearGradient');
		expect(gradients.length).toBe(0);
	});

	it('applies custom className', () => {
		render(<Button className='mt-4'>Styled</Button>);
		expect(screen.getByRole('button').className).toContain('mt-4');
	});
});

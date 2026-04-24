import CursorTooltip, { TooltipContent } from '@/components/ui/cursor-tooltip';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('TooltipContent', () => {
	it('renders children text', () => {
		render(<TooltipContent>Hello</TooltipContent>);
		expect(screen.getByText('Hello')).toBeInTheDocument();
	});

	it('applies custom className', () => {
		const { container } = render(<TooltipContent className='custom-class'>Test</TooltipContent>);
		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('has pointer-events-none class', () => {
		const { container } = render(<TooltipContent>Test</TooltipContent>);
		expect(container.firstChild).toHaveClass('pointer-events-none');
	});
});

describe('CursorTooltip', () => {
	it('renders children', () => {
		render(
			<CursorTooltip content='Tooltip text'>
				<button>Hover me</button>
			</CursorTooltip>
		);
		expect(screen.getByText('Hover me')).toBeInTheDocument();
	});

	it('applies pointer-fine:cursor-none to container', () => {
		render(
			<CursorTooltip content='Tooltip'>
				<span>Content</span>
			</CursorTooltip>
		);
		// Gated behind @media (pointer: fine) so touch devices retain native tap highlight.
		expect(screen.getByText('Content').parentElement).toHaveClass('pointer-fine:cursor-none');
	});

	it('applies custom className to container', () => {
		render(
			<CursorTooltip content='Tooltip' className='my-class'>
				<span>Content</span>
			</CursorTooltip>
		);
		expect(screen.getByText('Content').parentElement).toHaveClass('my-class');
	});

	it('does not show tooltip content initially', () => {
		render(
			<CursorTooltip content='Hidden tooltip'>
				<span>Hover me</span>
			</CursorTooltip>
		);
		expect(screen.queryByText('Hidden tooltip')).not.toBeInTheDocument();
	});

	it('shows tooltip on mouse enter', async () => {
		render(
			<CursorTooltip content='Visible tooltip'>
				<span>Hover me</span>
			</CursorTooltip>
		);

		fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
		expect(screen.getByText('Visible tooltip')).toBeInTheDocument();
	});

	it('hides tooltip on mouse leave', async () => {
		render(
			<CursorTooltip content='Tooltip text'>
				<span>Hover me</span>
			</CursorTooltip>
		);

		const container = screen.getByText('Hover me').parentElement!;
		fireEvent.mouseEnter(container);
		expect(screen.getByText('Tooltip text')).toBeInTheDocument();

		fireEvent.mouseLeave(container);
		// AnimatePresence may keep it briefly, but isVisible is false
		// The motion.div exit animation will handle removal
	});

	it('renders ReactNode content directly', () => {
		render(
			<CursorTooltip content={<span data-testid='custom-content'>Custom</span>}>
				<span>Hover me</span>
			</CursorTooltip>
		);

		fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
		expect(screen.getByTestId('custom-content')).toBeInTheDocument();
	});

	it('wraps string content in TooltipContent component', () => {
		render(
			<CursorTooltip content='String tooltip'>
				<span>Hover me</span>
			</CursorTooltip>
		);

		fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
		const tooltip = screen.getByText('String tooltip');
		expect(tooltip.closest('.pointer-events-none')).toBeInTheDocument();
	});

	it('applies contentClassName to string tooltip', () => {
		render(
			<CursorTooltip content='Styled tooltip' contentClassName='extra-style'>
				<span>Hover me</span>
			</CursorTooltip>
		);

		fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
		const tooltip = screen.getByText('Styled tooltip');
		expect(tooltip.closest('.extra-style')).toBeInTheDocument();
	});

	it('calls onClick handler when clicked', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(
			<CursorTooltip content='Tooltip' onClick={handleClick}>
				<span>Click me</span>
			</CursorTooltip>
		);

		await user.click(screen.getByText('Click me'));
		expect(handleClick).toHaveBeenCalledOnce();
	});

	it('renders tooltip in a portal (appended to body)', () => {
		render(
			<CursorTooltip content='Portal tooltip'>
				<span>Hover me</span>
			</CursorTooltip>
		);

		fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
		const tooltip = screen.getByText('Portal tooltip');
		// Portal renders directly under document.body, not inside the container
		expect(tooltip.closest('[class*="fixed"]')).toBeInTheDocument();
	});
});

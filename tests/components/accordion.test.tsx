import Accordion from '@/components/ui/accordion';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

const mockItems = [
	{ question: 'Question 1?', answer: 'Answer 1' },
	{ question: 'Question 2?', answer: 'Answer 2' },
	{ question: 'Question 3?', answer: 'Answer 3' },
];

describe('Accordion', () => {
	it('renders all items', () => {
		render(<Accordion items={mockItems} />);
		expect(screen.getByText('Question 1?')).toBeInTheDocument();
		expect(screen.getByText('Question 2?')).toBeInTheDocument();
		expect(screen.getByText('Question 3?')).toBeInTheDocument();
	});

	it('first item is open by default', () => {
		render(<Accordion items={mockItems} />);
		const buttons = screen.getAllByRole('button');
		expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
	});

	it('other items are closed by default', () => {
		render(<Accordion items={mockItems} />);
		const buttons = screen.getAllByRole('button');
		expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
		expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
	});

	it('toggles item on click', async () => {
		const user = userEvent.setup();
		render(<Accordion items={mockItems} />);
		const buttons = screen.getAllByRole('button');

		// Click second item
		await user.click(buttons[1]);
		expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
		expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
	});

	it('closes item when clicking it again', async () => {
		const user = userEvent.setup();
		render(<Accordion items={mockItems} />);
		const buttons = screen.getAllByRole('button');

		// Click first item to close it
		await user.click(buttons[0]);
		expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
	});

	it('renders numbered indices', () => {
		render(<Accordion items={mockItems} />);
		expect(screen.getByText('01')).toBeInTheDocument();
		expect(screen.getByText('02')).toBeInTheDocument();
		expect(screen.getByText('03')).toBeInTheDocument();
	});

	it('renders answer text', () => {
		render(<Accordion items={mockItems} />);
		expect(screen.getByText('Answer 1')).toBeInTheDocument();
	});

	it('toggles item via Enter key', async () => {
		const user = userEvent.setup();
		render(<Accordion items={mockItems} />);
		const buttons = screen.getAllByRole('button');

		buttons[1].focus();
		await user.keyboard('{Enter}');
		expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
		expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
	});

	it('toggles item via Space key', async () => {
		const user = userEvent.setup();
		render(<Accordion items={mockItems} />);
		const buttons = screen.getAllByRole('button');

		buttons[2].focus();
		await user.keyboard(' ');
		expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
	});

	it('Tab key moves focus between accordion buttons', async () => {
		const user = userEvent.setup();
		render(<Accordion items={mockItems} />);
		const buttons = screen.getAllByRole('button');

		buttons[0].focus();
		await user.tab();
		expect(buttons[1]).toHaveFocus();
		await user.tab();
		expect(buttons[2]).toHaveFocus();
	});
});

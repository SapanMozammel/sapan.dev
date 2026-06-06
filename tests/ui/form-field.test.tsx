import FormField from '@/components/ui/form-field';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../test-utils';

const noopChange = vi.fn();

describe('FormField', () => {
	it('associates the label with its input via htmlFor/id', () => {
		render(<FormField label='Name' name='name' value='' onChange={noopChange} />);
		const input = screen.getByLabelText('Name');
		expect(input).toBeInTheDocument();
		expect(input.tagName.toLowerCase()).toBe('input');
	});

	it('associates the label with a textarea when type="textarea"', () => {
		render(<FormField label='Message' name='message' type='textarea' value='' onChange={noopChange} />);
		const textarea = screen.getByLabelText('Message');
		expect(textarea).toBeInTheDocument();
		expect(textarea.tagName.toLowerCase()).toBe('textarea');
	});

	it('clicking the label focuses the input', async () => {
		const user = userEvent.setup();
		render(<FormField label='Email' name='email' type='email' value='' onChange={noopChange} />);
		const label = screen.getByText('Email');
		const input = screen.getByLabelText('Email');
		await user.click(label);
		expect(input).toHaveFocus();
	});

	it('omits aria-describedby when no error is set', () => {
		render(<FormField label='Title' name='title' value='' onChange={noopChange} />);
		const input = screen.getByLabelText('Title');
		expect(input).not.toHaveAttribute('aria-describedby');
	});

	it('wires aria-describedby to the error paragraph id when error is set', () => {
		render(<FormField label='Name' name='name' value='' error='Name is required' onChange={noopChange} />);
		const input = screen.getByLabelText('Name');
		const describedBy = input.getAttribute('aria-describedby');
		expect(describedBy).toBeTruthy();
		const errorEl = document.getElementById(describedBy ?? '');
		expect(errorEl).not.toBeNull();
		expect(errorEl).toHaveTextContent('Name is required');
	});

	it('sets aria-invalid="true" on the input when an error is present', () => {
		render(<FormField label='Email' name='email' type='email' value='' error='Invalid email' onChange={noopChange} />);
		expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
	});

	it('omits aria-invalid when no error is set', () => {
		render(<FormField label='Email' name='email' type='email' value='' onChange={noopChange} />);
		expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid');
	});

	it('sets aria-invalid="true" on the textarea when an error is present', () => {
		render(<FormField label='Message' name='message' type='textarea' value='' error='Message is required' onChange={noopChange} />);
		expect(screen.getByLabelText('Message')).toHaveAttribute('aria-invalid', 'true');
	});
});

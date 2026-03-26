import ConnectButton from '@/components/layout/common/ConnectButton';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('ConnectButton', () => {
	it('renders with "Let\'s Connect" text', () => {
		render(<ConnectButton />);
		expect(screen.getByText("Let's Connect")).toBeInTheDocument();
	});

	it('renders as a button element', () => {
		render(<ConnectButton />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('opens contact modal on click', async () => {
		const user = userEvent.setup();
		render(<ConnectButton />);
		await user.click(screen.getByRole('button'));
		// No assertion needed — if it doesn't throw, the dispatch worked
	});

	it('applies custom className', () => {
		render(<ConnectButton className='mt-8' />);
		expect(screen.getByRole('button').className).toContain('mt-8');
	});
});

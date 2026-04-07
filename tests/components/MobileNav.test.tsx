import MobileNav from '@/components/layout/Header/MobileNav';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

describe('MobileNav', () => {
	it('renders the hamburger button', () => {
		render(<MobileNav />);
		expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
	});

	it('hamburger button is hidden on desktop (has md:hidden)', () => {
		render(<MobileNav />);
		const button = screen.getByRole('button', { name: /toggle menu/i });
		expect(button.className).toContain('md:hidden');
	});

	it('opens sheet when hamburger is clicked', async () => {
		const user = userEvent.setup();
		render(<MobileNav />);
		await user.click(screen.getByRole('button', { name: /toggle menu/i }));
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});

	it('renders all nav items when open', async () => {
		const user = userEvent.setup();
		render(<MobileNav />);
		await user.click(screen.getByRole('button', { name: /toggle menu/i }));

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Technologies')).toBeInTheDocument();
		expect(screen.getByText('Portfolio')).toBeInTheDocument();
		expect(screen.getByText('Experience')).toBeInTheDocument();
		expect(screen.getByText('Testimonials')).toBeInTheDocument();
		expect(screen.getByText('Workflow')).toBeInTheDocument();
		expect(screen.getByText('Articles')).toBeInTheDocument();
		expect(screen.getByText('FAQ')).toBeInTheDocument();
	});

	it('renders numbered labels for each item', async () => {
		const user = userEvent.setup();
		render(<MobileNav />);
		await user.click(screen.getByRole('button', { name: /toggle menu/i }));

		for (const num of ['01', '02', '03', '04', '05', '06', '07', '08']) {
			expect(screen.getByText(num)).toBeInTheDocument();
		}
	});

	it('renders the GitHub link when open', async () => {
		const user = userEvent.setup();
		render(<MobileNav />);
		await user.click(screen.getByRole('button', { name: /toggle menu/i }));

		const githubLink = screen.getByText('GitHub').closest('a');
		expect(githubLink).toHaveAttribute('href', 'https://github.com/SapanMozammel');
		expect(githubLink).toHaveAttribute('target', '_blank');
	});

	it('renders the logo in the sheet header', async () => {
		const user = userEvent.setup();
		render(<MobileNav />);
		await user.click(screen.getByRole('button', { name: /toggle menu/i }));

		expect(screen.getByText('sapan.dev')).toBeInTheDocument();
	});

	it('renders close button when open', async () => {
		const user = userEvent.setup();
		render(<MobileNav />);
		await user.click(screen.getByRole('button', { name: /toggle menu/i }));

		expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
	});
});

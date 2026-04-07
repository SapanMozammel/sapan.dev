import AdminScreen from '@/components/layout/Hero/AdminScreen';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('AdminScreen', () => {
	it('renders the admin dashboard', () => {
		const { container } = render(<AdminScreen />);
		expect(container.firstChild).toHaveClass('group/admin-dashboard');
	});

	it('renders Patrick Dean username', () => {
		render(<AdminScreen />);
		expect(screen.getByText('Patrick Dean')).toBeInTheDocument();
	});

	it('renders Inbox header', () => {
		render(<AdminScreen />);
		expect(screen.getByText('Inbox')).toBeInTheDocument();
	});

	it('renders sidebar menu items', () => {
		render(<AdminScreen />);
		expect(screen.getByText('Projects')).toBeInTheDocument();
		expect(screen.getByText('Index')).toBeInTheDocument();
		expect(screen.getByText('Teams')).toBeInTheDocument();
	});

	it('renders email list items', () => {
		render(<AdminScreen />);
		expect(screen.getAllByText('William Smith').length).toBeGreaterThan(0);
		expect(screen.getByText('Olivia Martinez')).toBeInTheDocument();
	});

	it('renders email preview', () => {
		render(<AdminScreen />);
		expect(screen.getAllByText('Meeting Tomorrow').length).toBeGreaterThan(0);
	});

	it('renders Send button in preview', () => {
		render(<AdminScreen />);
		expect(screen.getByText('Send')).toBeInTheDocument();
	});
});

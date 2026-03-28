import Footer from '@/components/layout/Footer';
import FooterConnect from '@/components/layout/Footer/FooterConnect';
import FooterNav from '@/components/layout/Footer/FooterNav';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

// ── Footer (index) ──

describe('Footer', () => {
	it('renders footer element', () => {
		const { container } = render(<Footer />);
		expect(container.querySelector('footer')).toBeInTheDocument();
	});

	it('renders the logo link to home', () => {
		render(<Footer />);
		const logoLinks = screen.getAllByRole('link', { name: /sapan\.dev/i });
		expect(logoLinks[0]).toHaveAttribute('href', '/');
	});

	it('renders the brand name "sapan.dev"', () => {
		render(<Footer />);
		const brandTexts = screen.getAllByText('sapan.dev');
		expect(brandTexts.length).toBeGreaterThanOrEqual(1);
	});

	it('renders the brand description', () => {
		render(<Footer />);
		expect(screen.getByText(/shaping the future of web development/i)).toBeInTheDocument();
	});

	it('renders Navigate section heading', () => {
		render(<Footer />);
		expect(screen.getByText('Navigate')).toBeInTheDocument();
	});

	it('renders Connect section heading', () => {
		render(<Footer />);
		expect(screen.getByText('Connect')).toBeInTheDocument();
	});

	it('renders copyright text with current year', () => {
		render(<Footer />);
		const year = new Date().getFullYear().toString();
		expect(screen.getByText(new RegExp(`${year}.*All rights reserved`))).toBeInTheDocument();
	});

	it('renders the developer credit', () => {
		render(<Footer />);
		expect(screen.getByText(/Designed & Developed by SapanMozammel/i)).toBeInTheDocument();
	});
});

// ── FooterNav ──

describe('FooterNav', () => {
	it('renders all navigation items', () => {
		render(<FooterNav />);
		const expectedItems = ['Home', 'Technologies', 'Portfolio', 'Experience', 'Testimonials', 'Workflow', 'Articles', 'FAQ'];
		expectedItems.forEach((label) => {
			expect(screen.getByText(label)).toBeInTheDocument();
		});
	});

	it('renders correct number of nav links', () => {
		render(<FooterNav />);
		const links = screen.getAllByRole('link');
		expect(links).toHaveLength(8);
	});

	it('renders Articles link with correct href', () => {
		render(<FooterNav />);
		expect(screen.getByText('Articles')).toHaveAttribute('href', '/articles');
	});

	it('renders section links with href="/"', () => {
		render(<FooterNav />);
		const sectionLabels = ['Home', 'Technologies', 'Portfolio', 'Experience', 'Testimonials', 'Workflow', 'FAQ'];
		sectionLabels.forEach((label) => {
			expect(screen.getByText(label)).toHaveAttribute('href', '/');
		});
	});

	it('renders nav items in correct page order', () => {
		render(<FooterNav />);
		const links = screen.getAllByRole('link');
		const labels = links.map((link) => link.textContent);
		expect(labels).toEqual(['Home', 'Technologies', 'Portfolio', 'Experience', 'Testimonials', 'Workflow', 'Articles', 'FAQ']);
	});

	it('calls scrollIntoView on section click when on home page', async () => {
		const user = userEvent.setup();
		const scrollIntoViewMock = vi.fn();
		const section = document.createElement('div');
		section.id = 'technologies';
		section.scrollIntoView = scrollIntoViewMock;
		document.body.appendChild(section);

		render(<FooterNav />);
		await user.click(screen.getByText('Technologies'));

		expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
		document.body.removeChild(section);
	});
});

// ── FooterConnect ──

describe('FooterConnect', () => {
	it('renders availability status', () => {
		render(<FooterConnect />);
		expect(screen.getByText('Ready for your next project')).toBeInTheDocument();
	});

	it('renders the pulsing availability dot', () => {
		const { container } = render(<FooterConnect />);
		const pingDot = container.querySelector('.animate-ping');
		expect(pingDot).toBeInTheDocument();
	});

	it('renders location text', () => {
		render(<FooterConnect />);
		expect(screen.getByText(/Based in Dhaka, Bangladesh/i)).toBeInTheDocument();
	});

	it('renders email link with correct href', () => {
		render(<FooterConnect />);
		const emailLink = screen.getByText('sapanmozammel@gmail.com');
		expect(emailLink).toBeInTheDocument();
		expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:sapanmozammel@gmail.com');
	});

	it('renders phone link with correct href', () => {
		render(<FooterConnect />);
		const phoneLink = screen.getByText('+88 01627134085');
		expect(phoneLink).toBeInTheDocument();
		expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+8801627134085');
	});

	it('renders all social links', () => {
		render(<FooterConnect />);
		const githubLink = screen.getByRole('link', { name: 'GitHub' });
		const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
		const wordpressLink = screen.getByRole('link', { name: 'WordPress' });

		expect(githubLink).toHaveAttribute('href', 'https://github.com/SapanMozammel');
		expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/sapanmozammel/');
		expect(wordpressLink).toHaveAttribute('href', 'https://profiles.wordpress.org/sapanmozammel/');
	});

	it('social links open in new tab', () => {
		render(<FooterConnect />);
		const socialLinks = [screen.getByRole('link', { name: 'GitHub' }), screen.getByRole('link', { name: 'LinkedIn' }), screen.getByRole('link', { name: 'WordPress' })];

		socialLinks.forEach((link) => {
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		});
	});

	it('renders exactly 3 social icons', () => {
		const { container } = render(<FooterConnect />);
		const socialIcons = container.querySelectorAll('svg');
		// 3 contact icons (map, mail, phone) + 3 social icons = 6
		expect(socialIcons).toHaveLength(6);
	});
});

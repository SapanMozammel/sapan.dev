import Cta from '@/components/layout/cta';
import CtaConnect from '@/components/layout/cta/cta-connect';
import CtaNav from '@/components/layout/cta/cta-nav';
import { render as rtlRender, screen as rtlScreen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../test-utils';

describe('Cta', () => {
	it('renders CTA heading', async () => {
		render(await Cta());
		expect(screen.getByText(/Have a project in mind/i)).toBeInTheDocument();
	});

	it('renders collaboration message', async () => {
		render(await Cta());
		expect(screen.getByText(/Let's build it together/i)).toBeInTheDocument();
	});

	it('renders description text', async () => {
		render(await Cta());
		expect(screen.getByText(/Whether you need a full product/i)).toBeInTheDocument();
	});

	it('renders connect button', async () => {
		render(await Cta());
		expect(screen.getByText("Let's Connect")).toBeInTheDocument();
	});

	it('renders within a section element', async () => {
		const { container } = render(await Cta());
		expect(container.querySelector('section')).toBeInTheDocument();
	});

	it('renders logo', async () => {
		const { container } = render(await Cta());
		const svgs = container.querySelectorAll('svg');
		expect(svgs.length).toBeGreaterThan(0);
	});
});

// ── CtaNav ──

describe('CtaNav', () => {
	it('renders all navigation items', () => {
		rtlRender(<CtaNav />);
		const expectedItems = ['Home', 'Technologies', 'Portfolio', 'Experience', 'Testimonials', 'Workflow', 'Articles', 'FAQ'];
		expectedItems.forEach((label) => {
			expect(rtlScreen.getByText(label)).toBeInTheDocument();
		});
	});

	it('renders correct number of nav links', () => {
		rtlRender(<CtaNav />);
		const links = rtlScreen.getAllByRole('link');
		expect(links).toHaveLength(8);
	});

	it('renders Articles link with correct href', () => {
		rtlRender(<CtaNav />);
		expect(rtlScreen.getByText('Articles')).toHaveAttribute('href', '/articles');
	});

	it('renders section links with href="/"', () => {
		rtlRender(<CtaNav />);
		const sectionLabels = ['Home', 'Technologies', 'Portfolio', 'Experience', 'Testimonials', 'Workflow', 'FAQ'];
		sectionLabels.forEach((label) => {
			expect(rtlScreen.getByText(label)).toHaveAttribute('href', '/');
		});
	});

	it('renders nav items in correct page order', () => {
		rtlRender(<CtaNav />);
		const links = rtlScreen.getAllByRole('link');
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

		rtlRender(<CtaNav />);
		await user.click(rtlScreen.getByText('Technologies'));

		expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
		document.body.removeChild(section);
	});
});

// ── CtaConnect ──

describe('CtaConnect', () => {
	it('renders availability status', () => {
		rtlRender(<CtaConnect />);
		expect(rtlScreen.getByText('Ready for your next project')).toBeInTheDocument();
	});

	it('renders the pulsing availability dot', () => {
		const { container } = rtlRender(<CtaConnect />);
		const pingDot = container.querySelector('.animate-ping');
		expect(pingDot).toBeInTheDocument();
	});

	it('renders location text', () => {
		rtlRender(<CtaConnect />);
		expect(rtlScreen.getByText(/Based in Dhaka, Bangladesh/i)).toBeInTheDocument();
	});

	it('renders email link with correct href', () => {
		rtlRender(<CtaConnect />);
		const emailLink = rtlScreen.getByText('sapanmozammel@gmail.com');
		expect(emailLink).toBeInTheDocument();
		expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:sapanmozammel@gmail.com');
	});

	it('renders phone link with correct href', () => {
		rtlRender(<CtaConnect />);
		const phoneLink = rtlScreen.getByText('+88 01627134085');
		expect(phoneLink).toBeInTheDocument();
		expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+8801627134085');
	});

	it('renders all social links', () => {
		rtlRender(<CtaConnect />);
		const githubLink = rtlScreen.getByRole('link', { name: 'GitHub' });
		const linkedinLink = rtlScreen.getByRole('link', { name: 'LinkedIn' });
		const wordpressLink = rtlScreen.getByRole('link', { name: 'WordPress' });

		expect(githubLink).toHaveAttribute('href', 'https://github.com/SapanMozammel');
		expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/sapanmozammel/');
		expect(wordpressLink).toHaveAttribute('href', 'https://profiles.wordpress.org/sapanmozammel/');
	});

	it('social links open in new tab', () => {
		rtlRender(<CtaConnect />);
		const socialLinks = [rtlScreen.getByRole('link', { name: 'GitHub' }), rtlScreen.getByRole('link', { name: 'LinkedIn' }), rtlScreen.getByRole('link', { name: 'WordPress' })];

		socialLinks.forEach((link) => {
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('rel', 'noopener noreferrer');
		});
	});

	it('renders exactly 3 social icons', () => {
		const { container } = rtlRender(<CtaConnect />);
		const socialIcons = container.querySelectorAll('svg');
		// 3 contact icons (map, mail, phone) + 3 social icons = 6
		expect(socialIcons).toHaveLength(6);
	});
});

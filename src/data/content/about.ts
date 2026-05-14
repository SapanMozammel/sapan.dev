import type { AboutData } from '@/types/about';

export const ABOUT_DATA: AboutData = {
	bio: 'Frontend Developer working in React, Next.js, and TypeScript. I build admin dashboards, SaaS Frontend, and WordPress plugin UIs — including v1 frontend foundations and re-architectures of complex admin panels across products used by 6M+ users in 180+ countries. Strict typing, accessibility (WCAG, ARIA, RTL), and Core Web Vitals are standard expectations, not extras.',
	availability: 'Open to full-time remote · EOR or contractor · 30-day notice',
	quickFacts: [
		{ id: 'legalName', label: 'Legal name', value: 'Mozammel Ali' },
		{ id: 'location', label: 'Location', value: 'Dhaka, Bangladesh' },
		{ id: 'timezone', label: 'Timezone', value: 'UTC +6' },
		{ id: 'reach', label: 'Reach', value: '6M+ users · 180+ countries' },
		{ id: 'products', label: 'Products', value: '9+ shipped' },
	],
	industries: ['SaaS', 'AI', 'Developer Tools', 'WordPress', 'Cloud Hosting', 'Recruiting'],
	strengths: [
		'Frontend architecture & design systems',
		'Production-grade TypeScript',
		'Performance & Core Web Vitals',
		'Accessibility (WCAG, ARIA, RTL)',
		'Pixel-perfect design implementation',
		'Async remote collaboration',
	],
	socials: [
		{ id: 'email', label: 'Email', href: 'mailto:sapanmozammel@gmail.com' },
		{ id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/sapanmozammel' },
		{ id: 'github', label: 'GitHub', href: 'https://github.com/SapanMozammel' },
		{ id: 'portfolio', label: 'Portfolio', href: 'https://sapan-dev.vercel.app' },
	],
	skillGroups: [
		{
			id: 'core',
			label: 'Core Frontend',
			items: ['React 19', 'Next.js 16', 'TypeScript', 'Vue.js'],
		},
		{
			id: 'apis',
			label: 'State & Data',
			items: ['Redux Toolkit', 'React Query', 'GraphQL', 'REST APIs', 'Zod', 'React Hook Form', 'Prisma', 'Firebase'],
		},
		{
			id: 'styling',
			label: 'UI & Styling',
			items: ['Tailwind CSS', 'SCSS', 'shadcn/ui', 'Framer Motion', 'GSAP', 'Three.js'],
		},
		{
			id: 'ops',
			label: 'Testing & Tooling',
			items: ['Vitest', 'Playwright', 'Jest', 'Vercel', 'Docker', 'CI/CD'],
		},
		{
			id: 'practice',
			label: 'Engineering Practice',
			items: ['Accessibility (WCAG, ARIA, RTL)', 'Performance & Core Web Vitals', 'Design systems', 'i18n'],
		},
	],
	languages: [
		{ id: 'en', name: 'English', level: 'Professional' },
		{ id: 'bn', name: 'Bengali', level: 'Native' },
	],
};

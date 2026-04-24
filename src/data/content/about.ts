import type { AboutData } from '@/types/about';

export const ABOUT_DATA: AboutData = {
	bio: 'Product-minded frontend developer shipping React, Next.js, and TypeScript applications for SaaS, AI, and developer-tool companies. Experienced designing v1 frontend foundations, re-architecting complex admin panels, and integrating REST/GraphQL APIs with strict typing, accessibility, and performance discipline.',
	availability: 'Available · Full-time Remote · EOR / Contractor-friendly · 30-day notice',
	quickFacts: [
		{ id: 'location', label: 'Location', value: 'Dhaka, Bangladesh' },
		{ id: 'timezone', label: 'Timezone', value: 'UTC +6' },
		{ id: 'reach', label: 'Reach', value: '6M+ users · 180+ countries' },
		{ id: 'products', label: 'Products', value: '9+ shipped' },
	],
	industries: ['SaaS', 'AI', 'Developer Tools', 'WordPress', 'Cloud Hosting', 'Recruiting'],
	strengths: [
		'Frontend architecture & design systems',
		'Performance & Core Web Vitals',
		'Accessibility (WCAG, ARIA, RTL)',
		'Figma → code with pixel fidelity',
		'Async remote collaboration',
		'Clean, typed, maintainable code',
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
			label: 'Core',
			items: ['React 19', 'Next.js 16', 'TypeScript', 'Vue.js', 'Redux Toolkit', 'React Query'],
		},
		{
			id: 'apis',
			label: 'APIs & Data',
			items: ['GraphQL', 'REST APIs', 'Zod', 'React Hook Form', 'Prisma', 'Firebase'],
		},
		{
			id: 'styling',
			label: 'Styling & UI',
			items: ['Tailwind CSS', 'SCSS', 'shadcn/ui', 'Framer Motion', 'GSAP', 'Three.js'],
		},
		{
			id: 'ops',
			label: 'Testing & Ops',
			items: ['Jest', 'Playwright', 'Vitest', 'Vercel', 'Docker', 'CI/CD'],
		},
		{
			id: 'practice',
			label: 'Practice',
			items: ['Accessibility (WCAG, ARIA, RTL)', 'i18n', 'Core Web Vitals', 'Design systems'],
		},
	],
	languages: [
		{ id: 'en', name: 'English', level: 'Professional' },
		{ id: 'bn', name: 'Bengali', level: 'Native' },
	],
};

import type { PortfolioProject } from '@/types/portfolio';
import TubeOnAILogo from '@/lib/icons/projects/TubeOnAI/Logo';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
	{
		className: 'bg-primary/5 border-primary/20',
		title: 'TubeOnAI',
		description:
			'A modern AI-powered YouTube content assistant with dynamic UI, fast data fetching, form workflows, and optimized client-side performance. A modern AI-powered YouTube content assistant with dynamic UI, fast data fetching, form workflows, and optimized client-side performance.',
		role: 'Frontend Developer',
		technologies: ['TypeScript', 'React.js', 'Next.js', 'Astro.js', 'React Query', 'React Hook Form', 'Zod'],
		link: '#',
		icon: <TubeOnAILogo />,
		image: 'https://tubeonai.com/wp-content/uploads/2025/02/Summaries-scaled.webp',
	},
];

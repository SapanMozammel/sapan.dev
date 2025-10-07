'use client';

import CursorTooltip from '@/components/ui/cursor-tooltip';
import { DiamondGrid } from '@/components/ui/diamond-grid';
import Image from 'next/image';
import { memo } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

// Move outside component to prevent recreation on every render
// Using Simple Icons CDN for reliable, transparent vector images
// Gradients optimized for each logo's specific color and visibility
const techStack = [
	{ name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript' },
	{ name: 'React', logo: 'https://cdn.simpleicons.org/react' },
	{ name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs' },
	{ name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs' },
	{ name: 'Git', logo: 'https://cdn.simpleicons.org/git' },
	{ name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss' },
	{ name: 'shadcn/ui', logo: 'https://cdn.simpleicons.org/shadcnui' },
	{ name: 'Prisma', logo: 'https://cdn.simpleicons.org/prisma' },
	{ name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb' },
	{ name: 'GraphQL', logo: 'https://cdn.simpleicons.org/graphql' },
	{ name: 'Docker', logo: 'https://cdn.simpleicons.org/docker' },
	{ name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel' },
	{ name: 'Google Cloud', logo: 'https://cdn.simpleicons.org/googlecloud' },
	{ name: 'Framer Motion', logo: 'https://cdn.simpleicons.org/framer' },
	{ name: 'Three.js', logo: 'https://cdn.simpleicons.org/threedotjs' },
	{ name: 'WordPress', logo: 'https://cdn.simpleicons.org/wordpress' },
];

const Technologies = memo(() => {
	return (
		<section className='relative z-1 pt-[20vw]'>
			<SectionSeparator lts rts lbs rbs bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 text-center sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='Technologies' title={`I'm an Expertise In`} watermark='Technologies' />
					<DiamondGrid items={techStack}>
						{(item) => (
							<CursorTooltip
								key={`${item.name}-${item.index}`}
								content={item.name}
								className={`from-secondary-100/50 dark:from-secondary-800/50 dark:to-secondary-900/50 to-secondary-300/50 shadow-secondary-300/10 dark:shadow-dark/10 flex aspect-video w-full items-center justify-center rounded-[2.25vw] bg-gradient-to-b text-sm font-medium text-white shadow-xl transition-shadow duration-300 select-none md:rounded-[1.25vw]`}
							>
								{item.logo ? (
									<span className='relative h-1/2 w-full'>
										<Image src={item.logo} alt={`${item.name} logo`} fill className='brightness-5 dark:invert' />
										<span className='sr-only'>{item.name}</span>
									</span>
								) : (
									<span className='text-dark text-lg font-bold dark:text-white'>{item.name}</span>
								)}
							</CursorTooltip>
						)}
					</DiamondGrid>
				</div>
			</SectionSeparator>
		</section>
	);
});

Technologies.displayName = 'Technologies';

export default Technologies;

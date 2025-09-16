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
	{ name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript', gradient: 'from-slate-800 to-gray-900' },
	{ name: 'React', logo: 'https://cdn.simpleicons.org/react', gradient: 'from-purple-600 to-indigo-700' },
	{ name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs', gradient: 'from-blue-600 to-purple-700' },
	{ name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs', gradient: 'from-slate-800 to-gray-900' },
	{ name: 'Git', logo: 'https://cdn.simpleicons.org/git', gradient: 'from-slate-700 to-gray-800' },
	{ name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss', gradient: 'from-purple-600 to-pink-600' },
	{ name: 'Shadcn/UI', logo: 'https://cdn.simpleicons.org/shadcnui', gradient: 'from-blue-600 to-purple-700' },
	{ name: 'Prisma', logo: 'https://cdn.simpleicons.org/prisma', gradient: 'from-emerald-600 to-teal-700' },
	{ name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb', gradient: 'from-purple-600 to-indigo-700' },
	{ name: 'GraphQL', logo: 'https://cdn.simpleicons.org/graphql', gradient: 'from-slate-700 to-gray-800' },
	{ name: 'Docker', logo: 'https://cdn.simpleicons.org/docker', gradient: 'from-slate-800 to-gray-900' },
	{ name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel', gradient: 'from-emerald-600 to-teal-700' },
	{ name: 'GCP', logo: 'https://cdn.simpleicons.org/googlecloud', gradient: 'from-slate-700 to-gray-800' },
	{ name: 'Framer Motion', logo: 'https://cdn.simpleicons.org/framer', gradient: 'from-yellow-500 to-orange-600' },
	{ name: 'Three.js', logo: 'https://cdn.simpleicons.org/threedotjs', gradient: 'from-blue-600 to-purple-700' },
	{ name: 'WordPress', logo: 'https://cdn.simpleicons.org/wordpress', gradient: 'from-gray-700 to-slate-800' },
];

const Technologies = memo(() => {
	return (
		<section className='relative z-1 pt-[20vw]'>
			<SectionSeparator lts rts lbs rbs bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 text-center sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='Technologies' title={`I'm an Expertise In`} watermark='Technologies' />
					<DiamondGrid items={techStack}>
						{(item) => (
							<CursorTooltip key={`${item.name}-${item.index}`} content={item.name}>
								<div
									className={`from-secondary-100 dark:from-secondary-800 dark:to-secondary-900 to-secondary-300 flex aspect-video w-full items-center justify-center rounded-[2.25vw] bg-gradient-to-b text-sm font-medium text-white shadow-xl transition-shadow duration-300 md:rounded-[1.25vw]`}
								>
									{item.logo ? (
										<span className='relative h-1/2 w-full'>
											<Image src={item.logo} alt={`${item.name} logo`} fill className='brightness-5 dark:invert' />
										</span>
									) : (
										<span>{item.name}</span>
									)}
								</div>
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

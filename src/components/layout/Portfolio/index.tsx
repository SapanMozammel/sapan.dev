'use client';

import ProjectCard from '@/components/ui/project-card';
import { useStackingCards } from '@/hooks/useStackingCards';
import { PORTFOLIO_PROJECTS } from '@/lib/constants/portfolio';
import React, { memo } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

const Portfolio = memo(() => {
	// Initialize stacking cards animation
	const stackingCardsRef = useStackingCards({
		topStart: 120,
		topIncrement: 20,
		defaultMinScale: 0.925,
		gap: 32,
		enabled: true,
	});

	return (
		<section className='relative z-1 pb-8 sm:pb-12 lg:pb-16'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='Projects' title={`My Recent Works`} watermark='Portfolio' />
					<div ref={stackingCardsRef} className='relative z-2 grid w-full grid-cols-1'>
						{PORTFOLIO_PROJECTS.map((project, index) => (
							<ProjectCard key={index} project={project} />
						))}
					</div>
				</div>
			</SectionSeparator>
		</section>
	);
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;

'use client';

import ProjectCard from '@/components/ui/project-card';
import { PORTFOLIO_PROJECTS } from '@/lib/constants/portfolio';
import React, { memo } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

const Portfolio = memo(() => {
	return (
		<section className='relative z-1 pb-12 sm:pb-16 lg:pb-20'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='Projects' title={`My Recent Works`} watermark='Portfolio' />
					<div className='relative z-2 grid w-full grid-cols-1 gap-8'>
						{PORTFOLIO_PROJECTS.map((project) => (
							<ProjectCard key={project.title} project={project} />
						))}
					</div>
				</div>
			</SectionSeparator>
		</section>
	);
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;

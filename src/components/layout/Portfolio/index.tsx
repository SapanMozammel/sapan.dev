'use client';

import ProjectCard from '@/components/ui/project-card';
import StackingCardWrapper from '@/components/ui/stacking-card-wrapper';
import { PORTFOLIO_PROJECTS } from '@/data/content/portfolio';
import { useStackingCards } from '@/hooks/useStackingCards';
import { memo } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

const Portfolio = memo(() => {
	const { containerRef, scrollYProgress, cardConfigs, enabled } = useStackingCards(PORTFOLIO_PROJECTS.length, {
		topStart: 120,
		topIncrement: 20,
		defaultMinScale: 0.925,
		enabled: true,
	});

	return (
		<section id='portfolio' className='relative z-1 pb-16 sm:pb-24 lg:pb-32'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4'>
					<SectionTitle subtitle='Projects' title={`My Recent Works`} watermark='Portfolio' />
					<div ref={containerRef} className='relative z-2 w-full'>
						{PORTFOLIO_PROJECTS.map((project, index) => (
							<StackingCardWrapper key={project.title} config={cardConfigs[index]} scrollYProgress={scrollYProgress} enabled={enabled}>
								<ProjectCard project={project} />
							</StackingCardWrapper>
						))}
					</div>
				</div>
			</SectionSeparator>
		</section>
	);
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;

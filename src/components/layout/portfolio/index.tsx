'use client';

import ProjectCard from '@/components/ui/project-card';
import StackingCardWrapper from '@/components/ui/stacking-card-wrapper';
import { PORTFOLIO_PROJECTS } from '@/data/content/portfolio';
import { useStackingCards } from '@/hooks/use-stacking-cards';
import { useTranslations } from 'next-intl';
import { createRef, memo, useMemo } from 'react';
import SectionSeparator from '@/components/layout/common/section-separator';
import SectionTitle from '@/components/layout/common/section-title';

const Portfolio = memo(() => {
	const translate = useTranslations('home.portfolio');
	const { containerRef, scrollYProgress, cardConfigs, enabled } = useStackingCards(PORTFOLIO_PROJECTS.length, {
		topStart: 120,
		topIncrement: 20,
		defaultMinScale: 0.925,
		enabled: true,
	});

	const cardRefs = useMemo(() => PORTFOLIO_PROJECTS.map(() => createRef<HTMLDivElement>()), []);

	return (
		<section id='portfolio' className='relative z-1 pb-16 sm:pb-24 lg:pb-32'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4'>
					<SectionTitle subtitle={translate('subtitle')} title={translate('title')} watermark='Portfolio' />
					<div ref={containerRef} className='relative z-2 w-full'>
						{PORTFOLIO_PROJECTS.map((project, index) => {
							const config = cardConfigs[index];
							const triggerRef = cardRefs[PORTFOLIO_PROJECTS.length - 1];
							return (
								<StackingCardWrapper key={project.title} config={config} scrollYProgress={scrollYProgress} enabled={enabled} cardRef={cardRefs[index]} triggerRef={triggerRef}>
									<ProjectCard project={project} />
								</StackingCardWrapper>
							);
						})}
					</div>
				</div>
			</SectionSeparator>
		</section>
	);
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;

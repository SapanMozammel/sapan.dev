'use client';

import CursorTooltip from '@/components/ui/cursor-tooltip';
import { DiamondGrid } from '@/components/ui/diamond-grid';
import { TECH_STACK } from '@/data/config/technologies';
import { getBlurDataURL } from '@/lib/utils/image';
import Image from 'next/image';
import { memo } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

const LOGO_SIZE = 64;
const BLUR_PLACEHOLDER = getBlurDataURL(LOGO_SIZE, LOGO_SIZE);

const Technologies = memo(() => {
	return (
		<section id='technologies' className='relative z-1 pt-[20vw]'>
			<SectionSeparator lts rts lbs rbs bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 pb-8 text-center sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='Technologies' title={`I'm an Expertise In`} watermark='Technologies' />
					<DiamondGrid items={TECH_STACK}>
						{(item) => (
							<CursorTooltip
								key={`${item.name}-${item.index}`}
								content={item.name}
								className={`from-secondary-200/50 dark:from-secondary-700/50 dark:to-secondary-900/50 to-secondary/50 shadow-secondary-300/10 dark:shadow-dark/10 flex aspect-video w-full items-center justify-center rounded-[2.25vw] bg-gradient-to-b text-sm font-medium text-white shadow-xl transition-shadow duration-300 select-none md:rounded-[1.25vw]`}
							>
								{item.logo ? (
									<span className='relative h-1/2 w-full'>
										<Image
											src={item.logo}
											alt={`${item.name} logo`}
											fill
											sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
											className='brightness-5 dark:invert'
											placeholder='blur'
											blurDataURL={BLUR_PLACEHOLDER}
											loading='lazy'
											quality={90}
										/>
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

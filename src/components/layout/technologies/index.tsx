'use client';

import SectionSeparator from '@/components/layout/common/section-separator';
import SectionTitle from '@/components/layout/common/section-title';
import CursorTooltip from '@/components/ui/cursor-tooltip';
import { DiamondGrid } from '@/components/ui/diamond-grid';
import { TECH_STACK } from '@/data/config/technologies';
import { getBlurDataURL } from '@/lib/utils/image';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo } from 'react';

const LOGO_SIZE = 64;
const BLUR_PLACEHOLDER = getBlurDataURL(LOGO_SIZE, LOGO_SIZE);

const Technologies = memo(() => {
	const translate = useTranslations('home.technologies');

	return (
		<section id='technologies' className='relative z-1 pt-[20vw] pb-16 sm:pb-20 lg:pb-24'>
			<SectionSeparator lts rts lbs rbs bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-4 text-center'>
					<SectionTitle subtitle={translate('subtitle')} title={translate('title')} watermark='Technologies' />
					<DiamondGrid>
						{TECH_STACK.map((item, index) => (
							<CursorTooltip
								key={`${item.name}-${index}`}
								content={item.name}
								className='from-secondary-200/50 dark:from-secondary-700/50 dark:to-secondary-900/50 to-secondary/50 flex aspect-video w-full items-center justify-center rounded-[2.25vw] bg-gradient-to-b text-sm text-white transition-shadow duration-300 select-none md:rounded-[1.25vw]'
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
									<span className='text-dark font-hg text-base font-bold dark:text-white'>{item.name}</span>
								)}
							</CursorTooltip>
						))}
					</DiamondGrid>
				</div>
			</SectionSeparator>
		</section>
	);
});

Technologies.displayName = 'Technologies';

export default Technologies;

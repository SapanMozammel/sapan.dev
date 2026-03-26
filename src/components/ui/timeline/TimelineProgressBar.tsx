'use client';

import type { TimelineProgressBarProps } from '@/types/experience';
import { motion, useTransform } from 'framer-motion';
import { memo } from 'react';

import { generatePath } from './timeline-utils';

const TimelineProgressBar = memo<TimelineProgressBarProps>(({ heights, totalHeight, scrollYProgress }) => {
	const pathLength = useTransform(scrollYProgress, (latest) => {
		if (heights.length < 2 || totalHeight <= 0) {
			return 0;
		}
		const isDesktop = window.innerWidth >= 768;
		const startY = isDesktop ? 42 : 10;
		const progStart = Math.max(0, (heights[0] + startY) / totalHeight);
		const progEnd = Math.min(1, (heights[heights.length - 1] + startY) / totalHeight);

		if (latest <= progStart) {
			return 0;
		}
		if (latest >= progEnd) {
			return 1;
		}
		return (latest - progStart) / (progEnd - progStart);
	});

	const pathD = generatePath(heights);

	return (
		<>
			<div className='pointer-events-none absolute top-0 bottom-0 left-1.25 z-0 w-0.5 md:hidden'>
				{heights.length > 0 && (
					<>
						<div className='bg-secondary-100 dark:bg-secondary-800 absolute w-0.5' style={{ top: heights[0] + 10, height: heights[heights.length - 1] - heights[0] }} />
						<motion.div className='bg-primary dark:bg-success absolute w-0.5 origin-top' style={{ top: heights[0] + 10, height: heights[heights.length - 1] - heights[0], scaleY: pathLength }} />
					</>
				)}
			</div>

			<div className='pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 hidden -translate-x-1/2 overflow-visible md:block' style={{ width: 400 }}>
				{heights.length > 0 && (
					<svg viewBox={`-200 0 400 ${totalHeight}`} width='400' height={totalHeight} className='absolute top-0 left-0 w-full' fill='none' preserveAspectRatio='none'>
						<path d={pathD} stroke='currentColor' className='text-secondary-100 dark:text-secondary-800' strokeWidth='1.5' />
						<motion.path d={pathD} stroke='currentColor' className='text-primary dark:text-success' strokeWidth='2' strokeLinecap='round' style={{ pathLength }} />
					</svg>
				)}
			</div>
		</>
	);
});

TimelineProgressBar.displayName = 'TimelineProgressBar';

export default TimelineProgressBar;

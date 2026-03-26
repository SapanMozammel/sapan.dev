'use client';

import { cn } from '@/lib/utils';
import type { TimelineItemProps } from '@/types/experience';
import { memo, useMemo, useRef } from 'react';

import { checkTimelineDirection } from './timeline-utils';

const TimelineItem = memo<TimelineItemProps & { index: number }>(({ item: job, index }) => {
	const itemRef = useRef<HTMLDivElement>(null);
	const isLeft = checkTimelineDirection(index);

	const formattedDate = useMemo(() => {
		const parseDateStr = (dateStr: string | undefined): Date | null => {
			if (!dateStr || !dateStr.includes('-')) {
				return null;
			}
			try {
				const [year, month] = dateStr.split('-');
				const d = new Date(parseInt(year), parseInt(month) - 1);
				return isNaN(d.getTime()) ? null : d;
			} catch (e) {
				return null;
			}
		};

		const startD = parseDateStr(job.startDate);
		if (!startD) {
			return job.startDate || '';
		}

		const endD = job.endDate ? parseDateStr(job.endDate) || new Date() : new Date();

		const startStr = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(startD);
		const endStr = job.endDate ? new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(endD) : 'Present';

		// Calculate duration (inclusive)
		const totalMonths = (endD.getFullYear() - startD.getFullYear()) * 12 + (endD.getMonth() - startD.getMonth()) + 1;
		const yrs = Math.floor(totalMonths / 12);
		const mos = totalMonths % 12;

		const durationParts = [];
		if (yrs > 0) {
			durationParts.push(`${yrs} yr${yrs > 1 ? 's' : ''}`);
		}
		if (mos > 0) {
			durationParts.push(`${mos} mo${mos > 1 ? 's' : ''}`);
		}
		const durationStr = durationParts.join(' ');

		return `${startStr} - ${endStr}${durationStr ? ` ( ${durationStr} )` : ''}`;
	}, [job.startDate, job.endDate]);

	return (
		<div ref={itemRef} data-timeline-item className={cn('relative mx-auto mb-4 flex w-full gap-4 md:mb-0', isLeft ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row')}>
			<div className={cn('hidden w-1/2 shrink-0 flex-col pt-8 md:flex', isLeft ? 'items-start pl-8' : 'items-end pr-8')}>
				<span className='text-secondary-600 dark:text-secondary-400 text-sm leading-snug font-medium'>{formattedDate}</span>
				<span className='text-secondary-400 dark:text-secondary-500 font-regular text-xs leading-snug'>
					{job.type}, {job.location}
				</span>
			</div>
			<div className={cn('absolute top-10.5 z-2 hidden -translate-y-1/2 md:block', isLeft ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2')}>
				<div
					data-timeline-dot
					className='bg-secondary-200 dark:bg-secondary-700 dark:ring-secondary-900 border-secondary-300 dark:border-secondary-600 h-3 w-3 rounded-full border ring-4 ring-white transition-all duration-300'
				/>
			</div>
			<div className='absolute top-1 left-0 z-20 md:hidden' aria-hidden='true'>
				<div
					data-timeline-dot
					className='bg-secondary-200 dark:bg-secondary-700 dark:ring-secondary-900 border-secondary-300 dark:border-secondary-600 h-3 w-3 rounded-full border ring-4 ring-white transition-all duration-300'
				/>
			</div>
			<div className={cn('flex-1 pt-0 md:w-1/2', isLeft ? 'ml-6 md:mr-4 md:ml-0' : 'ml-6 md:ml-4')}>
				<div className='mb-4 flex flex-col pl-0 md:hidden'>
					<span className='text-secondary-600 dark:text-secondary-400 text-sm leading-snug font-medium'>{formattedDate}</span>
					<span className='text-secondary-400 dark:text-secondary-500 font-regular text-xs leading-snug'>
						{job.type}, {job.location}
					</span>
				</div>
				<div
					className={cn(
						'group border-secondary-200/60 dark:border-secondary-700/40 relative flex flex-col gap-2 rounded-2xl border p-4 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-300 md:gap-4 md:p-6 dark:shadow-black/20'
					)}
				>
					<div className='flex flex-col gap-1'>
						<h3 className='font-eb text-dark text-3xl leading-none font-medium sm:text-5xl dark:text-white'>{job.company}</h3>
						<h5 className='font-cg text-secondary-600 dark:text-secondary-400 text-xl leading-snug font-medium sm:text-2xl'>{job.position}</h5>
					</div>
					{job.technologies && job.technologies.length > 0 && (
						<div className='flex flex-wrap gap-1.5'>
							{job.technologies.map((tech, idx) => (
								<span
									key={idx}
									className={cn(
										'font-sora bg-secondary-100 text-secondary-500 dark:bg-secondary-800/60 dark:text-secondary-500 rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase'
									)}
								>
									{tech}
								</span>
							))}
						</div>
					)}
					<p className='text-secondary-600 dark:text-secondary-300 leading-regular text-sm'>{job.description}</p>
					<div className='flex flex-col gap-1.5'>
						<h4 className='font-sora text-dark text-lg font-bold dark:text-white'>Responsibilities</h4>
						<ul className='text-secondary-600 dark:text-secondary-300 leading-regular flex list-none flex-col gap-1.5 text-sm'>
							{job.responsibilities?.map((resp, idx) => (
								<li key={idx} className='relative flex items-start pl-4'>
									<span className='border-primary dark:border-success absolute left-0 mt-2 h-1.5 w-1.5 rounded-full border bg-transparent' />
									{resp}
								</li>
							))}
						</ul>
					</div>
					{job.achievements && job.achievements.length > 0 && (
						<div className='flex flex-col gap-1.5'>
							<h4 className='font-sora text-dark text-lg font-bold dark:text-white'>Impact & Achievements</h4>
							<ul className='text-secondary-600 dark:text-secondary-300 leading-regular flex list-none flex-col gap-1.5 text-sm'>
								{job.achievements.map((achievement, idx) => (
									<li key={idx} className='relative flex items-start pl-4'>
										<span className='border-primary dark:border-success absolute left-0 mt-2 h-1.5 w-1.5 rounded-full border bg-transparent' />
										{achievement}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

TimelineItem.displayName = 'TimelineItem';

export default TimelineItem;

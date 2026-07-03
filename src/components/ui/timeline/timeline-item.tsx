'use client';

import Badge from '@/components/ui/badge';
import BulletList from '@/components/ui/bullet-list';
import { cn } from '@/lib/utils';
import type { TimelineItemProps } from '@/types/experience';
import { IconTrendingUp } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { memo, useMemo, useRef } from 'react';

import { checkTimelineDirection } from './timeline-utils';

const TimelineItem = memo<TimelineItemProps & { index: number }>(({ item: job, index }) => {
	const translateLabels = useTranslations('common.labels');
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
				<span className='text-secondary-400 dark:text-secondary-600 text-xs leading-snug font-normal'>
					{job.type}, {job.location}
				</span>
			</div>
			<div className={cn('absolute top-10.5 z-2 hidden -translate-y-1/2 md:block', isLeft ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2')}>
				<div data-timeline-dot className='bg-secondary-300 dark:bg-secondary-700 border-secondary-100 dark:border-secondary-800 h-3.5 w-3.5 rounded-full border-2 ring-2 ring-white dark:ring-black' />
			</div>
			<div className='absolute top-1 -left-0.25 z-20 md:hidden' aria-hidden='true'>
				<div data-timeline-dot className='bg-secondary-300 dark:bg-secondary-700 border-secondary-100 dark:border-secondary-800 h-3.5 w-3.5 rounded-full border-2 ring-2 ring-white dark:ring-black' />
			</div>
			<div className={cn('flex-1 pt-0 md:w-1/2', isLeft ? 'ml-6 md:mr-4 md:ml-0' : 'ml-6 md:ml-4')}>
				<div className='mb-4 flex flex-col pl-0 md:hidden'>
					<span className='text-secondary-600 dark:text-secondary-400 text-sm leading-snug font-medium'>{formattedDate}</span>
					<span className='text-secondary-400 dark:text-secondary-600 text-xs leading-snug font-normal'>
						{job.type}, {job.location}
					</span>
				</div>
				<div
					className={cn(
						'group border-secondary-200/50 dark:border-secondary-700/50 relative flex flex-col gap-2 rounded-2xl border p-4 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-300 md:gap-4 md:p-6 dark:shadow-white/5'
					)}
				>
					<div className='flex flex-col'>
						<h3 className='text-heading-medium-alt text-dark tracking-wide dark:text-white'>{job.company}</h3>
						<div className='flex flex-wrap items-center gap-2'>
							<h4 className='text-heading-small text-secondary-700 dark:text-secondary-300 tracking-wide'>{job.position}</h4>
							{job.tags?.includes('Promoted') && (
								<span className='bg-primary/10 text-primary dark:bg-success/10 dark:text-success font-hg inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase'>
									<IconTrendingUp className='size-3' stroke={2.5} aria-hidden='true' />
									{translateLabels('promoted')}
								</span>
							)}
						</div>
					</div>
					{job.technologies && job.technologies.length > 0 && (
						<div className='flex flex-wrap gap-1.5'>
							{job.technologies.map((tech, idx) => (
								<Badge key={idx}>{tech}</Badge>
							))}
						</div>
					)}
					<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-small'>{job.description}</p>
					{job.responsibilities && job.responsibilities.length > 0 && (
						<div className='flex flex-col gap-1.5'>
							<h5 className='text-dark text-heading-small-alt dark:text-white'>{translateLabels('responsibilities')}</h5>
							<BulletList items={job.responsibilities} />
						</div>
					)}
					{job.achievements && job.achievements.length > 0 && (
						<div className='flex flex-col gap-1.5'>
							<h5 className='text-dark text-heading-small-alt dark:text-white'>{translateLabels('achievements')}</h5>
							<BulletList items={job.achievements} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

TimelineItem.displayName = 'TimelineItem';

export default TimelineItem;

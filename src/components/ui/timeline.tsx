'use client';

import { cn } from '@/lib/utils';
import type { TimelineItemProps, TimelineProps } from '@/types/experience';
import { motion, useScroll, useTransform } from 'framer-motion';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
const checkTimelineDirection = (i: number) => i % 2 !== 0;

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
	}, [job.startDate, job.endDate, job.type]);

	return (
		<div ref={itemRef} data-timeline-item className={cn('timeline-item relative mx-auto mb-4 flex w-full gap-4 md:mb-0', isLeft ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row')}>
			<div className={cn('hidden w-1/2 shrink-0 flex-col pt-8 md:flex', isLeft ? 'items-start pl-8' : 'items-end pr-8')}>
				<span className='text-secondary-600 dark:text-secondary-400 text-sm leading-snug font-medium'>{formattedDate}</span>
				<span className='text-secondary-400 dark:text-secondary-500 font-regular text-xs leading-snug'>
					{job.type}, {job.location}
				</span>
			</div>
			<div className={cn('timeline-dot absolute top-10.5 z-2 hidden -translate-y-1/2 md:block', isLeft ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2')}>
				<div className='bg-secondary-200 dark:bg-secondary-700 dark:ring-secondary-900 border-secondary-300 dark:border-secondary-600 timeline-dot-inner h-3 w-3 rounded-full border ring-4 ring-white transition-all duration-300' />
			</div>
			<div className='timeline-dot absolute top-1 left-0 z-20 md:hidden' aria-hidden='true'>
				<div className='bg-secondary-200 dark:bg-secondary-700 dark:ring-secondary-900 border-secondary-300 dark:border-secondary-600 timeline-dot-inner h-3 w-3 rounded-full border ring-4 ring-white transition-all duration-300' />
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
						'group from-secondary-100/50 dark:from-secondary-800/50 dark:to-secondary-900/50 to-secondary-300/50 shadow-secondary-300/10 dark:shadow-dark/10 relative flex flex-col gap-2 rounded-2xl bg-gradient-to-b p-4 shadow-xl transition-shadow duration-300 md:gap-4 md:p-6'
					)}
				>
					<div className='flex flex-col gap-1'>
						<h3 className='font-eb text-dark text-3xl leading-none font-medium sm:text-5xl dark:text-white'>{job.company}</h3>
						<h5 className='font-cg text-secondary-600 dark:text-secondary-400 text-xl leading-snug font-medium sm:text-2xl'>{job.position}</h5>
					</div>
					{job.technologies && job.technologies.length > 0 && (
						<div className='flex flex-wrap gap-1.5'>
							{job.technologies.map((tech, idx) => (
								<span key={idx} className={cn('bg-secondary-200 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300 inline-flex items-center rounded-lg px-3 py-1 text-xs font-bold')}>
									{tech}
								</span>
							))}
						</div>
					)}
					<p className='text-secondary-600 dark:text-secondary-300 leading-regular text-sm'>{job.description}</p>
					<div className='flex flex-col gap-1.5'>
						<h4 className='text-dark text-lg font-bold dark:text-white'>Responsibilities</h4>
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
							<h4 className='text-dark text-lg font-bold dark:text-white'>Impact & Achievements</h4>
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

const Timeline = memo<TimelineProps>(({ items, className }) => {
	const timelineRef = useRef<HTMLDivElement>(null);
	const [heights, setHeights] = useState<number[]>([]);
	const [totalHeight, setTotalHeight] = useState(100);

	useEffect(() => {
		const updateHeights = () => {
			if (!timelineRef.current) {
				return;
			}
			const itemElements = Array.from(timelineRef.current.querySelectorAll('[data-timeline-item]')) as HTMLElement[];

			const newHeights = itemElements.map((el) => el.offsetTop);
			setHeights(newHeights);

			setTotalHeight(timelineRef.current.offsetHeight);
		};

		const timer = setTimeout(updateHeights, 150);
		window.addEventListener('resize', updateHeights);
		window.addEventListener('load', updateHeights); // Recalculate if images load
		return () => {
			clearTimeout(timer);
			window.removeEventListener('resize', updateHeights);
			window.removeEventListener('load', updateHeights);
		};
	}, [items]);

	const { scrollYProgress } = useScroll({
		target: timelineRef,
		offset: ['start center', 'end center'],
	});

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

	const generatePath = () => {
		if (heights.length < 2) {
			return '';
		}

		const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
		const startY = isDesktop ? 42 : 10;
		const curveWidth = 20;
		const curveHeight = 40;

		let result = `M 0,${heights[0] + startY} `;

		for (let i = 0; i < heights.length - 1; i++) {
			const currentY = heights[i] + startY;
			const nextY = heights[i + 1] + startY;
			const isLeft = checkTimelineDirection(i);

			const side = isLeft ? -curveWidth : curveWidth;

			const startCurveY = currentY + 15;
			result += `L 0,${startCurveY} `;

			const endCurveOutY = startCurveY + curveHeight;
			result += `C 0,${startCurveY + curveHeight * 0.4} ${side},${startCurveY + curveHeight * 0.6} ${side},${endCurveOutY} `;

			const startCurveBackY = nextY - curveHeight - 15;
			if (startCurveBackY > endCurveOutY) {
				result += `L ${side},${startCurveBackY} `;
			}

			const backStartY = Math.max(endCurveOutY, startCurveBackY);

			const endCurveBackY = nextY - 15;
			result += `C ${side},${backStartY + curveHeight * 0.4} 0,${endCurveBackY - curveHeight * 0.6} 0,${endCurveBackY} `;

			result += `L 0,${nextY} `;
		}

		return result;
	};

	const itemRefs = useRef<HTMLElement[]>([]);

	useEffect(() => {
		let rafId: number;

		const handleScroll = () => {
			if (!timelineRef.current) {
				return;
			}
			const scrollPos = window.scrollY + window.innerHeight / 2;
			const containerTop = timelineRef.current.getBoundingClientRect().top + window.scrollY;
			const isDesktop = window.innerWidth >= 768;
			const startY = isDesktop ? 42 : 10;

			// Optimization: use cached elements if available
			if (itemRefs.current.length === 0) {
				itemRefs.current = Array.from(timelineRef.current.querySelectorAll('[data-timeline-item]')) as HTMLElement[];
			}

			itemRefs.current.forEach((itemEl, i) => {
				if (i >= heights.length) {
					return;
				}
				const dotAbsoluteY = containerTop + heights[i] + startY;
				const itemDots = itemEl.querySelectorAll('.timeline-dot-inner');

				itemDots.forEach((innerDot) => {
					const el = innerDot as HTMLElement;
					if (scrollPos >= dotAbsoluteY) {
						el.classList.add('bg-primary', 'dark:bg-success', 'scale-125', 'ring-primary/90', 'dark:ring-success/20');
						el.classList.remove('bg-secondary-200', 'dark:bg-secondary-700', 'scale-100');
					} else {
						el.classList.remove('bg-primary', 'dark:bg-success', 'scale-125', 'ring-primary/90', 'dark:ring-success/20');
						el.classList.add('bg-secondary-200', 'dark:bg-secondary-700', 'scale-100');
					}
				});

				const rect = itemEl.getBoundingClientRect();
				if (rect.top < window.innerHeight * 0.85) {
					itemEl.style.opacity = '1';
					itemEl.style.transform = 'translateY(0)';
				}
			});
		};

		const onScroll = () => {
			rafId = requestAnimationFrame(handleScroll);
		};

		if (timelineRef.current) {
			const itemsToAnimate = timelineRef.current.querySelectorAll('[data-timeline-item]');
			itemsToAnimate.forEach((el) => {
				(el as HTMLElement).style.opacity = '0';
				(el as HTMLElement).style.transform = 'translateY(40px)';
				(el as HTMLElement).style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
			});
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		handleScroll();
		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(rafId);
			itemRefs.current = [];
		};
	}, [heights]);

	return (
		<div className={cn('relative w-full font-sans', className)}>
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
						<path d={generatePath()} stroke='currentColor' className='text-secondary-100 dark:text-secondary-800' strokeWidth='1.5' />
						<motion.path d={generatePath()} stroke='currentColor' className='text-primary dark:text-success' strokeWidth='2' strokeLinecap='round' style={{ pathLength }} />
					</svg>
				)}
			</div>

			<div ref={timelineRef} className='relative z-10 mx-auto w-full'>
				{items.map((item, index) => (
					<TimelineItem key={item.id} item={item} index={index} isLast={index === items.length - 1} />
				))}
			</div>
		</div>
	);
});

Timeline.displayName = 'Timeline';

export default Timeline;

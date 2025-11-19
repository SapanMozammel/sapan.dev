'use client';

import CursorTooltip from '@/components/ui/cursor-tooltip';
import { TechnologiesDisplay } from '@/components/ui/technologies-display';
import { cn } from '@/lib/utils';
import { getBlurDataURL } from '@/lib/utils/image';
import type { ProjectCardProps } from '@/types/portfolio';
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useMemo } from 'react';

const IMAGE_SIZE = 600;
const IMAGE_PLACEHOLDER = getBlurDataURL(IMAGE_SIZE, IMAGE_SIZE);

// Static tooltip content to prevent recreation on every render
const TOOLTIP_CONTENT = (
	<span className='bg-primary/80 border-primary dark:border-success dark:bg-success/80 pointer-events-none inline-flex rounded-2xl border-1 border-solid px-3 py-2 text-sm font-medium text-white dark:text-black'>
		<IconArrowUpRight className='h-6 w-6' stroke={2.5} />
	</span>
);

const ProjectCard = memo<ProjectCardProps>(({ project }) => {
	// Memoize onClick handler to prevent recreation on every render
	const handleClick = useCallback(() => {
		if (project?.link) {
			window.open(project.link, '_blank', 'noopener,noreferrer');
		}
	}, [project?.link]);

	return (
		<div className={cn('grid min-h-110 w-full grid-cols-1 overflow-hidden rounded-2xl border border-solid lg:grid-cols-2 lg:rounded-4xl backdrop-blur-xl z-2 shadow shadow-dark/5 dark:shadow-light/5 bg-indigo-100/30 dark:bg-cyan-950/30 border-indigo-200 dark:border-cyan-950', project?.className)}>
			<div className='flex flex-col items-start justify-center gap-2 p-4 sm:gap-4 sm:p-6 lg:p-8 xl:p-12'>
				{project?.icon && <div className='h-9 w-auto'>{project.icon}</div>}
				<p className='text-secondary-800 dark:text-secondary-200 text-sm leading-normal font-medium sm:text-base'>{project.description}</p>
				<div className='mt-1.5 grid w-full grid-cols-1 gap-y-2.5 sm:grid-cols-3 gap-x-4 mb-1.5 sm:mb-0'>
					{project.role && (
						<div className='flex flex-col gap-0.5'>
							<h4 className='font-sora text-base font-bold text-black sm:text-lg dark:text-white'>Role</h4>
							<span className='text-secondary-600 dark:text-secondary-400 text-sm !leading-tight'>{project.role}</span>
						</div>
					)}
					{project.technologies && project.technologies.length > 0 && (
						<div className='col-span-2 flex flex-col gap-0.5'>
							<h4 className='font-sora text-base font-bold text-black sm:text-lg dark:text-white'>Technologies</h4>
							<TechnologiesDisplay technologies={project.technologies} />
						</div>
					)}
				</div>
				<Link
					href='#'
					className='font-sora text-primary dark:text-success decoration-none inline-flex items-center gap-1 text-sm font-semibold tracking-wider uppercase transition-all duration-150 ease-in hover:gap-2'
				>
					<span>Learn More</span>
					<IconArrowRight stroke={3} className='mb-0.5 h-4 w-4 transition-transform duration-300' />
				</Link>
			</div>
			<div className='h-52 w-full px-4 pb-4 sm:h-80 sm:px-6 sm:pb-6 lg:h-full lg:pt-6'>
				<CursorTooltip content={TOOLTIP_CONTENT} className='shadow-dark/5 dark:shadow-white/5 relative h-full w-full cursor-pointer overflow-hidden rounded-xl shadow-lg' onClick={handleClick}>
					<Image
						src={project.image}
						alt={`${project.title?.replace(/ /g, '-') || 'project'}-image`}
						fill
						sizes='(max-width: 768px) 100vw, 50vw'
						className='object-cover transition-transform duration-500'
						placeholder='blur'
						blurDataURL={IMAGE_PLACEHOLDER}
						loading='lazy'
						quality={85}
					/>
				</CursorTooltip>
			</div>
		</div>
	);
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

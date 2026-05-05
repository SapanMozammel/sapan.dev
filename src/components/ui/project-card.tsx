'use client';

import CTALink from '@/components/ui/cta-link';
import CursorTooltip from '@/components/ui/cursor-tooltip';
import TechnologiesDisplay from '@/components/ui/technologies-display';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getBlurDataURL } from '@/lib/utils/image';
import type { ColorScheme, ProjectCardProps } from '@/types/portfolio';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo, useCallback } from 'react';

const IMAGE_SIZE = 600;
const IMAGE_PLACEHOLDER = getBlurDataURL(IMAGE_SIZE, IMAGE_SIZE);

// Static map (Tailwind JIT scans this file and finds every full class string)
const COLOR_SCHEME_CLASSES: Record<ColorScheme, string> = {
	sky: 'border-sky-100 bg-sky-25/90 dark:border-sky-900 dark:bg-sky-a100/90',
	indigo: 'border-indigo-100 bg-indigo-25/90 dark:border-indigo-900 dark:bg-indigo-a100/90',
	blue: 'border-blue-100 bg-blue-25/90 dark:border-blue-900 dark:bg-blue-a100/90',
	green: 'border-green-100 bg-green-25/90 dark:border-green-900 dark:bg-green-a100/90',
	cyan: 'border-cyan-100 bg-cyan-25/90 dark:border-cyan-900 dark:bg-cyan-a100/90',
	teal: 'border-teal-100 bg-teal-25/90 dark:border-teal-900 dark:bg-teal-a100/90',
	violet: 'border-violet-100 bg-violet-25/90 dark:border-violet-900 dark:bg-violet-a100/90',
	emerald: 'border-emerald-100 bg-emerald-25/90 dark:border-emerald-900 dark:bg-emerald-a100/90',
	fuchsia: 'border-fuchsia-100 bg-fuchsia-25/90 dark:border-fuchsia-900 dark:bg-fuchsia-a100/90',
};

const TOOLTIP_CONTENT = (
	<span className='bg-primary/80 border-primary dark:border-success dark:bg-success/80 dark:text-dark pointer-events-none inline-flex rounded-2xl border-1 border-solid px-3 py-2 text-sm text-white'>
		<IconArrowUpRight className='h-6 w-6' stroke={2.5} />
	</span>
);

const ProjectCard = memo<ProjectCardProps>(({ project }) => {
	const translateLabels = useTranslations('common.labels');
	const translateButtons = useTranslations('common.buttons');
	const handleClick = useCallback(() => {
		if (project?.link) {
			window.open(project.link, '_blank', 'noopener,noreferrer');
		}
	}, [project?.link]);

	return (
		<div className={cn('z-2 grid min-h-110 w-full grid-cols-1 overflow-hidden rounded-2xl border border-solid backdrop-blur-xl lg:grid-cols-2 lg:rounded-4xl', COLOR_SCHEME_CLASSES[project.colorScheme])}>
			<div className='flex shrink-0 flex-col items-start justify-center gap-2 p-4 max-sm:min-h-86 sm:gap-4 sm:p-6 sm:max-lg:min-h-82 lg:p-8 xl:p-12'>
				{project?.icon && <div className='h-10 w-auto'>{project.icon}</div>}
				<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-small line-clamp-6'>{project.description}</p>
				<div className='mt-1.5 mb-1.5 grid w-full grid-cols-1 gap-x-4 gap-y-2.5 sm:mb-0 sm:grid-cols-3'>
					{project.role && (
						<div className='flex flex-col gap-0.5'>
							<h5 className='text-dark text-heading-small-alt dark:text-white'>{translateLabels('role')}</h5>
							<span className='text-secondary-600 dark:text-secondary-400 text-paragraph-small'>{project.role}</span>
						</div>
					)}
					{project.technologies && project.technologies.length > 0 && (
						<div className='col-span-2 flex flex-col gap-0.5'>
							<h5 className='text-dark text-heading-small-alt dark:text-white'>{translateLabels('technologies')}</h5>
							<TechnologiesDisplay technologies={project.technologies} />
						</div>
					)}
				</div>
				<Link href={project?.link || '#'} target='_blank' rel='noopener noreferrer'>
					<CTALink>{translateButtons('learnMore')}</CTALink>
				</Link>
			</div>
			<div className='h-52 w-full px-4 pb-4 sm:h-80 sm:px-6 sm:pb-6 lg:h-full lg:pt-6'>
				<CursorTooltip content={TOOLTIP_CONTENT} className='relative h-full w-full cursor-pointer overflow-hidden rounded-xl shadow-lg shadow-black/5 dark:shadow-white/5' onClick={handleClick}>
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

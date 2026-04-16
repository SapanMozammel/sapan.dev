'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { TechnologiesDisplayProps } from '@/types/technology';
import { memo, useMemo } from 'react';

const VISIBLE_TECHNOLOGIES_COUNT = 3;

const TechnologiesDisplay = memo<TechnologiesDisplayProps>(({ technologies, visibleCount = VISIBLE_TECHNOLOGIES_COUNT }) => {
	const visibleTechnologies = useMemo(() => {
		if (!technologies || technologies.length === 0) {
			return [];
		}
		return technologies.slice(0, visibleCount);
	}, [technologies, visibleCount]);

	const remainingCount = useMemo(() => {
		if (!technologies || technologies.length <= visibleCount) {
			return 0;
		}
		return technologies.length - visibleCount;
	}, [technologies, visibleCount]);

	if (!technologies || technologies.length === 0) {
		return null;
	}

	return (
		<TooltipProvider>
			<div className='flex flex-wrap items-center gap-1.5'>
				{visibleTechnologies.map((tech, index) => (
					<span key={tech} className='text-secondary-600 dark:text-secondary-400 text-paragraph-small'>
						{tech}
						{index < visibleTechnologies.length - 1 && ','}
					</span>
				))}
				{remainingCount > 0 && (
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								type='button'
								className='bg-primary/10 text-primary dark:bg-success/10 dark:text-success text-paragraph-small inline-flex cursor-pointer items-center rounded-full px-1.5 py-0 transition-colors'
							>
								+{remainingCount}
							</button>
						</TooltipTrigger>
						<TooltipContent className='bg-primary dark:bg-success dark:text-dark max-w-xs rounded-2xl px-4 py-3 text-center text-sm font-medium text-white' side='top'>
							<div className='flex flex-wrap gap-1.5'>{technologies.join(', ')}</div>
						</TooltipContent>
					</Tooltip>
				)}
			</div>
		</TooltipProvider>
	);
});

TechnologiesDisplay.displayName = 'TechnologiesDisplay';

export default TechnologiesDisplay;

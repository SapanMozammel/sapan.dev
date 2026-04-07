'use client';

import { WORKFLOW_STEPS } from '@/data/content/workflow';
import { cn } from '@/lib/utils';
import type { WorkflowProgressProps } from '@/types/workflow';
import { motion } from 'framer-motion';
import { memo } from 'react';

const WorkflowProgress = memo(({ activeStep, stepProgress, isResetting, activeColor, inactiveColor, onStepClick }: WorkflowProgressProps) => {
	const totalSteps = WORKFLOW_STEPS.length;
	const segmentWidth = 100 / totalSteps;
	const startPadding = segmentWidth / 2;

	const lastStarPercent = startPadding + (totalSteps - 1) * segmentWidth;
	const isLastStep = activeStep === totalSteps - 1;

	let currentProgressPercent: number;
	let transitionDuration = 0.08;

	if (isLastStep) {
		if (stepProgress < 50) {
			currentProgressPercent = lastStarPercent + (stepProgress / 50) * (100 - lastStarPercent);
		} else {
			currentProgressPercent = ((stepProgress - 50) / 50) * startPadding;
			if (stepProgress < 52) {
				transitionDuration = 0;
			}
		}
	} else {
		currentProgressPercent = startPadding + activeStep * segmentWidth + (stepProgress / 100) * segmentWidth;
	}

	return (
		<div className='relative z-30 mt-4 pb-10 md:mt-6 md:pb-12'>
			<div className='relative h-0.5 w-full'>
				<div className='bg-secondary-200 dark:bg-secondary-700 absolute inset-0 h-full w-full' />
				<motion.div
					initial={false}
					animate={{ width: `${currentProgressPercent}%` }}
					transition={{ duration: transitionDuration, ease: 'linear' }}
					className='bg-primary dark:bg-success absolute inset-y-0 left-0'
				/>
				<div className='absolute inset-0 flex items-center justify-between'>
					{WORKFLOW_STEPS.map((step, index) => (
						<div
							key={step.id}
							className='group relative flex h-10 w-10 cursor-pointer items-center justify-center transition-all duration-300'
							style={{
								position: 'absolute',
								left: `${startPadding + index * segmentWidth}%`,
								transform: 'translateX(-50%)',
							}}
							onClick={() => onStepClick(index)}
						>
							<div className='absolute h-full w-full scale-0 rounded-full bg-white/5 opacity-0 transition-all group-hover:scale-110 group-hover:opacity-100' />
							<motion.div
								animate={{
									color: !isResetting && activeStep >= index ? activeColor : inactiveColor,
									scale: !isResetting && activeStep === index ? 1.5 : 1,
								}}
								transition={{
									color: { duration: 0.5, ease: 'easeInOut' },
									scale: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
								}}
								className='z-40'
							>
								<svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
									<path d='M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z' />
								</svg>
							</motion.div>
							<div className='absolute -top-10 scale-50 opacity-0 transition-all duration-300 group-hover:top-[-45px] group-hover:scale-100 group-hover:opacity-100'>
								<div className='rounded-full bg-black dark:bg-white px-3 py-1 text-[10px] font-bold text-white dark:text-dark backdrop-blur-md'>0{step.id}</div>
							</div>
							<motion.div
								animate={{
									opacity: !isResetting && activeStep === index ? 1 : 0.5,
									y: 28,
									scale: !isResetting && activeStep === index ? 1.1 : 0.9,
								}}
								transition={{
									opacity: { duration: 0.5, ease: 'easeInOut' },
									scale: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
								}}
								className={cn('absolute text-center whitespace-nowrap', !isResetting && activeStep === index ? 'text-primary dark:text-success' : 'text-secondary-600 dark:text-secondary-400')}
							>
								<span className='font-hg block text-[10px] font-bold tracking-widest uppercase'>{step.label}</span>
							</motion.div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
});

WorkflowProgress.displayName = 'WorkflowProgress';

export default WorkflowProgress;

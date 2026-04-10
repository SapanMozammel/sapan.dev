'use client';

import type { WorkflowContentProps } from '@/types/workflow';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

const WorkflowContent = memo(({ activeStep, currentStep }: WorkflowContentProps) => {
	return (
		<div className='relative z-10 flex gap-8 pt-2 md:gap-12'>
			<div className='flex grow flex-col justify-center'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeStep}
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -15 }}
						transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
						className='space-y-4 sm:space-y-6'
					>
						<h3 className='font-cg text-dark text-2xl font-bold tracking-wide sm:text-4xl dark:text-white'>{currentStep.title}</h3>
						<p className='font-dm text-secondary-600 dark:text-secondary-400 max-w-[64ch] text-sm !leading-relaxed tracking-wider sm:text-base'>{currentStep.description}</p>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className='hidden w-44 shrink-0 items-center justify-center md:flex lg:w-52 xl:w-60'>
				<motion.div
					animate={{ y: [0, -12, 0] }}
					transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
					className='shadow-primary/10 dark:shadow-success/10 bg-primary/5 dark:bg-success/5 border-primary/10 dark:border-success/10 relative flex aspect-square w-full items-center justify-center rounded-2xl border border-solid shadow-2xl'
				>
					<AnimatePresence mode='wait'>
						<motion.div
							key={activeStep}
							initial={{ opacity: 0, scale: 0.6, rotateY: 30 }}
							animate={{ opacity: 1, scale: 1, rotateY: 0 }}
							exit={{ opacity: 0, scale: 0.6, rotateY: -30 }}
							transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
							className='bg-primary/10 dark:bg-success/10 border-primary/50 dark:border-success/50 relative flex h-24 w-24 items-center justify-center rounded-2xl border border-solid lg:h-32 lg:w-32'
						>
							<currentStep.icon size={52} stroke={1.2} className='text-primary dark:text-success lg:hidden' />
							<currentStep.icon size={64} stroke={1.2} className='text-primary dark:text-success hidden lg:block' />
						</motion.div>
					</AnimatePresence>
				</motion.div>
			</div>
		</div>
	);
});

WorkflowContent.displayName = 'WorkflowContent';

export default WorkflowContent;

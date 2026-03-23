'use client';

import { WORKFLOW_STEPS } from '@/lib/constants/workflow';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { memo, useEffect, useRef, useState } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';

const AUTOPLAY_DURATION = 5000;

const Workflow = memo(() => {
	const { resolvedTheme } = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [stepProgress, setStepProgress] = useState(0);
	const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const currentStep = WORKFLOW_STEPS[activeStep];
	const totalSteps = WORKFLOW_STEPS.length;
	const segmentWidth = 100 / totalSteps;
	const startPadding = segmentWidth / 2;

	const lastStarPercent = startPadding + (totalSteps - 1) * segmentWidth;
	const isLastStep = activeStep === totalSteps - 1;
	const isResetting = isLastStep && stepProgress >= 50;

	const activeColor = resolvedTheme === 'dark' ? '#43ead4' : '#4a4ded';
	const inactiveColor = '#94a3b8';

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

	useEffect(() => {
		if (isPaused) {
			return;
		}

		const startTime = Date.now() - (stepProgress / 100) * AUTOPLAY_DURATION;

		autoplayTimerRef.current = setInterval(() => {
			const elapsed = Date.now() - startTime;
			const p = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);

			setStepProgress(p);

			if (elapsed >= AUTOPLAY_DURATION) {
				setStepProgress(0);
				setActiveStep((prev) => (prev + 1) % totalSteps);
			}
		}, 16);

		return () => {
			if (autoplayTimerRef.current) {
				clearInterval(autoplayTimerRef.current);
			}
		};
	}, [isPaused, totalSteps, activeStep]);

	const handleStepClick = (index: number) => {
		setActiveStep(index);
		setStepProgress(0);
	};

	return (
		<section id='workflow' className='relative z-1 pb-8 sm:pb-12 lg:pb-16'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-8 pb-8 sm:pb-12 lg:pb-16'>
					<SectionTitle subtitle='How I Work' title='From Idea to Launch' watermark='Workflow' />
					<div
						onMouseEnter={() => setIsPaused(true)}
						onMouseLeave={() => setIsPaused(false)}
						className='border-secondary-200/60 dark:border-secondary-700/40 relative flex w-full max-w-5xl flex-col gap-6 self-center overflow-hidden rounded-2xl border bg-white p-6 shadow-lg shadow-black/5 transition-all duration-300 md:p-8 dark:bg-black/20 dark:shadow-black/20'
					>
						<div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
							<div className='absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-blue-500/10 blur-[130px]' />
							<div className='absolute -right-[10%] -bottom-[20%] h-[70%] w-[70%] rounded-full bg-purple-500/5 blur-[130px]' />
						</div>
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
										<h3 className='font-cg text-2xl font-bold tracking-wide text-black sm:text-4xl dark:text-white'>{currentStep.title}</h3>
										<p className='text-secondary-600 dark:text-secondary-400 max-w-[64ch] text-sm !leading-relaxed tracking-wider sm:text-base'>{currentStep.description}</p>
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
						<div className='relative z-30 mt-4 pb-10 md:mt-6 md:pb-12'>
							<div className='relative h-0.5 w-full'>
								<div className='bg-secondary-200/60 dark:bg-secondary-700/40 absolute inset-0 h-full w-full' />
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
											onClick={() => handleStepClick(index)}
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
												<div className='rounded-full border border-white/20 bg-black px-3 py-1 text-[10px] font-bold text-white shadow-2xl backdrop-blur-md'>0{step.id}</div>
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
												className={cn(
													'absolute text-center whitespace-nowrap',
													!isResetting && activeStep === index ? 'text-primary dark:text-success' : 'text-secondary-600 dark:text-secondary-400'
												)}
											>
												<span className='font-sora block text-[10px] font-bold tracking-widest uppercase'>{step.label}</span>
											</motion.div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</SectionSeparator>
		</section>
	);
});

Workflow.displayName = 'Workflow';

export default Workflow;

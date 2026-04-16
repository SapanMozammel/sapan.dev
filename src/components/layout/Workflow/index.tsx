'use client';

import { WORKFLOW_STEPS } from '@/data/content/workflow';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import SectionSeparator from '../common/SectionSeparator';
import SectionTitle from '../common/SectionTitle';
import WorkflowContent from './WorkflowContent';
import WorkflowProgress from './WorkflowProgress';

const AUTOPLAY_DURATION = 5000;

const Workflow = memo(() => {
	const translate = useTranslations('home.workflow');
	const { resolvedTheme } = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [stepProgress, setStepProgress] = useState(0);
	const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const stepProgressRef = useRef(stepProgress);
	stepProgressRef.current = stepProgress;

	const currentStep = WORKFLOW_STEPS[activeStep];
	const totalSteps = WORKFLOW_STEPS.length;
	const isLastStep = activeStep === totalSteps - 1;
	const isResetting = isLastStep && stepProgress >= 50;

	const activeColor = resolvedTheme === 'dark' ? 'var(--color-success)' : 'var(--color-primary)';
	const inactiveColor = resolvedTheme === 'dark' ? 'var(--color-secondary-700)' : 'var(--color-secondary-200)';

	useEffect(() => {
		if (isPaused) {
			return;
		}

		const startTime = Date.now() - (stepProgressRef.current / 100) * AUTOPLAY_DURATION;

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

	const handleStepClick = useCallback((index: number) => {
		setActiveStep(index);
		setStepProgress(0);
	}, []);

	return (
		<section id='workflow' className='relative z-1 pb-16 sm:pb-20 lg:pb-24'>
			<SectionSeparator lts rts lbs rbs tl bl ll rl>
				<div className='container flex w-full grow flex-col items-center justify-start gap-8'>
					<SectionTitle subtitle={translate('subtitle')} title={translate('title')} watermark='Workflow' />
					<div
						onMouseEnter={() => setIsPaused(true)}
						onMouseLeave={() => setIsPaused(false)}
						className='border-secondary-200/50 dark:border-secondary-700/50 relative flex w-full max-w-5xl flex-col gap-6 self-center overflow-hidden rounded-2xl border bg-white p-6 shadow-lg shadow-black/5 transition-all duration-300 md:p-8 dark:bg-black dark:shadow-white/5'
					>
						<div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
							<div className='bg-info/10 absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full blur-[130px]' />
							<div className='bg-primary/10 absolute -right-[10%] -bottom-[20%] h-[70%] w-[70%] rounded-full blur-[130px]' />
						</div>
						<WorkflowContent activeStep={activeStep} currentStep={currentStep} />
						<WorkflowProgress activeStep={activeStep} stepProgress={stepProgress} isResetting={isResetting} activeColor={activeColor} inactiveColor={inactiveColor} onStepClick={handleStepClick} />
					</div>
				</div>
			</SectionSeparator>
		</section>
	);
});

Workflow.displayName = 'Workflow';

export default Workflow;

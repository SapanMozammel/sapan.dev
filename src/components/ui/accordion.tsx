'use client';

import { cn } from '@/lib/utils';
import type { AccordionItemProps, AccordionProps } from '@/types/faq';
import { memo, useCallback, useState } from 'react';

const AccordionItem = memo<AccordionItemProps>(({ question, answer, isOpen, onToggle, index }) => {
	return (
		<div
			className={cn(
				'relative rounded-2xl shadow-lg shadow-black/5 transition-shadow duration-500 dark:shadow-white/5',
				isOpen ? 'ring-1 ring-transparent' : 'ring-secondary-200/50 dark:ring-secondary-700/50 ring-1'
			)}
		>
			<div
				aria-hidden
				className={cn(
					'animate-faq-border-shift pointer-events-none absolute -inset-px rounded-[calc(theme(borderRadius.2xl)+theme(spacing.px))] bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-success)_35%,var(--color-primary)_65%,var(--color-success)_100%)] [background-size:300%_300%] opacity-0 transition-opacity duration-500',
					isOpen && 'opacity-100'
				)}
			/>
			<div
				className={cn(
					'dark:bg-secondary-900 bg-secondary relative z-10 overflow-hidden rounded-2xl transition-shadow duration-500',
					isOpen && 'shadow-[0_8px_32px_color-mix(in_srgb,var(--color-primary)_14%,transparent),0_2px_8px_color-mix(in_srgb,var(--color-success)_8%,transparent)]'
				)}
			>
				<button type='button' onClick={onToggle} aria-expanded={isOpen} className='flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left lg:px-8 lg:py-5'>
					<span className='flex items-center gap-3'>
						<h5 className='text-primary dark:text-success text-heading-small w-5 shrink-0'>{String(index + 1).padStart(2, '0')}</h5>
						<h5 className='text-dark text-heading-small dark:text-white'>{question}</h5>
					</span>
					<span
						className={cn(
							'relative inline-flex aspect-square h-6 shrink-0 items-center justify-center',
							'before:bg-primary dark:before:bg-success before:absolute before:top-1/2 before:left-1/2 before:inline-flex before:h-0.5 before:w-4 before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition before:duration-300',
							'after:bg-primary dark:after:bg-success after:absolute after:top-1/2 after:left-1/2 after:inline-flex after:h-0.5 after:w-4 after:origin-center after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:transition after:duration-300',
							isOpen ? 'before:rotate-0 after:rotate-0' : 'before:-rotate-180 after:-rotate-90'
						)}
					/>
				</button>
				<div className={cn('grid px-5 transition-all duration-300 lg:px-8', isOpen ? 'grid-rows-[1fr] pb-4 lg:pb-5' : 'grid-rows-[0fr] pb-0')}>
					<div className='overflow-hidden'>
						<div className='border-secondary-100 dark:border-secondary-800 border-t pt-4'>
							<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-small'>{answer}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

AccordionItem.displayName = 'AccordionItem';

const Accordion = memo<AccordionProps>(({ items }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(0);

	const handleToggle = useCallback((index: number) => {
		setActiveIndex((prev) => (prev === index ? null : index));
	}, []);

	return (
		<div className='mx-auto flex w-full max-w-3xl flex-col gap-3 sm:gap-3.5 lg:gap-4'>
			{items.map((item, i) => (
				<AccordionItem key={i} index={i} question={item.question} answer={item.answer} isOpen={activeIndex === i} onToggle={() => handleToggle(i)} />
			))}
		</div>
	);
});

Accordion.displayName = 'Accordion';

export default Accordion;

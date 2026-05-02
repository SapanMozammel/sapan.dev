import { cn } from '@/lib/utils';
import type { ContentBlock } from '@/types/blog';

export const renderBlock = (block: ContentBlock, index: number, codeBlockLabel: string) => {
	switch (block.type) {
		case 'heading':
			return (
				<h3 key={index} className='text-heading-medium-alt text-dark mt-8 mb-4 tracking-wide dark:text-white'>
					{block.text}
				</h3>
			);

		case 'paragraph':
			return (
				<p key={index} className='text-paragraph-small text-secondary-600 dark:text-secondary-400 mb-4'>
					{block.text}
				</p>
			);
		case 'code':
			return (
				<div key={index} className='mb-4 overflow-hidden rounded-xl'>
					<div className='bg-secondary-800 flex items-center justify-between px-4 py-2'>
						<span className='font-hg text-secondary-400 text-xs font-bold tracking-widest uppercase'>{block.language}</span>
						<div className='flex gap-1.5'>
							<span className='bg-danger/70 h-2.5 w-2.5 rounded-full' />
							<span className='bg-warning/70 h-2.5 w-2.5 rounded-full' />
							<span className='bg-success/70 h-2.5 w-2.5 rounded-full' />
						</div>
					</div>
					<pre
						tabIndex={0}
						role='region'
						aria-label={codeBlockLabel}
						className='bg-secondary-900 text-paragraph-small focus-visible:ring-primary dark:focus-visible:ring-success overflow-x-auto p-5 focus-visible:ring-2 focus-visible:outline-none'
					>
						<code className='text-secondary-100'>{block.code}</code>
					</pre>
				</div>
			);
		case 'list':
			if (block.ordered) {
				return (
					<ol key={index} className='mb-4 list-decimal space-y-2 pl-6'>
						{block.items.map((item, i) => (
							<li key={i} className='text-paragraph-small text-secondary-600 dark:text-secondary-400'>
								{item}
							</li>
						))}
					</ol>
				);
			}
			return (
				<ul key={index} className='mb-4 space-y-2 pl-6'>
					{block.items.map((item, i) => (
						<li
							key={i}
							className='text-secondary-600 dark:text-secondary-400 before:bg-primary dark:before:bg-success relative before:absolute before:top-[0.6em] before:-left-4 before:h-1.5 before:w-1.5 before:rounded-full'
						>
							{item}
						</li>
					))}
				</ul>
			);
		case 'callout': {
			const variantStyles = {
				info: 'border-info/50 bg-info/5',
				warning: 'border-warning/50 bg-warning/5',
				tip: 'border-success/50 bg-success/5',
			};
			const labelStyles = {
				info: 'text-info',
				warning: 'text-warning',
				tip: 'text-success',
			};
			const variant = block.variant ?? 'info';
			return (
				<div key={index} className={cn('mb-4 rounded-xl border-l-4 p-4 sm:p-5', variantStyles[variant])}>
					<p className={cn('text-heading-xsmall mb-1 tracking-widest uppercase', labelStyles[variant])}>{variant}</p>
					<p className='text-paragraph-small text-secondary-600 dark:text-secondary-400'>{block.text}</p>
				</div>
			);
		}
		default:
			return null;
	}
};

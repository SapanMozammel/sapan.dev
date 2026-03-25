'use client';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types/button';
import { IconLoader } from '@tabler/icons-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';

// Move static classes outside component to prevent recreation
const BASE_CLASSES =
	'group/button focus:ring-none relative inline-flex !h-9 cursor-pointer items-center justify-center !px-[calc(theme(height.9)*21/44)] focus:outline-none disabled:pointer-events-none disabled:brightness-85 sm:!h-11 sm:!px-[calc(theme(height.11)*21/44)] dark:disabled:brightness-90';

export const Button = memo<ButtonProps>((props) => {
	const { className, fill = false, gradient = false, children, loading, ...rest } = props;

	// Memoize computed classes to prevent recalculation
	const computedClasses = useMemo(() => {
		const loadingClass = loading ? 'pointer-events-none' : '';
		return cn(BASE_CLASSES, loadingClass, className);
	}, [loading, className]);

	// Check if this should render as a Link or button
	if ('to' in props && props.to) {
		const { to, ...linkProps } = rest as any;
		return (
			<Link href={to} className={computedClasses} {...linkProps}>
				{fill ? (
					gradient ? (
						<>
							<svg className='absolute inset-y-0 left-0 aspect-21/44 h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0' viewBox='0 0 21 44'>
								<linearGradient id='btn-left-link-filled' x1='0%' x2='100%' y1='50%' y2='50%'>
									<stop offset='0%' stopColor='var(--color-info)' />
									<stop offset='100%' stopColor='var(--color-info)' />
								</linearGradient>
								<path
									className='fill-[url(#btn-left-link-filled)] stroke-[url(#btn-left-link-filled)] duration-150'
									strokeWidth='2'
									d='M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1'
								/>
							</svg>
							<span className='relative h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0'>
								<span className='font-hg relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider text-white uppercase group-hover/button:text-white sm:text-sm dark:text-white'>
									{loading ? (
										<>
											<IconLoader className='h-5 w-5 animate-spin' /> loading...
										</>
									) : (
										children
									)}
								</span>
								<svg className='absolute top-0 h-full w-full' viewBox='0 0 100 44' preserveAspectRatio='none'>
									<linearGradient id='btn-center-link-filled' x1='0%' x2='100%' y1='50%' y2='50%'>
										<stop offset='0%' stopColor='var(--color-info)' />
										<stop offset='100%' stopColor='var(--color-primary)' />
									</linearGradient>
									<polygon className='fill-[url(#btn-center-link-filled)] duration-150' fillRule='nonzero' points='101 0 101 44 0 44 0 0' />
								</svg>
							</span>
							<svg
								className='absolute inset-y-0 right-0 aspect-21/44 h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0'
								viewBox='0 0 21 44'
							>
								<linearGradient id='btn-right-link-filled' x1='0%' x2='100%' y1='50%' y2='50%'>
									<stop offset='0%' stopColor='var(--color-primary)' />
									<stop offset='100%' stopColor='var(--color-primary)' />
								</linearGradient>
								<path
									className='fill-[url(#btn-right-link-filled)] stroke-[url(#btn-right-link-filled)] duration-150'
									strokeWidth='2'
									d='M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1'
								/>
							</svg>
						</>
					) : (
						<>
							<svg className='absolute inset-y-0 left-0 aspect-21/44 h-full' viewBox='0 0 21 44'>
								<path
									className='fill-dark stroke-dark group-hover/button:fill-primary group-hover/button:stroke-primary dark:group-hover/button:fill-success dark:group-hover/button:stroke-success duration-150 dark:fill-white dark:stroke-white'
									strokeWidth='2'
									d='M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1'
								/>
							</svg>
							<span className='relative h-full'>
								<span className='font-hg dark:text-dark dark:group-hover/button:text-dark relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider text-white uppercase group-hover/button:text-white sm:text-sm'>
									{loading ? (
										<>
											<IconLoader className='h-5 w-5 animate-spin' /> loading...
										</>
									) : (
										children
									)}
								</span>
								<svg className='absolute top-0 h-full w-full' viewBox='0 0 100 44' preserveAspectRatio='none'>
									<polygon className='fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success duration-150 dark:fill-white' fillRule='nonzero' points='101 0 101 44 0 44 0 0' />
								</svg>
							</span>
							<svg className='absolute inset-y-0 right-0 aspect-21/44 h-full' viewBox='0 0 21 44'>
								<path
									className='fill-dark stroke-dark group-hover/button:fill-primary group-hover/button:stroke-primary dark:group-hover/button:fill-success dark:group-hover/button:stroke-success duration-150 dark:fill-white dark:stroke-white'
									strokeWidth='2'
									d='M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1'
								/>
							</svg>
						</>
					)
				) : gradient ? (
					<>
						<svg className='absolute inset-y-0 left-0 aspect-21/44 h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0' viewBox='0 0 21 44'>
							<linearGradient id='btn-left-link' x1='0%' x2='100%' y1='50%' y2='50%'>
								<stop offset='0%' stopColor='var(--color-info)' />
								<stop offset='100%' stopColor='var(--color-info)' />
							</linearGradient>
							<path
								className='fill-none stroke-[url(#btn-left-link)]'
								strokeWidth='2'
								d='M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1'
							/>
						</svg>
						<span className='relative h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0'>
							<span className='font-hg text-dark relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider uppercase sm:text-sm dark:text-white'>
								{loading ? (
									<>
										<IconLoader className='h-5 w-5 animate-spin' /> loading...
									</>
								) : (
									children
								)}
							</span>
							<svg className='absolute top-0 h-full w-full' viewBox='0 0 100 44' preserveAspectRatio='none' fill='none'>
								<linearGradient id='btn-center-link' x1='0%' x2='100%' y1='50%' y2='50%'>
									<stop offset='0%' stopColor='var(--color-info)' />
									<stop offset='100%' stopColor='var(--color-primary)' />
								</linearGradient>
								<polygon className='fill-[url(#btn-center-link)]' fillRule='nonzero' points='101 0 101 2 0 2 0 0' />
								<polygon className='fill-[url(#btn-center-link)]' fillRule='nonzero' points='101 42 101 44 0 44 0 42' />
							</svg>
						</span>
						<svg className='absolute inset-y-0 right-0 aspect-21/44 h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0' viewBox='0 0 21 44'>
							<linearGradient id='btn-right-link' x1='0%' x2='100%' y1='50%' y2='50%'>
								<stop offset='0%' stopColor='var(--color-primary)' />
								<stop offset='100%' stopColor='var(--color-primary)' />
							</linearGradient>
							<path
								className='fill-none stroke-[url(#btn-right-link)]'
								strokeWidth='2'
								d='M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1'
							/>
						</svg>
					</>
				) : (
					<>
						<svg className='absolute inset-y-0 left-0 aspect-21/44 h-full' viewBox='0 0 21 44'>
							<path
								className='stroke-dark group-hover/button:stroke-primary dark:group-hover/button:stroke-success fill-none dark:stroke-white'
								strokeWidth='2'
								d='M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1'
							/>
						</svg>
						<span className='relative h-full'>
							<span className='font-hg text-dark group-hover/button:text-primary dark:group-hover/button:text-success relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider uppercase sm:text-sm dark:text-white'>
								{loading ? (
									<>
										<IconLoader className='h-5 w-5 animate-spin' /> loading...
									</>
								) : (
									children
								)}
							</span>
							<svg className='absolute top-0 h-full w-full' viewBox='0 0 100 44' preserveAspectRatio='none' fill='none'>
								<polygon className='fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success dark:fill-white' fillRule='nonzero' points='101 0 101 2 0 2 0 0' />
								<polygon className='fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success dark:fill-white' fillRule='nonzero' points='101 42 101 44 0 44 0 42' />
							</svg>
						</span>
						<svg className='absolute inset-y-0 right-0 aspect-21/44 h-full' viewBox='0 0 21 44'>
							<path
								className='stroke-dark group-hover/button:stroke-primary dark:group-hover/button:stroke-success fill-none dark:stroke-white'
								strokeWidth='2'
								d='M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1'
							/>
						</svg>
					</>
				)}
			</Link>
		);
	}

	// Render as button
	const { disabled, ...buttonProps } = rest as any;
	return (
		<button className={computedClasses} disabled={disabled} {...buttonProps}>
			{fill ? (
				gradient ? (
					<>
						<svg className='absolute inset-y-0 left-0 aspect-21/44 h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0' viewBox='0 0 21 44'>
							<linearGradient id='btn-left-filled' x1='0%' x2='100%' y1='50%' y2='50%'>
								<stop offset='0%' stopColor='var(--color-info)' />
								<stop offset='100%' stopColor='var(--color-info)' />
							</linearGradient>
							<path
								className='group-disabled/button:fill-secondary-300 group-disabled/button:stroke-secondary-300 fill-[url(#btn-left-filled)] stroke-[url(#btn-left-filled)] duration-150'
								strokeWidth='2'
								d='M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1'
							/>
						</svg>
						<span className='relative h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0'>
							<span className='font-hg group-disabled/button:text-secondary-500 relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider text-white uppercase group-hover/button:text-white sm:text-sm dark:text-white'>
								{loading ? (
									<>
										<IconLoader className='h-5 w-5 animate-spin' /> loading...
									</>
								) : (
									children
								)}
							</span>
							<svg className='absolute top-0 h-full w-full' viewBox='0 0 100 44' preserveAspectRatio='none'>
								<linearGradient id='btn-center-filled' x1='0%' x2='100%' y1='50%' y2='50%'>
									<stop offset='0%' stopColor='var(--color-info)' />
									<stop offset='100%' stopColor='var(--color-primary)' />
								</linearGradient>
								<polygon className='group-disabled/button:fill-secondary-300 fill-[url(#btn-center-filled)] duration-150' fillRule='nonzero' points='101 0 101 44 0 44 0 0' />
							</svg>
						</span>
						<svg className='absolute inset-y-0 right-0 aspect-21/44 h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0' viewBox='0 0 21 44'>
							<linearGradient id='btn-right-filled' x1='0%' x2='100%' y1='50%' y2='50%'>
								<stop offset='0%' stopColor='var(--color-primary)' />
								<stop offset='100%' stopColor='var(--color-primary)' />
							</linearGradient>
							<path
								className='group-disabled/button:fill-secondary-300 group-disabled/button:stroke-secondary-300 fill-[url(#btn-right-filled)] stroke-[url(#btn-right-filled)] duration-150'
								strokeWidth='2'
								d='M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1'
							/>
						</svg>
					</>
				) : (
					<>
						<svg className='absolute inset-y-0 left-0 aspect-21/44 h-full' viewBox='0 0 21 44'>
							<path
								className='fill-dark stroke-dark group-hover/button:fill-primary group-hover/button:stroke-primary dark:group-hover/button:fill-success dark:group-hover/button:stroke-success group-disabled/button:fill-secondary-300 group-disabled/button:stroke-secondary-300 duration-150 dark:fill-white dark:stroke-white'
								strokeWidth='2'
								d='M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1'
							/>
						</svg>
						<span className='relative h-full'>
							<span className='font-hg dark:text-dark group-disabled/button:text-secondary-500 dark:group-hover/button:text-dark relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider text-white uppercase group-hover/button:text-white sm:text-sm'>
								{loading ? (
									<>
										<IconLoader className='h-5 w-5 animate-spin' /> loading...
									</>
								) : (
									children
								)}
							</span>
							<svg className='absolute top-0 h-full w-full' viewBox='0 0 100 44' preserveAspectRatio='none'>
								<polygon
									className='fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success group-disabled/button:fill-secondary-300 duration-150 dark:fill-white'
									fillRule='nonzero'
									points='101 0 101 44 0 44 0 0'
								/>
							</svg>
						</span>
						<svg className='absolute inset-y-0 right-0 aspect-21/44 h-full' viewBox='0 0 21 44'>
							<path
								className='fill-dark stroke-dark group-hover/button:fill-primary group-hover/button:stroke-primary dark:group-hover/button:fill-success dark:group-hover/button:stroke-success group-disabled/button:fill-secondary-300 group-disabled/button:stroke-secondary-300 duration-150 dark:fill-white dark:stroke-white'
								strokeWidth='2'
								d='M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1'
							/>
						</svg>
					</>
				)
			) : gradient ? (
				<>
					<svg className='absolute inset-y-0 left-0 aspect-21/44 h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0' viewBox='0 0 21 44'>
						<linearGradient id='btn-left' x1='0%' x2='100%' y1='50%' y2='50%'>
							<stop offset='0%' stopColor='var(--color-info)' />
							<stop offset='100%' stopColor='var(--color-info)' />
						</linearGradient>
						<path
							className='group-disabled/button:stroke-secondary-300 fill-none stroke-[url(#btn-left)]'
							strokeWidth='2'
							d='M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1'
						/>
					</svg>
					<span className='relative h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0'>
						<span className='font-hg text-dark group-disabled/button:text-secondary-400 relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider uppercase sm:text-sm dark:text-white'>
							{loading ? (
								<>
									<IconLoader className='h-5 w-5 animate-spin' /> loading...
								</>
							) : (
								children
							)}
						</span>
						<svg className='absolute top-0 h-full w-full' viewBox='0 0 100 44' preserveAspectRatio='none' fill='none'>
							<linearGradient id='btn-center' x1='0%' x2='100%' y1='50%' y2='50%'>
								<stop offset='0%' stopColor='var(--color-info)' />
								<stop offset='100%' stopColor='var(--color-primary)' />
							</linearGradient>
							<polygon className='group-disabled/button:fill-secondary-300 fill-[url(#btn-center)]' fillRule='nonzero' points='101 0 101 2 0 2 0 0' />
							<polygon className='group-disabled/button:fill-secondary-300 fill-[url(#btn-center)]' fillRule='nonzero' points='101 42 101 44 0 44 0 42' />
						</svg>
					</span>
					<svg className='absolute inset-y-0 right-0 aspect-21/44 h-full group-hover/button:hue-rotate-15 dark:group-hover/button:brightness-120 dark:group-hover/button:hue-rotate-0' viewBox='0 0 21 44'>
						<linearGradient id='btn-right' x1='0%' x2='100%' y1='50%' y2='50%'>
							<stop offset='0%' stopColor='var(--color-primary)' />
							<stop offset='100%' stopColor='var(--color-primary)' />
						</linearGradient>
						<path
							className='group-disabled/button:stroke-secondary-300 fill-none stroke-[url(#btn-right)]'
							strokeWidth='2'
							d='M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1'
						/>
					</svg>
				</>
			) : (
				<>
					<svg className='absolute inset-y-0 left-0 aspect-21/44 h-full' viewBox='0 0 21 44'>
						<path
							className='group-disabled/button:stroke-secondary-300 stroke-dark group-hover/button:stroke-primary dark:group-hover/button:stroke-success fill-none dark:stroke-white'
							strokeWidth='2'
							d='M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1'
						/>
					</svg>
					<span className='relative h-full'>
						<span className='font-hg text-dark group-disabled/button:text-secondary-400 group-hover/button:text-primary dark:group-hover/button:text-success relative z-1 inline-flex h-full items-center justify-center gap-1 px-[0.5em] text-xs font-bold tracking-wider uppercase sm:text-sm dark:text-white'>
							{loading ? (
								<>
									<IconLoader className='h-5 w-5 animate-spin' /> loading...
								</>
							) : (
								children
							)}
						</span>
						<svg className='absolute top-0 h-full w-full' viewBox='0 0 100 44' preserveAspectRatio='none' fill='none'>
							<polygon
								className='group-disabled/button:fill-secondary-300 fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success dark:fill-white'
								fillRule='nonzero'
								points='101 0 101 2 0 2 0 0'
							/>
							<polygon
								className='group-disabled/button:fill-secondary-300 fill-dark group-hover/button:fill-primary dark:group-hover/button:fill-success dark:fill-white'
								fillRule='nonzero'
								points='101 42 101 44 0 44 0 42'
							/>
						</svg>
					</span>
					<svg className='absolute inset-y-0 right-0 aspect-21/44 h-full' viewBox='0 0 21 44'>
						<path
							className='group-disabled/button:stroke-secondary-300 stroke-dark group-hover/button:stroke-primary dark:group-hover/button:stroke-success fill-none dark:stroke-white'
							strokeWidth='2'
							d='M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1'
						/>
					</svg>
				</>
			)}
		</button>
	);
});

Button.displayName = 'Button';

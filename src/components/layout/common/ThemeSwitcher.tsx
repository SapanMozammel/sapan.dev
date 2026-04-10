'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isMacOS } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { IconContrastFilled, IconLoader, IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Move outside component to prevent recreation on every render
const themeOptions = [
	{
		name: 'light',
		icon: <IconSunFilled className='h-4 w-4 outline-none sm:h-5 sm:w-5' />,
	},
	{
		name: 'dark',
		icon: <IconMoonFilled className='h-3.5 w-3.5 outline-none sm:h-4.5 sm:w-4.5' />,
	},
	{
		name: 'system',
		icon: <IconContrastFilled className='h-3.5 w-3.5 outline-none sm:h-4.5 sm:w-4.5' />,
	},
] as const;

const ThemeSwitcher = memo(() => {
	const { theme, setTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [keyboardTriggered, setKeyboardTriggered] = useState(false);
	const [popoverOpen, setPopoverOpen] = useState(false);
	const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const popoverCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Computed tooltip visibility - more optimized than state + useEffect
	const tooltipOpen = isHovering || keyboardTriggered;

	const themeIcon = useMemo(() => {
		// Show loading icon during hydration to prevent mismatch
		if (!mounted) {
			return <IconLoader className='h-4 w-4 animate-spin outline-none sm:h-5 sm:w-5' />;
		}

		const currentTheme = theme === 'system' ? systemTheme : theme;
		const icon = themeOptions.find((option) => option.name === currentTheme)?.icon;
		return icon;
	}, [mounted, theme, systemTheme]);

	const changeTheme = useCallback(
		(value?: string) => {
			const themes = ['light', 'dark', 'system'] as const;
			const themeString = theme as string;
			if (value) {
				const targetTheme = themes.find((t) => t === value.toLowerCase());
				if (targetTheme) {
					return setTheme(targetTheme);
				}
			}
			const currentIndex = themes.indexOf(themeString as (typeof themes)[number]);
			const nextTheme = themes[(currentIndex + 1) % themes.length];
			return setTheme(nextTheme);
		},
		[theme, setTheme]
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const baseKey = (isMacOS() && event.metaKey) || (!isMacOS() && event.ctrlKey);
			if (baseKey && event.altKey && event.code.toLowerCase() === 'KeyT'.toLowerCase()) {
				event.preventDefault(); // Prevent default browser behavior if any
				changeTheme();

				// Clear any existing timeout to prevent stacking
				if (tooltipTimeoutRef.current) {
					clearTimeout(tooltipTimeoutRef.current);
				}

				// Show tooltip for 2 seconds when changing theme via keyboard (only if not hovering)
				setKeyboardTriggered(true);
				tooltipTimeoutRef.current = setTimeout(() => {
					setKeyboardTriggered(false);
					tooltipTimeoutRef.current = null;
				}, 1000);
			}
		},
		[changeTheme]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	// Prevent hydration mismatch by only rendering theme-dependent content after mount && Cleanup timeout on unmount
	useEffect(() => {
		setMounted(true);
		return () => {
			if (tooltipTimeoutRef.current) {
				clearTimeout(tooltipTimeoutRef.current);
			}
			if (popoverCloseTimeoutRef.current) {
				clearTimeout(popoverCloseTimeoutRef.current);
			}
		};
	}, []);

	return (
		<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
			<Tooltip open={tooltipOpen}>
				<TooltipTrigger asChild>
					<PopoverTrigger asChild>
						<button
							type='button'
							className='hover:text-primary dark:hover:text-success text-dark inline-flex aspect-square h-6 cursor-pointer items-center justify-center ease-in-out sm:h-8 dark:text-white'
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							{themeIcon}
						</button>
					</PopoverTrigger>
				</TooltipTrigger>
				<TooltipContent side='bottom'>
					<p className='font-hg capitalize'>{mounted ? theme : 'Loading'} Theme</p>
				</TooltipContent>
			</Tooltip>
			<PopoverContent className='border-secondary-400 dark:border-secondary-600 divide-secondary-400 dark:divide-secondary-600 w-44 divide-y' align='end'>
				<div className='font-hg text-dark flex items-center gap-1 px-3 py-2 text-xs font-medium sm:text-sm dark:text-white'>
					<span>Change Theme</span>
					<span className='text-primary dark:text-success ms-auto text-xs'>⌘⌥T</span>
				</div>
				<div className='flex flex-col gap-0.5 p-1'>
					{themeOptions.map((option) => {
						// Memoize click handler to prevent recreation on every render
						const handleOptionClick = () => {
							changeTheme(option.name);
							if (popoverCloseTimeoutRef.current) {
								clearTimeout(popoverCloseTimeoutRef.current);
							}
							popoverCloseTimeoutRef.current = setTimeout(() => {
								setPopoverOpen(false);
								popoverCloseTimeoutRef.current = null;
							}, 300);
						};

						return (
							<button
								key={option.name}
								type='button'
								className={cn(
									'font-hg flex w-full cursor-pointer items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors sm:text-sm',
									mounted && theme === option.name
										? 'bg-primary/10 text-primary dark:bg-success/10 dark:text-success'
										: 'text-secondary-500 dark:text-secondary-500 hover:text-primary dark:hover:text-success'
								)}
								onClick={handleOptionClick}
							>
								<span className='capitalize'>{option.name} Theme</span>
								<span className='inline-flex aspect-square w-5 scale-85 items-center justify-center'>{option.icon}</span>
							</button>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
});

ThemeSwitcher.displayName = 'ThemeSwitcher';

export default ThemeSwitcher;

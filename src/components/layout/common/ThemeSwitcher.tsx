'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isMacOS } from '@/lib/helper';
import { IconContrastFilled, IconLoader, IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect } from 'react';

const ThemeSwitcher = () => {
	const { theme, setTheme, systemTheme } = useTheme();

	const themeOptions = [
		{
			name: 'light',
			icon: <IconSunFilled className='h-5 w-5' />,
		},
		{
			name: 'dark',
			icon: <IconMoonFilled className='h-4.5 w-4.5' />,
		},
		{
			name: 'system',
			icon: <IconContrastFilled className='h-4.5 w-4.5' />,
		},
	];

	const changeTheme = useCallback(
		(value?: string) => {
			const themes = themeOptions.map((option) => option.name);
			const themeString = theme as string;
			if (value) {
				return setTheme(themes[themes.indexOf(value.toLowerCase())]);
			}
			return setTheme(themes[(themes.indexOf(themeString) + 1) % themes.length]);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[theme, setTheme]
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const baseKey = (isMacOS() && event.metaKey) || (!isMacOS() && event.ctrlKey);
			if (baseKey && event.altKey && event.code.toLowerCase() === 'KeyT'.toLowerCase()) {
				event.preventDefault(); // Prevent default browser behavior if any
				changeTheme();
			}
		},
		[changeTheme]
	);

	useEffect(() => {
		// Add keydown event listener on mount
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			// Clean up event listener on unmount
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [theme, handleKeyDown]);

	const themeIcon = () => {
		const currentTheme = theme === 'system' ? systemTheme : theme;
		const icon = themeOptions.find((option) => option.name === currentTheme)?.icon;
		return icon ?? <IconLoader className='h-5 w-5 animate-spin' />;
	};

	return (
		<Popover>
			<Tooltip>
				<TooltipTrigger asChild>
					<PopoverTrigger asChild>
						<button type='button' className='hover:text-primary dark:hover:text-success inline-flex aspect-square h-8 cursor-pointer items-center justify-center text-black ease-in-out dark:text-white'>
							{themeIcon()}
						</button>
					</PopoverTrigger>
				</TooltipTrigger>
				<TooltipContent side='right'>
					<p className='capitalize'>{theme} Theme</p>
				</TooltipContent>
			</Tooltip>
			<PopoverContent className='border-secondary-400 dark:border-secondary-600 divide-secondary-400 dark:divide-secondary-600 w-44 divide-y' align='end'>
				<div className='flex items-center gap-1 px-3 py-2 text-sm font-medium text-black dark:text-white'>
					<span>Change Theme</span>
					<span className='text-primary dark:text-success ml-auto text-xs'>⌘⌥T</span>
				</div>
				<div className='flex flex-col gap-0.5 p-1'>
					{themeOptions.map((option) => (
						<button
							key={option.name}
							type='button'
							className={`flex w-full cursor-pointer items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
								theme === option.name ? 'bg-primary/10 text-primary dark:bg-success/10 dark:text-success' : 'text-secondary-500 dark:text-secondary-400 hover:text-primary dark:hover:text-success'
							}`}
							onClick={() => {
								changeTheme(option.name);
							}}
						>
							<span className='capitalize'>{option.name} Theme</span>
							<span className='inline-flex aspect-square w-5 scale-85 items-center justify-center'>{option.icon}</span>
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default ThemeSwitcher;

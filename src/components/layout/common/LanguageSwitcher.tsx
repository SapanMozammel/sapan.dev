'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LANGUAGES } from '@/lib/constants/languages';
import { IconLoader } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const LanguageSwitcher = () => {
	const [currentLanguage, setCurrentLanguage] = useState('en');
	const [mounted, setMounted] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	const currentLanguageFlag = useMemo(() => {
		return LANGUAGES.find((lang) => lang.code === currentLanguage)?.flag || '🇺🇸';
	}, [currentLanguage]);

	const languageIcon = useMemo(() => {
		// Show loading icon during hydration to prevent mismatch
		if (!mounted) {
			return <IconLoader className='h-5 w-5 animate-spin outline-none' />;
		}

		return <span className='text-xl leading-none'>{currentLanguageFlag}</span>;
	}, [mounted, currentLanguageFlag]);

	const currentLanguageName = useMemo(() => {
		return LANGUAGES.find((lang) => lang.code === currentLanguage)?.name || 'English';
	}, [currentLanguage]);

	const changeLanguage = useCallback((languageCode: string) => {
		setCurrentLanguage(languageCode);
		// TODO: Implement actual language switching logic here
		// This could involve:
		// - Updating i18n context
		// - Storing preference in localStorage
		// - Updating URL locale
		console.log('Language changed to:', languageCode);
	}, []);

	useEffect(() => {
		setMounted(true);

		// Load saved language preference from localStorage
		const savedLanguage = localStorage.getItem('language');
		if (savedLanguage && LANGUAGES.some((lang) => lang.code === savedLanguage)) {
			setCurrentLanguage(savedLanguage);
		}
	}, []);

	useEffect(() => {
		// Save language preference to localStorage
		if (mounted) {
			localStorage.setItem('language', currentLanguage);
		}
	}, [currentLanguage, mounted]);

	return (
		<Popover>
			<Tooltip open={isHovering}>
				<TooltipTrigger asChild>
					<PopoverTrigger asChild>
						<button
							type='button'
							className='hover:text-primary dark:hover:text-success inline-flex aspect-square h-8 cursor-pointer items-center justify-center text-black ease-in-out dark:text-white'
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							{languageIcon}
						</button>
					</PopoverTrigger>
				</TooltipTrigger>
				<TooltipContent side='right'>
					<p>{mounted ? currentLanguageName : 'Loading'}</p>
				</TooltipContent>
			</Tooltip>
			<PopoverContent className='border-secondary-400 dark:border-secondary-600 divide-secondary-400 dark:divide-secondary-600 w-52 divide-y' align='end'>
				<div className='flex items-center gap-1 px-3 py-2 text-sm font-medium text-black dark:text-white'>
					<span>Change Language</span>
				</div>
				<div className='flex max-h-80 flex-col gap-0.5 overflow-y-auto p-1'>
					{LANGUAGES.map((language) => {
						// Memoize click handler to prevent recreation on every render
						const handleOptionClick = () => changeLanguage(language.code);

						return (
							<button
								key={language.code}
								type='button'
								className={`flex w-full cursor-pointer items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
									mounted && currentLanguage === language.code
										? 'bg-primary/10 text-primary dark:bg-success/10 dark:text-success'
										: 'text-secondary-500 dark:text-secondary-400 hover:text-primary dark:hover:text-success'
								}`}
								onClick={handleOptionClick}
							>
								<span className='flex items-center gap-2'>
									<span className='text-base'>{language.flag}</span>
									<span>{language.name}</span>
								</span>
								{mounted && currentLanguage === language.code && <span className='text-primary dark:text-success text-xs'>✓</span>}
							</button>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default LanguageSwitcher;

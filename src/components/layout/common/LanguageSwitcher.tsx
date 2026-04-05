'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LANGUAGES } from '@/data/config/languages';
import { usePathname, useRouter } from '@/i18n/navigation';
import { setLocale } from '@/store/slices/localeSlice';
import type { Locale } from '@/types/i18n';
import { IconLoader } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const LanguageSwitcher = () => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();
	const currentLocale = useLocale();

	const [mounted, setMounted] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [popoverOpen, setPopoverOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const currentLanguageFlag = useMemo(() => {
		return LANGUAGES.find((lang) => lang.code === currentLocale)?.flag || '🇺🇸';
	}, [currentLocale]);

	const currentLanguageName = useMemo(() => {
		return LANGUAGES.find((lang) => lang.code === currentLocale)?.name || 'English';
	}, [currentLocale]);

	const languageIcon = useMemo(() => {
		if (!mounted) {
			return <IconLoader className='h-4 w-4 animate-spin outline-none sm:h-5 sm:w-5' />;
		}
		return <span className='text-lg leading-none sm:text-xl'>{currentLanguageFlag}</span>;
	}, [mounted, currentLanguageFlag]);

	const changeLanguage = useCallback(
		(languageCode: string) => {
			setPopoverOpen(false);
			dispatch(setLocale(languageCode as Locale));
			router.replace(pathname, { locale: languageCode });
		},
		[pathname, router, dispatch]
	);

	return (
		<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
			<Tooltip open={isHovering}>
				<TooltipTrigger asChild>
					<PopoverTrigger asChild>
						<button
							type='button'
							className='hover:text-primary dark:hover:text-success text-dark inline-flex aspect-square h-6 cursor-pointer items-center justify-center ease-in-out sm:h-8 dark:text-white'
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
				<div className='text-dark flex items-center gap-1 px-3 py-2 text-xs font-medium sm:text-sm dark:text-white'>
					<span>Change Language</span>
				</div>
				<div className='flex max-h-80 flex-col gap-0.5 overflow-y-auto p-1'>
					{LANGUAGES.map((language) => (
						<button
							key={language.code}
							type='button'
							className={`flex w-full cursor-pointer items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors sm:text-sm ${
								mounted && currentLocale === language.code
									? 'bg-primary/10 text-primary dark:bg-success/10 dark:text-success'
									: 'text-secondary-500 dark:text-secondary-500 hover:text-primary dark:hover:text-success'
							}`}
							onClick={() => changeLanguage(language.code)}
						>
							<span className='flex items-center gap-2'>
								<span className='text-base'>{language.flag}</span>
								<span>{language.name}</span>
							</span>
							{mounted && currentLocale === language.code && <span className='text-primary dark:text-success text-xs'>✓</span>}
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default LanguageSwitcher;

'use client';

import { RTL_LOCALES } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

const HtmlLocaleSync = () => {
	const locale = useLocale();

	useEffect(() => {
		const isRTL = RTL_LOCALES.includes(locale);
		const html = document.documentElement;
		html.lang = locale;
		html.dir = isRTL ? 'rtl' : 'ltr';
		document.body.classList.toggle('font-arabic', isRTL);
		document.body.classList.toggle('font-dm', !isRTL);
	}, [locale]);

	return null;
};

export default HtmlLocaleSync;

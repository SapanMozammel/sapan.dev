import { fontList } from '@/app/fonts';
import { RTL_LOCALES } from '@/i18n/routing';
import '@/styles/global.scss';
import { getLocale } from 'next-intl/server';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const locale = await getLocale();
	const isRTL = RTL_LOCALES.includes(locale);

	return (
		<html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
			<body className={`${fontList} ${isRTL ? 'font-arabic' : 'font-dm'}`} suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;

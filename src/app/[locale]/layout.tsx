import { fontList } from '@/app/fonts';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { RTL_LOCALES } from '@/i18n/routing';
import Providers from '@/providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL('https://sapan.dev'),
	title: {
		template: '%s | sapan.dev',
		default: 'sapan.dev',
	},
	description: 'Full-stack developer crafting modern, performant web applications.',
	authors: [{ name: 'Sapan Mozammel' }],
	creator: 'Sapan Mozammel',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		siteName: 'sapan.dev',
	},
};

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
	const { locale } = await params;
	const messages = await getMessages();
	const isRTL = (RTL_LOCALES as readonly string[]).includes(locale);

	return (
		<html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
			<body className={`${fontList} ${isRTL ? 'font-arabic' : 'font-dm'}`} suppressHydrationWarning>
				<NextIntlClientProvider messages={messages}>
					<Providers>
						<div className='text-dark relative bg-white dark:bg-black dark:text-white'>
							<Header />
							<main className='relative -my-2.5 overflow-x-clip py-2.5'>{children}</main>
							<Footer />
							<div className="animate-noise pointer-events-none absolute inset-0 z-20 hidden bg-[url('/noise.png')] bg-repeat opacity-5 select-none lg:block dark:opacity-15" />
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
};

export default LocaleLayout;

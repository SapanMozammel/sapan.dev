import { fontList } from '@/app/fonts';
import HtmlLocaleSync from '@/components/layout/common/HtmlLocaleSync';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { routing, RTL_LOCALES } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import Providers from '@/providers';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL('https://sapan-dev.vercel.app'),
	title: {
		template: '%s | Sapan Mozammel',
		default: 'Sapan Mozammel — Frontend Developer',
	},
	description: 'Frontend developer building digital experiences that matter — crafting modern, performant web applications with React, Next.js, TypeScript, and Node.js.',
	keywords: ['Sapan Mozammel', 'Frontend Developer', 'React Developer', 'Next.js Developer', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'MongoDB', 'WordPress', 'Web Development', 'Portfolio', 'Bangladesh'],
	authors: [{ name: 'Sapan Mozammel', url: 'https://sapan-dev.vercel.app' }],
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
	icons: {
		icon: [
			{ url: '/favicon.svg', type: 'image/svg+xml' },
			{ url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
		],
		shortcut: '/favicon.ico',
		apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
	},
	manifest: '/site.webmanifest',
	openGraph: {
		type: 'website',
		siteName: 'Sapan Mozammel',
		url: 'https://sapan-dev.vercel.app',
		title: 'Sapan Mozammel — Frontend Developer',
		description: 'Frontend developer building digital experiences that matter — crafting modern, performant web applications with React, Next.js, TypeScript, and Node.js.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Sapan Mozammel — Frontend Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@sapan_mozammel',
		creator: '@sapan_mozammel',
		title: 'Sapan Mozammel — Frontend Developer',
		description: 'Frontend developer building digital experiences that matter — crafting modern, performant web applications with React, Next.js, TypeScript, and Node.js.',
		images: ['/og-image.png'],
	},
};

const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Sapan Mozammel',
	legalName: 'Mozammel Ali',
	alternateName: 'Mozammel Ali',
	url: 'https://sapan-dev.vercel.app',
	image: 'https://sapan-dev.vercel.app/og-image.png',
	jobTitle: 'Frontend Developer',
	email: 'sapanmozammel@gmail.com',
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Dhaka',
		addressCountry: 'BD',
	},
	sameAs: ['https://github.com/SapanMozammel', 'https://linkedin.com/in/sapanmozammel', 'https://twitter.com/sapan_mozammel'],
};

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}
	setRequestLocale(locale);

	const isRTL = RTL_LOCALES.includes(locale);
	const messages = await getMessages();

	return (
		<html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning className='relative'>
			<body className={cn(fontList, isRTL ? 'font-arabic' : 'font-dm')} suppressHydrationWarning>
				<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
				<Providers>
					<NextIntlClientProvider messages={messages}>
						<link rel='preconnect' href='https://challenges.cloudflare.com' />
						<HtmlLocaleSync />
						<div className='text-dark relative bg-white dark:bg-black dark:text-white'>
							<Header />
							<main className='relative -my-2.5 overflow-x-clip py-2.5'>{children}</main>
							<Footer />
							<div className="animate-noise pointer-events-none absolute inset-0 z-20 hidden bg-[url('/noise.png')] bg-repeat opacity-5 select-none lg:block dark:opacity-15" />
						</div>
					</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	);
};

export default LocaleLayout;

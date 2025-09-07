import { cormorantGaramond, dmSans, ebGaramond, fira, hankenGrotesk, zondrone } from '@/app/fonts';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import '@/styles/global.scss';
import { ThemeProvider } from 'next-themes';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL('http://localhost:8000'),
	alternates: {
		canonical: 'https://templately.com',
		languages: {
			'en-US': '/en-US',
		},
	},
	title: {
		template: '%s',
		default: 'Templately - The Best Elementor and Gutenberg Templates for WordPress & Cloud WorkSpace for',
	},
	generator: 'Templately',
	applicationName: 'Templately',
	referrer: 'origin-when-cross-origin',
	keywords: ['wordpress', 'next.js', 'react.js', 'redux'],
	authors: [{ name: 'Templately', url: 'https://templately.com' }],
	creator: 'Templately',
	publisher: 'Templately',
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	description: `Get 4,000+ Elementor templates & ready Blocks for Gutenberg to build WordPress website in few clicks. Join Templately for FREE & save ready templates in MyCloud to collaborate with team members on WorkSpace for WordPress.`,
	openGraph: {
		images: ['https://assets.templately.com/frontend/templately-banner-200k.jpg'],
		// imageHeight: '1200',
		type: 'website',
		siteName: 'Templately',
		url: 'http://www.templately.com',
		title: `Templately - The Best Elementor and Gutenberg Templates for WordPress & Cloud WorkSpace for ${new Date().getFullYear()}`,
		description: `Get 4,000+ Elementor templates & ready Blocks for Gutenberg to build WordPress website in few clicks. Join Templately for FREE & save ready templates in MyCloud to collaborate with team members on WorkSpace for WordPress.`,
		locale: 'en-US',
	},
	icons: {
		icon: [
			{ url: '/meta/icon.png' },
			// new URL('/meta/icon.png', 'https://templately.com'),
		],
		// shortcut: [new URL('/meta/shortcut-icon.png', 'https://templately.com')],
		apple: [
			{
				url: '/meta/apple-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
			{
				url: '/meta/apple-icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
		],
		other: [
			{
				rel: 'apple-touch-icon-precomposed',
				url: '/meta/apple-icon.png',
			},
			{
				rel: 'android-icon',
				url: '/meta/android-icon-36x36.png',
			},
		],
	},
};

const fontList = `${dmSans.variable} ${ebGaramond.variable} ${hankenGrotesk.variable} ${fira.variable} ${cormorantGaramond.variable} ${zondrone.variable}`;

// Move static theme provider props outside component to prevent recreation
const THEME_PROVIDER_PROPS = {
	enableSystem: true,
	defaultTheme: 'system' as const,
	enableColorScheme: false,
	themes: ['light', 'dark', 'system'],
	attribute: 'class' as const,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body suppressHydrationWarning className={`${fontList} font-dm`}>
				<div className='text-dark relative bg-white dark:bg-black dark:text-white'>
					<ThemeProvider {...THEME_PROVIDER_PROPS}>
						<Header />
						<main>{children}</main>
						<Footer />
					</ThemeProvider>
					<div className="animate-noise pointer-events-none absolute inset-0 z-20 hidden bg-[url('/noise.png')] bg-repeat opacity-5 select-none lg:block dark:opacity-15" />
				</div>
			</body>
		</html>
	);
};

export default RootLayout;

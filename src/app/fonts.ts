import { Cormorant_Garamond, DM_Sans, EB_Garamond, Fira_Code, Hanken_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

export const dmSans = DM_Sans({
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-dm',
});

export const ebGaramond = EB_Garamond({
	display: 'swap',
	weight: ['400', '500', '600', '700', '800'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-eb',
});

export const hankenGrotesk = Hanken_Grotesk({
	display: 'swap',
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	style: ['normal', 'italic'],
	variable: '--font-hg',
});

export const fira = Fira_Code({
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['greek'],
	style: ['normal'],
	variable: '--font-fira',
});

export const cormorantGaramond = Cormorant_Garamond({
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-cg',
});

export const zondrone = localFont({
	src: [
		{
			path: '../../public/fonts/Zondrone.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Zondrone.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--font-zondrone',
});

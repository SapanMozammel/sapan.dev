import { Bungee, Cormorant_Garamond, DM_Sans, Hanken_Grotesk, Noto_Sans_Arabic } from 'next/font/google';

export const dmSans = DM_Sans({
	display: 'swap',
	weight: ['400'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-dm',
});

export const hankenGrotesk = Hanken_Grotesk({
	display: 'swap',
	weight: ['500', '600', '700'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-hg',
});

export const cormorantGaramond = Cormorant_Garamond({
	display: 'swap',
	weight: ['500'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-cg',
});

export const bungee = Bungee({
	display: 'swap',
	weight: ['400'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-bungee',
});

export const notoSansArabic = Noto_Sans_Arabic({
	display: 'swap',
	weight: ['400'],
	subsets: ['arabic'],
	variable: '--font-arabic',
});

export const fontList = `${dmSans.variable} ${hankenGrotesk.variable} ${cormorantGaramond.variable} ${bungee.variable} ${notoSansArabic.variable}`;

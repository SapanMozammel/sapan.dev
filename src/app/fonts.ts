import { Cormorant_Garamond, DM_Sans, EB_Garamond, Hanken_Grotesk, Noto_Sans_Arabic, Sora, Tektur } from 'next/font/google';

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

export const cormorantGaramond = Cormorant_Garamond({
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-cg',
});

export const sora = Sora({
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-sora',
});

export const tektur = Tektur({
	display: 'swap',
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	style: ['normal'],
	variable: '--font-tektur',
});

export const notoSansArabic = Noto_Sans_Arabic({
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['arabic'],
	variable: '--font-arabic',
});

export const fontList = `${dmSans.variable} ${ebGaramond.variable} ${hankenGrotesk.variable} ${cormorantGaramond.variable} ${sora.variable} ${tektur.variable} ${notoSansArabic.variable}`;

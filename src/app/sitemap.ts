import { BLOG_POSTS } from '@/data/content/blogs';
import { locales } from '@/i18n/routing';
import { env } from '@/lib/env';
import type { MetadataRoute } from 'next';

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

const staticRoutes = ['', '/articles'];

const sitemap = (): MetadataRoute.Sitemap => {
	const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
		locales.map((locale) => ({
			url: `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${route}`,
			lastModified: new Date(),
			changeFrequency: route === '' ? ('weekly' as const) : ('daily' as const),
			priority: route === '' ? 1 : 0.8,
		}))
	);

	const articleEntries: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) =>
		locales.map((locale) => ({
			url: `${siteUrl}${locale === 'en' ? '' : `/${locale}`}/articles/${post.slug}`,
			lastModified: new Date(post.publishedAt),
			changeFrequency: 'monthly' as const,
			priority: 0.6,
		}))
	);

	return [...staticEntries, ...articleEntries];
};

export default sitemap;

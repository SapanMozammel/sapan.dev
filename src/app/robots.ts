import { env } from '@/lib/env';
import type { MetadataRoute } from 'next';

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

const robots = (): MetadataRoute.Robots => ({
	rules: {
		userAgent: '*',
		allow: '/',
	},
	sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;

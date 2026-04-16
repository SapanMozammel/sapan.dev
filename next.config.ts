import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: false,
	},

	experimental: {
		optimizePackageImports: ['@tabler/icons-react', 'three', '@react-three/drei', 'framer-motion', 'gsap'],
	},

	onDemandEntries: {
		maxInactiveAge: 25 * 1000,
		pagesBufferLength: 2,
	},

	compress: true,

	images: {
		qualities: [75, 85, 90],
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 31536000,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
		],
		unoptimized: process.env.NODE_ENV === 'development',
	},
};

export default withBundleAnalyzer(withNextIntl(nextConfig));

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	eslint: {
		dirs: ['src'],
		ignoreDuringBuilds: false,
	},

	typescript: {
		ignoreBuildErrors: false,
	},

	experimental: {
		optimizePackageImports: ['@tabler/icons-react'],
	},

	onDemandEntries: {
		maxInactiveAge: 25 * 1000,
		pagesBufferLength: 2,
	},

	compress: true,

	images: {
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
				hostname: 'cdn.simpleicons.org',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'randomuser.me',
				port: '',
				pathname: '/api/portraits/**',
			},
		],
		unoptimized: process.env.NODE_ENV === 'development',
	},
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));

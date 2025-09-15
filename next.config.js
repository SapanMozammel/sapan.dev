const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	// ESLint configuration
	eslint: {
		dirs: ['src'],
		ignoreDuringBuilds: false,
	},

	// TypeScript configuration
	typescript: {
		ignoreBuildErrors: false,
	},

	// Performance optimizations
	experimental: {
		optimizePackageImports: ['@tabler/icons-react'],
	},

	// Improve hot reload stability (works with both webpack and Turbopack)
	onDemandEntries: {
		// Period (in ms) where the server will keep pages in the buffer
		maxInactiveAge: 25 * 1000,
		// Number of pages that should be kept simultaneously without being disposed
		pagesBufferLength: 2,
	},

	// Additional performance optimizations
	compress: true,

	// Image optimization
	images: {
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 60,
	},
};

module.exports = withBundleAnalyzer(nextConfig);

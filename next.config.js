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
};

module.exports = nextConfig;

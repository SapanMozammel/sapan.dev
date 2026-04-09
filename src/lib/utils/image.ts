export const shimmer = (w: number, h: number): string => {
	return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="rgba(255,255,255,0.05)" offset="20%" />
      <stop stop-color="rgba(255,255,255,0.1)" offset="50%" />
      <stop stop-color="rgba(255,255,255,0.05)" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="transparent" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
};

export const toBase64 = (str: string): string => {
	return typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
};

export const getBlurDataURL = (w: number = 700, h: number = 475): string => {
	return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
};

export const getSolidColorPlaceholder = (color: string = '#f0f0f0', w: number = 700, h: number = 475): string => {
	const svg = `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="${color}" />
</svg>`;
	return `data:image/svg+xml;base64,${toBase64(svg)}`;
};

export const IMAGE_SIZES = {
	avatar: {
		small: { width: 40, height: 40 },
		medium: { width: 80, height: 80 },
		large: { width: 120, height: 120 },
	},
	logo: {
		small: { width: 32, height: 32 },
		medium: { width: 64, height: 64 },
		large: { width: 128, height: 128 },
	},
	thumbnail: {
		small: { width: 150, height: 150 },
		medium: { width: 300, height: 300 },
		large: { width: 600, height: 600 },
	},
} as const;

export const getOptimizedImageProps = (type: keyof typeof IMAGE_SIZES, size: 'small' | 'medium' | 'large' = 'medium') => {
	const dimensions = IMAGE_SIZES[type][size];
	return {
		...dimensions,
		placeholder: 'blur' as const,
		blurDataURL: getBlurDataURL(dimensions.width, dimensions.height),
	};
};

export const TECH_LOGOS = {
	typescript: '/images/tech/typescript.svg',
	react: '/images/tech/react.svg',
	nextjs: '/images/tech/nextjs.svg',
	nodejs: '/images/tech/nodejs.svg',
	git: '/images/tech/git.svg',
	tailwindcss: '/images/tech/tailwindcss.svg',
	shadcnui: '/images/tech/shadcnui.svg',
	prisma: '/images/tech/prisma.svg',
	mongodb: '/images/tech/mongodb.svg',
	graphql: '/images/tech/graphql.svg',
	docker: '/images/tech/docker.svg',
	vercel: '/images/tech/vercel.svg',
	googlecloud: '/images/tech/googlecloud.svg',
	framer: '/images/tech/framer.svg',
	threejs: '/images/tech/threejs.svg',
	wordpress: '/images/tech/wordpress.svg',
} as const;

export const getTechLogo = (tech: keyof typeof TECH_LOGOS): string => {
	return TECH_LOGOS[tech];
};

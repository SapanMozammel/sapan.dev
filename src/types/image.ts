import type { ImageProps as NextImageProps } from 'next/image';

// Extended image props with optimization options
export type OptimizedImageProps = Omit<NextImageProps, 'src'> & {
	src: string;
	fallbackSrc?: string;
	priority?: boolean;
	loading?: 'lazy' | 'eager';
};

// Avatar image props
export type AvatarImageProps = {
	src: string;
	alt: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
	priority?: boolean;
};

// Logo image props
export type LogoImageProps = {
	src: string;
	alt: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
	priority?: boolean;
	invert?: boolean;
};

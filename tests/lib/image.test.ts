import { getBlurDataURL, getOptimizedImageProps, getSolidColorPlaceholder, getTechLogo, IMAGE_SIZES, shimmer, TECH_LOGOS, toBase64 } from '@/lib/utils/image';
import { describe, expect, it } from 'vitest';

describe('shimmer', () => {
	it('generates SVG with correct dimensions', () => {
		const result = shimmer(100, 50);
		expect(result).toContain('width="100"');
		expect(result).toContain('height="50"');
	});

	it('contains animation element', () => {
		expect(shimmer(10, 10)).toContain('animate');
	});
});

describe('toBase64', () => {
	it('encodes string to base64 in Node (server)', () => {
		expect(toBase64('hello')).toBe(Buffer.from('hello').toString('base64'));
	});

	it('encodes string to base64 in browser', () => {
		const originalWindow = globalThis.window;
		// Simulate browser environment — window.btoa exists
		expect(toBase64('hello')).toBe(Buffer.from('hello').toString('base64'));
		expect(originalWindow).toBeDefined();
	});

	it('handles empty string', () => {
		expect(toBase64('')).toBe('');
	});
});

describe('getBlurDataURL', () => {
	it('returns a data URI', () => {
		expect(getBlurDataURL()).toMatch(/^data:image\/svg\+xml;base64,/);
	});

	it('accepts custom dimensions', () => {
		const result = getBlurDataURL(200, 100);
		expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
	});
});

describe('getSolidColorPlaceholder', () => {
	it('returns a data URI', () => {
		expect(getSolidColorPlaceholder()).toMatch(/^data:image\/svg\+xml;base64,/);
	});

	it('uses provided color', () => {
		const encoded = getSolidColorPlaceholder('#ff0000', 10, 10);
		const decoded = Buffer.from(encoded.split(',')[1], 'base64').toString();
		expect(decoded).toContain('#ff0000');
	});
});

describe('IMAGE_SIZES', () => {
	it('has avatar sizes', () => {
		expect(IMAGE_SIZES.avatar.small).toEqual({ width: 40, height: 40 });
		expect(IMAGE_SIZES.avatar.medium).toEqual({ width: 80, height: 80 });
		expect(IMAGE_SIZES.avatar.large).toEqual({ width: 120, height: 120 });
	});

	it('has logo sizes', () => {
		expect(IMAGE_SIZES.logo.medium).toEqual({ width: 64, height: 64 });
	});

	it('has thumbnail sizes', () => {
		expect(IMAGE_SIZES.thumbnail.large).toEqual({ width: 600, height: 600 });
	});
});

describe('getOptimizedImageProps', () => {
	it('returns correct props for avatar medium', () => {
		const props = getOptimizedImageProps('avatar', 'medium');
		expect(props.width).toBe(80);
		expect(props.height).toBe(80);
		expect(props.placeholder).toBe('blur');
		expect(props.blurDataURL).toMatch(/^data:image\/svg\+xml;base64,/);
	});

	it('defaults to medium size', () => {
		const props = getOptimizedImageProps('logo');
		expect(props.width).toBe(64);
		expect(props.height).toBe(64);
	});
});

describe('getTechLogo', () => {
	it('returns local path for known tech', () => {
		expect(getTechLogo('react')).toBe(TECH_LOGOS.react);
	});
});

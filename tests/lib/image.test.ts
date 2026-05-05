import { getBlurDataURL } from '@/lib/utils/image';
import { describe, expect, it } from 'vitest';

describe('getBlurDataURL', () => {
	it('returns a data URI', () => {
		expect(getBlurDataURL()).toMatch(/^data:image\/svg\+xml;base64,/);
	});

	it('accepts custom dimensions', () => {
		const result = getBlurDataURL(200, 100);
		expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
	});

	it('encodes valid SVG with the requested dimensions and animation element', () => {
		const dataUri = getBlurDataURL(200, 100);
		const base64 = dataUri.split(',')[1];
		const decoded = Buffer.from(base64, 'base64').toString();
		expect(decoded).toContain('width="200"');
		expect(decoded).toContain('height="100"');
		expect(decoded).toContain('animate');
	});
});

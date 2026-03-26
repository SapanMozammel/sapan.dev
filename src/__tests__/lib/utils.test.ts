import { cn } from '@/lib/utils';
import { describe, expect, it } from 'vitest';

describe('cn utility', () => {
	it('merges class names', () => {
		expect(cn('foo', 'bar')).toBe('foo bar');
	});

	it('handles conditional classes', () => {
		expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
	});

	it('merges conflicting tailwind classes', () => {
		expect(cn('p-4', 'p-8')).toBe('p-8');
	});

	it('handles undefined and null', () => {
		expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
	});

	it('handles empty input', () => {
		expect(cn()).toBe('');
	});
});

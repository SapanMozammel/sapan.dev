import { checkTimelineDirection, generatePath } from '@/components/ui/timeline/timeline-utils';
import { describe, expect, it } from 'vitest';

describe('checkTimelineDirection', () => {
	it('returns false for even indices (right side)', () => {
		expect(checkTimelineDirection(0)).toBe(false);
		expect(checkTimelineDirection(2)).toBe(false);
		expect(checkTimelineDirection(4)).toBe(false);
	});

	it('returns true for odd indices (left side)', () => {
		expect(checkTimelineDirection(1)).toBe(true);
		expect(checkTimelineDirection(3)).toBe(true);
		expect(checkTimelineDirection(5)).toBe(true);
	});
});

describe('generatePath', () => {
	it('returns empty string for less than 2 heights', () => {
		expect(generatePath([])).toBe('');
		expect(generatePath([100])).toBe('');
	});

	it('generates valid SVG path for 2 heights', () => {
		const path = generatePath([0, 200]);
		expect(path).toContain('M 0,');
		expect(path).toContain('L 0,');
		expect(path).toContain('C ');
	});

	it('generates path with correct number of segments', () => {
		const path = generatePath([0, 100, 200, 300]);
		// 3 segments for 4 heights — each produces curves
		const curveCount = (path.match(/C /g) || []).length;
		expect(curveCount).toBe(6); // 2 curves per segment
	});

	it('alternates curve direction based on index', () => {
		const path = generatePath([0, 200, 400]);
		// First segment (index 0, even) should curve right (positive width)
		// Second segment (index 1, odd) should curve left (negative width)
		expect(path).toContain('20,'); // positive curveWidth
		expect(path).toContain('-20,'); // negative curveWidth
	});
});

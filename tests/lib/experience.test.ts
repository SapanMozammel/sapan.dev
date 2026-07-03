import { getRoleDuration, getYearsOfExperience } from '@/lib/utils/experience';
import { describe, expect, it } from 'vitest';

describe('getYearsOfExperience', () => {
	it('computes whole years since the earliest EXPERIENCE_DATA start (2020-02)', () => {
		expect(getYearsOfExperience(new Date(2026, 1, 1))).toBe(6);
	});

	it('counts a completed year only when the anniversary month has arrived', () => {
		expect(getYearsOfExperience(new Date(2026, 0, 31))).toBe(5);
	});

	it('returns 0 when now is before the earliest start date', () => {
		expect(getYearsOfExperience(new Date(2019, 0, 1))).toBe(0);
	});
});

describe('getRoleDuration', () => {
	it('returns empty when start is missing', () => {
		expect(getRoleDuration(undefined, '2022-05')).toBe('');
	});

	it('returns empty when start is a malformed value', () => {
		expect(getRoleDuration('not-a-date', '2022-05')).toBe('');
	});

	it('formats a multi-year, multi-month range inclusive of both endpoint months (Nov 2020 → May 2024 = 3y 7m)', () => {
		expect(getRoleDuration('2020-11', '2024-05')).toBe('3y 7m');
	});

	it('omits the month part when the range is whole years', () => {
		expect(getRoleDuration('2020-01', '2022-12')).toBe('3y');
	});

	it('omits the year part when the range is under a year (Feb 2020 → Oct 2020 = 9m, inclusive of both months)', () => {
		expect(getRoleDuration('2020-02', '2020-10')).toBe('9m');
	});

	it('renders 1m for the minimum representable duration (same month)', () => {
		expect(getRoleDuration('2024-06', '2024-06')).toBe('1m');
	});

	it('computes an open-ended role against the provided now', () => {
		expect(getRoleDuration('2024-06', undefined, new Date(2026, 3, 1))).toBe('1y 11m');
	});

	it('falls back to now when end is malformed', () => {
		expect(getRoleDuration('2024-06', 'not-a-date', new Date(2025, 5, 1))).toBe('1y 1m');
	});
});

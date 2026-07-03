import { EXPERIENCE_DATA } from '@/data/content/experience';

export const getYearsOfExperience = (now: Date = new Date()): number => {
	const startDates = EXPERIENCE_DATA.map((e) => e.startDate).filter((d): d is string => typeof d === 'string' && d.length > 0);
	if (startDates.length === 0) return 0;

	const earliest = startDates.reduce((min, d) => (d < min ? d : min), startDates[0] as string);
	const [yearStr, monthStr = '01'] = earliest.split('-');
	const startYear = parseInt(yearStr as string, 10);
	const startMonth = parseInt(monthStr, 10) - 1;
	const start = new Date(startYear, startMonth, 1);

	const diffYears = now.getFullYear() - start.getFullYear();
	const monthAdjust = now.getMonth() < start.getMonth() ? -1 : 0;
	return Math.max(0, diffYears + monthAdjust);
};

const parseYearMonth = (value: string): Date | null => {
	const [yearStr, monthStr = '01'] = value.split('-');
	const year = parseInt(yearStr as string, 10);
	const month = parseInt(monthStr, 10) - 1;
	if (Number.isNaN(year) || Number.isNaN(month)) return null;
	return new Date(year, month, 1);
};

export const getRoleDuration = (start?: string, end?: string, now: Date = new Date()): string => {
	if (!start) return '';
	const startDate = parseYearMonth(start);
	if (!startDate) return '';
	const endDate = end ? (parseYearMonth(end) ?? now) : now;

	const totalMonths = Math.max(0, (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1);
	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;

	if (years === 0 && months === 0) return '1m';
	if (years === 0) return `${months}m`;
	if (months === 0) return `${years}y`;
	return `${years}y ${months}m`;
};

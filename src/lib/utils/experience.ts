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

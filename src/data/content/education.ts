import type { Certification, EducationItem } from '@/types/about';

export const EDUCATION_DATA: EducationItem[] = [
	{
		id: 'bsc-cse',
		degree: 'B.Sc. in Computer Science & Engineering',
		institution: 'Daffodil International University',
		location: 'Dhaka, Bangladesh',
		startDate: '2018-09',
		endDate: '2022-05',
		meta: '145 credits',
	},
	{
		id: 'diploma-ce',
		degree: 'Diploma in Computer Engineering',
		institution: 'Brahmanbaria Polytechnic Institute',
		location: 'Brahmanbaria, Bangladesh',
		startDate: '2014',
		endDate: '2017',
	},
];

export const CERTIFICATIONS_DATA: Certification[] = [
	{
		id: 'ai-ml-bcc',
		name: 'Artificial Intelligence & Machine Learning',
		issuer: 'Bangladesh Computer Council, ICT Division',
		year: 2021,
	},
	{
		id: 'js-umich',
		name: 'Interactivity with JavaScript',
		issuer: 'University of Michigan',
		year: 2020,
	},
	{
		id: 'mobile-game-dev',
		name: 'Advanced Mobile Game Development',
		issuer: 'ICT Division',
		year: 2017,
	},
	{
		id: 'mobile-game-gfx',
		name: 'Mobile Game Graphics Design',
		issuer: 'ICT Division',
		year: 2017,
	},
];

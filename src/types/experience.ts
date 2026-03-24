export type ExperienceType = 'Full-time' | 'Part-time' | 'Freelance' | 'Internship' | 'Learning';

export type ExperienceItem = {
	id: string;
	company: string;
	position: string;
	startDate?: string;
	endDate?: string;
	location: string;
	type: ExperienceType;
	description: string;
	responsibilities?: string[];
	technologies?: string[];
	achievements?: string[];
};

export type TimelineItemProps = {
	item: ExperienceItem;
	isLast: boolean;
};

export type TimelineProps = {
	items: ExperienceItem[];
	className?: string;
};

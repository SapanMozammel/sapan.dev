export type ExperienceType = 'Full-time' | 'Part-time' | 'Freelance' | 'Internship' | 'Learning';

export interface ExperienceItem {
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
}

export interface TimelineItemProps {
	item: ExperienceItem;
	isLast: boolean;
}

export interface TimelineProps {
	items: ExperienceItem[];
	className?: string;
}

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
	tags?: string[];
};

export type TimelineItemProps = {
	item: ExperienceItem;
	isLast: boolean;
};

export type TimelineProps = {
	items: ExperienceItem[];
	className?: string;
};

export type TimelineProgressBarProps = {
	heights: number[];
	totalHeight: number;
	containerRef: React.RefObject<HTMLDivElement | null>;
	scrollYProgress: import('framer-motion').MotionValue<number>;
};

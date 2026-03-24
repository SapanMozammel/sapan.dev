export type TechStackItem = {
	name: string;
	logo: string;
	category?: string;
};

export type TechnologiesDisplayProps = {
	technologies: string[];
	visibleCount?: number;
};

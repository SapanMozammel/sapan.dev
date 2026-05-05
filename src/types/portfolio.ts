export type ColorScheme = 'sky' | 'indigo' | 'blue' | 'green' | 'cyan' | 'teal' | 'violet' | 'emerald' | 'fuchsia';

export type PortfolioProject = {
	colorScheme: ColorScheme;
	title: string;
	description: string;
	image: string;
	role: string;
	technologies: string[];
	icon?: React.ReactElement;
	link?: string;
};

export type ProjectCardProps = {
	project: PortfolioProject;
};

export type PortfolioProject = {
	title: string;
	description: string;
	image: string;
	role: string;
	technologies: string[];
	icon?: React.ReactElement;
	link?: string;
	className?: string;
};

export type ProjectCardProps = {
	project: PortfolioProject;
};

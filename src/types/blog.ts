export type ContentBlock =
	| { type: 'paragraph'; text: string }
	| { type: 'heading'; text: string }
	| { type: 'code'; language: string; code: string }
	| { type: 'list'; ordered?: boolean; items: string[] }
	| { type: 'callout'; variant?: 'info' | 'warning' | 'tip'; text: string };

export type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	thumbnail: string;
	content: ContentBlock[];
	category: string;
	tags: string[];
	readTime: number;
	publishedAt: string;
	featured?: boolean;
};

export type BlogCardProps = {
	post: BlogPost;
	className?: string;
};

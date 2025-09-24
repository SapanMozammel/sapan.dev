import { LinkProps } from 'next/link';

// Base props shared by both button and link variants
type BaseButtonProps = {
	loading?: boolean;
	fill?: boolean;
	gradient?: boolean;
};

// When 'to' prop is provided, it's a link button
type LinkButtonProps = BaseButtonProps & {
	to: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
	Partial<Pick<LinkProps, 'as' | 'replace' | 'scroll' | 'shallow' | 'passHref' | 'prefetch' | 'locale'>>;

// When 'to' prop is not provided, it's a regular button
type RegularButtonProps = BaseButtonProps & {
	to?: never;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// Union type for the unified button component
export type ButtonProps = LinkButtonProps | RegularButtonProps;

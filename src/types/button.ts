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

// Props for the ConnectButton wrapper
export type ConnectButtonProps = {
	className?: string;
	gradient?: boolean;
	fill?: boolean;
};

// Button SVG shape sub-component props
export type GradientStop = {
	offset: string;
	stopColor: string;
};

export type SvgShapeProps = {
	className: string;
	pathClassName: string;
	gradientId?: string | undefined;
	gradientStops?: GradientStop[] | undefined;
};

export type CenterSvgProps = {
	className: string;
	mode: 'fill' | 'stroke';
	polygonClassName: string;
	gradientId?: string | undefined;
	gradientStops?: GradientStop[] | undefined;
	svgFill?: string | undefined;
};

export type ButtonContentProps = {
	children: React.ReactNode;
	loading?: boolean | undefined;
	textClassName: string;
};

export type ButtonVariantConfig = {
	leftSvgClass: string;
	leftPathClass: string;
	leftGradientId?: string | undefined;
	leftGradientStops?: GradientStop[] | undefined;
	spanClass: string;
	textClass: string;
	centerMode: 'fill' | 'stroke';
	centerSvgClass: string;
	centerPolygonClass: string;
	centerGradientId?: string | undefined;
	centerGradientStops?: GradientStop[] | undefined;
	centerSvgFill?: string | undefined;
	rightSvgClass: string;
	rightPathClass: string;
	rightGradientId?: string | undefined;
	rightGradientStops?: GradientStop[] | undefined;
};

export type MarqueeProps = {
	children: React.ReactNode;
	speed?: number;
	direction?: 'left' | 'right';
	pauseOnHover?: boolean;
	className?: string;
};

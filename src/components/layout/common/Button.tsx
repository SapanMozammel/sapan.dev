'use client';

import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types/button';
import Link from 'next/link';
import { memo, ReactNode, useMemo } from 'react';

import { ButtonContent } from './Button/ButtonContent';
import { ButtonCenterSvg, ButtonLeftSvg, ButtonRightSvg } from './Button/ButtonShapeSvg';
import { getVariantConfig } from './Button/variants';

const BASE_CLASSES =
	'group/button focus:ring-none relative inline-flex !h-9 cursor-pointer items-center justify-center !px-[calc(theme(height.9)*21/44)] focus:outline-none disabled:pointer-events-none disabled:brightness-85 sm:!h-11 sm:!px-[calc(theme(height.11)*21/44)] dark:disabled:brightness-90';

const ButtonInner = ({ config, children, loading }: { config: ReturnType<typeof getVariantConfig>; children: ReactNode; loading?: boolean | undefined }) => (
	<>
		<ButtonLeftSvg className={config.leftSvgClass} pathClassName={config.leftPathClass} gradientId={config.leftGradientId} gradientStops={config.leftGradientStops} />
		<span className={config.spanClass}>
			<ButtonContent loading={loading} textClassName={config.textClass}>
				{children}
			</ButtonContent>
			<ButtonCenterSvg
				className={config.centerSvgClass}
				mode={config.centerMode}
				polygonClassName={config.centerPolygonClass}
				gradientId={config.centerGradientId}
				gradientStops={config.centerGradientStops}
				svgFill={config.centerSvgFill}
			/>
		</span>
		<ButtonRightSvg className={config.rightSvgClass} pathClassName={config.rightPathClass} gradientId={config.rightGradientId} gradientStops={config.rightGradientStops} />
	</>
);

export const Button = memo<ButtonProps>((props) => {
	const { className, fill = false, gradient = false, children, loading, ...rest } = props;

	const computedClasses = useMemo(() => {
		const loadingClass = loading ? 'pointer-events-none' : '';
		return cn(BASE_CLASSES, loadingClass, className);
	}, [loading, className]);

	const isLink = 'to' in props && !!props.to;

	const config = useMemo(() => getVariantConfig(fill, gradient, isLink), [fill, gradient, isLink]);

	if (isLink) {
		const { to, ...linkProps } = rest as any;
		return (
			<Link href={to} className={computedClasses} {...linkProps}>
				<ButtonInner config={config} loading={loading}>
					{children}
				</ButtonInner>
			</Link>
		);
	}

	const { disabled, ...buttonProps } = rest as any;
	return (
		<button className={computedClasses} disabled={disabled} {...buttonProps}>
			<ButtonInner config={config} loading={loading}>
				{children}
			</ButtonInner>
		</button>
	);
});

Button.displayName = 'Button';

'use client';

import type { CenterSvgProps, GradientStop, SvgShapeProps } from '@/types/button';
import { memo } from 'react';

const LEFT_PATH = 'M22,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1';

const RIGHT_PATH = 'M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1';

const GradientDef = ({ id, stops }: { id: string; stops: GradientStop[] }) => (
	<linearGradient id={id} x1='0%' x2='100%' y1='50%' y2='50%'>
		{stops.map((stop) => (
			<stop key={stop.offset} offset={stop.offset} stopColor={stop.stopColor} />
		))}
	</linearGradient>
);

export const ButtonLeftSvg = memo<SvgShapeProps>(({ className, pathClassName, gradientId, gradientStops }) => (
	<svg className={className} viewBox='0 0 21 44'>
		{gradientId && gradientStops ? <GradientDef id={gradientId} stops={gradientStops} /> : null}
		<path className={pathClassName} strokeWidth='2' d={LEFT_PATH} />
	</svg>
));

ButtonLeftSvg.displayName = 'ButtonLeftSvg';

export const ButtonRightSvg = memo<SvgShapeProps>(({ className, pathClassName, gradientId, gradientStops }) => (
	<svg className={className} viewBox='0 0 21 44'>
		{gradientId && gradientStops ? <GradientDef id={gradientId} stops={gradientStops} /> : null}
		<path className={pathClassName} strokeWidth='2' d={RIGHT_PATH} />
	</svg>
));

ButtonRightSvg.displayName = 'ButtonRightSvg';

export const ButtonCenterSvg = memo<CenterSvgProps>(({ className, mode, polygonClassName, gradientId, gradientStops, svgFill }) => (
	<svg className={className} viewBox='0 0 100 44' preserveAspectRatio='none' fill={svgFill}>
		{gradientId && gradientStops ? <GradientDef id={gradientId} stops={gradientStops} /> : null}
		{mode === 'fill' ? (
			<polygon className={polygonClassName} fillRule='nonzero' points='101 0 101 44 0 44 0 0' />
		) : (
			<>
				<polygon className={polygonClassName} fillRule='nonzero' points='101 0 101 2 0 2 0 0' />
				<polygon className={polygonClassName} fillRule='nonzero' points='101 42 101 44 0 44 0 42' />
			</>
		)}
	</svg>
));

ButtonCenterSvg.displayName = 'ButtonCenterSvg';

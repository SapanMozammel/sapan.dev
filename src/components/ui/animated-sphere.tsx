'use client';

import { memo, useEffect, useRef } from 'react';

const CHARS = '░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯';
const PHI_STEP = 0.15;
const THETA_STEP = 0.15;
const TIME_STEP = 0.02;

const hexToRgb = (hex: string): [number, number, number] => {
	const value = hex.trim().replace('#', '');
	const expanded =
		value.length === 3
			? value
					.split('')
					.map((c) => c + c)
					.join('')
			: value;
	const r = parseInt(expanded.slice(0, 2), 16) || 67;
	const g = parseInt(expanded.slice(2, 4), 16) || 234;
	const b = parseInt(expanded.slice(4, 6), 16) || 212;
	return [r, g, b];
};

const AnimatedSphere = memo(() => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const styles = getComputedStyle(document.documentElement);
		const [r, g, b] = hexToRgb(styles.getPropertyValue('--color-success') || '#43ead4');
		const fills = Array.from({ length: 16 }, (_, i) => `rgba(${r},${g},${b},${(0.12 + (i / 15) * 0.73).toFixed(3)})`);
		const fontFamily = styles.getPropertyValue('--font-cg').trim() || 'serif';

		let time = 0;
		let frameId = 0;
		// Pause the rAF loop while the CTA section is offscreen — otherwise
		// the canvas keeps burning battery (~60fps of 2D draws) on mobile
		// after the user has scrolled past. IO fires an initial entry on observe().
		let visible = false;

		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		resize();
		window.addEventListener('resize', resize);

		const render = () => {
			if (!visible) {
				frameId = 0;
				return;
			}
			const rect = canvas.getBoundingClientRect();
			ctx.clearRect(0, 0, rect.width, rect.height);

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const radius = Math.min(rect.width, rect.height) * 0.475;

			ctx.font = `8px ${fontFamily}, serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			const points: { x: number; y: number; z: number; char: string; fill: string }[] = [];
			const rotY = time * 0.3;
			const rotX = time * 0.2;
			const cosY = Math.cos(rotY);
			const sinY = Math.sin(rotY);
			const cosX = Math.cos(rotX);
			const sinX = Math.sin(rotX);

			for (let phi = 0; phi < Math.PI * 2; phi += PHI_STEP) {
				const phiOffset = phi + time * 0.5;
				const cosPhi = Math.cos(phiOffset);
				const sinPhi = Math.sin(phiOffset);
				for (let theta = 0; theta < Math.PI; theta += THETA_STEP) {
					const sinTheta = Math.sin(theta);
					const cosTheta = Math.cos(theta);
					const x = sinTheta * cosPhi;
					const y = sinTheta * sinPhi;
					const z = cosTheta;

					const newX = x * cosY - z * sinY;
					const newZ = x * sinY + z * cosY;
					const newY = y * cosX - newZ * sinX;
					const finalZ = y * sinX + newZ * cosX;

					const depth = (finalZ + 1) / 2;
					const charIndex = Math.min(CHARS.length - 1, Math.floor(depth * (CHARS.length - 1)));

					points.push({
						x: centerX + newX * radius,
						y: centerY + newY * radius,
						z: finalZ,
						char: CHARS[charIndex] ?? '·',
						fill: fills[Math.min(15, Math.floor(depth * 15))] ?? fills[0]!,
					});
				}
			}

			points.sort((a, b) => a.z - b.z);
			for (const point of points) {
				ctx.fillStyle = point.fill;
				ctx.fillText(point.char, point.x, point.y);
			}

			time += TIME_STEP;
			frameId = requestAnimationFrame(render);
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				const wasVisible = visible;
				visible = entry?.isIntersecting ?? false;
				if (visible && !wasVisible && !frameId) {
					frameId = requestAnimationFrame(render);
				}
			},
			{ rootMargin: '200px' }
		);
		observer.observe(canvas);

		return () => {
			window.removeEventListener('resize', resize);
			observer.disconnect();
			cancelAnimationFrame(frameId);
		};
	}, []);

	return <canvas ref={canvasRef} aria-hidden className='block h-full w-full' />;
});

AnimatedSphere.displayName = 'AnimatedSphere';

export default AnimatedSphere;

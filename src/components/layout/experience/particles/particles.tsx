'use client';

import { useFBO } from '@react-three/drei';
import { createPortal, useFrame } from '@react-three/fiber';
import * as easing from 'maath/easing';
import { memo, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { DofPointsMaterial } from './shaders/point-material';
import { SimulationMaterial } from './shaders/simulation-material';

const DESKTOP_SIZE = 512;
const MOBILE_SIZE = 256;
const SPEED = 1.0;
const FOCUS = 2.5;
const APERTURE = 1.5;
const NOISE_SCALE = 0.75;
const NOISE_INTENSITY = 1.25;
const TIME_SCALE = 2;
const POINT_SIZE = 2.5;
const PLANE_SCALE = 7.5;
const REVEAL_DURATION = 5;

// Read design system token from CSS custom property (Three.js needs hex, not var())
const getCSSColor = (varName: string) => new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(varName).trim());

const Particles = memo<{ isDark: boolean }>(({ isDark }) => {
	const revealStartTime = useRef<number | null>(null);
	const isRevealingRef = useRef(true);

	// Pick grid size once at mount: 512 on lg+, 256 below. Half-resolution
	// on mobile cuts particle count from 262k → 65k for thermal/battery budget.
	const [size] = useState(() => (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches ? DESKTOP_SIZE : MOBILE_SIZE));

	// Read design system tokens once from CSS custom properties
	const [colors] = useState(() => ({
		primary: getCSSColor('--color-primary'),
		success: getCSSColor('--color-success'),
	}));

	const simulationMaterial = useMemo(() => new SimulationMaterial(PLANE_SCALE), []);

	// HalfFloatType (16-bit) renders cleanly on far more mobile GPUs than FloatType (32-bit).
	// Position range [-7.5, 7.5] fits comfortably in half-float precision.
	const target = useFBO(size, size, {
		minFilter: THREE.NearestFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat,
		type: THREE.HalfFloatType,
	});

	const dofPointsMaterial = useMemo(() => {
		const m = new DofPointsMaterial();
		m.uniforms.positions.value = target.texture;
		m.uniforms.initialPositions.value = simulationMaterial.uniforms.positions.value;
		return m;
	}, [simulationMaterial, target.texture]);

	const [scene] = useState(() => new THREE.Scene());
	const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1));

	const positions = useMemo(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), []);
	const uvs = useMemo(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]), []);

	const particles = useMemo(() => {
		const length = size * size;
		const data = new Float32Array(length * 3);
		for (let i = 0; i < length; i++) {
			const i3 = i * 3;
			data[i3 + 0] = (i % size) / size;
			data[i3 + 1] = i / size / size;
		}
		return data;
	}, [size]);

	useFrame((state, delta) => {
		state.gl.setRenderTarget(target);
		state.gl.clear();
		state.gl.render(scene, camera);
		state.gl.setRenderTarget(null);

		const currentTime = state.clock.elapsedTime;

		if (revealStartTime.current === null) {
			revealStartTime.current = currentTime;
		}

		const revealElapsed = currentTime - revealStartTime.current;
		const revealProgress = Math.min(revealElapsed / REVEAL_DURATION, 1.0);
		const easedProgress = 1 - Math.pow(1 - revealProgress, 3);
		const revealFactor = easedProgress * 4.0;

		if (revealProgress >= 1.0 && isRevealingRef.current) {
			isRevealingRef.current = false;
		}

		// Theme-adaptive colors & opacity
		const c1 = colors.primary;
		const c2 = colors.success;
		const opacity = isDark ? 1 : 0.5;

		dofPointsMaterial.uniforms.uColor1.value.lerp(c1, delta * 3);
		dofPointsMaterial.uniforms.uColor2.value.lerp(c2, delta * 3);

		dofPointsMaterial.uniforms.uTime.value = currentTime;
		dofPointsMaterial.uniforms.uFocus.value = FOCUS;
		dofPointsMaterial.uniforms.uBlur.value = APERTURE;

		easing.damp(dofPointsMaterial.uniforms.uTransition, 'value', 0.0, 0.2, delta);
		easing.damp(dofPointsMaterial.uniforms.uOpacity, 'value', opacity, 0.3, delta);

		simulationMaterial.uniforms.uTime.value = currentTime;
		simulationMaterial.uniforms.uNoiseScale.value = NOISE_SCALE;
		simulationMaterial.uniforms.uNoiseIntensity.value = NOISE_INTENSITY;
		simulationMaterial.uniforms.uTimeScale.value = TIME_SCALE * SPEED;

		dofPointsMaterial.uniforms.uPointSize.value = POINT_SIZE;
		dofPointsMaterial.uniforms.uRevealFactor.value = revealFactor;
		dofPointsMaterial.uniforms.uRevealProgress.value = easedProgress;
	});

	return (
		<>
			{createPortal(
				<mesh material={simulationMaterial}>
					<bufferGeometry>
						<bufferAttribute attach='attributes-position' args={[positions, 3]} />
						<bufferAttribute attach='attributes-uv' args={[uvs, 2]} />
					</bufferGeometry>
				</mesh>,
				scene
			)}
			<points material={dofPointsMaterial}>
				<bufferGeometry>
					<bufferAttribute attach='attributes-position' args={[particles, 3]} />
				</bufferGeometry>
			</points>
		</>
	);
});

Particles.displayName = 'Particles';

export default Particles;

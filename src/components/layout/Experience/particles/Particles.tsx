'use client';

import { useFBO } from '@react-three/drei';
import { createPortal, useFrame } from '@react-three/fiber';
import * as easing from 'maath/easing';
import { memo, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { DofPointsMaterial } from './shaders/pointMaterial';
import { SimulationMaterial } from './shaders/simulationMaterial';

const SIZE = 512;
const SPEED = 1.0;
const FOCUS = 2.5;
const APERTURE = 1.5;
const NOISE_SCALE = 0.75;
const NOISE_INTENSITY = 1.25;
const TIME_SCALE = 2;
const POINT_SIZE = 2.5;
const PLANE_SCALE = 7.5;
const REVEAL_DURATION = 5;

// Theme-aware colors — primary / success from the design system
const COLOR_DARK_1 = new THREE.Color('#4a4ded'); // primary
const COLOR_DARK_2 = new THREE.Color('#43ead4'); // success
const COLOR_LIGHT_1 = new THREE.Color('#4a4ded'); // primary (same hue, vivid on white)
const COLOR_LIGHT_2 = new THREE.Color('#2ab8a5'); // slightly deeper success for contrast on light bg

const Particles = memo<{ isDark: boolean }>(({ isDark }) => {
	const revealStartTime = useRef<number | null>(null);
	const [isRevealing, setIsRevealing] = useState(true);

	const simulationMaterial = useMemo(() => new SimulationMaterial(PLANE_SCALE), []);

	const target = useFBO(SIZE, SIZE, {
		minFilter: THREE.NearestFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat,
		type: THREE.FloatType,
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
		const length = SIZE * SIZE;
		const data = new Float32Array(length * 3);
		for (let i = 0; i < length; i++) {
			const i3 = i * 3;
			data[i3 + 0] = (i % SIZE) / SIZE;
			data[i3 + 1] = i / SIZE / SIZE;
		}
		return data;
	}, []);

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

		if (revealProgress >= 1.0 && isRevealing) {
			setIsRevealing(false);
		}

		// Theme-adaptive colors & opacity
		const c1 = isDark ? COLOR_DARK_1 : COLOR_LIGHT_1;
		const c2 = isDark ? COLOR_DARK_2 : COLOR_LIGHT_2;
		const opacity = 1;

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

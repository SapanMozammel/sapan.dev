import { getVariantConfig } from '@/components/layout/common/Button/variants';
import { describe, expect, it } from 'vitest';

describe('getVariantConfig', () => {
	describe('link variants (no disabled classes)', () => {
		it('link + fill + gradient has correct gradient IDs', () => {
			const config = getVariantConfig(true, true, true);
			expect(config.leftGradientId).toBe('btn-left-link-filled');
			expect(config.centerGradientId).toBe('btn-center-link-filled');
			expect(config.rightGradientId).toBe('btn-right-link-filled');
		});

		it('link + fill + gradient has no disabled classes', () => {
			const config = getVariantConfig(true, true, true);
			expect(config.leftPathClass).not.toContain('group-disabled');
			expect(config.textClass).not.toContain('group-disabled');
		});

		it('link + fill + solid has dark fill classes', () => {
			const config = getVariantConfig(true, false, true);
			expect(config.leftPathClass).toContain('fill-dark');
			expect(config.leftGradientId).toBeUndefined();
		});

		it('link + outline + gradient has stroke gradient', () => {
			const config = getVariantConfig(false, true, true);
			expect(config.leftPathClass).toContain('stroke-[url(#btn-left-link)]');
			expect(config.centerMode).toBe('stroke');
		});

		it('link + outline + solid has stroke-dark', () => {
			const config = getVariantConfig(false, false, true);
			expect(config.leftPathClass).toContain('stroke-dark');
			expect(config.leftPathClass).toContain('fill-none');
			expect(config.centerSvgFill).toBe('none');
		});
	});

	describe('button variants (with disabled classes)', () => {
		it('button + fill + gradient has disabled fill classes', () => {
			const config = getVariantConfig(true, true, false);
			expect(config.leftPathClass).toContain('group-disabled/button:fill-secondary-300');
			expect(config.leftGradientId).toBe('btn-left-filled');
			expect(config.centerGradientId).toBe('btn-center-filled');
			expect(config.rightGradientId).toBe('btn-right-filled');
		});

		it('button + fill + solid has disabled + dark classes', () => {
			const config = getVariantConfig(true, false, false);
			expect(config.leftPathClass).toContain('group-disabled/button:fill-secondary-300');
			expect(config.leftPathClass).toContain('fill-dark');
			expect(config.textClass).toContain('group-disabled/button:text-secondary-500');
		});

		it('button + outline + gradient has disabled stroke classes', () => {
			const config = getVariantConfig(false, true, false);
			expect(config.leftPathClass).toContain('group-disabled/button:stroke-secondary-300');
			expect(config.textClass).toContain('group-disabled/button:text-secondary-400');
		});

		it('button + outline + solid has disabled + stroke-dark', () => {
			const config = getVariantConfig(false, false, false);
			expect(config.leftPathClass).toContain('group-disabled/button:stroke-secondary-300');
			expect(config.leftPathClass).toContain('stroke-dark');
		});
	});

	describe('center mode', () => {
		it('fill variants use fill center mode', () => {
			expect(getVariantConfig(true, true, true).centerMode).toBe('fill');
			expect(getVariantConfig(true, false, false).centerMode).toBe('fill');
		});

		it('outline variants use stroke center mode', () => {
			expect(getVariantConfig(false, true, true).centerMode).toBe('stroke');
			expect(getVariantConfig(false, false, false).centerMode).toBe('stroke');
		});
	});

	describe('gradient SVG class', () => {
		it('gradient variants have hue-rotate class on SVG', () => {
			const config = getVariantConfig(true, true, false);
			expect(config.leftSvgClass).toContain('group-hover/button:hue-rotate-15');
			expect(config.spanClass).toContain('group-hover/button:hue-rotate-15');
		});

		it('solid variants do not have hue-rotate class', () => {
			const config = getVariantConfig(true, false, false);
			expect(config.leftSvgClass).not.toContain('hue-rotate');
			expect(config.spanClass).not.toContain('hue-rotate');
		});
	});
});

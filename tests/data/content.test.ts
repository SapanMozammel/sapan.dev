import { EXPERIENCE_DATA } from '@/data/content/experience';
import { FAQ_DATA } from '@/data/content/faq';
import { PORTFOLIO_PROJECTS } from '@/data/content/portfolio';
import { TESTIMONIAL_LIST } from '@/data/content/testimonials';
import { WORKFLOW_STEPS } from '@/data/content/workflow';
import { describe, expect, it } from 'vitest';

describe('FAQ_DATA', () => {
	it('has items', () => {
		expect(FAQ_DATA.length).toBeGreaterThan(0);
	});

	it('each item has question and answer', () => {
		for (const item of FAQ_DATA) {
			expect(item.question).toBeTruthy();
			expect(item.answer).toBeTruthy();
		}
	});
});

describe('WORKFLOW_STEPS', () => {
	it('has 5 steps', () => {
		expect(WORKFLOW_STEPS).toHaveLength(5);
	});

	it('each step has required fields', () => {
		for (const step of WORKFLOW_STEPS) {
			expect(step.id).toBeGreaterThan(0);
			expect(step.label).toBeTruthy();
			expect(step.title).toBeTruthy();
			expect(step.description).toBeTruthy();
			expect(step.icon).toBeDefined();
		}
	});

	it('steps have sequential IDs', () => {
		for (let i = 0; i < WORKFLOW_STEPS.length; i++) {
			expect(WORKFLOW_STEPS[i].id).toBe(i + 1);
		}
	});
});

describe('EXPERIENCE_DATA', () => {
	it('has items', () => {
		expect(EXPERIENCE_DATA.length).toBeGreaterThan(0);
	});

	it('each item has company and position', () => {
		for (const item of EXPERIENCE_DATA) {
			expect(item.company).toBeTruthy();
			expect(item.position).toBeTruthy();
		}
	});
});

describe('TESTIMONIAL_LIST', () => {
	it('has items', () => {
		expect(TESTIMONIAL_LIST.length).toBeGreaterThan(0);
	});

	it('each testimonial has name and message', () => {
		for (const item of TESTIMONIAL_LIST) {
			expect(item.name).toBeTruthy();
			expect(item.message).toBeTruthy();
		}
	});
});

describe('PORTFOLIO_PROJECTS', () => {
	it('has projects', () => {
		expect(PORTFOLIO_PROJECTS.length).toBeGreaterThan(0);
	});

	it('each project has title and description', () => {
		for (const project of PORTFOLIO_PROJECTS) {
			expect(project.title).toBeTruthy();
			expect(project.description).toBeTruthy();
		}
	});
});

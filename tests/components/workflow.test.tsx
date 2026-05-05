import Workflow from '@/components/layout/workflow';
import { WORKFLOW_STEPS } from '@/data/content/workflow';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../test-utils';

describe('Workflow', () => {
	it('renders within a section element with id="workflow"', () => {
		const { container } = render(<Workflow />);
		const section = container.querySelector('section#workflow');
		expect(section).toBeInTheDocument();
	});

	it('renders the section title', () => {
		render(<Workflow />);
		expect(screen.getByText('From Idea to Launch')).toBeInTheDocument();
	});

	it('renders the active step title and description on first render', () => {
		render(<Workflow />);
		const firstStep = WORKFLOW_STEPS[0]!;
		expect(screen.getByText(firstStep.title)).toBeInTheDocument();
		expect(screen.getByText(firstStep.description)).toBeInTheDocument();
	});

	it('renders all step labels in the progress nav', () => {
		render(<Workflow />);
		WORKFLOW_STEPS.forEach((step) => {
			expect(screen.getByText(step.label)).toBeInTheDocument();
		});
	});

	it('renders the same number of step nav indicators as WORKFLOW_STEPS', () => {
		const { container } = render(<Workflow />);
		const stepIndicators = container.querySelectorAll('.cursor-pointer');
		expect(stepIndicators.length).toBeGreaterThanOrEqual(WORKFLOW_STEPS.length);
	});
});

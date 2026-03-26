import type { WorkflowStep } from '@/types/workflow';
import { IconBrush, IconBug, IconClipboardCheck, IconCode, IconRocket } from '@tabler/icons-react';

export const WORKFLOW_STEPS: WorkflowStep[] = [
	{
		id: 1,
		label: 'Plan',
		title: 'Requirements & Planning',
		description:
			'I review product requirements, user stories, and feature specifications to understand the expected functionality and user experience. This helps ensure development aligns with product goals and technical expectations.',
		icon: IconClipboardCheck,
	},
	{
		id: 2,
		label: 'Design',
		title: 'Design & Content Handoff',
		description:
			'Once UI designs are finalized, the design and content teams provide layouts, assets, and copy. I carefully review these resources to ensure everything is ready and technically feasible for frontend implementation.',
		icon: IconBrush,
	},
	{
		id: 3,
		label: 'Build',
		title: 'Frontend Development',
		description:
			'I transform approved designs into responsive and interactive interfaces using modern frontend technologies. My focus is on writing clean, maintainable code while ensuring performance, accessibility, and cross-device compatibility.',
		icon: IconCode,
	},
	{
		id: 4,
		label: 'Test',
		title: 'QA Testing & Refinement',
		description:
			'After development, I write unit tests to ensure the functionality works as expected and minimize potential issues. The QA team then performs thorough testing, and I resolve feedback to ensure overall product quality.',
		icon: IconBug,
	},
	{
		id: 5,
		label: 'Launch',
		title: 'Deployment',
		description: 'Once the feature passes testing, I deploy the finalized code to the production environment. I also verify that everything runs smoothly after release and ensure the feature performs as expected.',
		icon: IconRocket,
	},
];

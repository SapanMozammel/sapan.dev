import type React from 'react';

export type WorkflowStep = {
	id: number;
	label: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
};

export type WorkflowContentProps = {
	activeStep: number;
	currentStep: WorkflowStep;
};

export type WorkflowProgressProps = {
	activeStep: number;
	stepProgress: number;
	isResetting: boolean;
	activeColor: string;
	inactiveColor: string;
	onStepClick: (index: number) => void;
};

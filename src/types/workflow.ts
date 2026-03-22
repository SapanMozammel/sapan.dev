import type React from 'react';

export interface WorkflowStep {
	id: number;
	label: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
}

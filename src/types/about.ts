import type { ReactNode } from 'react';

export type QuickFact = {
	id: string;
	label: string;
	value: string;
};

export type EducationItem = {
	id: string;
	degree: string;
	institution: string;
	location: string;
	startDate: string;
	endDate: string;
	meta?: string;
};

export type LanguageLevel = 'Native' | 'Professional' | 'Conversational' | 'Basic';

export type LanguageItem = {
	id: string;
	name: string;
	level: LanguageLevel;
};

export type SkillGroup = {
	id: string;
	label: string;
	items: string[];
};

export type AboutData = {
	bio: string;
	availability: string;
	quickFacts: QuickFact[];
	skillGroups: SkillGroup[];
	languages: LanguageItem[];
};

export type AboutTabId = 'about' | 'experience' | 'education' | 'skills' | 'languages';

export type AboutTab = {
	id: AboutTabId;
	label: string;
	icon: ReactNode;
	content: ReactNode;
};

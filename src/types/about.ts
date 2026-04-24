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

export type Certification = {
	id: string;
	name: string;
	issuer: string;
	year: number;
};

export type SocialLink = {
	id: 'email' | 'linkedin' | 'github' | 'portfolio';
	label: string;
	href: string;
};

export type AboutData = {
	bio: string;
	availability: string;
	quickFacts: QuickFact[];
	skillGroups: SkillGroup[];
	languages: LanguageItem[];
	strengths: string[];
	socials: SocialLink[];
	industries: string[];
};

export type AboutTabId = 'about' | 'experience' | 'education' | 'skills';

export type AboutTab = {
	id: AboutTabId;
	label: string;
	icon: ReactNode;
	content: ReactNode;
};

'use client';

import { cn } from '@/lib/utils';
import type { AboutTab, AboutTabId } from '@/types/about';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import AboutSidebar from './about-sidebar';

type AboutTabsProps = {
	tabs: AboutTab[];
	profileName: string;
};

const AboutTabs = memo<AboutTabsProps>(({ tabs, profileName }) => {
	const firstTabId = (tabs[0]?.id ?? 'about') as AboutTabId;
	const [activeTabId, setActiveTabId] = useState<AboutTabId>(firstTabId);
	const tabRefs = useRef<Record<AboutTabId, HTMLButtonElement | null>>({} as Record<AboutTabId, HTMLButtonElement | null>);

	const activeTab = useMemo(() => tabs.find((t) => t.id === activeTabId) ?? tabs[0], [tabs, activeTabId]);

	const handleTabKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLButtonElement>, id: AboutTabId) => {
			if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Home' && event.key !== 'End') return;
			event.preventDefault();
			const currentIndex = tabs.findIndex((t) => t.id === id);
			if (currentIndex === -1) return;
			let nextIndex = currentIndex;
			if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % tabs.length;
			else if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
			else if (event.key === 'Home') nextIndex = 0;
			else if (event.key === 'End') nextIndex = tabs.length - 1;
			const nextId = tabs[nextIndex]?.id;
			if (!nextId) return;
			setActiveTabId(nextId);
			tabRefs.current[nextId]?.focus();
		},
		[tabs]
	);

	if (!activeTab) return null;

	return (
		<div className='font-dm flex size-full overflow-hidden rounded-[0.6em] text-[0.8vw] tracking-widest'>
			<AboutSidebar tabs={tabs} activeTabId={activeTabId} onSelect={setActiveTabId} profileName={profileName} onTabKeyDown={handleTabKeyDown} tabRefs={tabRefs} />
			<div className='flex h-full grow flex-col'>
				<div className='border-info/30 flex h-[3.5em] shrink-0 items-center border-b-[0.025em] border-solid px-[1.25em]'>
					<div className='text-secondary-500 font-hg dark:text-secondary-500 text-[1em] tracking-widest uppercase'>{activeTab.label}</div>
				</div>
				<div className='relative grow overflow-y-auto'>
					{tabs.map((tab) => (
						<div
							key={tab.id}
							role='tabpanel'
							id={`about-panel-${tab.id}`}
							aria-labelledby={`about-tab-${tab.id}`}
							hidden={tab.id !== activeTabId}
							className={cn('min-h-full', tab.id === activeTabId ? 'block' : 'hidden')}
						>
							{tab.content}
						</div>
					))}
				</div>
			</div>
		</div>
	);
});

AboutTabs.displayName = 'AboutTabs';

export default AboutTabs;

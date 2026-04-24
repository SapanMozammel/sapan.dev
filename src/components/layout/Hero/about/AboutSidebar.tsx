'use client';

import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import type { AboutTab, AboutTabId } from '@/types/about';
import { IconChevronDown } from '@tabler/icons-react';
import { memo, useCallback } from 'react';

type AboutSidebarProps = {
	tabs: Array<Pick<AboutTab, 'id' | 'label' | 'icon'>>;
	activeTabId: AboutTabId;
	onSelect: (id: AboutTabId) => void;
	profileName: string;
	onTabKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, id: AboutTabId) => void;
	tabRefs: React.MutableRefObject<Record<AboutTabId, HTMLButtonElement | null>>;
};

const AboutSidebar = memo<AboutSidebarProps>(({ tabs, activeTabId, onSelect, profileName, onTabKeyDown, tabRefs }) => {
	const setRef = useCallback(
		(id: AboutTabId) => (el: HTMLButtonElement | null) => {
			tabRefs.current[id] = el;
		},
		[tabRefs]
	);

	return (
		<div className='border-info/30 flex w-1/4 shrink-0 flex-col gap-[1em] border-e-[0.025em] border-solid bg-white/50 p-[1.25em] dark:bg-black/50'>
			<div className='border-info/30 flex items-center gap-[0.75em] rounded-[0.4em] border-[0.025em] border-solid py-[0.75em] ps-[1em] pe-[0.8em] uppercase'>
				<Logo className='size-[1.375em]' />
				<div className='text-[1em]'>{profileName}</div>
				<IconChevronDown className='ms-auto size-[1em]' />
			</div>
			<div role='tablist' aria-orientation='vertical' className='mt-[2em] flex grow flex-col gap-[1.25em]'>
				{tabs.map((tab) => {
					const isActive = tab.id === activeTabId;
					const tabClasses = cn(
						'group/tab flex w-full items-center gap-[0.75em] border-s-[0.25em] border-solid py-[0.75em] ps-[1em] pe-[0.6em] text-start uppercase cursor-pointer transition-colors',
						isActive ? 'from-info/30 rtl:to-info/30 border-info/50 bg-gradient-to-r to-transparent rtl:from-transparent' : 'border-transparent bg-transparent hover:bg-info/10'
					);
					return (
						<button
							key={tab.id}
							ref={setRef(tab.id)}
							role='tab'
							type='button'
							id={`about-tab-${tab.id}`}
							aria-selected={isActive}
							aria-controls={`about-panel-${tab.id}`}
							tabIndex={isActive ? 0 : -1}
							onClick={() => onSelect(tab.id)}
							onKeyDown={(event) => onTabKeyDown(event, tab.id)}
							className={tabClasses}
						>
							<span className='text-[1.125em]'>{tab.icon}</span>
							<div className='text-[0.8em]'>{tab.label}</div>
						</button>
					);
				})}
			</div>
		</div>
	);
});

AboutSidebar.displayName = 'AboutSidebar';

export default AboutSidebar;

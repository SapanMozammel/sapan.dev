'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { memo, useCallback, useEffect, useState } from 'react';

const SECTION_IDS = ['portfolio', 'experience', 'workflow'] as const;

const NAV_ITEMS = [
	{ label: 'Portfolio', section: 'portfolio' },
	{ label: 'Experience', section: 'experience' },
	{ label: 'Workflow', section: 'workflow' },
	{ label: 'Articles', href: '/articles' },
] as const;

const NavMenu = memo(() => {
	const [activeSection, setActiveSection] = useState('');
	const pathname = usePathname();
	const router = useRouter();

	const isHome = pathname === '/' || /^\/[a-z]{2}(-[A-Za-z]+)?\/?$/.test(pathname);

	useEffect(() => {
		if (!isHome) {
			setActiveSection('');
			return;
		}

		const visibleSections = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visibleSections.add(entry.target.id);
					} else {
						visibleSections.delete(entry.target.id);
					}
				}
				const first = SECTION_IDS.find((id) => visibleSections.has(id));
				setActiveSection(first ?? '');
			},
			{ rootMargin: '-40% 0px -40% 0px' }
		);

		for (const id of SECTION_IDS) {
			const el = document.getElementById(id);
			if (el) {
				observer.observe(el);
			}
		}

		return () => observer.disconnect();
	}, [isHome, pathname]);

	const handleSectionClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
			e.preventDefault();
			if (isHome) {
				document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
			} else {
				router.push('/');
				const check = () => {
					const el = document.getElementById(section);
					if (el) {
						el.scrollIntoView({ behavior: 'smooth' });
					} else {
						requestAnimationFrame(check);
					}
				};
				requestAnimationFrame(check);
			}
		},
		[isHome, router]
	);

	const linkClass = (active: boolean) =>
		cn(
			'font-hg relative rounded-md px-2 lg:px-3 py-1.5 text-sm font-medium transition-colors',
			active ? 'text-primary dark:text-success' : 'text-secondary-600 hover:text-primary dark:text-secondary-400 dark:hover:text-success'
		);

	return (
		<nav className='hidden items-center gap-1 md:flex'>
			{NAV_ITEMS.map((item) => {
				if ('section' in item) {
					return (
						<Link key={item.section} href='/' onClick={(e) => handleSectionClick(e, item.section)} className={linkClass(activeSection === item.section)}>
							{item.label}
						</Link>
					);
				}
				return (
					<Link key={item.href} href={item.href} className={linkClass(pathname.startsWith(item.href))}>
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
});

NavMenu.displayName = 'NavMenu';

export default NavMenu;

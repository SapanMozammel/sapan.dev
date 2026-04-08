'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import Link from 'next/link';
import { memo, useCallback } from 'react';

const NAV_ITEMS = [
	{ label: 'Home', section: 'home' },
	{ label: 'Technologies', section: 'technologies' },
	{ label: 'Portfolio', section: 'portfolio' },
	{ label: 'Experience', section: 'experience' },
	{ label: 'Testimonials', section: 'testimonials' },
	{ label: 'Workflow', section: 'workflow' },
	{ label: 'Articles', href: '/articles' },
	{ label: 'FAQ', section: 'faq' },
] as const;

const LINK_CLASS = 'text-secondary-600 hover:text-primary dark:text-secondary-400 dark:hover:text-success font-hg text-sm font-medium transition-colors';

const CtaNav = memo(() => {
	const pathname = usePathname();
	const router = useRouter();

	const isHome = pathname === '/' || /^\/[a-z]{2}(-[A-Za-z]+)?\/?$/.test(pathname);

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

	return (
		<div className='grid grid-cols-2 gap-x-6 gap-y-4'>
			{NAV_ITEMS.map((item) =>
				'section' in item ? (
					<Link key={item.label} href='/' onClick={(e) => handleSectionClick(e, item.section)} className={LINK_CLASS}>
						{item.label}
					</Link>
				) : (
					<Link key={item.label} href={item.href} className={LINK_CLASS}>
						{item.label}
					</Link>
				)
			)}
		</div>
	);
});

CtaNav.displayName = 'CtaNav';

export default CtaNav;

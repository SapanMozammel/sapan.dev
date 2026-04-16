'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { memo, useCallback } from 'react';

const NAV_ITEMS = [
	{ key: 'home', section: 'home' },
	{ key: 'technologies', section: 'technologies' },
	{ key: 'portfolio', section: 'portfolio' },
	{ key: 'experience', section: 'experience' },
	{ key: 'testimonials', section: 'testimonials' },
	{ key: 'workflow', section: 'workflow' },
	{ key: 'articles', href: '/articles' },
	{ key: 'faq', section: 'faq' },
] as const;

const LINK_CLASS = 'text-secondary-600 hover:text-primary dark:text-secondary-400 dark:hover:text-success font-hg text-sm font-medium transition-colors';

const CtaNav = memo(() => {
	const translateNav = useTranslations('navigation');
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
					<Link key={item.key} href='/' onClick={(e) => handleSectionClick(e, item.section)} className={LINK_CLASS}>
						{translateNav(item.key)}
					</Link>
				) : (
					<Link key={item.key} href={item.href} className={LINK_CLASS}>
						{translateNav(item.key)}
					</Link>
				)
			)}
		</div>
	);
});

CtaNav.displayName = 'CtaNav';

export default CtaNav;

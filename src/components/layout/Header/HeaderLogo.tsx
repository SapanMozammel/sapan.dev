'use client';

import Logo from '@/components/icons/Logo';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { memo, useCallback } from 'react';

const HeaderLogo = memo(() => {
	const pathname = usePathname();
	const router = useRouter();
	const isHome = pathname === '/' || /^\/[a-z]{2}(-[A-Za-z]+)?\/?$/.test(pathname);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			e.preventDefault();
			if (isHome) {
				document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
			} else {
				router.push('/');
				const check = () => {
					const el = document.getElementById('home');
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
		<Link href='/' onClick={handleClick} className='flex shrink-0 cursor-pointer flex-row items-center gap-1.5 sm:gap-2.5'>
			<Logo className='h-6 sm:h-8' />
			<h2 className='font-bungee from-primary to-info dark:from-success bg-gradient-to-r bg-clip-text text-base !leading-none font-normal text-transparent uppercase sm:text-2xl'>sapan.dev</h2>
		</Link>
	);
});

HeaderLogo.displayName = 'HeaderLogo';

export default HeaderLogo;

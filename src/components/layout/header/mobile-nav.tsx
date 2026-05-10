'use client';

import Logo from '@/components/icons/logo';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { IconArticle, IconBrandGithub, IconBriefcase2, IconCode, IconHome, IconListDetails, IconMessageCircle, IconQuestionMark, IconTimeline, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { memo, useCallback, useEffect, useState } from 'react';

const SECTION_IDS = ['home', 'technologies', 'portfolio', 'experience', 'testimonials', 'workflow', 'faq'] as const;

const NAV_ITEMS = [
	{ key: 'home', section: 'home', icon: IconHome, number: '01' },
	{ key: 'technologies', section: 'technologies', icon: IconCode, number: '02' },
	{ key: 'portfolio', section: 'portfolio', icon: IconBriefcase2, number: '03' },
	{ key: 'experience', section: 'experience', icon: IconTimeline, number: '04' },
	{ key: 'testimonials', section: 'testimonials', icon: IconMessageCircle, number: '05' },
	{ key: 'workflow', section: 'workflow', icon: IconListDetails, number: '06' },
	{ key: 'articles', href: '/articles', icon: IconArticle, number: '07' },
	{ key: 'faq', section: 'faq', icon: IconQuestionMark, number: '08' },
] as const;

const MobileNav = memo(() => {
	const translateNav = useTranslations('navigation');
	const [activeSection, setActiveSection] = useState('');
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const isHome = pathname === '/' || /^\/[a-z]{2}(-[A-Za-z]+)?\/?$/.test(pathname);

	useEffect(() => {
		const mql = window.matchMedia('(min-width: 768px)');
		const handleChange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				setOpen(false);
			}
		};
		mql.addEventListener('change', handleChange);
		return () => mql.removeEventListener('change', handleChange);
	}, []);

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
			setOpen(false);
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

	const itemClass = (active: boolean) =>
		cn(
			'font-hg group relative flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200',
			active
				? 'bg-primary/5 text-primary dark:bg-success/5 dark:text-success'
				: 'text-secondary-600 hover:bg-secondary/50 hover:text-dark dark:text-secondary-400 dark:hover:bg-secondary-900/50 dark:hover:text-white'
		);

	const iconWrap = (active: boolean) =>
		cn(
			'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200',
			active
				? 'bg-primary/10 text-primary dark:bg-success/10 dark:text-success'
				: 'bg-secondary-600/5 text-secondary-400 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-700 group-hover:text-primary dark:group-hover:text-success dark:bg-secondary-400/5 dark:text-secondary-600'
		);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<button
					className='bg-light relative inline-flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-lg sm:h-10 sm:w-10 md:hidden dark:bg-slate-900'
					aria-label={translateNav('toggleMenu')}
				>
					<span
						className={cn(
							'absolute left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-black transition-all duration-300 dark:bg-white',
							open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-2.75 rotate-0 sm:top-3.5'
						)}
					/>
					<span
						className={cn(
							'absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black transition-all duration-300 dark:bg-white',
							open ? 'invisible opacity-0' : 'visible opacity-100'
						)}
					/>
					<span
						className={cn(
							'absolute left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-black transition-all duration-300 dark:bg-white',
							open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-2.75 rotate-0 sm:bottom-3.5'
						)}
					/>
				</button>
			</SheetTrigger>
			<SheetContent side='right' className='border-secondary-200 dark:border-secondary-700 flex w-80 max-w-[95%] flex-col gap-0 bg-white/95 p-0 backdrop-blur-xl sm:max-w-90 dark:bg-black/95'>
				<VisuallyHidden>
					<SheetTitle>{translateNav('navigationMenu')}</SheetTitle>
				</VisuallyHidden>

				<div className='border-secondary-200 dark:border-secondary-700 flex items-center justify-between border-b px-5 py-4'>
					<Link href='/' onClick={() => setOpen(false)} className='flex items-center gap-2'>
						<Logo className='h-6' />
						<span className='font-bungee from-primary to-info dark:from-success bg-gradient-to-r bg-clip-text text-base leading-none! font-normal text-transparent uppercase'>sapan.dev</span>
					</Link>
					<SheetClose asChild>
						<button
							className='hover:text-primary dark:hover:text-success text-dark inline-flex aspect-square h-8 cursor-pointer items-center justify-center rounded-lg transition-colors dark:text-white'
							aria-label={translateNav('closeMenu')}
						>
							<IconX className='h-5 w-5' />
						</button>
					</SheetClose>
				</div>

				<nav className='scrollbar-none flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-4'>
					{NAV_ITEMS.map((item) => {
						const active = 'section' in item ? activeSection === item.section : pathname.startsWith(item.href);
						const Icon = item.icon;
						return (
							<Link key={item.key} href={'section' in item ? '/' : item.href} onClick={'section' in item ? (e) => handleSectionClick(e, item.section) : () => setOpen(false)} className={itemClass(active)}>
								<span className={iconWrap(active)}>
									<Icon className='h-[18px] w-[18px]' stroke={1.5} />
								</span>
								<span className='flex-1'>{translateNav(item.key)}</span>
								<span
									className={cn('text-[10px] font-normal tracking-widest transition-colors duration-200', active ? 'text-primary/50 dark:text-success/50' : 'text-secondary-400 dark:text-secondary-600')}
								>
									{item.number}
								</span>
							</Link>
						);
					})}
				</nav>

				<div className='border-secondary-200 dark:border-secondary-700 mt-auto border-t p-3'>
					<NextLink href='https://github.com/SapanMozammel' target='_blank' onClick={() => setOpen(false)} className={itemClass(false)}>
						<span className={iconWrap(false)}>
							<IconBrandGithub className='h-[18px] w-[18px]' stroke={1.5} />
						</span>
						<span className='flex-1'>GitHub</span>
					</NextLink>
				</div>
			</SheetContent>
		</Sheet>
	);
});

MobileNav.displayName = 'MobileNav';

export default MobileNav;

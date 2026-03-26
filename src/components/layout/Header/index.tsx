import Logo from '@/components/icons/Logo';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitcher from '../common/ThemeSwitcher';
import MobileNav from './MobileNav';
import NavMenu from './NavMenu';

const Header = () => (
	<header className='border-secondary-400 dark:border-secondary-600 fixed inset-x-0 top-0 z-10 flex h-14 flex-col border-b border-solid backdrop-blur-xl sm:h-20'>
		<div className='container-fluid flex w-full grow flex-col'>
			<div className='flex grow items-center justify-between gap-3'>
				<div className='flex items-center lg:min-w-48'>
					<Link href='/' className='flex shrink-0 cursor-pointer flex-row items-center gap-1.5 sm:gap-2.5'>
						<Logo className='h-6 sm:h-8' />
						<h2 className='font-bungee from-primary to-info dark:from-success bg-gradient-to-r bg-clip-text text-base !leading-none font-normal text-transparent uppercase sm:text-2xl'>sapan.dev</h2>
					</Link>
				</div>
				<NavMenu />
				<div className='flex shrink-0 items-center justify-end gap-x-1 sm:gap-x-2 lg:min-w-48'>
					<LanguageSwitcher />
					<ThemeSwitcher />
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='https://github.com/SapanMozammel'
								target='_blank'
								className='hover:text-primary dark:hover:text-success hidden aspect-square h-6 cursor-pointer items-center justify-center text-black ease-in-out sm:h-8 md:inline-flex dark:text-white'
							>
								<IconBrandGithub className='h-4 w-4 outline-none sm:h-5 sm:w-5' />
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>
							<p>Visit my GitHub</p>
						</TooltipContent>
					</Tooltip>
					<MobileNav />
				</div>
			</div>
		</div>
	</header>
);

export default Header;

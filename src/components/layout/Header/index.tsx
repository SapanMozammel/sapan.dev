import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitcher from '../common/ThemeSwitcher';
import HeaderLogo from './HeaderLogo';
import MobileNav from './MobileNav';
import NavMenu from './NavMenu';

const Header = () => (
	<header className='border-secondary-400 dark:border-secondary-600 fixed inset-x-0 top-0 z-10 flex h-14 max-w-screen flex-col border-b border-solid backdrop-blur-xl sm:h-20'>
		<div className='container-fluid flex w-full grow flex-col'>
			<div className='flex grow items-center justify-between gap-3'>
				<div className='flex items-center lg:min-w-48'>
					<HeaderLogo />
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
								className='hover:text-primary dark:hover:text-success text-dark hidden aspect-square h-6 cursor-pointer items-center justify-center ease-in-out sm:h-8 md:inline-flex dark:text-white'
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

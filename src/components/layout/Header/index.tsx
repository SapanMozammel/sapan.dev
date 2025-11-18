import Logo from '@/components/icons/Logo';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import { memo } from 'react';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitcher from '../common/ThemeSwitcher';

const Header = memo(() => {
	return (
		<header className='border-secondary-400 dark:border-secondary-600 fixed inset-x-0 top-0 z-10 flex h-20 flex-col border-b border-solid backdrop-blur-xl'>
			<div className='container-fluid flex w-full grow flex-col'>
				<div className='flex grow items-center justify-between'>
					<Link href='/' className='flex cursor-pointer flex-row items-center gap-1.5 sm:gap-2'>
						<Logo className='h-8 sm:h-10' />
						<h2 className='font-tektur from-primary to-info dark:from-success mb-1 bg-gradient-to-r bg-clip-text text-2xl !leading-none font-semibold tracking-wide text-transparent sm:text-3xl'>sapan.dev</h2>
					</Link>
					<div className='ms-auto flex items-center gap-x-2 gap-y-1'>
						<LanguageSwitcher />
						<ThemeSwitcher />
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='https://github.com/SapanMozammel'
									target='_blank'
									className='hover:text-primary dark:hover:text-success inline-flex aspect-square h-8 cursor-pointer items-center justify-center text-black ease-in-out dark:text-white'
								>
									<IconBrandGithub className='h-5 w-5 outline-none' />
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>
								<p>Visit my GitHub</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</div>
		</header>
	);
});

Header.displayName = 'Header';

export default Header;

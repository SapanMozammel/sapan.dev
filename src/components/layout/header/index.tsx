import LanguageSwitcher from '@/components/layout/common/language-switcher';
import ThemeSwitcher from '@/components/layout/common/theme-switcher';
import GitHubLink from './github-link';
import HeaderLogo from './header-logo';
import MobileNav from './mobile-nav';
import NavMenu from './nav-menu';

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
					<GitHubLink />
					<MobileNav />
				</div>
			</div>
		</div>
	</header>
);

export default Header;

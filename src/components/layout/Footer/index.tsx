const Footer = () => (
	<footer className='border-secondary-400 dark:border-secondary-600 border-t border-solid backdrop-blur-xl'>
		<div className='container-fluid'>
			<div className='flex flex-col items-center justify-between gap-1 px-0 py-4 text-center sm:flex-row sm:py-6 sm:text-[unset]'>
				<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-small tracking-wider'>&copy; {new Date().getFullYear()} All rights reserved.</p>
				<p className='text-secondary-600 dark:text-secondary-400 text-paragraph-small tracking-wider'>Designed & Developed by SapanMozammel</p>
			</div>
		</div>
	</footer>
);

export default Footer;

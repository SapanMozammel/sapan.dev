import { IconLoader } from '@tabler/icons-react';

const Loading = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center px-4'>
			<div className='text-center'>
				<IconLoader className='text-primary dark:text-success mx-auto h-8 w-8 animate-spin' />
				<p className='text-secondary-500 dark:text-secondary-500 mt-4'>Loading...</p>
			</div>
		</div>
	);
};

export default Loading;

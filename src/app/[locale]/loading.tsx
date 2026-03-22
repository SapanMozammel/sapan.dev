import { IconLoader } from '@tabler/icons-react';

const Loading = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center px-4'>
			<div className='text-center'>
				<IconLoader className='mx-auto h-8 w-8 animate-spin text-blue-600 dark:text-blue-400' />
				<p className='mt-4 text-gray-600 dark:text-gray-400'>Loading...</p>
			</div>
		</div>
	);
};

export default Loading;

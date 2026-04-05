import AdminDecorations from './admin/AdminDecorations';
import AdminEmailList from './admin/AdminEmailList';
import AdminEmailPreview from './admin/AdminEmailPreview';
import AdminSidebar from './admin/AdminSidebar';

const AdminScreen = () => {
	return (
		<div className='group/admin-dashboard font-dm text-dark relative aspect-[16/10] w-full text-start text-[0.75vw] !font-light dark:text-white'>
			<div className='bg-light/20 border-info/30 shadow-info/10 pointer-events-none flex h-full w-full rounded-[0.6em] border-[0.025em] border-solid shadow-lg backdrop-blur transition-transform delay-500 duration-1000 ease-in-out select-none group-hover/admin-dashboard:scale-105 dark:bg-slate-900/20'>
				<div className='flex h-full w-full overflow-hidden rounded-[0.6em] tracking-widest'>
					<AdminSidebar />
					<div className='flex h-full grow'>
						<AdminEmailList />
						<AdminEmailPreview />
					</div>
				</div>
			</div>
			<AdminDecorations />
		</div>
	);
};

export default AdminScreen;

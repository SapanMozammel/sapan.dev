import '@/styles/global.scss';
import { fontList } from './fonts';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html suppressHydrationWarning>
			<body suppressHydrationWarning className={`${fontList} font-dm`}>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;

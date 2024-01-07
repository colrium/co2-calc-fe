import ThemeRegistry from '@/components/ThemeRegistry';
import { useSelector } from 'react-redux';
import ExternalLayout from './External';
import InternalLayout from './Internal';

export default function RootLayout({ children }) {
	const { isLoggedIn } = useSelector(storeState => storeState.auth);
	const Layout = isLoggedIn? InternalLayout : ExternalLayout;
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Layout>{children}</Layout>
		</ThemeRegistry>
	);
}

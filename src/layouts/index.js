import ThemeRegistry from '@/components/ThemeRegistry';
import { useSelector } from 'react-redux';
import ExternalLayout from './External';
import InternalLayout from './Internal';


export default function RootLayout({ children }) {
	const { isLoggedIn, token } = useSelector(storeState => storeState.auth);

	/* const oldFetch = window.fetch;


	window.fetch = function (...args) {
		args[1].headers = { Authorization: `${token?.tokenType || 'Bearer'} ${token?.accessToken || ''}` };
		return oldFetch.apply(window, args);
	}; */
	const Layout = isLoggedIn? InternalLayout : ExternalLayout;
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Layout>{children}</Layout>
		</ThemeRegistry>
	);
}

import ThemeRegistry from '@/components/ThemeRegistry';
import NotificationsProvider, { Notifications } from '@/contexts/Notifications';
import PrerequisitesProvider from '@/contexts/Prerequisites';
import { useSelector } from 'react-redux';
import ExternalLayout from './External';
import InternalLayout from './Internal';


export default function RootLayout({ children }) {
	const { loggedin, token } = useSelector(storeState => storeState.auth);

	/* const oldFetch = window.fetch;


	window.fetch = function (...args) {
		args[1].headers = { Authorization: `${token?.tokenType || 'Bearer'} ${token?.accessToken || ''}` };
		return oldFetch.apply(window, args);
	}; */
	const Layout = loggedin ? InternalLayout : ExternalLayout;
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<NotificationsProvider>
				<PrerequisitesProvider>
					<Layout>
						{children}
						<Notifications />
					</Layout>
				</PrerequisitesProvider>
			</NotificationsProvider>
		</ThemeRegistry>
	);
}

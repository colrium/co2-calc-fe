import ThemeRegistry from '@/components/ThemeRegistry';
import PageLoadingWidget from '@/components/common/PageLoadingWidget';
import NotificationsProvider, { Notifications } from '@/contexts/Notifications';
import PrerequisitesProvider from '@/contexts/Prerequisites';
import { useSelector } from 'react-redux';
import ExternalLayout from './External';
import InternalLayout from './Internal';


export default function RootLayout({ children }) {
	const { loggedin, token } = useSelector(storeState => storeState.auth);

	
	const Layout = loggedin ? InternalLayout : ExternalLayout;
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<NotificationsProvider>
				<PrerequisitesProvider>
					<PageLoadingWidget />
					<Layout>
						{children}
						<Notifications />
					</Layout>
				</PrerequisitesProvider>
			</NotificationsProvider>
		</ThemeRegistry>
	);
}

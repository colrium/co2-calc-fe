import ThemeRegistry from '@/components/ThemeRegistry';
import PageLoadingWidget from '@/components/common/PageLoadingWidget';
import ModelFormProvider from '@/contexts/ModelForm';
import NotificationsProvider, { Notifications } from '@/contexts/Notifications';
import PrerequisitesProvider from '@/contexts/Prerequisites';
import { useSelector } from 'react-redux';

export default function RootLayout({ children }) {
	const { loggedin, token, themeMode } = useSelector((storeState) => storeState.auth);

	return (
		<ThemeRegistry options={{ key: 'mui-theme', mode: themeMode }}>
			<NotificationsProvider>
				<PrerequisitesProvider>
					<PageLoadingWidget />
					<ModelFormProvider>{children}</ModelFormProvider>

					<Notifications />
				</PrerequisitesProvider>
			</NotificationsProvider>
		</ThemeRegistry>
	);
}

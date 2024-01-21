import ThemeRegistry from '@/components/ThemeRegistry';
import { Box } from '@mui/material';
import AppBar from './AppBar';
export default function ExternalLayout({ children }) {
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<AppBar />
			<Box>{children}</Box>
		</ThemeRegistry>
	);
}

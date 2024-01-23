import ThemeRegistry from '@/components/ThemeRegistry';
import { Box } from '@mui/material';
import AppBar from './AppBar';
export default function ExternalLayout({ children }) {
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Box sx={{ minHeight: '100vh' }} className="flex flex-col relative">
				<AppBar />
				{children}
			</Box>
		</ThemeRegistry>
	);
}

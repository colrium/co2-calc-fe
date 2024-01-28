import ThemeRegistry from '@/components/ThemeRegistry';
import { Box } from '@mui/material';
import AppBar from './AppBar';
export default function ExternalLayout({ children }) {
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Box sx={{ minHeight: '100vh', width: '100vw' }} className="flex flex-col relative">
				<AppBar />
				<Box sx={{mt: theme => theme.spacing(8)}}>
				{children}
				</Box>				
			</Box>
		</ThemeRegistry>
	);
}

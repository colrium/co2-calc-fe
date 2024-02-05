import ThemeRegistry from '@/components/ThemeRegistry';
import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from './AppBar';
export default function ExternalLayout({ children }) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
	const colorModeClassName =
		theme.mode === 'dark'
			? 'bg-clip-text bg-gradient-to-bl from-blue-600 via-blue-900 to-neutral-900'
			: 'bg-clip-text bg-gradient-to-bl from-neutral-50 via-sky-200 to-blue-500';
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Box
				// className={`flex flex-col relative overflow-x-hidden bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900`}
				className={`flex flex-col min-h-screen w-full max-w-full overflow-x-hidden relative overflow-x-hidden bg-gradient-to-br from-gray-50 to-blue-100`}
			>
				<AppBar />
				<Container disableGutters maxWidth="xl" sx={{ marginTop: 8 }}>
					{children}
				</Container>
			</Box>
		</ThemeRegistry>
	);
}

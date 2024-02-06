import ThemeRegistry from '@/components/ThemeRegistry';
import { Box } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';

export default function InternalLayout({children}) {
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Box
				// className={`flex flex-col relative overflow-x-hidden bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900`}
				className={`flex flex-col min-h-screen w-full max-w-full overflow-x-hidden relative overflow-x-hidden bg-gradient-to-br from-gray-50 to-blue-100`}
			>
				<ResponsiveAppBar />
				<Box  className="w-full" sx={{ marginTop: 8 }}>
					{children}
				</Box>
			</Box>
		</ThemeRegistry>
	);
}

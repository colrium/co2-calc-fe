import ThemeRegistry from '@/components/ThemeRegistry';
import { usePrerequisites } from '@/contexts/Prerequisites';
import { Box } from '@mui/material';
import AppBar from './AppBar';
import MainDrawer from './MainDrawer';

export default function InternalLayout({children}) {
	
	const {openDrawers, toggleDrawer} = usePrerequisites()
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Box
				// className={`flex flex-col relative overflow-x-hidden bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900`}
				className={`flex min-h-screen w-full max-w-full overflow-x-hidden relative overflow-x-hidden bg-gradient-to-br from-gray-50 to-blue-100`}
			>
				<MainDrawer
					open={openDrawers.internal}
					onOpen={() => toggleDrawer('internal', true)}
					onClose={() => toggleDrawer('internal', false)}
				/>
				<Box className={`flex flex-col min-h-screen flex-1`}>
					<AppBar drawerOpen={openDrawers.internal} onToggleDrawer={() => toggleDrawer('internal')} />
					
					<Box className="w-full" sx={{ marginTop: 8 }}>
						{children}
					</Box>
				</Box>
			</Box>
		</ThemeRegistry>
	);
}

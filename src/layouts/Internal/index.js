import ThemeRegistry from '@/components/ThemeRegistry';
import { usePrerequisites } from '@/contexts/Prerequisites';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from './AppBar';
import MainDrawer from './MainDrawer';

export default function InternalLayout({children}) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const {openDrawers, toggleDrawer} = usePrerequisites()
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Box
				// className={`flex flex-col relative overflow-x-hidden bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900`}
				className={` min-h-screen w-screen overflow-x-hidden relative overflow-x-hidden bg-gradient-to-br from-gray-50 to-blue-100`}
			>
				<MainDrawer
					open={openDrawers.internal}
					onOpen={() => toggleDrawer('internal', true)}
					onClose={() => toggleDrawer('internal', false)}
				/>
				<Box className={`flex flex-col min-h-screen flex-1`} sx={{ marginLeft: !isMobile && openDrawers.internal? `${theme.mixins.drawerWidth}px` : 0 }}>
					<AppBar drawerOpen={openDrawers.internal} onToggleDrawer={() => toggleDrawer('internal')} />

					<Box sx={{ marginTop: 8 }}>{children}</Box>
				</Box>
			</Box>
		</ThemeRegistry>
	);
}

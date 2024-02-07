import ThemeRegistry from '@/components/ThemeRegistry';
import { useSetState } from '@/hooks';
import { Box } from '@mui/material';
import AppBar from './AppBar';
import MainDrawer from './MainDrawer';

export default function InternalLayout({children}) {
	const [state, setState] = useSetState({
		drawerOpen: false
	})
	return (
		<ThemeRegistry options={{ key: 'mui-theme' }}>
			<Box
				// className={`flex flex-col relative overflow-x-hidden bg-gradient-to-tr from-blue-700 via-blue-800 to-gray-900`}
				className={`flex min-h-screen w-full max-w-full overflow-x-hidden relative overflow-x-hidden bg-gradient-to-br from-gray-50 to-blue-100`}
			>
				<MainDrawer
					open={state.drawerOpen}
					onOpen={() => setState({ drawerOpen: true })}
					onClose={() => setState({ drawerOpen: false })}
				/>
				<Box className={`flex flex-col min-h-screen flex-1`}>
					<AppBar
						drawerOpen={state.drawerOpen}
						onToggleDrawer={() => setState((prev) => ({ drawerOpen: !prev.drawerOpen }))}
					/>

					<Box className="w-full" sx={{ marginTop: 8 }}>
						{children}
					</Box>
				</Box>
			</Box>
		</ThemeRegistry>
	);
}

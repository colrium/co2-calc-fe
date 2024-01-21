import { Box } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';

export default function InternalLayout({children}) {
	return (
		<main className="flex min-h-screen flex-col">
			<ResponsiveAppBar />
			<Box>{children}</Box>
		</main>
	);
}

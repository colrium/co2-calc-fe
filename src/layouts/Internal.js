import ResponsiveAppBar from '@/components/landingpage/ResponsiveAppBar';
import { Box } from '@mui/material';

export default function InternalLayout({children}) {
	return (
		<main className="flex min-h-screen flex-col">
			<ResponsiveAppBar />
			<Box>{children}</Box>
		</main>
	);
}

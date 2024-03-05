import { Card, CardContent, Container, Grid } from '@mui/material';

export default function AuthLayout({ children }) {
	return (
		<Grid container className="auth-page">
			<Grid xs={12} md={6}>
				{children}
			</Grid>
			<Grid xs={12} md={6} className={'h-full w-full'}>
				<Container className={'h-full w-full'}>
					<Card sx={{ backgroundColor: 'primary.main' }} className={'h-full w-full'}>
						<CardContent>Hello</CardContent>
					</Card>
				</Container>
			</Grid>
		</Grid>
	);
}

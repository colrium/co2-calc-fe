import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Image from 'next/image';
export default function AuthLayout({ children }) {
	const theme = useTheme();
	return (
		<Grid container className="auth-page">
			<Grid xs lg={6} className={'h-dvh w-full'} sx={{ display: { md: 'block', xs: 'none' } }}>
				<Container sx={{ height: '90dvh' }} className={'h-dvh w-full'}>
					<Card
						elevation={0}
						sx={{
							backgroundColor: `${alpha(theme.palette.divider, 0.05)} !important`,
							backgroundImage: `linear-gradient(45deg, ${alpha(theme.palette.divider, 0.015)}, ${alpha(
								theme.palette.divider,
								0.05
							)})`,
							borderRadius: 8
						}}
						className={'h-full w-full'}
					>
						<CardContent className={'flex flex-col h-full w-full'}>
							<Box className="flex-1 flex flex-col gap-24 items-center justify-center p-32" padding={8}>
								<Typography variant="h4" color={'text.disabled'} className="my-8">
									Carbon Accounting
								</Typography>
								<Image src="/img/scopes.svg" className="my-8" width={620} height={310} />

								<Typography
									variant="subtitle2"
									color={'text.disabled'}
									className="my-8 text-wrap text-center"
								>
									Keep track of your progress towards climate responsibility and achieve carbon neutrality
									through our reduction strategies
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</Container>
			</Grid>
			<Grid xs={12} md={6}>
				{children}
			</Grid>
		</Grid>
	);
}

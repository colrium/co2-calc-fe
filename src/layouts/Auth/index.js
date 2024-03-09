import HomeIcon from '@mui/icons-material/Home';
import { Box, Card, CardContent, Container, Grid, IconButton, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
	opacity: 1,
	y: 0,
	transition: {
		duration: 0.6,
		ease: easing,
		delay: 0.36
	}
};


export default function AuthLayout({ children }) {
	const theme = useTheme();
	return (
		<Grid container className="auth-page">
			<Grid xs lg={6} className={'h-dvh w-full flex flex-col justify-center items-center'} sx={{ display: { md: 'flex', xs: 'none' } }}>
				<Container
					sx={{ height: '90dvh' }}
					className={'h-dvh w-full'}
					component={motion.div}
					animate={{
						transition: {
							staggerChildren: 0.55
						}
					}}
				>
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
						component={motion.div}
						initial={{ opacity: 0, y: 40 }}
						animate={animate}
						className={'h-full w-full'}
					>
						<CardContent className={'flex flex-col h-full w-full'}>
							<Box padding={3}>
								<IconButton color="success" component={Link} href="/">
									<HomeIcon />
								</IconButton>
							</Box>
							<Box className="flex-1 flex flex-col gap-24 items-center justify-center p-32" padding={8}>
								<Typography variant="h4" color={'text.disabled'} className="my-8">
									Carbon Accounting
								</Typography>
								<Image src="/img/scopes.svg" className="my-8" width={620} height={310} alt="scopes" />
								{/* <ScopesSvg width="100%"/> */}
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

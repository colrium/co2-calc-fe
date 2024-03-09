import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Card, CardContent, Container, Grid, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
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
const oAuthOptions = [
	{
		name: 'google',
		label: 'Google',
		Icon: GoogleIcon,
		color: 'google',
		href: '/'
	},
	{
		name: 'github',
		label: 'Github',
		Icon: GitHubIcon,
		color: 'github',
		href: '/'
	},
	{
		name: 'linkedin',
		label: 'Linkedin',
		Icon: LinkedInIcon,
		color: 'linkedin',
		href: '/'
	}
];
export default function OAuth({ options = ['google', 'github', 'linkedin'], iconsOnly=true }) {
	const theme = useTheme();

	return (
		<Grid container>
			<Grid xs lg={12}>
				<Container
					className={'w-full'}
					component={motion.div}
					animate={{
						transition: {
							staggerChildren: 0.55
						}
					}}
				>
					<Card
						elevation={0}
						component={motion.div}
						initial={{ opacity: 0, y: 10 }}
						animate={animate}
						className={'h-full w-full'}
					>
						<CardContent className={'flex flex-col h-full w-full !p-0'} padding={0}>
							<Box className="flex-1 flex flex-row gap-4 items-center justify-center" padding={1}>
								{oAuthOptions.map(({ Icon, label, color, href }, i) => (
									<Tooltip title={label} key={`oath-option-${i}`}>
										<IconButton color={color} component={Link} href={href}>
											<Icon fontSize='small'/>
										</IconButton>
									</Tooltip>
								))}
							</Box>
						</CardContent>
					</Card>
				</Container>
			</Grid>
		</Grid>
	);
}

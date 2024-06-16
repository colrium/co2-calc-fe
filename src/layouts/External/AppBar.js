/** @format */

'use client';
import { publicRoutes, title } from '@/config';
import { usePrerequisites } from '@/contexts/Prerequisites';
import { useSetState } from '@/hooks';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
const pages = [
	{ path: '/', label: 'Home' },
	{ path: '/how-it-works', label: 'How it works' },
	{ path: '/help', label: 'Help' }
];
const ToggleScroll = (props) => {
	const { children, window } = props;	
	const theme = useTheme()
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		// disableHysteresis: true,
		// threshold: 200,
		target: window ? window() : undefined
	});
	
	/* return (
		<Slide appear={false} direction="down" in={!trigger}>
			{React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
		position: trigger ? 'fixed' : 'relative',
		sx: { zIndex: trigger ? theme.zIndex.appBar : 1 }
	})}
		</Slide>
	) */
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
	
}

const ElevationScroll = (props) => {
	const theme = useTheme()
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
		sx: {
			borderBottomColor: theme.palette.divider,
			borderBottomWidth: `1px`,
			...(trigger
				? {
						backgroundColor: `${alpha(theme.palette.background.main, 0.7)} !important`,
						WebkitBackdropFilter: 'blur(5px) !important',
						backdropFilter: 'blur(5px) !important'
				  }
				: { backgroundColor: 'transparent !important' })
		}
	});
}



function ResponsiveAppBar(props) {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [state, setState] = useSetState({
		anchorElNav: null,
		drawerMenuOpen: false
	});
	const { openDrawers, toggleDrawer } = usePrerequisites();
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<ElevationScroll {...props}>
			<AppBar
				// position="relative"
				// elevation={0}
				sx={{
					'MuiAppBar-root': 'bg-transparent'
				}}
				className="MainAppbar"
				color="inherit"

				// enableColorOnDark
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters sx={{ height: 8 }}>
						<Box
							className="flex items-center gap-4"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								flex: 1
							}}
						>
							{/* <Typography
								variant="h6"
								noWrap
								component="a"
								href="#app-bar-with-responsive-menu"
								sx={{
									mr: 2,
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'monospace',
									fontWeight: 700,
									color: 'inherit',
									textDecoration: 'none'
								}}
							>
								{title}
							</Typography> */}
							<Image src={'/img/logo-light.png'} width={48} height={48} alt="logo" />
							<Typography variant="subtitle1" component={Link} href="/">
								{title}
							</Typography>
						</Box>

						<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="external drawe"
								aria-controls="external-appbar"
								aria-haspopup="true"
								onClick={() => toggleDrawer('external', true)}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
						</Box>
						<Box className="flex-1" />

						<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
							{publicRoutes.map(({ label, pathname }) => (
								<Button
									key={pathname}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, display: 'block' }}
									color="inherit"
									component={Link}
									href={pathname}
								>
									{label}
								</Button>
							))}
						</Box>

						<Box className="flex gap-8" sx={{ flexGrow: 0 }}>
							<Button href={'/auth/register'} color="inherit">
								Get Started
							</Button>
							<Button href={'/auth/login'} color="inherit">
								Login
							</Button>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</ElevationScroll>
	);
}
export default ResponsiveAppBar;

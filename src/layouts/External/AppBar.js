/** @format */

'use client';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import * as React from 'react';

const title = 'Manufacturing Carbon Footprint';
const subtitle = 'Carbon Footprint Calculator';
const pages = [
	{ path: '/', label: 'Home' },
	{ path: '/how-it-works', label: 'How it works' },
	{ path: '/help', label: 'Help' }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

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
		<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						className="flex-col"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },

							flex: 1
						}}
					>
						<Typography
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
						</Typography>
						<Typography>{subtitle}</Typography>
					</Box>

					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{pages.map(({ path, label }) => (
								<MenuItem key={path} onClick={handleCloseNavMenu} href={path} component={Link}>
									<Typography textAlign="center">{label}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box className="flex-1"/>
					{/* <Typography
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						{title}
					</Typography> */}
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{pages.map(({ label, path }) => (
							<Button
								key={path}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, display: 'block' }}
								color="inverse"
								component={Link}
								href={path}
							>
								{label}
							</Button>
						))}
					</Box>

					<Box className="flex gap-8" sx={{ flexGrow: 0 }}>
						<Button href={'/overview'} color="inverse" sx={{ p: 0 }}>
							Get Started
						</Button>
						<Button href={'/auth/login'} color="inverse" sx={{ p: 0 }}>
							Login
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;

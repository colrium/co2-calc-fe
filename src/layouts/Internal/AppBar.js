/** @format */

'use client';

import { useSetState } from '@/hooks';
import { selectAuth, setLoggedIn, setThemeMode } from '@/store/authSlice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Button, Divider, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(22px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					theme.palette.text.primary
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.background.light
			}
		}
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.surface : theme.palette.inverse.dark,
		width: 32,
		height: 32,
		'&::before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				theme.palette.text.primary
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
		}
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: theme.palette.divider,
		borderRadius: 20 / 2
	}
}));
const subtitle = 'Carbon Footprint Calculator';
const useractions = [
	{ path: '/dashboard/overview', label: 'Overview' },
	
];


const ElevationScroll = (props) => {
	const theme = useTheme();
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
};

function ResponsiveAppBar({ onToggleDrawer, drawerOpen, ...rest }) {
	const dispatch = useDispatch();
	const router = useRouter();
	const { user, themeMode } = useSelector(selectAuth);
	const [state, setState] = useSetState({
		anchorElNav: null,
		drawerMenuOpen: false
	});
	
	const handleOpenUserMenu = (event) => {
		setState({ anchorElNav: event.currentTarget });
	};


	const handleCloseUserMenu = () => {
		setState({ anchorElNav: null });
	};

	return (
		<ElevationScroll {...rest}>
			<AppBar
				sx={{
					'MuiAppBar-root': 'bg-transparent'
				}}
				className="MainAppbar"
				color="inherit"
			>
				<Toolbar className="flex gap-2" sx={{ height: 8 }}>
					<IconButton onClick={onToggleDrawer} color="tertiary">
						{drawerOpen ? <MenuOpenIcon fontSize="inherit" /> : <MenuIcon />}
					</IconButton>
					<Box className="flex-col flex-1">
						<Typography color={'tertiary'} component={Link} href="/dashboard/overview">
							{subtitle}
						</Typography>
					</Box>

					<Box sx={{ display: { xs: 'flex' } }} className="items-center gap-4">
						<Button
							endIcon={<AccountCircleOutlinedIcon color="secondary" fontSize="inherit" />}
							size="large"
							aria-label="account of current user"
							className="capitalize text-sm "
							aria-haspopup="true"
							fontSize={10}
							onClick={handleOpenUserMenu}
							sx={{
								'&.MuiButton-text': {
									textTransform: 'capitalize',
									color: (theme) => theme.palette.text.primary
								}
							}}
						>
							{`${user?.firstname || user?.lastname || 'User'}`}
						</Button>
						<FormControlLabel onChange={e => dispatch(setThemeMode(e.target.checked? 'dark' : 'light'))} control={<MaterialUISwitch sx={{ m: 1 }} checked={themeMode === 'dark'} />} />
						<Menu
							id="menu-appbar"
							anchorEl={state.anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(state.anchorElNav)}
							onClose={handleCloseUserMenu}
						>
							{useractions.map(({ path, label }) => (
								<MenuItem key={path} onClick={handleCloseUserMenu} href={path} component={Link}>
									<Typography textAlign="center">{label}</Typography>
								</MenuItem>
							))}
							<Divider />
							<MenuItem
								color="error"
								onClick={() => {
									dispatch(setLoggedIn(false));
									router.push('/auth/login');
								}}
							>
								<Typography textAlign="center" color="error">
									Logout
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
}
export default ResponsiveAppBar;

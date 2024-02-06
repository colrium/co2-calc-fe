/** @format */

'use client';
import { useSetState } from '@/hooks';
import { selectAuth, setLoggedIn } from '@/store/authSlice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Button, Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const title = 'Manufacturing Carbon Footprint';
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
						backgroundColor: `${alpha(theme.palette.background.paper, 0.8)} !important`,
						WebkitBackdropFilter: 'blur(5px) !important',
						backdropFilter: 'blur(5px) !important'
				  }
				: { backgroundColor: 'transparent !important' })
		}
	});
};

function ResponsiveAppBar(props) {
	const dispatch = useDispatch();
	const router = useRouter();
	const {user} = useSelector(selectAuth)
	const [state, setState] = useSetState({
		anchorElNav: null,
		drawerMenuOpen: false
	});
	const handleOpenNavMenu = (event) => {
		setState({ anchorElNav: event.currentTarget });
	};
	const handleOpenUserMenu = (event) => {
		setState({anchorElNav: event.currentTarget});
	};

	const handleCloseNavMenu = () => {
		setState({ anchorElNav: null });
	};

	const handleCloseUserMenu = () => {
		setState({ anchorElNav: null });
	};

	return (
		<ElevationScroll {...props}>
			<AppBar
				sx={{
					'MuiAppBar-root': 'bg-transparent'
				}}
				className="MainAppbar"
				color="inherit"
			>
				<Toolbar className="flex" sx={{ height: 8 }}>
					<Box className="flex-col flex-1">
						<Typography variant="subtitle1" component={Link} href="/dashboard/overview">
							{subtitle}
						</Typography>
					</Box>

					<Box sx={{ display: { xs: 'flex' } }} className="items-center gap-4">
						
						<Button
							endIcon={<AccountCircleOutlinedIcon />}
							size="large"
							aria-label="account of current user"
							className="capitalize"
							aria-haspopup="true"
							onClick={handleOpenUserMenu}
							sx={{
								'&.MuiButton-text': {
									textTransform: 'capitalize'
								}
							}}
							color="secondary"
						>
							{`${user.firstname || user.lastname}`}
						</Button>
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
									router.push('/');
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

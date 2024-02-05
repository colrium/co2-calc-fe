/** @format */

'use client';
import { useSetState } from '@/hooks';
import { selectAuth, setLoggedIn } from '@/store/authSlice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
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
	{ path: '/overview', label: 'Overview' },
	
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
				<Container maxWidth="xl">
					<Toolbar className="flex" sx={{ height: 8 }}>
						<Box className="flex-col flex-1">
							<Typography variant="subtitle1" component={Link} href="/overview">
								{subtitle}
							</Typography>
						</Box>

						<Box sx={{ display: { xs: 'flex' } }} className="items-center gap-4">
							<Typography color="info">{`${user.firstname} ${user.lastname}`}</Typography>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenUserMenu}
								color="inherit"
							>
								<AccountCircleOutlinedIcon />
							</IconButton>
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
				</Container>
			</AppBar>
		</ElevationScroll>
	);
}
export default ResponsiveAppBar;

import { adminRoutes, publicRoutes, title } from '@/config';
import { usePrerequisites } from '@/contexts/Prerequisites';
import { selectAuth } from '@/store/authSlice';
import Icon from '@mdi/react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, IconButton, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
export default function ExternalDrawer({ open, onClose, onOpen }) {
	const theme = useTheme();
	const { user } = useSelector(selectAuth);
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const router = useRouter();
	const drawerWidth = theme.mixins.drawerWidth;
	const { drawerVariant } = usePrerequisites();
	
	return (
		<Fragment>
			<SwipeableDrawer
				variant={drawerVariant}
				onClose={onClose}
				onOpen={onOpen}
				anchor="left"
				sx={{
					width: open ? drawerWidth : 0,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box'
						// zIndex: (theme) => theme.zIndex.appBar - 1,
						// padding: (theme) => theme.spacing(2)
					}
				}}
				open={open}
			>
				<Toolbar className="flex gap-2" sx={{ height: 8 }}>
					<IconButton onClick={onClose} color="tertiary">
						{open ? <MenuOpenIcon fontSize="inherit" /> : <MenuIcon />}
					</IconButton>
					<Box className="flex-col flex-1">
						<Typography color={'tertiary'} component={Link} href="/">
							{title}
						</Typography>
					</Box>
				</Toolbar>
				<Divider />
				<List>
					{publicRoutes.map(({ label, pathname, icon }, index) => (
						<ListItem key={`route-${index}`} disablePadding>
							<ListItemButton component={Link} href={pathname} selected={pathname === router.pathname}>
								{icon && <ListItemIcon>
									<Icon path={icon} size={1} />
								</ListItemIcon>}
								<ListItemText primary={label} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{user?.role === 'admin' &&
						adminRoutes.map(({ label, pathname, icon }, index) => (
							<ListItem key={`admin-route-${index}`} disablePadding>
								<ListItemButton component={Link} href={pathname} selected={pathname === router.pathname}>
									<ListItemIcon>
										<Icon path={icon} size={1} />
									</ListItemIcon>
									<ListItemText primary={label} />
								</ListItemButton>
							</ListItem>
						))}
				</List>
			</SwipeableDrawer>
		</Fragment>
	);
}

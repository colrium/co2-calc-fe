import { title } from '@/config';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, IconButton, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { Fragment } from 'react';
export default function MainDrawer({ open, onClose, onOpen }) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('lg'));
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const variant = isMobile ? 'temporary' : 'persistent';
	const drawerWidth = theme.mixins.drawerWidth;
	return (
		<Fragment>
			<SwipeableDrawer
				variant={variant}
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
						<Typography color={'tertiary'} component={Link} href="/dashboard/overview">
							{title}
						</Typography>
					</Box>
				</Toolbar>
			</SwipeableDrawer>
		</Fragment>
	);
}

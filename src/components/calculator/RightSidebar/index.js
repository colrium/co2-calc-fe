import { Box, Toolbar, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useCalculatorForm } from '../CalculatorProvider';
import Help from './Help';
import Summary from './Summary';
function TabPanel(props) {
	const { children, value, index, ...other } = props;
	
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`right-tabpanel-${index}`}
			aria-labelledby={`right-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
function a11yProps(index) {
	return {
		id: `right-tab-${index}`,
		'aria-controls': `right-tabpanel-${index}`
	};
}

export default function RightSidebar({ open, onClose, variant, activityTypes=[] }) {
	const { formik } = useCalculatorForm();
	const [tab, setTab] = useState(0);
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('lg'));
	const drawerWidth = theme.mixins.drawerWidth;
	const handleTabChange = (event, newValue) => {
		setTab(newValue);
	};
	return (
		<Drawer
			anchor="right"
			variant={variant}
			sx={{
				width: open ? drawerWidth : 0,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: 'border-box',
					zIndex: (theme) => theme.zIndex.appBar - 1,
					padding: (theme) => theme.spacing(2)
				},
				[`&.MuiDrawer-modal`]: {
					zIndex: (theme) => theme.zIndex.drawer
				}
			}}
			open={open}
			onClose={onClose}
		>
			{matches && <Toolbar sx={{ height: 8 }} />}
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
						<Tab label="Summary" {...a11yProps(0)} />
						<Tab label="Help" {...a11yProps(1)} />
					</Tabs>
				</Box>
				<TabPanel value={tab} index={0}>
					<Summary />
				</TabPanel>
				<TabPanel value={tab} index={1}>
					<Help />
				</TabPanel>
			</Box>
		</Drawer>
	);
}

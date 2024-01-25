import { addCompanyAssessment, addProductAssessment, selectCalculator, setCalculatorContext } from '@/store/calculatorSlice';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCalculatorForm } from '../CalculatorProvider';

const contextTitles = {
	company: 'New company assessment (Scope 1 - 3)',
	product: 'New product assessment (LCA)'
};
export default function FormHeader() {
	const dispatch = useDispatch();
	const calculator = useSelector(selectCalculator);
	const { context } = calculator;
	const contextDataExists = calculator[context.name]?.length > 0
	const [popupOpen, setPopupOpen] = React.useState(!contextDataExists);	
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { formik, setContext } = useCalculatorForm();
	const [popupContext, setPopupContext] = React.useState(context.name);

	const { toggleDrawer } = useCalculatorForm()
	
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddCompany = () => {
		setAnchorEl(null);
		setPopupContext('company');
		setPopupOpen(true);
	};

	const handleAddProduct = () => {
		setAnchorEl(null);
		setPopupContext('product');
		setPopupOpen(true);
	};
	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	const handleOnSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries(formData.entries());
		const name = formJson.name;
		const data = calculator[popupContext];
		const action = popupContext === 'product' ? addProductAssessment : addCompanyAssessment;
		dispatch(action(formJson));
		dispatch(setCalculatorContext({ active: data.length ?? 0, name: popupContext }));
		handleClosePopup();
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Dialog
				open={popupOpen}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: handleOnSubmit
				}}
			>
				<DialogTitle>
					<Chip label={contextTitles[popupContext]} />
				</DialogTitle>
				<DialogContent>
					<Box className="flex gap-8">
						<TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="text" />
						<TextField
							multiline
							rows={3}
							margin="dense"
							id="description"
							name="description"
							label="Description"
						/>
					</Box>
					<TextField required margin="dense" id="year" name="year" label="Year" type="number" />
				</DialogContent>
				<DialogActions>
					<Button color="error" onClick={handleClosePopup}>
						Cancel
					</Button>
					<Button type="submit">Continue</Button>
				</DialogActions>
			</Dialog>
			<AppBar position="static" color="inverse" elevation={0}>
				<Toolbar>
					<Box className="flex gap-2 flex-1">
						<Chip label={formik.values?.name} />
						<Chip label={formik.values?.year} />
					</Box>

					<Box className="flex gap-4">
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<MoreVertIcon />
						</IconButton>
						<IconButton onClick={toggleDrawer('right')} color="secondary">
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem component={Link} href="/overview">
								Overview
							</MenuItem>
							<MenuItem onClick={handleAddCompany}>Add company assessment (Scope 1 - 3)</MenuItem>
							<MenuItem onClick={handleAddProduct}>Add product assessment (LCA)</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

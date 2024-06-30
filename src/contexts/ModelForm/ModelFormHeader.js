import { usePrerequisites } from '@/contexts/Prerequisites';
import { selectCalculator } from '@/store/calculatorSlice';
import { mdiBackburger } from '@mdi/js';
import Icon from '@mdi/react';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import { Chip, Typography } from '@mui/material';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useModelForm } from '.';
const contextTitles = {
	company: 'New company assessment (Scope 1 - 3)',
	product: 'New product assessment (LCA)'
};
export default function ModelFormHeader({showDrawerBtn}) {
	const { formik, onCloseForm, context } = useModelForm();
	const [popupOpen, setPopupOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);


	const { toggleDrawer, openDrawers } = usePrerequisites();
	const leftDrawerOpen = openDrawers.calcLeft;
	const rightDrawerOpen = openDrawers.calcRight;

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddCompany = () => {
		setAnchorEl(null);
		setPopupOpen(true);
	};

	const handleAddProduct = () => {
		setAnchorEl(null);
		setPopupOpen(true);
	};
	const handleClosePopup = () => {
		setPopupOpen(false);
	};
	const formTitle = context.formTitle

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Dialog
				open={popupOpen}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: formik?.handleSubmit
				}}
			>
				<DialogTitle>
					<Chip label={contextTitles[name]} />
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="name"
						label="Name"
						size="small"
						type="text"
						value={formik.values?.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
						fullWidth
					/>
					<Box className="h-4" />
					<TextField
						multiline
						rows={3}
						margin="dense"
						size="small"
						id="description"
						name="description"
						label="Description"
						value={formik.values?.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.description && Boolean(formik.errors.description)}
						helperText={formik.touched.description && formik.errors.description}
						fullWidth
					/>
					<Box className="h-4" />
					<DatePicker
						label={'Year'}
						openTo="year"
						views={['year']}
						minDate={dayjs().year(2000)}
						maxDate={dayjs().year(2050)}
						value={dayjs().year(formik.values?.year || dayjs().year())}
						onChange={(newValue) => formik.setFieldValue('year', newValue.year())}
						error={formik.touched.year && Boolean(formik.errors.year)}
						helperText={formik.touched.year && formik.errors.year}
						slotProps={{
							textField: {
								size: 'small',
								margin: 'dense',
								fullWidth: true
							}
						}}
					/>
					{/* <TextField required margin="dense" id="year" name="year" label="Year" type="number" /> */}
				</DialogContent>
				<DialogActions>
					<Button color="error" onClick={handleClosePopup}>
						Cancel
					</Button>
					<Button type="submit">Continue</Button>
				</DialogActions>
			</Dialog>
			<AppBar position="static" color="transparent" elevation={0}>
				<Toolbar>
					{context?.model?.hasLeftDrawer && <IconButton onClick={() => toggleDrawer('calcLeft')} color="secondary" className="mr-4">
						<Icon path={mdiBackburger} rotate={leftDrawerOpen ? 0 : 180} size={1} />
					</IconButton>}
					<Box className="flex gap-4 flex-1">
						{formTitle && <Typography variant='h6' className="hidden md:inline-flex">{formTitle}</Typography>}
						{formik.values?.year && <Chip className="hidden md:inline-flex" label={formik.values?.year} />}
					</Box>
					<IconButton
						aria-label="save"
						aria-controls="save-appbar"
						className="mx-4"
						onClick={formik.handleSubmit}
						color="inherit"
					>
						<SaveIcon />
					</IconButton>
					<IconButton className="mx-8 hidden md:inline-flex" type="button" onClick={onCloseForm} color="error">
						<CloseIcon />
					</IconButton>
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
						{context?.model?.hasRightDrawer && <IconButton onClick={() => toggleDrawer('calcRight')} color="secondary">
							<Icon path={mdiBackburger} rotate={rightDrawerOpen ? 180 : 0} size={1} />
						</IconButton>}

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
							<MenuItem component={Link} href="/dashboard/overview">
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

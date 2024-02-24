import { usePrerequisites } from '@/contexts/Prerequisites';
import { useSetState } from '@/hooks';
import { addCompanyAssessment, addProductAssessment, selectCalculator, setCalculatorContext } from '@/store/calculatorSlice';
import { mdiBackburger } from '@mdi/js';
import Icon from '@mdi/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCalculatorForm } from '../CalculatorProvider';
import validationSchema from '../Company/validationSchema';
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
	const [formValues, setFormValues] = useSetState({
		year: dayjs().year(formik.values?.year || dayjs().year()),
		name: '',
		description: ''
	});

	
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
		dispatch(setCalculatorContext({ active: data.length ?? 0, name: popupContext }));
		dispatch(action(formJson));		
		handleClosePopup();
	};

	const contextFormik = useFormik({
		initialValues: {
			name: '',
			description: '',
			year: dayjs().year(formik.values?.year || dayjs().year())
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const data = calculator[popupContext];
			const action = popupContext === 'product' ? addProductAssessment : addCompanyAssessment;
			dispatch(setCalculatorContext({ active: data.length ?? 0, name: popupContext }));
			dispatch(action(values));
			handleClosePopup();
		}
	});

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Dialog
				open={popupOpen}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: contextFormik.handleSubmit
				}}
			>
				<DialogTitle>
					<Chip label={contextTitles[popupContext]} />
				</DialogTitle>
				<DialogContent>
					<Box className="flex gap-8">
						<TextField
							autoFocus
							required
							margin="dense"
							id="name"
							name="name"
							label="Name"
							type="text"
							value={contextFormik.values?.name}
							onChange={contextFormik.handleChange}
							onBlur={contextFormik.handleBlur}
							error={contextFormik.touched.name && Boolean(contextFormik.errors.name)}
							helperText={contextFormik.touched.name && contextFormik.errors.name}
						/>
						<TextField
							multiline
							rows={3}
							margin="dense"
							id="description"
							name="description"
							label="Description"
							value={contextFormik.values?.description}
							onChange={contextFormik.handleChange}
							onBlur={contextFormik.handleBlur}
							error={contextFormik.touched.description && Boolean(contextFormik.errors.description)}
							helperText={contextFormik.touched.description && contextFormik.errors.description}
						/>
					</Box>
					<DatePicker
						label={'Year'}
						openTo="year"
						views={['year']}
						minDate={dayjs().year(2000)}
						maxDate={dayjs().year(2050)}
						value={dayjs().year(contextFormik.values?.year || dayjs().year())}
						onChange={(newValue) => contextFormik.setFieldValue('year', newValue.year())}
						error={contextFormik.touched.year && Boolean(contextFormik.errors.year)}
						helperText={contextFormik.touched.year && contextFormik.errors.year}
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
			<AppBar position="static" color="inverse" elevation={0}>
				<Toolbar>
					<IconButton onClick={() => toggleDrawer('calcLeft')} color="secondary" className="mr-4">
						<Icon path={mdiBackburger} rotate={leftDrawerOpen ? 0 : 180} size={1} />
					</IconButton>
					<Box className="flex gap-2 flex-1">
						{formik.values?.name && <Chip label={formik.values?.name} />}
						{formik.values?.year && <Chip label={formik.values?.year} />}
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
						<IconButton onClick={() => toggleDrawer('calcRight')} color="secondary">
							<Icon path={mdiBackburger} rotate={rightDrawerOpen ? 180 : 0} size={1} />
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

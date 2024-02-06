import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box, TextField, Typography } from '@mui/material';
import { GridActionsCellItem, useGridApiContext } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { useCalculatorForm } from '../CalculatorProvider';

const CustomEditTextField = (props) => {
	const { id, value, field, hasFocus, colDef } = props;
	const apiRef = useGridApiContext();
	const handleValueChange = (event) => {
		const newValue = event.target.value; // The new value entered by the user
		apiRef.current.setEditCellValue({ id, field, value: newValue });
	};
	return (
		<TextField
			type={colDef.type || 'text'}
			value={value ?? ''}
			size="small"
			margin="dense"
			label={colDef.headerName}
			onChange={handleValueChange}
			variant="outlined"
		/>
	);
};

export default function ActivityGrid({ rows, name, scope }) {
	const { formik } = useCalculatorForm();
	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			// event.defaultMuiPrevented = true;
		}
	};
	const processRowUpdate = (newRow) => {
		const activities = JSON.parse(JSON.stringify(formik.values?.activities || {}));
		activities[scope] = { ...activities[scope], [name]: activities?.[scope]?.[name] || [] };
		const activityIndex = activities[scope][name].findIndex((activity) => activity.id === newRow.id);
		if (activityIndex > -1) {
			activities[scope][name][activityIndex] = newRow;
			formik.setFieldValue('activities', activities);
		}
		return newRow;
	};

	const handleDeleteClick = useCallback(
		(id) => {
			const activities = JSON.parse(JSON.stringify(formik.values?.activities || {}));
			activities[scope] = activities[scope] || {};
			activities[scope][name] = activities[scope][name] || [];
			activities[scope][name] = activities[scope][name].filter((activity) => activity.id !== id);
			formik.setFieldValue('activities', activities);
		},
		[formik.values, name]
	);

	const columns = [
		//{ field: 'id', headerName: 'ID', hide: true },
		{ field: 'name', headerName: 'Name', width: 200 },
		{
			field: 'amount',
			headerName: 'Amount',
			editable: true,
			type: 'number',
			width: 80,
			min: 0,
			renderEditCell: (params) => <CustomEditTextField {...params} />
		},
		{
			field: 'unit',
			headerName: 'Unit'
		},
		{
			field: 'description',
			headerName: 'Description',
			editable: true,
			width: 160,
			renderEditCell: (params) => <CustomEditTextField {...params} />
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id }) => [
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					color="error"
					onClick={() => handleDeleteClick(id)}
					key={id}
				/>
			]
		}
	];
	return (
		<Box className={'flex flex-col h-80 gap-6'} sx={{ width: '100%' }}>
			<Box
				className={'grid grid-cols-4 w-full gap-6'}
				sx={{ width: '100%', gridTemplateRows: `repeat(1, minmax(0, 1fr))` }}
			>
				<Typography>Name</Typography>
				<Typography>Amount</Typography>
				<Typography>Activity Description</Typography>
			</Box>
			{rows?.length > 0 &&
				rows.map((row, i) => (
					<Box
						className={'grid grid-cols-4 w-full gap-6'}
						sx={{ width: '100%', gridTemplateRows: `repeat(1, minmax(0, 1fr))` }}
						key={`row-${i}`}
					></Box>
				))}
		</Box>
	);
}

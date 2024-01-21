import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridActionsCellItem, useGridApiContext } from '@mui/x-data-grid';
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





export default function ActivityGrid({ rows, name }) {
    const { formik } = useCalculatorForm();
    const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			// event.defaultMuiPrevented = true;
		}
	};
    const processRowUpdate = (newRow) => {
        const activities = JSON.parse(JSON.stringify(formik.values?.activities || {}));
        activities[name] = activities[name] || [];
        const activityIndex = activities[name].findIndex((activity) => activity.id === newRow.id);
        if (activityIndex > -1) {
            activities[name][activityIndex] = newRow;
            formik.setFieldValue('activities', activities);
		}
        return newRow;
    };

    const handleDeleteClick = useCallback(
		(id) => {
			const activities = JSON.parse(JSON.stringify(formik.values?.activities || {}));
			activities[name] = activities[name] || [];
			activities[name] = activities[name].filter((activity) => activity.id !== id);
			formik.setFieldValue('activities', activities);
		},
		[formik.values, name]
	);
    
    const columns = [
		{ field: 'id', headerName: 'ID', hide: true },
		{ field: 'name', headerName: 'Name', width: 200 },
		{
			field: 'amount',
			headerName: 'Amount',
			editable: true,
			type: 'number',
			width: 160,
			min: 0,
			renderEditCell: (params) => <CustomEditTextField {...params} />
		},
		{
			field: 'unit',
			headerName: 'Unit'
		},
		{
			field: 'factor',
			headerName: 'Description',
			editable: true,
			width: 160
		},
		{
			field: 'description',
			headerName: 'Description',
			editable: true,
			width: 160
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
		<Box sx={{ height: 200, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5
						}
					}
                }}
                sx={{
                    '.MuiDataGrid-cell.MuiDataGrid-cell--editing': {
                    boxShadow: 'none'
                    },
                    '.MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within': {
                        outline: 'none'
                    }
                }}
                // density={'compact'}
				pageSizeOptions={[5, 10, 20]}
				onRowEditStop={handleRowEditStop}
				checkboxSelection
				disableRowSelectionOnClick
				processRowUpdate={processRowUpdate}
			/>
		</Box>
	);
}
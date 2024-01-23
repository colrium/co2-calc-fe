import { setCalculatorContext } from '@/store/calculatorSlice';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function AssessmentsGrid({ rows }) {
    const {active, ...context} = useSelector((storeState) => ({ ...storeState.calculator.context }));
    const dispatch = useDispatch();
    const handleSetActive = (active) => {		
		dispatch(setCalculatorContext({ ...context, active }));
	};
	const columns = [
		//{ field: 'id', headerName: 'ID', hide: true },
		{ field: 'year', headerName: 'Year', width: 200 },
		{
			field: 'lastModified',
			headerName: 'Modified',
			type: 'string',
			width: 160,
			valueGetter: (params) => {
				if (!params.value) {
					return params.value;
				}
				return dayjs().toNow(dayjs(params.value));
			}
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',

            getActions: (params) => {
                const index = rows.findIndex((row) => row.year === params.id);
                
                return active !== index
					? [
							<GridActionsCellItem
								icon={<EditIcon />}
								label="Edit"
								color="info"
								onClick={() => handleSetActive(index)}
								key={params.id}
							/>
					  ]
					: [
							<Button
                            color="info"
                            
								key={params.id}
							> Current </Button>
					  ];}
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
                getRowId={(row) => row.year}
                hideFooter
				disableRowSelectionOnClick
			/>
		</Box>
	);
}

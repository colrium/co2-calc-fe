import { useMutationsCount, useSetState, useUniqueEffect } from "@/hooks";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import pluralize from "pluralize";
import { forwardRef, useCallback, useMemo } from "react";
import { formatQuery } from "react-querybuilder";
import ModelDataGridProvider, { useModelDataGrid } from "./Contex";
import QueryEditor from "./QueryEditor";
const { Grid, CardActions, CardContent, CardHeader, Card, Button, Box, Typography, Fab, LinearProgress } = require('@mui/material');

const StyledGridOverlay = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	'& .ant-empty-img-1': {
		fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626'
	},
	'& .ant-empty-img-2': {
		fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959'
	},
	'& .ant-empty-img-3': {
		fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343'
	},
	'& .ant-empty-img-4': {
		fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c'
	},
	'& .ant-empty-img-5': {
		fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
		fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff'
	}
}));

export const NoRowsOverlay = ({message='No Rows'}) => {
	return (
		<StyledGridOverlay>
			<svg style={{ flexShrink: 0 }} width="140" height="100" viewBox="0 0 184 152" aria-hidden focusable="false">
				<g fill="none" fillRule="evenodd">
					<g transform="translate(24 31.67)">
						<ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
						<path
							className="ant-empty-img-1"
							d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
						/>
						<path
							className="ant-empty-img-2"
							d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
						/>
						<path
							className="ant-empty-img-3"
							d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
						/>
					</g>
					<path
						className="ant-empty-img-3"
						d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
					/>
					<g className="ant-empty-img-4" transform="translate(149.65 15.383)">
						<ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
						<path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
					</g>
				</g>
			</svg>
			<Box sx={{ mt: 1 }}>{message}</Box>
		</StyledGridOverlay>
	);
}

const dataGridSx = { '--DataGrid-overlayHeight': '200px' }
const CustomToolbar = forwardRef((props, ref) => {
	const {query, patch, model} = useModelDataGrid()
	return (
		<Grid rowSpacing={1} container>
			<Grid item xs={12}>
				<GridToolbar {...props} ref={ref} />
			</Grid>
			<Grid item xs={12} className="p-2">
				<QueryEditor value={query} onChange={(query) => patch({ query })} model={model} />
			</Grid>
		</Grid>
	);
});

const localText = {
	// Filter operators text
	filterOperatorContains: 'contains',
	filterOperatorEquals: '=',
	filterOperatorStartsWith: 'beginsWith',
	filterOperatorEndsWith: 'endswith',
	filterOperatorIs: '=',
	filterOperatorNot: '!=',
	filterOperatorAfter: 'is after',
	filterOperatorOnOrAfter: 'is on or after',
	filterOperatorBefore: 'is before',
	filterOperatorOnOrBefore: 'is on or before',
	filterOperatorIsEmpty: 'null',
	filterOperatorIsNotEmpty: 'notNull',
	filterOperatorIsAnyOf: 'is any of',
	'filterOperator=': '=',
	'filterOperator!=': '!=',
	'filterOperator>': '>',
	'filterOperator>=': '>=',
	'filterOperator<': '<',
	'filterOperator<=': '<='
};
const slots = {
	noRowsOverlay: NoRowsOverlay,
	loadingOverlay: LinearProgress,
	toolbar: CustomToolbar
};

const slotProps = {
	panel: {
		sx: {
			'& .MuiPaper-root': {
				backgroundColor: (theme) => `${theme.palette.background.dark} !important`,
				backgroundImage: (theme) =>
					`linear-gradient(${alpha(theme.palette.background.dark, 1)}, ${alpha(
						theme.palette.background.dark,
						1
					)})`,
				'& select': {
					backgroundColor: (theme) => `${theme.palette.background.dark} !important`
				}
			}
		}
	},
	menuList: {
		sx: {
			backgroundColor: (theme) => `${theme.palette.background.dark} !important`,
			backgroundImage: (theme) =>
				`linear-gradient(${alpha(theme.palette.background.main, 0.15)}, ${alpha(
					theme.palette.background.dark,
					0.25
				)})`
		}
	}
};
const ModelDataGrid = forwardRef(({model, onOpenForm, title, onDelete, loading: parentLoading}, ref) => {
	const initialColumnVisibilityModel = useMemo(() =>model.getInitialGridColumnVisibilityModel(), [model])
    const [state, setState] = useSetState({
		loading: false,
		rows: [],
		pages: 0,
		rowCount: 0,
		columnVisibilityModel: initialColumnVisibilityModel,
		paginationModel: { pageSize: 10, page: 0 },
		query: {},
		filterModel: {}
	});

	const loadCount = useMutationsCount([state.paginationModel, state.query]);
	const query = useMemo(
		() => {
			let mongoQuery = {}
			if (Object.keys(state.query).length > 0) {
				let mongoqueryStr;
				try {
					mongoqueryStr = formatQuery(state.query, 'mongodb');
					mongoQuery = mongoqueryStr? JSON.parse(mongoqueryStr) : {};
				} catch (error) {
					console.log('error', error)
				}
			}
			console.log('state.query', state.query);
			return ({...mongoQuery, perPage: state.paginationModel.pageSize, page: state.paginationModel.page + 1 })},
		[loadCount]
	);
	
	const onRowDoubleClick = ({id}) => {
		if (typeof onOpenForm === 'function') {
			onOpenForm(id);
		}
	}

	const fetchData = useCallback(() => {
		setState({ loading: true, rows: []});
		model
			.list({...query, lookup: 1})
			.then(({ data: rows, pages, perPage, count: rowCount }) => {
				setState({ rows, pages, rowCount });
			})
			.catch((error) => console.error(`Error fetching ${pluralize(model.title || 'Record')}`, error))
			.finally(() => {
				setState({ loading: false });
			});
		
	}, [loadCount]);

	useUniqueEffect(fetchData, [loadCount]);

	const columns = useMemo(
		() => [
			...model.columns,
			{
				field: 'actions',
				type: 'actions',
				width: 80,
				getActions: ({id}) => {					
					return [
						<GridActionsCellItem
							icon={<EditIcon color={'success'} fontSize="small" />}
							onClick={() => onOpenForm(id)}
							label="Edit"
							showInMenu
						/>,
						<GridActionsCellItem
							icon={<DeleteIcon color={'error'} fontSize="small" />}
							onClick={async () => {
								onDelete({ id, callback: fetchData });
							}}
							label="Delete"
							showInMenu
						/>
					];}
			}
		],
		[model]
	);
	const getState = useCallback(() => getState, [state]);
	const onFilterModelChange = useCallback((filterModel) => {
		// Here you save the data you need from the filter model
		console.log('filterModel', filterModel);
		setState({ filterModel: { ...filterModel } });
	}, []);
    return (
		<ModelDataGridProvider
			value={{
				...state,
				onDelete,
				patch: setState,
				getState,
				model,
				onOpenForm,
				title,
				loading: state.loading || parentLoading
			}}
		>
			<Grid padding={3} container>
				<Grid item xs={12}>
					<Card elevation={0} className="surface">
						<CardHeader
							title={pluralize(title)}
							subheader={pluralize(model.subtitle)}
							className="items-center"
							sx={{
								'& .MuiCardHeader-subheader': {
									color: (theme) => theme.palette.secondary.main
								}
							}}
							action={
								<Box className="flex gap-4">
									<Button size="small" onClick={fetchData} color="info" startIcon={<RefreshIcon />}>
										Refresh
									</Button>
									<Button
										size="small"
										onClick={() => onOpenForm(null)}
										color="success"
										// variant="contained"
										startIcon={<AddIcon />}
									>
										New
									</Button>
								</Box>
							}
						/>
						<CardContent>
							<Grid container>
								<Grid item xs={12}>
									<DataGrid
										rowCount={state.rowCount}
										pageSizeOptions={[10, 25, 50, 100]}
										rows={state.rows}
										onRowDoubleClick={onRowDoubleClick}
										columns={columns}
										paginationModel={state.paginationModel}
										onPaginationModelChange={(paginationModel) => setState({ paginationModel })}
										slots={slots}
										filterMode="server"
										onFilterModelChange={onFilterModelChange}
										slotProps={slotProps}
										disableRowSelectionOnClick
										loading={state.loading || parentLoading}
										sx={dataGridSx}
										paginationMode="server"
										columnVisibilityModel={state.columnVisibilityModel}
										onColumnVisibilityModelChange={(columnVisibilityModel) =>
											setState({ columnVisibilityModel })
										}
										initialState={{
											columns: {
												columnVisibilityModel: initialColumnVisibilityModel
											}
										}}
										autoHeight
									/>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ModelDataGridProvider>
	);
})

export default ModelDataGrid;
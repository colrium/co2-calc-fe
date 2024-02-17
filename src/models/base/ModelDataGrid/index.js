import { useSetState } from "@/hooks";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { forwardRef } from "react";
const { Grid, CardActions, CardContent, CardHeader, Card, Button, Box, Typography, Fab } = require('@mui/material');


const ModelDataGrid = forwardRef(({model, onOpenForm, title}, ref) => {
    const [state, setState] = useSetState({
        loading: false,
        rows: []
    })
    return (
		<Box>
			<Grid padding={3} container>
				<Grid item xs={12}>
					<Card >
						<CardHeader
							title={title}
							subheader={model.subtitle}
                            sx={{
                                '& .MuiCardHeader-action': {
                                    width: theme => theme.spacing(10)
                                }
                            }}
							action={
								<Box className="relative" >
									<Fab
										size="small"
										className="absolute -bottom-12 right-12"
										onClick={() => onOpenForm(null)}
										color="success"
										aria-label="add"
									>
										<AddIcon />
									</Fab>
								</Box>
							}
						/>
						<CardContent>
							<Grid container>
								<Grid item xs={12}>
									<DataGrid
										rows={state.rows}
										columns={model.fields}
										disableRowSelectionOnClick
										autoHeight
									/>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
})

export default ModelDataGrid;
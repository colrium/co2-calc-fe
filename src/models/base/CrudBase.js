import { useSetState, useUniqueEffect } from '@/hooks';
import { useCallback, useMemo } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import pluralize, { singular } from 'pluralize';
import { useModelForm } from '@/contexts/ModelForm';

const CrudBase = ({ model, ...rest}) => {
	const [state, setState] = useSetState({
		loading: false,
        lookups: {},
        record: null,
		deleteId: false,
	});
    const router = useRouter();
	const searchParams = useSearchParams();
    const {query} = router;
    const activeRecordId = searchParams.get("id");
	const {destroy: destroyForm, init: initForm, context} = useModelForm()
	const Form = useMemo(() => model.Form, [model]);
    const DataGrid = useMemo(() => model.DataGrid, [model]);
    
    
    const onOpenForm = useCallback((id=null) => {
        router.push(`${router.pathname}?id=${id || 'new'}`);
    }, [activeRecordId, query]);


	
    const onCloseForm = useCallback(
		(updateURL = true, replace = false) => {
			if (updateURL) {
				const params = new URLSearchParams(searchParams.toString());
				params.delete('id');
				const uri = query.returnTo
					? decodeURIComponent(query.returnTo)
					: `${router.pathname}${params.size > 0 ? '?' : ''}${params.toString()}`;
				
				const action = replace ? router.replace : router.push;
				action(uri);
				
			}
			destroyForm()
		},
		[activeRecordId, query, searchParams]
	);

	
	const handleDeleteRecord = useCallback(
		({ id = null, confirm = true, name = null, callback=null } = {}) => {
			if (id) {
				if (confirm) {
					setState({ confirmDeleteId: id, confirmDeleteName: name || id, confirmDeleteCb: callback });
				} else {
					setState({ loading: true, lookups: {}, record: null });
					axios
						.delete(`${model.endpoint}/${id}`)
						.then((res) => {
							setState({ confirmDeleteId: null, confirmDeleteName: null, confirmDeleteCb: null });
							if (activeRecordId === id) {
								onCloseForm(true);
							}
							if (typeof callback === 'function') {
								callback();
							}
						})
						.catch((err) => console.error('error fetching record', err))
						.finally(() => setState({ loading: false }));
				}
			}
		},
		[activeRecordId, query]
	);


    useUniqueEffect(() => {
        if (activeRecordId) {
            initForm(model, activeRecordId);
		}
		else {
			destroyForm()
		}
	}, [activeRecordId]);
	
	return (
		<Box>
			<Head>
				<title>{activeRecordId ? singular(model.title) : pluralize(model.title)}</title>
			</Head>
			{Boolean(activeRecordId)
				? Boolean(Form) && (
						<Form
							loading={state.loading}
							model={model}
							title={singular(model.formTitle || model.title)}
							subtitle={model.formSubtitle || model.subtitle}
							onCloseForm={onCloseForm}
						id={activeRecordId}
							onDelete={handleDeleteRecord}
						/>
				  )
				: Boolean(DataGrid) && (
						<DataGrid
							title={pluralize(model.gridTitle || model.title)}
							onOpenForm={onOpenForm}
							onDelete={handleDeleteRecord}
						/>
				  )}

			<Dialog
				sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
				maxWidth="xs"
				open={!!state.confirmDeleteId}
			>
				<DialogTitle color={'warning'}>Delete</DialogTitle>
				<DialogContent dividers>
					<Typography variant="body2" className="w-full text-center">
						Confirm Delete record:
					</Typography>
					<Typography variant="subtitle1" className="w-full text-center">
						{state.confirmDeleteName}
					</Typography>
					<Typography variant="body2" color={'orange.main'} className="w-full text-center">
						This Action is irreversible
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						size="small"
						variant="contained"
						color="background"
						onClick={() => setState({ confirmDeleteId: null })}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="error"
						size="small"
						onClick={() => handleDeleteRecord({ id: state.confirmDeleteId, confirm: false, callback: state.confirmDeleteCb}, )}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default CrudBase;

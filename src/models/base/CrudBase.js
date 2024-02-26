import { useSetState, useUniqueEffect } from '@/hooks';
import { useCallback, useMemo } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import pluralize, { singular } from 'pluralize';

const CrudBase = ({ model, ...rest}) => {
	const [state, setState] = useSetState({
		loading: false,
        lookups: {},
        record: null,
		deleteId: false,
	});
    const router = useRouter();
    const {query} = router;
    const activeRecordId = query?.id?? undefined;
	const Form = useMemo(() => model.Form, [model]);
    const DataGrid = useMemo(() => model.DataGrid, [model]);
    const activeRecord = useMemo(() => {
		if (typeof activeRecordId !== 'undefined') {
            let record = { ...state.record };
			const fieldNames = model.fields.map(({ name }) => name);
			for (let [key, value] of Object.entries(query)) {
				if (fieldNames.includes(key)) {
					record[key] = value;
				}
			}
			return {
				record,
				lookups: state.lookups,
				isNew: !/^[0-9a-fA-F]{24}$/.test(activeRecordId)
			};
		}
        return;
	}, [model, query, activeRecordId, state.loading]);
    
    const onOpenForm = useCallback((id=null) => {
        router.push(`${router.pathname}?id=${id || 'new'}`);
    }, [activeRecordId, query]);


	
    const onCloseForm = useCallback(() => {
		if (query.returnTo) {
			router.push(decodeURIComponent(query.returnTo));
		} else {
			router.push(router.pathname);
		}
	}, [activeRecordId, query]);

	const confirmDeleteRecord = useCallback(
		(id = null) => {
			setState({ confirmDelete: id });
		},
		[activeRecordId, query]
	);

	const deleteRecord = useCallback(
		(id = null) => () => {
			setState({ loading: true, lookups: {}, record: null });
			axios
				.delet(`${model.endpoint}/${id}`)
				.catch((err) => console.error('error fetching record', err))
				.finally(() => setState({ loading: false }));
		},
		[]
	);

    const fetchRecord = useCallback((id) => {
		setState({ loading: true, lookups: {}, record: null });
        axios
			.get(`${model.endpoint}/${id || 'new'}`, {params: {lookups: true}})
			.then((res) => {
				const { data: record, lookups } = res.data;
				console.log(record)
				setState({ lookups, record });
			})
			.catch((err) => console.error('error fetching record', err))
			.finally(() => setState({ loading: false }));

	}, [model]);

    useUniqueEffect(() => {
        if (activeRecordId) {
            fetchRecord(activeRecordId);
		}
    }, [activeRecordId]);
	return (
		<Box>
			<Head>
				<title>{activeRecordId ? singular(model.title) : pluralize(model.title)}</title>
			</Head>
			{Boolean(activeRecord?.record)
				? Boolean(Form) && (
						<Form
							loading={state.loading}
							model={model}
							title={singular(model.formTitle || model.title)}
							subtitle={model.formSubtitle || model.subtitle}
							onCloseForm={onCloseForm}
							activeRecord={activeRecord}
							onDelete={confirmDeleteRecord}
						/>
				  )
				: Boolean(DataGrid) && (
						<DataGrid
							title={pluralize(model.gridTitle || model.title)}
							onOpenForm={onOpenForm}
							onDelete={confirmDeleteRecord}
						/>
				  )}

			<Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={!!state.deleteId}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent dividers>{`Delete record with id: ${state.deleteId}`}</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={() => setState({ deleteId: null })}>
						Cancel
					</Button>
					<Button onClick={deleteRecord(state.deleteId)}>Delete</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default CrudBase;

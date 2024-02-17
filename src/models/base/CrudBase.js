import { useSetState, useUniqueEffect } from '@/hooks';
import { useCallback, useMemo } from 'react';

import { Box } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import pluralize, { singular } from 'pluralize';

const CrudBase = ({ model, ...rest}) => {
	const [state, setState] = useSetState({
		loading: false,
        lookups: {},
        record: null
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

    const fetchRecord = useCallback((id) => {
		setState({ loading: true, lookups: {}, record: null });
        axios
			.get(`${model.endpoint}/${id || 'new'}`, {params: {lookups: true}})
			.then((res) => {
				const { data: record, lookups } = res.data;
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
				<title>{model.title}</title>
			</Head>
			{Boolean(activeRecord)
				? Boolean(Form) && (
						<Form
							loading={state.loading}
							model={model}
							title={singular(model.formTitle || model.title)}
							subtitle={model.formSubtitle || model.subtitle}
							onCancel={onCloseForm}
							activeRecord={activeRecord}
						/>
				  )
				: Boolean(DataGrid) && <DataGrid title={pluralize(model.formTitle || model.title)} onOpenForm={onOpenForm} />}
		</Box>
	);
};

export default CrudBase;

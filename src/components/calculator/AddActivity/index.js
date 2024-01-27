/** @format */

import AsyncAutocomplete from '@/components/common/AsyncAutocomplete';
import { useMutationsCount, useSetState, useUniqueEffect } from '@/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';
import { useCalculatorForm } from '../CalculatorProvider';
export default function AddActivity({ name, label, scope }) {
	const { formik, factors, fetchFactors } = useCalculatorForm();
	const [state, setState] = useSetState({
		loading: true,
		options: [],
		selections: []
	});
	const loading = factors?.loading === name;
	const open = Boolean(state.anchorEl);
	const activities = formik.values?.activities?.[scope]?.[name] || [];
	const existingActivities = activities.map((activity) => activity.name);
	const mutationCount = useMutationsCount([activities, state.selections]);
	const handleOnAddActivity = useCallback(() => {
		let formikActivities = JSON.parse(JSON.stringify(formik.values?.activities || {}));
		if (!formikActivities[scope]) {
			formikActivities[scope] = {};
		}
		if (!Array.isArray(formikActivities[scope]?.[name])) {
			formikActivities[scope][name] = [];
		}
		formikActivities[scope] = {
			...formikActivities[scope],
			[name]: (formikActivities[scope][name] || []).concat(state.selections)
		};

		formik.setFieldValue('activities', formikActivities);
		setState({ selections: [] });
	}, [mutationCount]);

	const handleOnChange = (e, selections) => {
		selections = selections.map((selection) => ({ ...selection, amount: 0, description: '' }));
		setState({ selections });
	};
	const fetchData = () => {
		if (name) {
			fetch(`/api/factors/${name}`)
				.then((res) => res.json())
				.then(({ factors }) => {
					factors = factors.map((factor) => ({ ...factor, label: factor.name, value: factor.id }));
					setState({ factors });
				})
				.catch((err) => console.error(`/api/factors/${name}`, err))
				.finally(() => setState({ loading: false }));
		} else {
			setState({ loading: false });
		}
	};
	const handleOnCreateOption = ({ option }) => {
		const { id, label } = option;
		const payload = {
			name: label,
			emissionsType: 'fossil',
			unit: 't',
			categoryId: 'custom',
			categoryName: 'Custom',
			regionId: 'ZZGLOBAL',
			yearFrom: 2020,
			yearTo: 2025,
			sections: [name],
			custom: true,
			unit: null
		};
		const formData = new FormData();
		for (const [key, value] of Object.entries(payload)) {
			formData.append(key, value);
		}
		fetch(`/api/factors`, { method: 'POST', body: formData })
			.then((res) => res.json())
			.then(({ factor }) => {})
			.catch((err) => console.error(`/api/factors`, err))
			.finally(() => setState({ loading: false }));
	};
	useUniqueEffect(() => fetchFactors(name), [name]);

	return (
		<Box className="flex items-center gap-4 w-full">
			<AsyncAutocomplete
				loading={loading}
				className="flex-1"
				size="small"
				margin="dense"
				label={`Activity's`}
				placeholder={'Select or create Activity'}
				getOptionDisabled={(option) => existingActivities.includes(option.name)}
				options={factors[name] || []}
				value={state.selections}
				onChange={handleOnChange}
				onCreateOption={handleOnCreateOption}
				multiple
				freeSolo
			/>
			<Button
				size="small"
				variant="contained"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleOnAddActivity}
				disabled={!state.selections?.length}
			>
				Add
			</Button>
		</Box>
	);
}
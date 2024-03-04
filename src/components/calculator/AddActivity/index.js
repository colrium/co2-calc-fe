/** @format */

import AsyncAutocomplete from '@/components/common/AsyncAutocomplete';
import { useMutationsCount, useSetState, useUniqueEffect } from '@/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { selectAuth } from '@/store/authSlice';
import axios from 'axios';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useCalculatorForm } from '../CalculatorProvider';
export default function AddActivity({ name, label, scope }) {
	const { formik, activities, fetchFactors } = useCalculatorForm();
	const {user} = useSelector(selectAuth)
	const [state, setState] = useSetState({
		loading: true,
		options: [],
		selections: []
	});
	const loading = activities?.loading === name;
	const open = Boolean(state.anchorEl);
	const formActivities = formik.values?.activities?.[scope]?.[name] || [];
	const existingActivities = formActivities.map((activity) => activity.name);
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
		selections = selections.map(
			({
				id,
				activityType,
				name,
				emissionType,
				unit,
				description,
				emissionFactor,
				emission,
				year,
				value,
				label: label,
				...rest
			}) => ({
				id: id || value,
				activityType,
				name: name || value,
				label: name || label,
				value: id || value || label,
				emissionType: emissionType || 'biogenic',
				unit,
				description: description || '',
				emissionFactor: emissionFactor ?? 1.8,
				emission: 0,
				year: year,
				amount: 0,
				description: '',
				...rest
			})
		);
		setState({ selections });
	};
	const handleOnCreateOption = async ({ option }) => {
		const { id, label } = option;
		const payload = {
			name: label,
			emissionType: 'biogenic',
			emissionFactor: 0.1,
			unit: 't',
			categoryId: 'custom',
			categoryName: 'Custom',
			regionId: 'ZZGLOBAL',
			yearFrom: 2020,
			yearTo: 2025,
			sections: [name],
			custom: true,
			userId: user?.id ?? null,
			unit: 't'
		};
		return await axios
			.post(`/api/activities`, payload)
			.then(({ data: factor }) => {
				if (factor?.id) {
					return { ...factor, label: factor.name, value: factor.id };
					
				}
				
			})
			.catch((err) => console.error(`/api/activities`, err))
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
				options={activities[name] || []}
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

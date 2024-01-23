/** @format */

import AsyncAutocomplete from '@/components/common/AsyncAutocomplete';
import { useSetState, useUniqueEffect } from '@/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { useCalculatorForm } from '../CalculatorProvider';
export default function AddActivityButton({ name, label, type }) {
	const { formik } = useCalculatorForm();
	const [state, setState] = useSetState({
		loading: true,
		options: [],
		selections: [],
	});

	const open = Boolean(state.anchorEl);
	const activities = formik.values?.activities?.[type]?.[name] || [];
	const existingActivities = activities.map((activity) => activity.name);
	
	
	const handleOnAddActivity = () => {
		let activities = JSON.parse(JSON.stringify(formik.values?.activities || {}));
		activities = {
			...activities,
			[type]: { ...activities[type], [name]: (activities[name] || []).concat(state.selections) }
		};
		formik.setFieldValue('activities', activities);
		setState({ selections: [] });
	};

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
				.then((err) => console.error(`/api/factors/${name}`, err))
				.finally(() => setState({ loading: false }));
		} else {
			setState({ loading: false });
		}
	}
	const handleOnCreateOption = ({option}) => {
		const {id, label} = option
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
			.then(({factor}) => {
			})
			.then((err) => console.error(`/api/factors`, err))
			.finally(() => setState({ loading: false }));
	};
;
	useUniqueEffect(() => fetchData, [name]);

	return (
		<Box className="flex items-center gap-4 w-full">
			<AsyncAutocomplete
				loading={state.loading}
				className="flex-1"
				size="small"
				margin="dense"
				label={`Activity's`}
				placeholder={'Select or create Activity'}
				getOptionDisabled={(option) => existingActivities.includes(option.name)}
				options={state.factors}
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

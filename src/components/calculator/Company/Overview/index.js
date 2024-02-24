/** @format */

import AsyncAutocomplete from '@/components/common/AsyncAutocomplete';
import FieldMappers from '@/models/base/Form/FieldMappers';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useCalculatorForm } from '../../CalculatorProvider';

const Select = FieldMappers.select;
export default function Overview() {
	const { formik, activeRecord } = useCalculatorForm();
	const domains = useMemo(() => (activeRecord.lookups?.Domain || []), [activeRecord.lookups]);
	const parseDomainValue = ({ value, options}) => {
		let val = null;
		if (typeof value !== 'undefined') {
			let option = options.find((opt) => opt.value === value);
			
			if (option) {
				val = option;
			}
		}
		return val;
	};
	const domainValueFormatter = useCallback(
		(value) => {
			let val = value?.value ?? null;
			return val;
		},
		[]
	);
	const domain = useMemo(
		() => parseDomainValue({ options: domains, value: formik.values?.domainId }),
		[domains, formik.values?.domainId]
	);
	console.log('formik.values?.domainId', formik.values?.domainId);
	return (
		<Box className="flex p-4 flex-col">
			<Box className="my-2 flex flex-col gap-4">
				<Typography variant="h6">Overview</Typography>
				<Typography>You can add general information for the assessment and select assessment years</Typography>
			</Box>
			<Box className="my-2 ">
				<Box className="mb-8">
					<Typography variant="h6">Basic Information</Typography>
				</Box>
				<Box className="h4 mb-8" />

				<TextField
					label="Name"
					name="name"
					id="name"
					fullWidth
					size="small"
					value={formik.values?.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>
				<Box className="h4 mb-8" />
				<TextField
					label="Description"
					name="description"
					multiline
					minRows={4}
					maxRows={6}
					id="description"
					fullWidth
					size="small"
					value={formik.values?.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.description && Boolean(formik.errors.description)}
					helperText={formik.touched.description && formik.errors.description}
				/>
				<Box className="h4 mb-8" />
				<DatePicker
					label={'Year'}
					openTo="year"
					views={['year']}
					className="w-full"
					size="small"
					value={dayjs().year(formik.values?.year || dayjs().year())}
					onChange={(newValue) => formik.setFieldValue('year', newValue.year())}
					error={formik.touched.year && Boolean(formik.errors.year)}
					helperText={formik.touched.year && formik.errors.year}
					required
					slotProps={{
						textField: {
							size: 'small'
						}
					}}
				/>

				<Box className="h4 mb-8" />
				<AsyncAutocomplete
					label={'Domain'}
					className="w-full"
					size="small"
					valueFormatter={domainValueFormatter}
					value={domain}
					options={domains}
					onChange={(e, newValue) => formik.setFieldValue('domainId', newValue)}
					error={formik.touched.domainId && Boolean(formik.errors.domainId)}
					helperText={formik.touched.domainId && formik.errors.domainId}
				/>
			</Box>

			<Box className="my-1">
				<Typography variant="subtitle1" component="div">
					Assessments
				</Typography>
				{/* <AssessmentsGrid rows={assessments} /> */}
				<Button size="small" color="error">
					Delete assessment
				</Button>
				{/* <Card
					elevation={0}
					className="p-0"
					slotProps={{
						paper: {
							className: 'p-0'
						}
					}}
				>
					<CardContent className="p-0">
						<Typography variant="subtitle1" component="div">
							Assessments
						</Typography>
						<AssessmentsGrid rows={assessments} />
					</CardContent>
					<CardActions>
						<Button size="small" color="error">
							Delete assessment
						</Button>
					</CardActions>
				</Card> */}
			</Box>
		</Box>
	);
}

/** @format */

import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useCalculatorForm } from '../../CalculatorProvider';
export default function Overview() {
	const { formik } = useCalculatorForm();
	const assessments = useSelector(storeState => ([...storeState.calculator?.company]))
	return (
		<Box className="flex p-4 flex-col">
			<Box className="my-2 flex flex-col gap-4">
				<Typography variant="h6">Overview</Typography>
				<Typography>You can add general information for the assessment and select assessment years</Typography>
			</Box>
			<Box className="my-2 flex-col gap-2">
				<Typography variant="h6" className="mb-8">
					Basic Information
				</Typography>
				<TextField
					label="Name"
					name="name"
					id="name"
					fullWidth
					InputProps={{
						className: 'my-2'
					}}
					value={formik.values?.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>

				<TextField
					label="Description"
					name="description"
					multiline
					minRows={4}
					maxRows={6}
					id="description"
					fullWidth
					InputProps={{
						className: 'my-2'
					}}
					value={formik.values?.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.description && Boolean(formik.errors.description)}
					helperText={formik.touched.description && formik.errors.description}
				/>
				<DatePicker
					label={'Year'}
					openTo="year"
					views={['year']}
					className="w-full my-2"
					value={dayjs().year(formik.values?.year || dayjs().year())}
					onChange={(newValue) => formik.setFieldValue('year', newValue.year())}
					error={formik.touched.year && Boolean(formik.errors.year)}
					helperText={formik.touched.year && formik.errors.year}
				/>
				{/* <TextField
					label="Year"
					name="year"
					type="number"
					id="year"
					value={formik.values?.year}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.year && Boolean(formik.errors.year)}
					helperText={formik.touched.year && formik.errors.year}
				/> */}
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

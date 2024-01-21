/** @format */


import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useCalculatorForm } from '../CalculatorProvider';

export default function Overview() {
    const { formik, assessments = [] } = useCalculatorForm();
	return (
		<Box className="flex p-4 flex-col">
			<Box className="my-2 flex flex-col gap-4">
				<Typography variant="h6">Overview</Typography>
				<Typography>You can add general information for the assessment and select assessment years</Typography>
			</Box>
			<Box className="my-2">
				<Typography variant="h6">Basic Information</Typography>
				<Box className="flex flex-col gap-4">
					<TextField
						label="Name"
						name="name"
						id="name"
						value={formik.value?.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.email && formik.errors.name}
					/>

					<TextField
						label="Description"
						name="description"
						multiline
						minRows={6}
						id="description"
						value={formik.values?.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.description && Boolean(formik.errors.description)}
						helperText={formik.touched.email && formik.errors.description}
					/>
				</Box>
			</Box>

			<Box className="my-1">
				<Card>
					<CardContent>
						<Typography variant="h5" component="div">
							Assessments
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" color="error">
							Delete assessment
						</Button>
					</CardActions>
				</Card>
			</Box>
		</Box>
	);
}

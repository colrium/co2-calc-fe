/** @format */


import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useCalculatorForm } from '../../CalculatorProvider';

export default function Overview() {
    const { formik, assessments = [] } = useCalculatorForm();
	return (
		<Box className="flex p-4 flex-col gap-8">
			<Box className="my-2 flex flex-col gap-4">
				<Typography variant="h6">Overview</Typography>
				<Typography>Add general product information and initial details of the product.</Typography>
			</Box>
			<Card className="my-2" variant="outlined">
				<CardContent>
					<Typography variant="h6">Basic Information</Typography>
					<Box className="flex flex-row gap-4">
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
							label="GTIN code"
							name="gtin"
							id="gtin"
							value={formik.values?.gtin}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.gtin && Boolean(formik.errors.gtin)}
							helperText={formik.touched.email && formik.errors.gtin}
						/>
					</Box>
				</CardContent>
			</Card>

			<Card className="my-2" variant="outlined">
				<CardContent>
					<Typography variant="h6">Production Amounts</Typography>
					<Box className="flex flex-row gap-4">
						<TextField
							label="Total Production"
							name="production"
							id="production"
							type="number"
							value={formik.values?.production}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.gtin && Boolean(formik.errors.production)}
							helperText={formik.touched.email && formik.errors.production}
						/>
					</Box>
				</CardContent>
			</Card>

			<Box className="my-1">
				<Button size="small" color="error">
					Delete assessment
				</Button>
			</Box>
		</Box>
	);
}


import { useSetState } from '@/hooks';
import GoogleIcon from '@mui/icons-material/Google';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
	opacity: 1,
	y: 0,
	transition: {
		duration: 0.6,
		ease: easing,
		delay: 0.16
	}
};
const GetStartedSchema = Yup.object().shape({
	email: Yup.string().email('Provide a valid email address').required('Email is required'),
	
});
function GetStarted() {
	const router = useRouter();
	const [state, setState] = useSetState({

	})
	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validationSchema: GetStartedSchema,
		onSubmit: ({email}) => {
			console.log('email', email);
			router.push(`/auth/register?email=${email}`);
		}
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, isValid } = formik;
	console.log('formik', formik);
	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Grid className="p-8" container>
					<Grid item xs={12} className={`block min-h-96`}>
						<Box
							component={motion.div}
							animate={{
								transition: {
									staggerChildren: 0.55
								}
							}}
							className="flex flex-col gap-12 mb-8"
						>
							<Typography variant="h3" className="w-full text-center">
								Track your carbon footprint
							</Typography>
							<Typography variant="subtitle2" className="w-full text-center">
								Step into sustainability: Calculate and Minimize your manufacturing carbon footprint. Begin
								your Green transformation
							</Typography>
						</Box>
						<Box
							component={motion.div}
							animate={{
								transition: {
									staggerChildren: 0.55
								}
							}}
							className="flex flex-col  gap-4"
						>
							<Box className="w-full flex flex-col justify-center items-center gap-4">
								<TextField
									placeholder="Enter your Email"
									label="Email Address"
									type="email"
									className="flex-1"
									size="small"
									margin="dense"
									fullWidth
									autoComplete="new-password"
									{...getFieldProps('email')}
									error={Boolean(touched.email && errors.email)}
									helperText={touched.email && errors.email}
									required
								/>
								<LoadingButton
									disabled={!isValid}									
									size="medium"
									type="submit"
									variant="contained"
									loading={isSubmitting}
								>
									{isSubmitting ? 'Grtting started...' : 'Get Started'}
								</LoadingButton>
								{/* <Button variant="contained" type="submit" disabled={!isValid || isSubmitting}>
									Get Started
								</Button> */}
							</Box>

							<Box className="flex flex-col items-center">
								<Button
									// component={Link}
									// href="/"
									startIcon={<GoogleIcon color="error" />}
								>
									Proceed with Google
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	);
}
export default GetStarted
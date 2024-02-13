import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import TextInput from '../common/form/TextInput';

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

const ForgotPasswordForm = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Provide a valid email address').required('Email is required')
	});

	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			setLoading(true);
			return axios
				.post('/api/auth/send-password-reset', values)
				.then((res) => {
					router.push('/auth/reset-password');
				})
				.catch((err) => console.error('error logging in', err))
				.finally(() => setLoading(false));
		}
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, isValid } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autocomplete="off" onSubmit={handleSubmit}>
				<Box
					component={motion.div}
					animate={{
						transition: {
							staggerChildren: 0.55
						}
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 3
						}}
                        className='mb-8'
						component={motion.div}
						initial={{ opacity: 0, y: 40 }}
						animate={animate}
					>
						<TextInput
							type="email"
							label="Email Address"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>
					</Box>

					<Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={animate}>
						<LoadingButton
							disabled={!isValid}
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isSubmitting}
						>
							{loading ? 'loading...' : 'Recover Password'}
						</LoadingButton>
					</Box>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default ForgotPasswordForm;

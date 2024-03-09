import { setAuthToken, setAuthUser, setLoggedIn } from '@/store/authSlice';
import { LoadingButton } from '@mui/lab';
import { Box, Link, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import TextInput from '../common/TextInput';
import OAuth from './OAuth';


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

const LoginForm = ({ setAuth }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Provide a valid email address').required('Email is required'),
		password: Yup.string().required('Password is required')
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			remember: true
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
			 setLoading(true);
				return axios
					.post('/api/auth/login', values)
					.then((res) => {
						const { token, user } = res.data
						if (user && token) {
							dispatch(setAuthUser(user));
							dispatch(setAuthToken(token));
							dispatch(setLoggedIn(true));
							router.push('/dashboard/overview');
						}
					})
					.catch((err) => {
						console.error('error logging in', err)
						setLoading(false);
					});
		}
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, isValid } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autocomplete="off" noValidate onSubmit={handleSubmit}>
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
						component={motion.div}
						initial={{ opacity: 0, y: 40 }}
						animate={animate}
					>
						<TextInput
							fullWidth
							size="small"
							autoComplete="new-password"
							type="email"
							label="Email Address"
							{...getFieldProps('email')}
							eager
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>

						<TextInput
							type={'password'}
							label="Password"
							{...getFieldProps('password')}
							eager
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
						/>
					</Box>

					<Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={animate}>
						<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
							{/* <FormControlLabel
								control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
								label="Remember me"
							/> */}
							<Box />

							<Link component={NextLink} href="/auth/forgot-password" variant="subtitle2" underline="hover">
								Forgot password?
							</Link>
						</Stack>

						<LoadingButton
							disabled={!isValid}
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isSubmitting}
							className="!rounded-3xl"
						>
							{isSubmitting ? 'loading...' : 'Login'}
						</LoadingButton>
					</Box>

					<Box className="flex flex-col items-center pt-8">
						<Typography variant="body2">Proceed with</Typography>
						<OAuth google iconsOnly={false} />
					</Box>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default LoginForm;

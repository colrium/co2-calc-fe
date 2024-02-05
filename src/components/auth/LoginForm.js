import { Form, FormikProvider, useFormik } from 'formik';
import NextLink from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';
;

import { setAuthToken, setAuthUser, setLoggedIn } from '@/store/authSlice';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

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
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false);
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
		onSubmit: () => {
			 setLoading(true);
				return axios
					.post('/api/auth/login', values)
					.then((res) => {
						const { token, user } = res.data
						debugger;
						if (user && token) {
							dispatch(setAuthUser(user));
							dispatch(setAuthToken(token));
							dispatch(setLoggedIn(true));
							router.push('/dashboard/overview');
						}
					})
					.catch((err) => console.error('error logging in', err))
					.finally(() => setLoading(false));
		}
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
						<TextField
							fullWidth
							size="small"
							autoComplete="username"
							type="email"
							label="Email Address"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>

						<TextField
							fullWidth
							size="small"
							autoComplete="current-password"
							type={showPassword ? 'text' : 'password'}
							label="Password"
							{...getFieldProps('password')}
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={() => setShowPassword((prev) => !prev)}>
											{showPassword ? <Icon icon="eva:eye-fill" /> : <Icon icon="eva:eye-off-fill" />}
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
					</Box>

					<Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={animate}>
						<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
							<FormControlLabel
								control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
								label="Remember me"
							/>

							<Link
								component={NextLink}
								href="/auth/forgot-password"
								variant="subtitle2"
								to="#"
								underline="hover"
							>
								Forgot password?
							</Link>
						</Stack>

						<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
							{isSubmitting ? 'loading...' : 'Login'}
						</LoadingButton>
					</Box>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default LoginForm;

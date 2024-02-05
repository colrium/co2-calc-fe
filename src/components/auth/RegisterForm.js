import { useSetState, useUniqueEffect } from '@/hooks';
import { setAuthToken, setAuthUser, setLoggedIn } from '@/store/authSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
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

const RegisterForm = ({ initialValues }) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [state, setState] = useSetState({
        loading: false,
		showPassword: false,
		showConfirmPassword: false
	});

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Provide a valid email address').required('Email is required'),
		firstname: Yup.string().required('First name is required'),
		lastname: Yup.string().required('Last name is required'),
		password: Yup.string().required('Password is required').min(7),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Confirm Password should match password')
			.required('Confirm Password is required')
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
			firstname: '',
			lastname: '',
			...initialValues
		},
		validationSchema: LoginSchema,
		onSubmit: (values) => {
            setState({loading: true})
			return fetch('/api/auth/register', { method: 'POST', body: values })
				.then((res) => res.json())
				.then(({ token, user }) => {
					if (user && token) {
						dispatch(setAuthUser(user));
						dispatch(setAuthToken(token));
						dispatch(setLoggedIn(true));
						router.push('/dashboard/overview');
					}
				})
				.catch((err) => console.error('error registering', err))
				.finally(() => setState({ loading: false }));
		}
	});

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, isValid } = formik;
    useUniqueEffect(() => {
        setTimeout(() => {
            if (initialValues?.constructor === {}.constructor) {
				for (const [key, value] of Object.entries(initialValues)) {
					if (key in values) {
						formik.setFieldValue(key, value);
					}
				}
			}
        }, 500);
        
    }, [initialValues]);


	


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
						<input type="hidden" autocomplete="false" />
						<TextField
							fullWidth
							size="small"
							autoComplete="off"
							type="email"
							label="Email Address"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
							autoFocus
							required
						/>

						<TextField
							fullWidth
							size="small"
							type="text"
							label="First Name"
							{...getFieldProps('firstname')}
							error={Boolean(touched.firstname && errors.firstname)}
							helperText={touched.firstname && errors.firstname}
							required
						/>

						<TextField
							fullWidth
							size="small"
							type="text"
							label="Last Name"
							{...getFieldProps('lastname')}
							error={Boolean(touched.lastname && errors.lastname)}
							helperText={touched.lastname && errors.lastname}
							required
						/>

						<TextField
							fullWidth
							size="small"
							autoComplete="current-password"
							type={state.showPassword ? 'text' : 'password'}
							label="Password"
							{...getFieldProps('password')}
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setState((prev) => ({ showPassword: !prev.showPassword }))}
										>
											{state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
										</IconButton>
									</InputAdornment>
								)
							}}
						/>

						<TextField
							fullWidth
							size="small"
							autoComplete="current-password"
							type={state.showConfirmPassword ? 'text' : 'password'}
							label="Confirm Password"
							{...getFieldProps('confirmPassword')}
							error={Boolean(touched.confirmPassword && errors.confirmPassword)}
							helperText={touched.confirmPassword && errors.confirmPassword}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() =>
												setState((prev) => ({ showConfirmPassword: !prev.showConfirmPassword }))
											}
										>
											{state.showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
					</Box>

					<Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={animate}>
						<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
							{/* <FormControlLabel
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
							</Link> */}
						</Stack>

						<LoadingButton
							disabled={!isValid}
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={state.loading}
						>
							{state.loading ? 'loading...' : 'Register'}
						</LoadingButton>
					</Box>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default RegisterForm;

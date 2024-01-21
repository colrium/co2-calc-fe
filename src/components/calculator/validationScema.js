import * as yup from 'yup';

const validationSchema = yup.object({
	name: yup.string('Enter Estimation name').required('Name is required'),
	password: yup
		.string('Enter your password')
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required')
});

export default validationSchema;

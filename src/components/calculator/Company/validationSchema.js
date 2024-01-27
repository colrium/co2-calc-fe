import * as yup from 'yup';

const validationSchema = yup.object({
	name: yup.string('Enter Estimation name').required('Name is required'),
	year: yup.number('Enter Year').min(2000, 'Minimum year is ').required('Year is required')
});

export default validationSchema;

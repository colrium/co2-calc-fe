import * as yup from 'yup';

const validationSchema = yup.object({
	name: yup.string('Enter Estimation name').required('Name is required')
});

export default validationSchema;

/** @format */

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ActivityGrid from '../ActivityGrid';
import AddActivityButton from '../AddActivityButton';
import { useCalculatorForm } from '../CalculatorProvider';
export default function ActivityCard({name, label, types}) {
    const { formik } = useCalculatorForm();
    const formikActivities = formik.values.activities || {};
    const activities =  formikActivities[name] || [];
	return (
		<Card key={name} variant="outlined">
			<CardContent>
				<Typography variant="h6">{label}</Typography>
				<Box>
					<ActivityGrid rows={activities} name={name} />
				</Box>
			</CardContent>
			<CardActions>
				<AddActivityButton name={name} options={types} />
			</CardActions>
		</Card>
	);
}

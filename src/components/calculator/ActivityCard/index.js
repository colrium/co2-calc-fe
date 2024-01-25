/** @format */

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ActivityGrid from '../ActivityGrid';
import AddActivityButton from '../AddActivityButton';
import { useCalculatorForm } from '../CalculatorProvider';
export default function ActivityCard(props) {
	const {name, label, type, definition } = props
    const { formik } = useCalculatorForm();
    const formikActivities = formik.values.activities || {};
	const activities = formikActivities[type]?.[name] || [];
	return (
		<Card key={name} variant="outlined">
			<CardContent>
				<Box className="flex gap-2 mb-2">
					<Typography variant="h6" >
						{label}
					</Typography>
					<Tooltip title={definition}>
						<IconButton>
							<HelpOutlineOutlinedIcon />
						</IconButton>
					</Tooltip>
				</Box>

				<Box>
					<ActivityGrid rows={activities} name={name} type={type} />
				</Box>
			</CardContent>
			<CardActions>
				<AddActivityButton label={label} name={name} type={type} />
			</CardActions>
		</Card>
	);
}

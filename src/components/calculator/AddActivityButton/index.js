/** @format */

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useCalculatorForm } from '../CalculatorProvider';
export default function AddActivityButton({name, options=[]}) {
	const { formik } = useCalculatorForm();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const activities = formik.values?.activities?.[name] || [];
    const existingActivities = activities.map((activity) => activity.name);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
    };
    const handleOnAddActivity = (activity) => () => {
        setAnchorEl(null);
        let activities = formik.values?.activities || {}
        const activitiesArr = activities[name] || []
        activities[name] = [...activitiesArr, { ...activity, amount: 0, description: '', id: activity.id || activitiesArr.length+ 1 }];
        formik.setFieldValue(activities);
	};
    return (
		<Box>
			<Button
				size="small"
				variant="contained"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				Add Activity
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				{Array.isArray(options) &&
					options.map((activity, index) => (
						<MenuItem
							key={`${name}-${index}`}
							onClick={handleOnAddActivity(activity)}
							disabled={existingActivities.includes(activity.name)}
						>
							{activity.name}
						</MenuItem>
					))}
			</Menu>
		</Box>
	);
}

/** @format */
'use client';
import { Box, Button, Grid, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';

const options = [
	{ option: 'emmisions', label: 'Emissions forn site e.g. Site activities - dyeing' },
	{ option: 'energy-consumptions', label: 'Energy consumptions - e.g. Electricity, Steam' },
	{ option: 'targeted-manufacturing', label: 'Targeted Manufacturing process - e.g. Waste management, Raw material prep' }
];
function SelectTargetArea() {

    const [value, setValue] = React.useState('');
	const [error, setError] = React.useState(false);
	const [helperText, setHelperText] = React.useState('');

	const handleRadioChange = (event) => {
		setValue(event.target.value);
		setHelperText(' ');
		setError(false);
	};
	return (
		<Grid
			className="p-8"
			container
		>
			<Grid
				item
				className={`block p-8`}
			>
				<Box className="flex flex-col mb-2">
					<Typography variant="h5">What is your carbon levels?</Typography>
					{/* <Typography>Select your target areas?</Typography> */}
				</Box>
				<Box className="flex flex-col gap-4">
					<FormControl
						sx={{ m: 3 }}
						// error={error}
						variant="standard"
					>
						<FormLabel id="demo-error-radios">Select your target areas?</FormLabel>
						<RadioGroup
							aria-labelledby="demo-error-radios"
							name="quiz"
							value={value}
							onChange={handleRadioChange}
						>
							{options.map(({ option, label }) => (
								<FormControlLabel
									value={option}
									control={<Radio />}
									label={label}
									key={option}
								/>
							))}
						</RadioGroup>
						<FormHelperText>{helperText}</FormHelperText>
						<Button
							sx={{ mt: 1, mr: 1 }}
							variant="contained"
						>
							Compute CO<sup>2</sup>
						</Button>
					</FormControl>
				</Box>
			</Grid>
		</Grid>
	);
}
export default SelectTargetArea;

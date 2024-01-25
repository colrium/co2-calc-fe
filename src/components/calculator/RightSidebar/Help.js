import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CircularProgress, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useCalculatorForm } from '../CalculatorProvider';
const CompanyOverviewHelp = () => {
	
	return (
		<Box>
			<Typography variant="subtitle1" color="textSecondary" paragraph>
				CORPORATE GHG EMISSIONS (SCOPE 1 - 3)
			</Typography>
			<Typography variant="body2" paragraph>
				Set targets, monitor progress and identify key focus areas for climate action by calculating greenhouse gas
				(GHG) emissions with Biocode across Scopes 1-3 defined by the GHG Protocol.
			</Typography>
			<Typography variant="subtitle1" color="textSecondary" paragraph>
				WHAT ARE SCOPES 1-3?
			</Typography>
			<Typography variant="body2" paragraph>
				Set targets, monitor progress and identify key focus areas for climate action by calculating greenhouse gas
				(GHG) emissions with Biocode across Scopes 1-3 defined by the GHG Protocol.
			</Typography>
			<Box component="ol">
				<Typography component="li" variant="body2" paragraph>
					Scope 1: Direct emissions
				</Typography>
				<Typography component="li" variant="body2" paragraph>
					Scope 2: Indirect emissions from purchased energy
				</Typography>
				<Typography component="li" variant="body2" paragraph>
					Scope 3 Upstream: Indirect value-chain emissions before company operations
				</Typography>
				<Typography component="li" variant="body2" paragraph>
					Scope 3 Downstream: Indirect value-chain emissions after company operations
				</Typography>
			</Box>
		</Box>
	);
};

const AcivityTypeAccordion = ({ expanded, definition, example, label, onChange, index }) => {
	return (
		<Box className="my-2">
			<Accordion
				elevation={0}
				slotProps={{ transition: { unmountOnExit: true } }}
				expanded={expanded}
				onChange={onChange(index)}
			>
				<AccordionSummary
					expandIcon={<ArrowDropDownIcon />}
					aria-controls={`panel${index}-content`}
					id={`panel${index}-header`}
					className="px-0"
				>
					<Typography>{label}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant="subtitle1" color="textSecondary">
						Definition
					</Typography>
					<Typography variant="body2" paragraph>
						{definition}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Example
					</Typography>
					<Typography variant="body2">{example}</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default function Help() {
    const { formik, stepName, activityTypes, name, steps, step } = useCalculatorForm();
	const stepActivityTypes = activityTypes[stepName];
	const [expanded, setExpanded] = useState(0);
	const loading = activityTypes?.loading === stepName;
	const handleChange = (i) => (event, isExpanded) => {
		setExpanded(isExpanded ? i : false);
	};

	return (
		<Box className="flex flex-col" sx={{'& .MuiAccordionSummary-root': {pl: 0, pr: 0, p: 0}}}>
			<Typography variant="h5" color="textSecondary" paragraph>
				{steps[step]?.label}
			</Typography>
			{name === 'company' && stepName === 'overview' && <CompanyOverviewHelp />}
			{loading && <Box className="flex items-center p-4 justify-center">
				<CircularProgress size={20} />
			</Box>}
			{!loading && Array.isArray(stepActivityTypes) &&
				stepActivityTypes.map((stepActivityType, i) => (
					<AcivityTypeAccordion
						{...stepActivityType}
						index={i}
						onChange={handleChange}
						expanded={expanded === i}
						key={`stepActivityType-${i}`}
					/>
				))}
		</Box>
	);
}

/** @format */

import CalculatorForm from '@/components/calculator/CalculatorForm';
import { Box } from '@mui/material';

export default function Calcutale() {
	return (
		<main className="flex p-4">
			<Box className="p-4 mb-4">
				<CalculatorForm />
			</Box>
		</main>
	);
}

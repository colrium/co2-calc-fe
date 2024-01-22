/** @format */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export default function RawMaterials() {
	return (
		<Box className="flex p-4 flex-col">
			<Box className="my-2 flex flex-col gap-4">
				<Typography variant="h4">Raw materials</Typography>
				<Typography paragraph>
					List and define all raw materials that are used in life cycle of the product. You can also add process
					calculation for raw materials to increase precision and allow more accurate insights for CO2 footprints
					contributed by materials.
				</Typography>
			</Box>
			<Box className="my-2 flex flex-col gap-4">
				
			</Box>
		</Box>
	);
}

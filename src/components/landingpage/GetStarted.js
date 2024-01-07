
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
function GetStarted() {
	return (
		<Grid
			className="p-8"
			container
		>
			<Grid
				item
				md={6}
				className={`block min-h-96`}
			>
				<Box className="flex flex-col gap-12 mb-8">
					<Typography variant="h3">Track your carbon footprint</Typography>
					<Typography>
						Step into sustainability: Calculate and Minimize your manufacturing carbon footprint. Begin your Green
						transformation
					</Typography>
				</Box>
				<Box className="flex flex-col gap-4">
					<Box className="w-full flex items-center gap-8">
						<TextField
							placeholder="Your Email"
							label="Enter your Email"
							type="email"
                            className="flex-1"
                            size="small"
                            margin="dense"
						/>
						<Button variant="contained">Get Started</Button>
					</Box>
					<Button>Or Signup with Google</Button>
				</Box>
			</Grid>
			<Grid
				item
				md={6}
			></Grid>
		</Grid>
	);
}
export default GetStarted
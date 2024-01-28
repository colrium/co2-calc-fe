
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
function GetStarted() {
	return (
		<Grid className="p-8" container>
			<Grid item md={6} className={`block min-h-96`}>
				<Box className="flex flex-col gap-12 mb-8">
					<Typography variant="h3">Track your carbon footprint</Typography>
					<Typography>
						Step into sustainability: Calculate and Minimize your manufacturing carbon footprint. Begin your
						Green transformation
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
						<Button component={Link} variant="contained" href="/overview">
							Get Started
						</Button>
					</Box>

					<Box className="flex flex-col items-center">
						<Button component={Link} href="/overview" startIcon={<GoogleIcon color="error" />}>
							Proceed with Google
						</Button>
					</Box>
				</Box>
			</Grid>
			<Grid item md={6} className="p-4">
				<Box className="flex flex-col items-center justify-center w-full h-full">
					<Image src={'/banner3.jpg'} width={300} height={300} alt="banner" />
				</Box>
			</Grid>
		</Grid>
	);
}
export default GetStarted
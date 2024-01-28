import Breadcrumbs from '@/components/landingpage/Breadcrumbs';
import GetStarted from '@/components/landingpage/GetStarted';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
export default function Home() {
	return (
		<Box>
			<Breadcrumbs title={`Welcome to Uhakika Tech's EcoCalc`} />
			<Box className="flex w-full flex-col justify-center items-center flex-1">
				<Box className="flex flex-col gap-8 px-8 py-8 gap-4">
				<Box className="flex flex-col items-center">
				<Box  className="w-10/12 md:w-8/12">
				<Typography>
						At EcoCalc, we believe in the power of informed choices to create a more sustainable and eco-friendly
						world. Our platform is designed to empower individuals and organizations on their journey towards
						reducing carbon emissions and fostering a greener future. Explore the possibilities, calculate your
						carbon footprint, and embark on a path of positive environmental impact.
					</Typography>
				</Box>
				</Box>
				
					
					<Box className="flex flex-col items-center gap-4">
					<Box className="w-10/12 md:w-8/12">
						<GetStarted />
					</Box>
					</Box>
					
					<Box className="flex flex-col items-center gap-4">
						<Typography variant="h5">Why EcoCalc?</Typography>
					</Box>
					<Grid container spacing={1}>
						<Grid item xs={12} lg={3} className="flex flex-col gap-4">
							<Card>
								<CardContent>
									<Typography variant="h1" className="text-center p-4">
										<Diversity1Icon fontSize="inherit" color="error" />
									</Typography>
									<Typography variant="subtitle1" className="text-center">
										User-Friendly Carbon Emissions Calculator:
									</Typography>
									<Typography>
										Our intuitive and powerful Carbon Emissions Calculator makes it easy for you to
										measure your impact. Input your data, run the calculation, and gain valuable insights
										into your carbon footprint across different scopes.
									</Typography>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} lg={3} className="flex flex-col gap-4">
							<Card>
								<CardContent>
									<Typography variant="h1" className="text-center p-4">
										<AssignmentTurnedInRoundedIcon fontSize="inherit" color="info" />
									</Typography>
									<Typography variant="subtitle1" className="text-center">
										Comprehensive Results:
									</Typography>
									<Typography>
										Receive detailed breakdowns of your carbon emissions categorized by Scope 1, Scope 2,
										and Scope 3. Visualize the data through graphs and charts, gaining a deeper
										understanding of where your emissions originate.
									</Typography>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} lg={3} className="flex flex-col gap-4">
							<Card>
								<CardContent>
									<Typography variant="h1" className="text-center p-4">
										<EnergySavingsLeafIcon fontSize="inherit" color="success" />
									</Typography>
									<Typography variant="subtitle1" className="text-center">
										Personalized Reduction Strategies:
									</Typography>
									<Typography>
										Beyond just identifying the issue, EcoCalc provides personalized strategies to reduce
										your carbon footprint. Explore actionable steps to make a positive change in your
										lifestyle or organization.
									</Typography>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} lg={3} className="flex flex-col gap-4">
							<Card>
								<CardContent>
									<Typography variant="h1" className="text-center p-4">
										<TrackChangesIcon fontSize="inherit" color="error" />
									</Typography>
									<Typography variant="subtitle1" className="text-center">
										Goal Setting and Progress Tracking:
									</Typography>
									<Typography>
										Set achievable emission reduction goals and use our platform to track your progress
										over time. Easily revisit your calculations, monitor improvements, and celebrate your
										sustainability milestones.
									</Typography>
								</CardContent>
							</Card>
						</Grid>

						{/* <Box className="flex flex-col gap-4">
						<Typography variant="subtitle1">Community and Collaboration:</Typography>
						<Typography>
						Connect with like-minded individuals and organizations in our community. Share success stories, exchange ideas, and inspire each other to make sustainable choices.
						</Typography>
					</Box> */}
					</Grid>
				</Box>
			</Box>
		</Box>
	);
}

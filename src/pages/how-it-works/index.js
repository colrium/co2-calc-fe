/** @format */

import Breadcrumbs from '@/components/landingpage/Breadcrumbs';
import ExternalLayout from '@/layouts/External';
import { Box, Container, Typography } from '@mui/material';

export default function Page() {
	return (
		<Box className="flex min-h-screen flex-col">
			<Breadcrumbs title={'How it works'} />
			<Container maxWidth="md">
				<Box className="flex flex-col gap-8 px-8 py-8 gap-4">
					<Typography variant="subtitle2">
						Welcome to our Carbon Emissions Calculator! Our user-friendly tool empowers individuals and
						organizations to measure and understand their carbon footprint. Follow these simple steps to
						calculate and analyze your carbon emissions:
					</Typography>

					<Typography variant="h5">Step 1: Input Information</Typography>

					<Typography className="mb-4">
						Start by entering relevant data into the calculator. We've organized the input categories to cover
						different emission sources:
					</Typography>

					<Typography variant="h6">Scope 2 Emissions:</Typography>

					<Typography className="mb-4">
						Provide details about purchased electricity, heat, or steam. This includes energy consumed but
						generated elsewhere.
					</Typography>

					<Typography variant="h6">Scope 3 Emissions:</Typography>

					<Typography className="mb-4">
						Input information on indirect emissions from sources not owned or controlled by the organization.
						This may include supply chain activities, employee commuting, and more.
					</Typography>

					<Typography variant="h5">Step 2: Select Units</Typography>

					<Typography className="mb-4">
						Choose the appropriate units for your data, ensuring consistency across all inputs. Whether it's
						energy consumption, distance traveled, or other metrics, our calculator accommodates a variety of
						units for accurate calculations.
					</Typography>

					<Typography variant="h5">Step 3: Run the Calculation</Typography>

					<Typography className="mb-4">
						Once you've entered all necessary information, hit the "Calculate" button. Our advanced algorithm
						processes the data based on recognized emission factors and methodology from reputable standards like
						the GHG Protocol.
					</Typography>

					<Typography variant="h5">Step 4: Review Results</Typography>

					<Typography className="mb-4">
						Instantly receive a comprehensive breakdown of your carbon emissions. Results are categorized by
						scope, providing a clear understanding of where emissions originate:
					</Typography>

					<Typography variant="h5">Step 5: Explore Reduction Strategies</Typography>

					<Typography className="mb-4">
						Our calculator doesn't just highlight the problem; it guides you toward solutions. Access a list of
						recommended reduction strategies tailored to your specific emission profile. These suggestions are
						based on industry best practices and proven methods to lower carbon footprints.
					</Typography>

					<Typography variant="h5">Step 6: Set Goals and Track Progress</Typography>

					<Typography className="mb-4">
						Establish emission reduction goals and use our calculator regularly to track progress. Our tool
						allows you to save multiple calculations, making it easy to monitor changes over time and adjust
						strategies accordingly.
					</Typography>

					<Typography variant="h5">Step 7: Share and Inspire</Typography>

					<Typography className="mb-4">
						Emission reduction is a collective effort. Share your achievements, strategies, and insights with
						your community. Encourage others to join the movement toward a more sustainable future.
					</Typography>

					<Typography className="mb-4">
						Ready to make a positive impact? Start calculating your carbon emissions today and take meaningful
						steps toward a greener, more sustainable tomorrow!
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}
Page.getLayout = (page) => {
	return <ExternalLayout>{page}</ExternalLayout>;
};
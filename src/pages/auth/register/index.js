/** @format */

import RegisterForm from '@/components/auth/RegisterForm';
import AuthLayout from '@/layouts/Auth';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Page() {
	const router = useRouter();
	return (
		<Container maxWidth="sm">
			<Card elevation className="surface">
				<CardContent>
					<Box className="flex p-4 flex-col items-center justify-center">
						<Box className="flex p-4 flex-col items-center justify-center ">
							<Box className="my-8">
								<Typography variant="h4">Create Account</Typography>
							</Box>
							<Box className="p-4 mb-4">
								<RegisterForm initialValues={{ ...router?.query }} />
							</Box>
							<Box className="my-2">
								<Button component={Link} href="/auth/login">
									Login
								</Button>
							</Box>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
}
Page.getLayout = (page) => {
	return <AuthLayout>{page}</AuthLayout>;
};

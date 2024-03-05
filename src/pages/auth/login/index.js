/** @format */

import LoginForm from '@/components/auth/LoginForm';
import AuthLayout from '@/layouts/Auth';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function Page() {
	
	return (
		<Container maxWidth="sm">
			<Card elevation className="surface">
				<CardContent>
					<Box className="flex p-4 flex-col items-center justify-center">
						<Box className="z"></Box>
						<Box className="my-8">
							<Typography variant="h4">Login</Typography>
						</Box>
						<Box className="p-4 w-96 mb-4">
							<LoginForm />
						</Box>
						<Box className="my-2">
							<Typography>Don't have an account yet?</Typography>
							<Button component={Link} href="/auth/register">
								Create Account
							</Button>
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
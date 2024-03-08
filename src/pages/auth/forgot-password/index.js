/** @format */

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AuthLayout from '@/layouts/Auth';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

export default function Page() {
	return (
		<Container>
			<Head>
				<title>Forgot Password</title>
			</Head>
			<Card elevation className="surface">
				<CardContent>
					<Box className="flex p-4 flex-col items-center justify-center">
						<Box className="my-8">
							<Typography variant="subtitle1">Forgot Password</Typography>
						</Box>
						<Box className="p-4 w-96 mb-4">
							<ForgotPasswordForm />
						</Box>
						<Box className="my-2 flex">
							<Button component={Link} href="/auth/login">
								Login
							</Button>
							<Box className="flex-1" />
							<Button component={Link} href="/auth/register">
								Signup
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

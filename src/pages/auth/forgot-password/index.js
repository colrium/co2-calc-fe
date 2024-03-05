/** @format */

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import ExternalLayout from '@/layouts/External';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

export default function Page() {
	return (
		<Box className="flex p-4 flex-col items-center justify-center auth-page">
			<Head>
				<title>Forgot Password</title>
			</Head>
			<Box className="z"></Box>
			<Box className="my-8">
				<Typography variant="h4">Forgot Password</Typography>
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
	);
}
Page.getLayout = (page) => {
	return <ExternalLayout>{page}</ExternalLayout>;
};
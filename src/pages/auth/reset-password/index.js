/** @format */

import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

export default function ResetPassword() {
	return (
		<Box className="flex p-4 flex-col items-center justify-center auth-page">
			<Head>
				<title>Reset Password</title>
			</Head>
			<Box className="z"></Box>
			<Box className="my-8">
				<Typography variant="h4">Reset Password</Typography>
			</Box>
			<Box className="p-4 w-96 mb-4">
				<ResetPasswordForm />
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

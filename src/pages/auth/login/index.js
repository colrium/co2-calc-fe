/** @format */

import LoginForm from '@/components/auth/LoginForm';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Login() {
	
	return (
		<Box className="flex p-4 flex-col items-center justify-center auth-page">
			<Box className="z"></Box>
			<Box className="my-8">
				<Typography variant="h4">Login</Typography>
			</Box>
			<Box className="p-4 w-96 mb-4">
				<LoginForm />
			</Box>
			<Box className="my-2">
				<Button component={Link} href="/auth/register">
					Signup
				</Button>
			</Box>
		</Box>
	);
}

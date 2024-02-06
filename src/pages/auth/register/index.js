/** @format */

import RegisterForm from '@/components/auth/RegisterForm';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
	return (
		<Box className="flex p-4 flex-col items-center justify-center auth-page">
			<Box className="z"></Box>
			<Box className="my-8">
				<Typography variant="h4">Create Account</Typography>
			</Box>
			<Box className="p-4 w-96 mb-4">
				<RegisterForm initialValues={{ ...router?.query }} />
			</Box>
			<Box className="my-2">
				<Button component={Link} href="/auth/login">
					Login
				</Button>
			</Box>
		</Box>
	);
}

/** @format */

import RegisterForm from '@/components/auth/RegisterForm';
import Breadcrumbs from '@/components/landingpage/Breadcrumbs';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
	return (
		<Box className="auth-page">
			<Breadcrumbs title="Sign up to Get Started" />
			<Container maxWidth="md">
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
			</Container>
		</Box>
	);
}

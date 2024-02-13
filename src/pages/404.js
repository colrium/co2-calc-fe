/** @format */
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
export default function Overview() {
	const router = useRouter();
	

	return (
		<Box className="page-error">
			<div class="error-bg"></div>
			<Typography variant="h2" color={'textSecondary'}>
				404
			</Typography>
			<Typography>The resource you are looking for is not available!</Typography>
		</Box>
	);
}

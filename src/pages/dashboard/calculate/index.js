/** @format */
import InternalLayout from '@/layouts/Internal';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
export default function Page() {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {};
	}, []);

	return <Box className="w-full"></Box>;
}
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
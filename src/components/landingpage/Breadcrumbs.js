/** @format */

import { Box, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Breadcrumbs({ title, loading}) {
	const theme = useTheme()
	return (
		<Box
			className="flex flex-col bg-no-repeat bg-cover bg-fixed bg-center"
			sx={{
				height: (theme) => theme.spacing(20)
				// backgroundColor: (theme) => theme.palette.action.active,
				// backgroundImage: `url('/breadcrumb-footprint.png')`
			}}
		>
			<Box
				className="px-16 flex-1 flex items-center"
				sx={
					{
						// backgroundColor: (theme) => theme.palette.action.active
					}
				}
			>
				<Typography variant="subtitle1" color="textSecondary" className="flex-1">
					{title}
				</Typography>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					stroke="none"
					width={theme.spacing(10)}
					viewBox="0 0 512 512"
					strokeWidth={1.5}
					fill={theme.palette.divider}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M198.91,155.31h8.26a30.81,30.81,0,0,0,30.77-30.77v-.34h-18v.34a12.79,12.79,0,0,1-12.77,12.77h-8.26a12.79,12.79,0,0,1-12.77-12.77V92.76A12.79,12.79,0,0,1,198.91,80h8.26a12.79,12.79,0,0,1,12.77,12.77h18A30.81,30.81,0,0,0,207.17,62h-8.26a30.8,30.8,0,0,0-30.77,30.77v31.78A30.8,30.8,0,0,0,198.91,155.31Z"
					/>

					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M283.47,155.31a34.94,34.94,0,0,0,34.9-34.9V96.89a34.9,34.9,0,1,0-69.8,0v23.52A34.93,34.93,0,0,0,283.47,155.31Zm-16.9-58.42a16.9,16.9,0,1,1,33.8,0v23.52a16.9,16.9,0,1,1-33.8,0Z"
					/>

					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M362.8,155.25l-17.13,5.44a20.44,20.44,0,0,0,6.18,39.92h27.4v-18h-27.4a2.44,2.44,0,0,1-.73-4.76l17.13-5.44a21.64,21.64,0,0,0,15.14-20.69v-2.13a21.74,21.74,0,0,0-21.72-21.71h-8.54a21.74,21.74,0,0,0-21.71,21.71v2.63h18v-2.63a3.72,3.72,0,0,1,3.71-3.71h8.54a3.72,3.72,0,0,1,3.72,3.71v2.13A3.69,3.69,0,0,1,362.8,155.25Z"
					/>

					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M227.17,197.14a69.65,69.65,0,0,1,66.56,49.92,25.71,25.71,0,0,0,25,18.6h.14a53.1,53.1,0,0,1,53.08,54A51.68,51.68,0,0,1,366.88,341,59.37,59.37,0,0,1,383.49,348a69.36,69.36,0,0,0,6.44-28,71.1,71.1,0,0,0-71.08-72.3h-.18A7.86,7.86,0,0,1,311,242a87.33,87.33,0,0,0-167.69,0,7.87,7.87,0,0,1-7.68,5.62h-.16A71.1,71.1,0,0,0,64.41,320c.64,38.52,33,69.87,72.09,69.87h28.64a59.43,59.43,0,0,1,5.92-18H136.5c-29.35,0-53.62-23.41-54.1-52.17a53.1,53.1,0,0,1,53.08-54h.18a26.81,26.81,0,0,0,5.26-.53,37.07,37.07,0,0,1,10.05,25l20.33-.58a56.61,56.61,0,0,0-13.56-36,26,26,0,0,0,2.86-6.42A69.66,69.66,0,0,1,227.17,197.14Z"
					/>

					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M354.22,356.33a32.91,32.91,0,0,0-13.34,26.05l-18-.51a50.25,50.25,0,0,1,17-37,54.55,54.55,0,0,0-103.78,3,11.76,11.76,0,0,1-11.38,8.44h-.1a43.23,43.23,0,0,0-43.23,44c.39,23.71,20.23,42.5,43.94,42.5H351.58c23.71,0,43.55-18.79,43.95-42.5A43.23,43.23,0,0,0,354.22,356.33Z"
					/>
				</svg>
			</Box>
			{loading && <LinearProgress />}
		</Box>
	);
}

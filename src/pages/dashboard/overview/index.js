/** @format */
import Overview from '@/components/calculator/Overview';
import { useSetState } from '@/hooks';
import InternalLayout from '@/layouts/Internal';
import { selectAuth } from '@/store/authSlice';
import { addCompanyAssessment, addProductAssessment, setCalculatorContext } from '@/store/calculatorSlice';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, IconButton, Skeleton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Fab from '@mui/material/Fab';
import { red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
var relativeTime = require('dayjs/plugin/relativeTime');
var utc = require('dayjs/plugin/utc');
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default function Page() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [state, setState] = useSetState({
		loading: true,
		company: {
			page: 1,
			pages: 1,
			count: 0,
			data: []
		},
		product: {
			page: 1,
			pages: 1,
			count: 0,
			data: []
		},
		overview: {
			yearly: {},
			scope: { scope1: 0, scope2: 0, scope3us: 0, scope3ds: 0 },
			emissionType: { biogenic: 0, fossil: 0 },
			total: 0
		}
	});
    const {loggedin, user} = useSelector(selectAuth);
	const theme = useTheme();

	const fetchResults = (type='company') => {
			setState({ loading: true});
			axios.get(`/api/calculations?type=${type}`, {params: {perPage: 3, page: 1}})
				.then(({data: results}) => {
					const {data} = results;
					
					setState((prevState) => ({
						[type]: results
					}));
				})
				.catch((err) => console.error(`/api/calculations?type=${type}`, err))
				.finally(() => setState({ loading: false }));
		
	};

	const fetchOverview = () => {
		setState({ loading: true });
		axios
			.get(`/api/overview`)
			.then(({ data: overview }) => {
				setState((prevState) => ({
					overview: overview
				}));
			})
			.catch((err) => console.error(`/api/overview`, err))
			.finally(() => setState({ loading: false }));
	};


	
	const handleOnGoToAssessment = useCallback(
		(type, id) => () => {
			const action = type === 'product' ? addProductAssessment : addCompanyAssessment;
			const result = state[type].data.find(entry => entry.id === id);
			if (result) {
				dispatch(setCalculatorContext({ active: result.id, name: type, step: 0 }));
				router.push(`/dashboard/calculations?id=${result.id}`);
			}
			else {
				setState({ loading: true });
				axios
					.post(`/api/calculations`, {
						name: 'New Assessment',
						description: 'New Assessment',
						year: dayjs().year(),
						userId: user.id
					})
					.then(({ data: result }) => {
						setState((prevState) => ({
							[type]: { ...prevState[type], data: [...prevState[type]?.data, result] }
						}));
						dispatch(setCalculatorContext({ active: result.id, name: type, step: 0 }));
						router.push(`/dashboard/calculations?id=${result.id}`);
					})
					.catch((err) => console.error(`/calculations`, err))
					.finally(() => setState({ loading: false }));
			}
			
			// if (id < 0) {
			// 	dispatch(action({ name: 'New Assessment', description: 'New Assessment', year: dayjs().year(), id: id }));
			// }
			
			
		},
		[state.company, state.product, loggedin]
	);

	useEffect(() => {
		fetchResults();
		fetchOverview();
	}, []);

	return (
		<Box className="w-full">
			<Box className="py-12 px-8" sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
				<Typography variant="subtitle1">Recent Company assessments (Scope 1 - 3)</Typography>
			</Box>
			<Box className="flex flex-col lg:flex-row gap-8 px-8 py-8 flex-wrap relative">
				{state.loading && <Skeleton variant="rounded" className="flex-1 " height={240} />}
				{state.loading && <Skeleton variant="rounded" className="flex-1 " height={240} />}
				{state.loading && <Skeleton variant="rounded" className="flex-1 " height={240} />}
				{!state.loading &&
					state.company?.data?.length > 0 &&
					state.company.data.map((assessment, i) => (
						<Card
							// sx={{ width: 240 }}
							className="surface flex flex-col flex-1"
							elevation={0}
							key={`company-${i}`}
						>
							<CardHeader
								avatar={
									<Avatar
										sx={{
											bgcolor: red[500],
											width: 24,
											height: 24,
											fontSize: 14,
											color: (theme) => theme.palette.background.main
										}}
										aria-label={assessment?.name}
									>
										{assessment?.name.charAt(0).toUpperCase()}
									</Avatar>
								}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
								title={assessment?.name}
								subheader={assessment?.year}
							/>
							<CardContent className="flex-1 flex-col">
								<Typography variant="h3" color="secondary">
									{assessment.total?.toFixed(1)}
								</Typography>
								<Typography className="flex-1">
									{assessment?.description || 'No description added yet'}
								</Typography>
								<Typography variant="body2" color="text.disabled" className="pt-4">
									{dayjs.utc(assessment?.updatedAt).toNow(dayjs())} ago
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								{assessment && 'id' in assessment ? (
									<Button
										color="primary"
										aria-label="View Assessment"
										endIcon={<ArrowForwardIcon />}
										component={Link}
										// onClick={handleOnGoToAssessment('company', i)}
										href={`/dashboard/calculations?id=${assessment?.id}`}
									>
										View Assessment
									</Button>
								) : (
									<Button
										color="primary"
										aria-label="View Assessment"
										endIcon={<ArrowForwardIcon />}
										onClick={handleOnGoToAssessment('company', i)}
									>
										View Assessment
									</Button>
								)}
							</CardActions>
						</Card>
					))}
				<Card variant="outlined" className="hidden md:flex flex-col flex-1">
					<CardHeader
						avatar={
							<Avatar
								sx={{
									bgcolor: red[500],
									width: 24,
									height: 24,
									fontSize: 12,
									color: (theme) => theme.palette.background.main
								}}
							>
								<AddIcon fontSize="inherit" />
							</Avatar>
						}
						title={'Add a new assessment'}
						subheader={'Start Assessing'}
					/>
					<CardContent className="flex-1">
						<Typography variant="body2" color="text.secondary"></Typography>
					</CardContent>
					<CardActions disableSpacing>
						<Button
							color="teal"
							onClick={handleOnGoToAssessment('company', -1)}
							aria-label="Add Assessment"
							endIcon={<AddIcon />}
						>
							Add a new Assessment
						</Button>
					</CardActions>
				</Card>
				<Fab
					onClick={handleOnGoToAssessment('company', -1)}
					color="primary"
					aria-label="Add a new Assessment"
					className="inline-block md:hidden bottom-16 right-14"
					sx={{
						position: 'fixed !important',
						color: 'text.primary',
						// [theme.breakpoints.up('md')]: {
						// 	display: 'none'
						// }
					}}
				>
					<AddIcon />
				</Fab>
			</Box>
			<Box>
				<Overview />
			</Box>
			{/* <Box className="w-full">
				<Box className="py-12 mt-6 px-8">
					<Typography variant="h4">All products</Typography>
				</Box>
				<Box className="flex gap-8 px-8 py-8 flex-wrap">
					{state.product.data.length > 0 &&
						state.product.data.map((assessment, i) => (
							<Card sx={{ maxWidth: 345 }} className="flex flex-col" key={`company-${i}`}>
								<CardHeader
									avatar={
										<Avatar
											sx={{
												bgcolor: red[500],
												width: 24,
												height: 24,
												fontSize: 14,
												color: (theme) => theme.palette.background.paper
											}}
											aria-label={assessment?.name}
										>
											{assessment?.name?.charAt(0)?.toUpperCase() ?? 'NA'}
										</Avatar>
									}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title={assessment?.name}
									subheader={assessment?.year}
								/>
								<CardContent className="flex-1 flex-col">
									<Typography className="flex-1">
										{assessment?.description || 'No description added yet'}
									</Typography>
									<Typography variant="body2" color="text.disabled" className="pt-4">
										{dayjs().toNow(dayjs(assessment?.lastModified))}
									</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<Button
										color="secondary"
										aria-label="View Assessment"
										endIcon={<ArrowForwardIcon />}
										onClick={handleOnGoToAssessment('product', i)}
									>
										View Assessment
									</Button>
								</CardActions>
							</Card>
						))}
					<Card sx={{ maxWidth: 345 }} className="flex flex-col" variant="outlined">
						<CardHeader
							avatar={
								<Avatar
									sx={{
										bgcolor: red[500],
										width: 24,
										height: 24,
										fontSize: 12,
										color: (theme) => theme.palette.background.paper
									}}
								>
									NA
								</Avatar>
							}
							title={'Add a new product'}
							subheader={'Start Assessing'}
						/>
						<CardContent className="flex-1">
							<Typography variant="body2" color="text.secondary"></Typography>
						</CardContent>
						<CardActions disableSpacing>
							<Button
								color="secondary"
								aria-label="Add Assessment"
								onClick={handleOnGoToAssessment('product', -1)}
								endIcon={<AddIcon />}
							>
								Add a new Assessment
							</Button>
						</CardActions>
					</Card>
				</Box>
			</Box> */}
		</Box>
	);
}
Page.getLayout = (page) => {
	return <InternalLayout>{page}</InternalLayout>;
};
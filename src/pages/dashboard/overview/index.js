/** @format */
import { useFetcher, useSetState } from '@/hooks';
import { addCompanyAssessment, addProductAssessment, selectCalculator, setCalculatorContext } from '@/store/calculatorSlice';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
export default function Overview() {
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
		}
	});
    const calculator = useSelector(selectCalculator);
    const company = calculator?.company ?? [];
	const product = calculator?.product ?? [];
	const fetcher = useFetcher()

	const fetchResults = (type='company') => {
			setState({ loading: true});
			axios.get(`/api/results?type=${type}`)
				.then(({data: results}) => {
					setState((prevState) => ({
						[type]: results
					}));
				})
				.catch((err) => console.error(`/api/results?type=${type}`, err))
				.finally(() => setState({ loading: false }));
		
	};


	
	const handleOnGoToAssessment = useCallback(
		(type, id) => () => {
			const action = type === 'product' ? addProductAssessment : addCompanyAssessment;
			const result = state[type].data.find(entry => entry.id === id);
			if (result) {
				dispatch(setCalculatorContext({ active: result.id, name: type, step: 0 }));
				router.push(`/dashboard/calculate/${result.id}`);
			}
			else {
				setState({ loading: true });
				axios.post(`/api/results`, { name: 'New Assessment', description: 'New Assessment', year: dayjs().year() }
				)
					.then(({data: result}) => {
						setState((prevState) => ({
							[type]: { ...prevState[type], data: [...prevState[type]?.data, result] }
						}));
						dispatch(setCalculatorContext({ active: result.id, name: type, step: 0 }));
						router.push(`/dashboard/calculate/${result.id}`);
					})
					.catch((err) => console.error(`/factors`, err))
					.finally(() => setState({ loading: false }));
			}
			
			// if (id < 0) {
			// 	dispatch(action({ name: 'New Assessment', description: 'New Assessment', year: dayjs().year(), id: id }));
			// }
			
			
		},
		[state.company, state.product]
	);

	useEffect(() => {
		fetchResults();
	}, []);

	return (
		<Box className="w-full">
			<Box className="py-32 px-8" sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
				<Typography variant="h4">All company assessments (Scope 1 - 3)</Typography>
			</Box>
			<Box className="flex gap-8 px-8 py-8">
				{state.company?.data?.length > 0 && state.company.data.map((assessment, i) => (
					<Card sx={{ maxWidth: 400 }} className="flex flex-col" key={`company-${i}`}>
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
							<Typography className="flex-1">
								{assessment?.description || 'No description added yet'}
							</Typography>
							<Typography variant="body2" color="text.disabled" className="pt-4">
								{dayjs().toNow(dayjs(assessment?.lastModified))}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							{assessment && 'id' in assessment ? (
								<Button
									color="secondary"
									aria-label="View Assessment"
									endIcon={<ArrowForwardIcon />}
									component={Link}
									// onClick={handleOnGoToAssessment('company', i)}
									href={`/dashboard/calculate/${assessment?.id}`}
								>
									View Assessment
								</Button>
							) : (
								<Button
									color="secondary"
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
				<Card sx={{ maxWidth: 345 }} variant="outlined" className="flex flex-col">
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
						title={'Add a new assessment'}
						subheader={'Start Assessing'}
					/>
					<CardContent className="flex-1">
						<Typography variant="body2" color="text.secondary"></Typography>
					</CardContent>
					<CardActions disableSpacing>
						<Button
							color="secondary"
							onClick={handleOnGoToAssessment('company', -1)}
							aria-label="Add Assessment"
							endIcon={<AddIcon />}
						>
							Add a new Assessment
						</Button>
					</CardActions>
				</Card>
			</Box>
			<Box className="w-full">
				<Box className="py-12 mt-6 px-8">
					<Typography variant="h4">All products</Typography>
				</Box>
				<Box className="flex gap-8 px-8 py-8">
					{state.product.data.length > 0 && state.product.data.map((assessment, i) => (
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
			</Box>
		</Box>
	);
}

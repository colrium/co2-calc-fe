import { useMutationsCount, useSetState, useUniqueEffect } from '@/hooks';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import dayjs from 'dayjs';
import { forwardRef, useCallback, useMemo } from 'react';
import { useModelForm } from '@/contexts/ModelForm';
const {
	Grid,
	CardActions,
	CardContent,
	CardHeader,
	Card,
	Button,
	Box,
	Typography,
	CircularProgress,
	Skeleton,
	IconButton,
	Stack
} = require('@mui/material');
const { useFormik } = require('formik');

const noop = () => {};
const get = () => {};

const BaseForm = forwardRef(
	(
		{
			// activeRecord,
			onSubmit,
			id,
			model,
			formProps,
			title,
			subtitle,
			loading: loadingProp,
			onCloseForm = noop,
			cardActionsProps,
			cardActions
		},
		ref
	) => {
		

		const { formik, loading, init, destroy, context } = useModelForm();
		useUniqueEffect(() => {
			init(model, id);
		}, [model, id]);
		const { errors, touched, isSubmitting, getFieldProps, isValid, values } = formik;
		console.log('values', values)
		return (
			context && <Grid
				padding={3}
				container
				autoComplete="off"
				noValidate
				{...formProps}
				component={'form'}
				onSubmit={formik.handleSubmit}
			>
				<Grid item xs={12}>
					<Card
						elevation={0}
						sx={{
							'&.MuiPaper-root': {
								backgroundColor: (theme) => `${theme.palette.background.surface} !important`
							}
						}}
					>
						<CardHeader
							title={title}
							subheader={subtitle}
							action={
								<Stack direction={'row'} alignItems={'center'} columnGap={3} justifyContent={'center'}>
									{loading && (
										<Box aria-label="loading">
											<CircularProgress size={16} />
										</Box>
									)}
									<IconButton aria-label="menu" color="secondary">
										<MoreVertIcon />
									</IconButton>
								</Stack>
							}
						/>
						<CardContent>
							<Grid container columnGap={1} rowGap={3}>
								{Array.isArray(context?.inputs) &&
									context.inputs.map(({ wrapperProps, name, Component, helperText, ...fieldProps }, i) => (
										<Grid item xs={12} {...wrapperProps} key={`input-${i}`}>
											<Component
												disabled={loading}
												{...fieldProps}
												{...getFieldProps(name)}
												error={Boolean(touched[name] && errors[name])}
												helperText={(touched[name] && errors[name]) || helperText}
												onClearError={() => formik.setFieldError(name, false)}
												name={name}
											/>
										</Grid>
									))}
								{/*loading && (
									<Grid item xs={12} className="p-16 gap-8 flex justify-center items-center">
										<CircularProgress size={20} className="my-8" />
									</Grid>
								)*/}
							</Grid>
						</CardContent>
						{!loading ? (
							<CardActions className={`py-4`} {...cardActionsProps}>
								<LoadingButton
									loadingPosition="start"
									startIcon={<SaveIcon />}
									// loading={state.loading}
									// disabled={state.loading}
									size="small"
									type="submit"
									variant="contained"
									color="success"
								>
									Save
								</LoadingButton>
								{typeof onCloseForm === 'function' && (
									<Button
										size="small"
										type="button"
										// disabled={state.loading}
										onClick={onCloseForm}
										variant="contained"
										color="error"
										startIcon={<CloseIcon fontSize="inherit" />}
									>
										Cancel
									</Button>
								)}
								{cardActions}
							</CardActions>
						) : (
							<CardActions className={`py-4`} {...cardActionsProps}>
								<Skeleton variant="rounded" width={64} height={32} />
								<Skeleton variant="rounded" width={64} height={32} />
							</CardActions>
						)}
					</Card>
				</Grid>
			</Grid>
		);
	}
);

export default BaseForm;

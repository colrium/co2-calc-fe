import { useMutationsCount, useSetState } from "@/hooks";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import dayjs from "dayjs";
import { forwardRef, useCallback, useMemo } from "react";
import ModelFormProvider from './ModelFormContext';
const { Grid, CardActions, CardContent, CardHeader, Card, Button, Box, Typography, CircularProgress, Skeleton } = require('@mui/material');
const { useFormik } = require("formik");

const noop = () => {}
const get = () => {};


const BaseForm = forwardRef(({
	activeRecord,
	onSubmit,
	model,
	formProps,
	title,
	subtitle,
	loading,
	onCloseForm = noop,
	cardActionsProps,
	cardActions
}, ref) => {
	const mutationCount = useMutationsCount([activeRecord, model]);
	const [state, setState] = useSetState({
		loading: false
	});
	
	const handleSubmit = useCallback(
		async (values, formikBag) => {
			setState({loading: true})
			if (typeof model.customizeSaveData === 'function') {
				const customizedValues = await model.customizeSaveData({ values, activeRecord, formikBag });
				values = {
					...values,
					...customizedValues
				};
			}
			try {
				if (activeRecord.isNew) {
					await axios.post(model.endpoint, values);
				} else {
					await axios.patch(`${model.endpoint}/${activeRecord?.record?.id}`, values);
				}
				if (typeof onCloseForm === 'function') {
					onCloseForm()
				}
			} catch (error) {
				
			} finally {
				setState({ loading: false });
			}
			
		},
		[onSubmit, model]
	);
	const initialValues = useMemo(() => {
		const parseValue = (value, type) => {
			try {
				switch (type) {
					case 'number':
						value = Number(value);
						break;
					case 'boolean':
						value = Boolean(value);
						break;
					case 'date':
					case 'dateTime':
						value = dayjs(value);
						break;
					default:
						break;
				}
				
			} catch (error) {
				
			}
			
			return value
		}
		let vals = { ...activeRecord?.record };
		const defaultValues = {...model.defaultValues};
		for (const field of model.fields) {
			if (field.name in vals) {
				vals[field.name] = parseValue(vals[field.name], field.type);
			}
			if (activeRecord.isNew && 'default' in field) {
				defaultValues[field.name] = field.default;
			}
		}
		if (activeRecord.isNew) {
			vals = {...defaultValues, ...vals};
		}
		delete vals[model.idField]
		return {...vals, ...activeRecord.record}
	}, [activeRecord?.record, mutationCount])

	const validationSchema = useMemo(() => model.getValidationSchema({ activeRecord }), [model, activeRecord]);
	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		onSubmit: handleSubmit,
		validationSchema: validationSchema
	});
	const fields = useMemo(() => model.evalInputComponents({ activeRecord }), [mutationCount]);
	const { errors, touched, values, isSubmitting, getFieldProps, isValid } = formik;
	return (
		<ModelFormProvider value={{ ...state, formik, model, activeRecord, validationSchema, submit: formik.handleSubmit }}>
			<Grid
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
						<CardHeader title={title} subheader={subtitle} />
						<CardContent>
							<Grid container columnGap={1} rowGap={3}>
								{!loading &&
									fields.map(({ wrapperProps, name, Component, helperText, ...fieldProps }, i) => (
										<Grid item xs={12} {...wrapperProps} key={`input-${i}`}>
											<Component
												{...fieldProps}
												{...getFieldProps(name)}
												error={Boolean(touched[name] && errors[name])}
												helperText={(touched[name] && errors[name]) || helperText}
												name={name}
											/>
										</Grid>
									))}
								{loading && (
									<Grid item xs={12} className="p-16 gap-8 flex justify-center items-center">
										<CircularProgress size={20} className="my-8" />
									</Grid>
								)}
							</Grid>
						</CardContent>
						{!loading ? (
							<CardActions className={`py-4`} {...cardActionsProps}>
								<LoadingButton
									loadingPosition="start"
									startIcon={<SaveIcon />}
									loading={state.loading}
									disabled={state.loading}
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
										disabled={state.loading}
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
								<Skeleton variant="rounded" width={64} height={48} />
								<Skeleton variant="rounded" width={64} height={48} />
							</CardActions>
						)}
					</Card>
				</Grid>
			</Grid>
		</ModelFormProvider>
	);
});

export default BaseForm;
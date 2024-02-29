import { useMutationsCount, useSetState } from "@/hooks";
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
	/* const fields = useMemo(() => {
		let arr = []
		if (Array.isArray(model.fields)) {
			arr = model.fields.filter(entry => entry.field !== model.idField && !entry.excludeOnForm).map((field) => {
				let fieldConfig = {
					name: field.field,
					label: field.header,
				}
				const inputType = field.inputType || field.type
				let getComponent = inputType in FieldMappers? FieldMappers[inputType] : ({name}) => () => (<Box><Typography color="error">
					{`Invalid Field Mapper for ${name} field`}
				</Typography></Box>);
				if (field.lookup) {
					if (typeof field.lookup === 'string') {
						fieldConfig.valueOptions = activeRecord?.lookups?.[field.lookup] || [];
					}
					if (!field.inputType) {
						getComponent = FieldMappers.select;
					}
				}
				if (field.valueOptions) {
					if (typeof field.valueOptions === 'string') {
						fieldConfig.valueOptions = activeRecord?.lookups?.[field.options] || [];
					}
					if (!field.inputType) {
						getComponent = FieldMappers.radio;
					}
				}
				if (field.secure) {
					getComponent = FieldMappers.password;
				}
				return { ...field, ...fieldConfig, Component: getComponent(fieldConfig) };
			});
		}
		return arr
	}, [mutationCount]); */
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
					<Card>
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
								{loading && <Grid item xs={12} className="p-16 gap-8 flex justify-center items-center">
									<CircularProgress size={20}  className="my-8" />
								</Grid>}
							</Grid>
							{/* <Box className="my-8">
								<Typography variant="h5" gutterBottom>
									Values
								</Typography>
								<Typography>{JSON.stringify(values)}</Typography>
							</Box> */}
						</CardContent>
						<CardActions className={`py-4`} {...cardActionsProps}>
							<Button size="small" type="submit" variant="contained" color="success">
								Save
							</Button>
							{typeof onCloseForm === 'function' && (
								<Button size="small" type="button" onClick={onCloseForm} variant="contained" color="error">
									Cancel
								</Button>
							)}
							{cardActions}
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</ModelFormProvider>
	);
});

export default BaseForm;
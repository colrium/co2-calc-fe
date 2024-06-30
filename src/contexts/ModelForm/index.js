import { useMutationsCount, useSetState } from '@/hooks';
import { selectAuth, setAuthToken, setAuthUser, setLoggedIn } from '@/store/authSlice';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotifications } from '../Notifications';
import { Formik } from 'formik';
import { Stack } from '@mui/material';
import * as Yup from 'yup';

export const ModelFormContext = createContext({
	loading: false,
	context: null,
	appbarToolbar: true,
	id: null
});

export const useModelForm = () => {
	const context = useContext(ModelFormContext);
	return context;
};

const defaultOptions = {
	id: 'new',
	params: { lookups: true },
	data: null,
	lookups: {}
};
class Context {
	constructor(model, config={}) {
		if (!model) {
			throw new Error('Invalid Model while instanstiating Model Form Context');
		}
		const options = { ...defaultOptions, ...config };
		Object.assign(this, options);
		this.model = model;				
		this.load = this.load.bind(this);
		this.init = this.init.bind(this);		
	}
	init = async (id) => {
		this.id = id || 'new'
		this.isNew = !id || !/^([^\/]+)\/(.*?)\/([^\/]+)\/([0-9a-f]{24})$/.test(id)
		if (!this.data) {
			await this.load();
		}
		this.initValues = this.evalInitialValues()
		return this;
	};
	load = async () => {		
		const res = await this.model.load(this.id, { params: { lookups: true, ...this.params } }).then((res) => res);
		const { data, lookups } = res
		this.data = data;
		this.lookups = lookups;
		
		return this;
	}
		
	parseValue = (value, type) => {
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
		} catch (error) {}

		return value;
	};
	evalInitialValues() {
		if (!this.model) {
			return {}
		}
		let vals = { ...this.data };
		const defaultValues = { ...this.model.defaultValues };
		for (const field of this.model.fields) {
			if (field.name in vals) {
				const fieldValue = typeof field.valueGetter === 'function'? field.valueGetter({value: vals[field.name], row: vals}) : vals[field.name]
				vals[field.name] = this.parseValue(fieldValue, field.type);
			}
			if (this.isNew && 'default' in field) {
				defaultValues[field.name] = field.default;
			}
		}
		if (this.isNew) {
			vals = { ...defaultValues, ...vals };
		}
		delete vals[this.model.idField];
		this.formTitle = this.data? this.data[this.model?.formTitleValue] ||  this.model?.formTitle : null
		return { ...this.data, ...vals };
	}
	get initialValues() {
		
		this.initValues = this.evalInitialValues()
		
		return this.initValues
	}
	get validationSchema() {
		if (!this.validaion) {
			this.validaion = this.model?.getValidationSchema? this.model.getValidationSchema({ data: this.data, lookups: this.lookups }) : Yup.object();
		}
		return this.validaion
	} 

	get inputs() {
		if (!this.inputFields) {
			this.inputFields = this.model?.evalInputComponents? this.model.evalInputComponents({ data: this.data, lookups: this.lookups }) : [];
		}
		return this.inputFields
	}
}

const ModelFormProvider = ({ children }) => {
	const [state, setState] = useSetState({		
		loading: false,
		appbarToolbar: true,
		context: null,
		active: false,
		id: null
	});
	const mutationCount = useMutationsCount([state.context]);
	const onCloseRef = useRef(null)
	const handleSubmit = useCallback(
		async (values, formikBag) => {
			setState({ loading: true });
			if (typeof state.context.model?.customizeSaveData === 'function') {
				const customizedValues = await state.context.model.customizeSaveData({ values, formikBag, context });
				values = {
					...values,
					...customizedValues
				};
			}
			let response;
			try {
				if (typeof state.context?.model?.onSubmit === 'function') {
					response = await state.context.model.onSubmit(values, formikBag);
				} else if (state.context?.model) {
					const actionMethod = state.context.isNew ? 'post' : 'patch';
					const endpoint = state.context.isNew
						? state.context?.model.endpoint
						: `${state.context.model.endpoint}/${state.context.id}`;
					if (axios[actionMethod]) {
						response = await axios[actionMethod](endpoint, values);
					}
				}

				if (typeof onCloseRef.current === 'function') {
					onCloseRef.current();
				}
			} catch (error) {
				console.log('submit error', error);
			} finally {
				setState({ loading: false });
			}
		},
		[state.context]
	);

	const initialValues =  state.context?.initialValues || {};
	const validationSchema = state.context?.validationSchema || {};
	


	const init = useCallback(
		async (model, id=null, config={}) => {		
			
			if (model) {
				const context = new Context(model, config);				
				setState({ id, context, loading: true });
				context
					.init(id)
					.catch((err) => console.error('error initializing record', err))
						.finally(() => setState({ loading: false, context }));
				
			}
		},
		[]
	);

	const destroy = useCallback(() => {
		setState({ context: null, loading: false });
	}, []);


	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
			{(formik) => (
				<ModelFormContext.Provider
					value={{
						...state,
						init,
						destroy,
						patch: setState,
						formik,
						validationSchema,
						initialValues
					}}
				>
					<Stack>{children}</Stack>
				</ModelFormContext.Provider>
			)}
		</Formik>
	);
};
export default ModelFormProvider;

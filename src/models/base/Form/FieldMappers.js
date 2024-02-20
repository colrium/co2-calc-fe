import AsyncAutocomplete from "@/components/common/AsyncAutocomplete";
import TextInput from "@/components/common/form/TextInput";
import { useMutationsCount } from "@/hooks";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { forwardRef, useCallback, useMemo } from "react";
import { useModelForm } from "./ModelFormContext";

const loadLookups = (endpoint) => async () => {
	return await axios.get(endpoint, {params: {perPage: 1000, page: 1}}).then(res => res.data.dat)
}

export default class FieldMappers {
	static text = (config) => forwardRef((props, ref) => <TextInput {...config} {...props} ref={ref} />);
	static string = (config) => FieldMappers.text(config);
	static select = (config) => forwardRef((props, ref) => {

        const mutationCount = useMutationsCount([props]);
		const {
			value: valueProp,
			valueOptions: options,
			multiple,
			onBlur,
			textFieldProps,
			onChange,
			freeSolo,
			name,
			...rest
		} = useMemo(() => ({ ...config, ...props }), [mutationCount]);
		
        const {formik} = useModelForm()
		
        const parseValue = ({ value, options, multiple = false, freeSolo=false} = {}) => {
			let val = null;
			if (typeof value !== 'undefined') {
				if (multiple && Array.isArray(value)) {
					val = value.reduce((acc, entry) => {
						let option = options.find((opt) => opt.value === entry);
						if (!option && freeSolo) {
							option = { value: entry, label: entry };
						}
						if (option) {
							acc.push(option);
						}
						return acc;
					}, []);
				} else {
					let option = options.find((opt) => opt.value === value);
					if (!option && freeSolo) {
						option = { value: value, label: value };
					}
					if (option) {
						val = option;
					}
				}
			}
            return val
		};
        const valueFormatter = useCallback(
			(value) => {
				let val = null;
				if (typeof value !== 'undefined') {
					if (multiple && Array.isArray(value)) {
						val = value.map((entry) => entry.value);
					} else {
						val = value?.value?? null;
					}
				}
				return val;
			},
			[multiple]
		);
        const handleOnChange = useCallback(
			(event, newValue) => {
				formik.setFieldValue(name, newValue, true);
			},
			[multiple, name]
		);
        const handleOnClose = useCallback(
			(event) => {
                setTimeout(() => {
					if (typeof onBlur === 'function') {
						onBlur(event);
					}
				}, 50);
				
			},
			[onBlur, name]
		);
        const value = useMemo(() => parseValue({ options, value: valueProp, multiple }), [options, valueProp]);

        return (
			<AsyncAutocomplete
				size="small"
				valueFormatter={valueFormatter}
				{...rest}
				name={name}
				freeSolo={freeSolo}
				multiple={multiple}
				options={options}
				value={value}
				onChange={handleOnChange}
				onClose={handleOnClose}
				openOnFocus
				// textFieldProps={{ ...textFieldProps, onBlur }}
				ref={ref}
			/>
		);
    });
	static number = (config) => FieldMappers.text({ ...config, type: 'number' });
	static password = (config) => FieldMappers.text({ ...config, type: 'password' });
	static boolean = (config) =>
		forwardRef((props, ref) => {
			const mutationCount = useMutationsCount([props]);
			const combinedProps = useMemo(() => ({ ...config, ...props }), [mutationCount]);
			const { label, value, onChange, required, error, helperText, ...rest } = combinedProps;
            const handleOnChange = useCallback((event) => {                
                if (typeof onChange === 'function') {
                    event.target.value = event.target.checked;
                    onChange(event);
                }
               
            }, [onChange]);

            return (
				<FormControl required={required} error={error} component="fieldset" variant="standard">
					<FormGroup>
						<FormControlLabel
							control={<Checkbox />}
							{...rest}
							onChange={handleOnChange}
							required={required}
							checked={Boolean(value)}
							label={label}
							ref={ref}
						/>
					</FormGroup>
					{!!helperText && <FormHelperText>{helperText}</FormHelperText>}
				</FormControl>
			);
		});
	static radio = (config) =>
		forwardRef((props, ref) => {
			const mutationCount = useMutationsCount([props]);
			const combinedProps = useMemo(() => ({ ...config, ...props }), [mutationCount]);
			const { label, required, valueOptions: options, ...rest } = combinedProps;
			return (
				<FormControl>
					<FormLabel required={required}>{label}</FormLabel>
					<RadioGroup {...rest} ref={ref}>
						{Array.isArray(options) &&
							options.map(({ value, label }, i) => (
								<FormControlLabel value={value} control={<Radio />} label={label} key={`option-${i}`} />
							))}
					</RadioGroup>
				</FormControl>
			);
		});
	static date = (config) => forwardRef((props, ref) => <DatePicker {...config} {...props} ref={ref} />);
}
import { useDidUpdate, useSetState } from '@/hooks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { forwardRef, useCallback, useRef } from 'react';


const PasswordAdornment = ({ onClick, disabled, readOnly, passwordVisible }) => (
	<InputAdornment position="end">
		<IconButton aria-label="toggle password visibility" onClick={onClick} disabled={disabled || readOnly} edge="end">
			{passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
		</IconButton>
	</InputAdornment>
);

const TextInput = forwardRef(
	(
		{
			eager,
			label,
			type = 'text',
			readOnly,
			disabled,
			required,
			error,
			onBlur,
			multiline,
			rows,
			helperText,
			onChange,
			value,
			onClearError,
			trim = true,
			...rest
		},
		ref
	) => {
		const inputRef = useRef();
		const hasFocusRef = useRef(false);
		const [state, setState] = useSetState({ passwordVisible: false });
		const handleToggleShowPassword = useCallback(() => {
			setState((prev) => ({ passwordVisible: !prev.passwordVisible }));
		}, [type]);


		const applyValueChangeEvent = useCallback(
			(event, trimValue = false) => {
				event?.persist?.();
				let val = event?.target?.value;
				if (type === 'number') {
					val = val = event?.target?.valueAsNumber;
					if (isNaN(val)) {
						val = value;
					}
				} else {
					const valueNeedsTrim = typeof val === 'string' && /(^\s)|(\s$)/.test(val);
					if (valueNeedsTrim && trimValue) {
						val = valueNeedsTrim ? val.trim() : val;
						inputRef.current.value = val;
					}
				}
				if (val !== value && typeof onChange === 'function') {
					onChange(event, val);
				}
			},
			[error, value, eager, onChange]
		);

		const handleChange = useCallback(
			(event) => {
				event.persist();

				if (!!error && !eager && typeof onClearError === 'function') {
					onClearError(event); // This will clear validation error on change
				}
				if (!hasFocusRef.current || eager) {
					applyValueChangeEvent(event, trim);
				}
			},
			[applyValueChangeEvent, onClearError, trim, eager]
		);

		const handleFocus = () => {
			hasFocusRef.current = true;
		};

		const handleBlur = useCallback(
			async (event) => {
				event.persist();
				let val = event?.target?.value;
				if (type === 'number') {
					val = val = event?.target?.valueAsNumber;
					if (isNaN(val)) {
						val = undefined;
					}
				}
				hasFocusRef.current = false;
				const valueNeedsTrim = type === 'text' && typeof val === 'string' && /(^\s)|(\s$)/.test(val);
				val = valueNeedsTrim ? val.trim() : val;
				if ((valueNeedsTrim || !eager) && val !== value) {
					// inputRef.current.value = val;
					applyValueChangeEvent(event, trim);
				}
				if (typeof onBlur === 'function') {
					setTimeout(() => {
						onBlur(event);
					}, 50);
					
				}
			},
			[type, value, applyValueChangeEvent, trim]
		);

		const setValue = (val) => {
			if (inputRef.current && inputRef.current.value !== val) {
				inputRef.current.value = val; //Provision for resetting value
			}
		};

		useDidUpdate(() => {
			setValue(value);
		}, [value]);

		return (
			<TextField
				type={state.passwordVisible ? 'text' : type || 'text'}
				size="small"
				margin="dense"
				variant="outlined"
				label={label}
				required={required}
				multiline={multiline}
				rows={multiline ? (rows > 0 ? rows : 4) : undefined}
				fullWidth
				defaultValue={value}
				disabled={disabled}
				readOnly={readOnly}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				helperText={helperText}
				error={Boolean(error)}
				inputRef={inputRef}
				autoComplete="off"
				ref={ref}
				tabIndex={readOnly || disabled ? -1 : undefined}
				InputLabelProps={value?.length > 0 ? { shrink: true } : {}}
				{...rest}
				InputProps={{
					endAdornment: type === 'password' && (
						<PasswordAdornment
							passwordVisible={state.passwordVisible}
							onClick={handleToggleShowPassword}
							position="end"
							readOnly={readOnly}
							disabled={disabled}
						/>
					),
					...rest?.InputProps
				}}
			/>
		);
	}
);

export default TextInput;

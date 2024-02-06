/** @format */

import { useSetState, useUniqueEffect } from '@/hooks';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import * as React from 'react';
import { debounce } from 'throttle-debounce';



const filter = createFilterOptions();

const AsyncAutocomplete = ({
	loading,
	value,
	label,
	ListboxProps,
	hideRefresh = false,
	multiple = false,
	pagination = -1,
	onInputChange,
	variant = 'outlined',
	helperText,
	renderInputProp,
	options,
	textFieldProps = {},
	onCreateOption,
	onRemoveOption,
	filterOptions,
	getOptionDisabled,
	error,
	valueFormatter,
	valueParser,
	onChange,
	required,
	placeholder,
	optionsArgs = [],
	context = {},
	freeSolo,
	filterMode = 'client',
	...rest
}) => {
	const isMountedRef = React.useRef(false);
	const initialValueRef = React.useRef(value);
	const keywordRef = React.useRef({ value: '', reason: null });
	const [state, setState] = useSetState({
		loading: false,
		page: 1,
		pages: 1,
		keyword: null,
		options: [],
		freeSoloOptions: [],
		value: multiple ? [] : undefined,
		error: null
	});

	const findIndexOfOption = React.useCallback(
		(option, options = null) => {
			let targetOptions = Array.isArray(options) ? options : state.options;
			if (!Array.isArray(targetOptions) || targetOptions?.length < 1) {
				return -1;
			}
			return targetOptions.findIndex((entry) => {
				for (const [k, v] of Object.entries(entry)) {
					if (k === 'id' || k === 'label') {
						if (v === option || (option && option.constructor === {}.constructor && k in option && option[k] === v)) {
							return true;
						}
					}
				}
				return false;
			});
		},
		[state.options, state.freeSoloOptions]
	);

	const applyOnFreeSoloValueEffect = React.useCallback(
		async (newValue, reason, details) => {
			let onFreeSoloValueEffect = null;
			let options = [];
			try {
				options = JSON.parse(JSON.stringify(state.options));
			} catch (error) {}

			if (freeSolo && reason === 'selectOption' && !!newValue) {
				const option = JSON.parse(JSON.stringify(details?.option));
				let indexOfOption = findIndexOfOption(option);
				if (indexOfOption === -1) {
					option.label = option.id;
					onFreeSoloValueEffect = onCreateOption;
					options.unshift(option);
				}
				if (typeof onFreeSoloValueEffect === 'function') {
					setState({ loading: true });
					Promise.all([onFreeSoloValueEffect({ option, options, deps: optionsArgs })]).finally(() =>
						setState({ loading: false })
					);
				}
			}
		},
		[freeSolo, multiple, onCreateOption, onRemoveOption, state.options?.length, optionsArgs]
	);

	const handleOnChange = React.useCallback(
		(event, newValue, reason, details) => {
			if (freeSolo) {
				try {
					applyOnFreeSoloValueEffect(newValue, reason, details);
				} catch (error) {
					console.error('Apply FreeSolo Value Effect error', error);
				}
			}
			if (typeof onChange === 'function') {
				onChange(
					event,
					typeof valueFormatter === 'function' ? valueFormatter(newValue, context) : newValue,
					reason,
					details,
					optionsArgs
				);
			}
			if (typeof initialValueRef.current === 'undefined') {
				setState({ value: newValue });
			}
		},
		[onChange, valueFormatter, freeSolo, optionsArgs, context]
	);

	const handleOnListboxScroll = React.useCallback(
		(event) => {
			const listboxNode = event.currentTarget;
			const loadNextPage =
				!state.loading &&
				pagination > 0 &&
				listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight &&
				state.page < state.pages;

			if (loadNextPage) {
				setState((prev) => ({ page: prev.page + 1 }));
			}
			if (typeof ListboxProps?.onScroll === 'function') {
				ListboxProps?.onScroll(event);
			}
		},
		[ListboxProps?.onScroll, state.pages, state.loading, pagination]
	);

	const handleOnChangePage = React.useCallback((e, newValue) => {
		e?.preventDefault();
		setState({ page: newValue });
	}, []);

	const handleFilterOptions = React.useCallback(
		(options, params) => {
			const filtered = typeof filterOptions === 'function' ? filterOptions(options, params) : filter(options, params);
			const { inputValue } = params;
			// Suggest the creation of a new value if freeSolo
			if (freeSolo) {
				const isExisting = findIndexOfOption(inputValue, options) !== -1;
				if (inputValue !== '' && !isExisting) {
					let freeSoloOption = {
						name: inputValue,
						id: inputValue,
						value: inputValue,
						label: inputValue,
						freeSoloLabel: `Create "${inputValue}"`
					};
					filtered.unshift(freeSoloOption);
				}
			}

			return filtered;
		},
		[filterOptions, freeSolo, state.options]
	);

	const derivedValue = React.useMemo(() => {
		let val = multiple ? [] : null; //Either empty array or null as this should be used as a controlled input
		let parsedValue = typeof valueParser === 'function' ? valueParser(value, options) : value;
		let freeSoloOptions = [];
		if (state.options?.length > 0) {
			if (multiple) {
				if (!Array.isArray(parsedValue) && value !== undefined) {
					parsedValue = [parsedValue];
				}
				if (Array.isArray(parsedValue)) {
					for (const item of parsedValue) {
						const indexOfOption = findIndexOfOption(item);
						if (indexOfOption !== -1) {
							val.push(state.options[indexOfOption]);
						} else if (freeSolo && !!item) {
							freeSoloOptions.push({ id: item, label: item });
						}
					}
				}
			} else {
				const indexOfOption = findIndexOfOption(parsedValue);
				if (indexOfOption !== -1) {
					val = state.options[indexOfOption];
				} else if (freeSolo && !!parsedValue) {
					freeSoloOptions.push({ id: parsedValue, label: parsedValue });
				}
			}
			if (freeSoloOptions.length > 0) {
				setState((prevState) => ({ options: freeSoloOptions.concat(prevState.options) }));
			}
		}

		return val;
	}, [value, state.options?.length, multiple, valueParser]);

	const deriveOptions = React.useCallback(
		({ append = false, prepend = false, deriverArgs = {}, deriver = [] } = {}) => {
			setState((prevState) => ({ loading: true, error: null, options: [] }));

			Promise.all([
				typeof deriver === 'function'
					? options(...[...deriverArgs, { page: state.page, keyword: keywordRef.current?.value, pagination, ...context }])
					: deriver
			])
				.then((res) => {
					if (Array.isArray(res[0])) {
						setState({ options: res[0], loading: false });
					} else if (typeof res[0] === 'object') {
						const { options: resOptions, count: resCount } = { ...res[0] };
						if (Array.isArray(resOptions) && isMountedRef.current) {
							setState((prevState) => {
								let allOptions = [...resOptions];

								if (append) {
									allOptions = allOptions.concat(resOptions);
								}
								if (prepend) {
									allOptions = resOptions.concat(allOptions);
								}
								return {
									loading: false,
									pages: pagination > 0 && resCount > 0 ? Math.ceil(resCount / pagination) : 1,
									options: allOptions
								};
							});
						}
					}
				})
				.catch((err) => {
					if (isMountedRef.current) {
						setState({
							loading: false,
							error: err?.message || `Something went wrong loading ${label || 'options'}`,
							options: []
						});
					}
				});
		},
		[context, state.page]
	);

	const handleOnRefresh = React.useCallback(
		(event) => {
			deriveOptions({
				deriver: options,
				deriverArgs: optionsArgs
			});
		},
		[optionsArgs, options, state.page]
	);

	React.useEffect(() => {
		if (!isMountedRef.current) {
			isMountedRef.current = true;
		}
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	const handleGetOptionDisabled = React.useCallback(
		(option) => {
			if (typeof getOptionDisabled === 'function') {
				return getOptionDisabled(option, { options: state.options, value: derivedValue });
			}
			return false;
		},
		[getOptionDisabled, state.options, derivedValue]
	);
	const renderInput = React.useCallback(
		(params) => {
			if (typeof renderInputProp === 'function') {
				return renderInputProp(params);
			}
			const handleBlur = (e) => {
				params.inputProps.onBlur(e);
				if (typeof textFieldProps?.inputProps?.onBlur === 'function') {
					textFieldProps?.inputProps.onBlur(e);
				}
			};
			return (
				<TextField
					error={!!error || !!state.error}
					helperText={state.error || helperText}
					FormHelperTextProps={{ component: 'span', ...textFieldProps.FormHelperTextProps }}
					required={required}
					{...textFieldProps}
					{...params}
					label={label}
					variant={variant}
					inputProps={{
						autoComplete: 'new-password',
						form: {
							autoComplete: 'off'
						},
						...textFieldProps?.inputProps,
						...params.inputProps,
						onBlur: handleBlur
					}}
					InputProps={{
						placeholder: placeholder,
						...params.InputProps,
						...textFieldProps?.InputProps,

						endAdornment: (
							<InputAdornment position="end">
								{!!params.InputProps?.endAdornment && params.InputProps?.endAdornment}
								{(loading || state.loading) && (
									<CircularProgress
										color="primary"
										size="1rem"
									/>
								)}
								{textFieldProps?.InputProps?.endAdornment}
								{typeof options === 'function' &&
									!loading &&
									!state.loading &&
									!hideRefresh &&
									(params.inputProps['aria-expanded'] ?? false) && (
										<IconButton
											color="success"
											onClick={handleOnRefresh}
											disabled={params.disabled}
											size={params.size || 'small'}
											type="button"
										>
											<RefreshIcon fontSize="inherit" />
										</IconButton>
									)}
							</InputAdornment>
						)
					}}
				/>
			);
		},
		[renderInputProp, loading, state.loading, error, state.error, variant, hideRefresh, required]
	);

	const handleIsOptionEqualToValue = (option, value) => {
		let equal = false;
		if (Array.isArray(value)) {
			equal = findIndexOfOption(option, value) !== -1;
		} else if (value) {
			equal = findIndexOfOption(option, [value]) !== -1;
		}
		return equal;
	};

	const renderOption = (params, option) => (
		<li
			{...params}
			key={`key-${params.id}`}
		>
			{option.freeSoloLabel || option.label}
		</li>
	);

	const handleServerFilterChange = React.useCallback(
		debounce(1000, () => {
			deriveOptions({
				deriver: options,
				deriverArgs: optionsArgs
			});
		}),
		[filterMode, optionsArgs, options]
	);

	const handleOnInputChange = React.useCallback(
		(event, value, reason) => {
			keywordRef.current = { value, reason };
			if (typeof onInputChange === 'function') {
				onInputChange(event, value, reason, context);
			}
			if (filterMode === 'server' && reason === 'input') {
				handleServerFilterChange();
			}
		},
		[filterMode, onInputChange, context, optionsArgs, options]
	);

	useUniqueEffect(() => {
		const opts = { deriverArgs: optionsArgs, deriver: options };
		opts.append = pagination > 0 && state.page;
		deriveOptions(opts);
	}, [optionsArgs, options]);

	return (
		<Autocomplete
			renderInput={renderInput}
			loadingText={'...'}
			filterOptions={handleFilterOptions}
			isOptionEqualToValue={handleIsOptionEqualToValue}
			getOptionDisabled={handleGetOptionDisabled}
			multiple={multiple}
			blurOnSelect={!multiple}
			renderOption={renderOption}
			openOnFocus
			onInputChange={handleOnInputChange}
			// renderTags={(value, getTagProps, ownerState) =>
			// 	Array.isArray(value) && (
			// 		<Box className="flex flex-wrap">
			// 			{value.map(({ id, value, label }, i) => (
			// 				<Chip {...getTagProps(i)} label={label || value} key={`value-${i}`} />
			// 			))}
			// 		</Box>
			// 	)
			// }
			filterSelectedOptions
			{...rest}
			value={derivedValue}
			options={state.options}
			onChange={handleOnChange}
			required={required}
			freeSolo={freeSolo}
		/>
	);
};

export default React.memo(AsyncAutocomplete);

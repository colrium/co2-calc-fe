import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { forwardRef, useState } from 'react';
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
	opacity: 1,
	y: 0,
	transition: {
		duration: 0.6,
		ease: easing,
		delay: 0.16
	}
};

const TextInput = forwardRef(({ type='text', InputProps, ...rest }, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<TextField
			fullWidth
			size="small"
			autoComplete="current-password"
			type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
			{...rest}
			InputProps={{
				...InputProps,
				endAdornment:
					type === 'password' ? (
						<InputAdornment position="end">
							<IconButton onClick={() => setShowPassword((prev) => !prev)}>
								<Icon path={showPassword ? mdiEyeOffOutline : mdiEyeOutline} size={1} />
							</IconButton>
							{!!InputProps?.endAdornment && <InputProps.endAdornment />}
						</InputAdornment>
					) : (
						InputProps?.endAdornment
					)
			}}
			ref={ref}
		/>
	);
});

export default TextInput;

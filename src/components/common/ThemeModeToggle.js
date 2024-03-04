import { Typography } from '@mui/material';
import { forwardRef } from 'react';
const ThemeModeToggle = forwardRef(({ children, compressor, options, className, ...rest }, ref) => {


	return (
		<Typography className={`w-full ${className || ''} fit-to-width`} {...rest} ref={ref}>
			<span>{children}</span>
		</Typography>
	);
});
export default ThemeModeToggle;

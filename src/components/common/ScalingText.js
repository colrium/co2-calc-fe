import { Typography } from '@mui/material';
import { useRef } from 'react';
const ScalingText = ({children, compressor, options, className, ...rest}) => {
    const ref = useRef();
    
	return (
		<Typography className={`w-full ${className || ''} fit-to-width`} {...rest} ref={ref}>
			<span>{children}</span>
		</Typography>
	);
}
export default ScalingText
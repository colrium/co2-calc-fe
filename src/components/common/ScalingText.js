import { Typography } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
const ScalingText = ({children, compressor, options, className, ...rest}) => {
    const ref = useRef();
    const getContentWidth = (element)=>{
		var styles = getComputedStyle(element);

		return element.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
	}

    const fitText = useCallback(
		(element) => {
            const kompressor = compressor || 1;
			const settings = {
				minFontSize: Number.NEGATIVE_INFINITY,
				maxFontSize: Number.POSITIVE_INFINITY,
                ...options
			};
            let totalWidth = 0;
                for (let i = 0; i < element.children.length; i++) {
					totalWidth += parseInt(element.children[i].offsetWidth, 10);
				}
            const fontSize = Math.max(
				Math.min(totalWidth / (compressor * 10), parseFloat(settings.maxFontSize)),
				parseFloat(settings.minFontSize)
			);
		},
		[compressor, options]
	);
    useEffect(() => {
        setTimeout(() => {
            const elem = ref.current;
            if (elem) {
                // window.fitText(elem);
                /* const refWidth = elem.clientWidth;
                const refFontSize = parseFloat(window.getComputedStyle(elem, null).getPropertyValue('font-size'));
                const scaledFontSize = refWidth / refFontSize;
                let totalWidth = 0;
                for (let i = 0; i < elem.children.length; i++) {
					totalWidth += parseInt(children[i].offsetWidth, 10);
				}
                console.log('scaledFontSize', scaledFontSize);
                console.log('elem', getContentWidth(elem)); */
                // elem.style.fontSize = scaledFontSize;
            }
        }, 150)
        
    })
	return (
		<Typography className={`w-full ${className || ''} fit-to-width`} {...rest} ref={ref}>
			<span>{children}</span>
		</Typography>
	);
}
export default ScalingText
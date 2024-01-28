/** @format */

import { Box, LinearProgress, Typography } from '@mui/material';

export default function Breadcrumbs({ title, loading}) {
	return (
        <Box className="flex-col" >
            <Box className="py-20 px-16 flex-1"  sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
                <Typography variant="h4" color="text.secondary">{title}</Typography>
            </Box>
            {loading && <LinearProgress />}
            
        </Box>
		
	);
}

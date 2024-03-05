import { useQueue } from "@/hooks";
import CheckIcon from '@mui/icons-material/Check';
import { Box, Snackbar, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import { createContext, useContext } from 'react';

const GrowTransition = (props) => {
	return <Grow {...props} />;
}
export const NotificationsContext = createContext({
	notifications: [],
	appendNotification: () => {},
	prependNotification: () => {},
	removeNotification: () => {}
});


export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    return context
}

const NotificationsProvider = ({children}) => {
    const [notification, { enqueue: appendNotification, dequeue: removeNotification, start, ...rest }] = useQueue(
		[],
		{ }
	);
    

    return (
        <NotificationsContext.Provider value={[notification, { appendNotification, removeNotification, start, ...rest }]}>
            {children}
        </NotificationsContext.Provider>
    )
}

export const Notifications = () => (
	<NotificationsContext.Consumer>
		{([notification, { next, dequeue }]) => (
			<Box>
				<Snackbar
					autoHideDuration={notification?.autoHideDuration || 3000}
					anchorOrigin={notification?.anchorOrigin || { vertical: 'bottom', horizontal: 'center' }}
					open={!!notification}
					TransitionComponent={GrowTransition}
					onClose={next}
				>
					<Alert
						onClose={next}
						severity={notification?.severity || 'success'}
						variant={notification?.variant || 'filled'}
						sx={{ width: '100%' }}
						iconMapping={{
							success: <CheckIcon fontSize="inherit" />
						}}
					>
						<Box className="flex flex-col">
							{notification?.message?.split('\n').map((text, i) => (
								<Typography key={`notification-text-${i}`}>{text}</Typography>
							))}
						</Box>
					</Alert>
				</Snackbar>
			</Box>
		)}
	</NotificationsContext.Consumer>
);

export default NotificationsProvider;
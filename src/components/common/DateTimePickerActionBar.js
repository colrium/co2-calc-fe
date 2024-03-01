/** @format */

import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import { useLocaleText } from '@mui/x-date-pickers/internals';
import { useMemo } from 'react';

const DateTimePickerActionBar = ({ onAccept, onClear, onCancel, onSetToday, actions, className }) => {
	const localeText = useLocaleText();
	const actionBtns = useMemo(
		() =>
			actions && actions.length? actions.map((action) => {
				let label = action;
				let onClick;
				switch (action) {
					case 'clear':
						label = localeText.clearButtonLabel;
						onClick = onClear;
						break;
					case 'cancel':
						label = localeText.cancelButtonLabel;
						onClick = onCancel;
						break;
					case 'accept':
						label = localeText.okButtonLabel;
						onClick = onAccept;
						break;
					case 'today':
						label = localeText.todayButtonLabel;
						onClick = onSetToday;
						break;
					default:
						break;
				}
				return { label, onClick };
			}): [],
		[actions]
	);
    if (actions == null || actions.length === 0) {
		return null;
	}
	return (
		<DialogActions className={className}>
			{actionBtns.map(({ label, onClick }, i) => (
				<Button variant="contained" size="small" onClick={onClick} key={`actionBtn-${i}`}>
					{label}
				</Button>
			))}
		</DialogActions>
	);
};
export default DateTimePickerActionBar;
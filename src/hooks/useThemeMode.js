import { useCallback } from "react";
import { useDispatch } from "react-redux";

const { selectAuth, setThemeMode } = require("@/store/authSlice");
const { useSelector } = require("react-redux");

const useThemeMode = () => {
    const { themeMode } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const sytemInDarkMode = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const isDarkMode = themeMode === 'system' ? sytemInDarkMode : themeMode === 'dark';
    const mode = isDarkMode ? 'dark' : 'light';
    const toggleMode = useCallback(
		(tmode = null) => dispatch(setThemeMode(['system', 'dark', 'light'].includes(tmode)? tmode : mode === 'dark' ? 'light' : 'dark')),
		[mode]
	);

   

    return [mode, toggleMode, sytemInDarkMode];
}

export default useThemeMode;
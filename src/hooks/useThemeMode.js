import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDidUpdate from "./useDidUpdate";

const { selectAuth, setThemeMode } = require("@/store/authSlice");
const { useSelector } = require("react-redux");

const useThemeMode = () => {
    const { themeMode } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const matchPrefersDark = window && window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)');
    const sytemInDarkMode = matchPrefersDark?.matches?? false;	
    const [isDarkMode, setIsDarkMode] = useState(themeMode === 'system' ? sytemInDarkMode : themeMode === 'dark');
    const mode = isDarkMode ? 'dark' : 'light';
    const toggleMode = useCallback(
		(tmode = null) =>{
            const nextMode = ['system', 'dark', 'light'].includes(tmode) ? tmode : mode === 'dark' ? 'light' : 'dark'
			dispatch(setThemeMode(nextMode));

        },
		[mode, sytemInDarkMode]
	);

    useDidUpdate(() => {
		setIsDarkMode((sytemInDarkMode && themeMode === 'system') || themeMode === 'dark');
	}, [themeMode]);

    useEffect(() => {
		const changeListener = (e) => {
			setIsDarkMode(e.matches);
		};
		if (themeMode === 'system' && matchPrefersDark) {
			matchPrefersDark.addEventListener('change', changeListener);
			return () => {
				matchPrefersDark.removeEventListener('change', changeListener);
			};
		}
	}, [themeMode]);

    return [mode, toggleMode, sytemInDarkMode];
}

export default useThemeMode;
import { useReducer } from "react";
import { createContext } from "react";
import { ThemeReducer } from "./Reducer/theme.reducer";
import { TOOGLE_THEME } from "./ActionTypes";

export const ThemeContext = createContext();

const initState = {
    theme: 'light'
}

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initState);

    const themeToggle = (theme) => {
        const newtheme = theme === 'light' ? 'dark' : 'light';

        dispatch({type: TOOGLE_THEME, payload: newtheme})
    }

    return (
        <ThemeContext.Provider 
            value={{
                ...state,
                themeToggle
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}


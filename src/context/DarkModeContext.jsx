import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme : dark)").matches,
        "isDarkMode",
    );

    useEffect(
        function () {
            document.documentElement.classList.toggle("dark-mode", isDarkMode);
        },
        [isDarkMode],
    );

    function toggleDarkMode() {
        setIsDarkMode((isDark) => !isDark);
    }
    return (
        <>
            <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
                {children}
            </DarkModeContext.Provider>
        </>
    );
}

function useDarkMode() {
    const dark = useContext(DarkModeContext);
    if (dark === undefined)
        throw new Error("DarkModeContext was used outside of DarkModePRovider");
    return dark;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useDarkMode, DarkModeProvider };

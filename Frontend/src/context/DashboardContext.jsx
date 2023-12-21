import { createContext, useState } from "react";

export const DashboardContext = createContext({
    showSidebar: false,
    isDarkTheme: false,
    toggleDarkTheme: () => { },
    toggleSidebar: () => { },
});

const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

export const DashboardProvider = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
    }

    const value = { showSidebar, toggleSidebar, isDarkTheme, toggleDarkTheme };
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}
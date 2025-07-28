import React, { useState, useEffect, createContext } from 'react';
// import logo from './logo.svg';
import './shared/css/normalize.scss'

import Pages from './pages/Checkout/Index'

// HOOKS
import { useTheme } from './pages/Checkout/hooks/useTheme';

export const ThemeContext = createContext<{
    isDarkMode: boolean;
    toggleTheme: () => void;
}>({ isDarkMode: false, toggleTheme: () => {} });

function App() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <Pages theme={ isDarkMode ? "dark" : "light" } />
        </ThemeContext.Provider>
    );
}

export default App;

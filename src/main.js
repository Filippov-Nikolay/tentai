import React, { useState, useEffect } from "react";

import './shared/css/normalize.scss'

import Pages from './pages/Checkout/Index'

const AppRouter = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        // Чтобы реагировать на изменения темы в системе:
        const handler = (e) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    document.body.className = isDarkMode ? 'dark' : 'light';

    return (
        <Pages theme={ isDarkMode ? "dark" : "light" } />
    )
}

export default AppRouter;

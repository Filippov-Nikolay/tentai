import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './shared/css/normalize.scss'

import Pages from './pages/Checkout/Index'

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        // Чтобы реагировать на изменения темы в системе:
        const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    document.body.className = isDarkMode ? 'dark' : 'light';

    return (
        <Pages theme={ isDarkMode ? "dark" : "light" } />
    );
}

export default App;

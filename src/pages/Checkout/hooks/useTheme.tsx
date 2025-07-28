import { useEffect, useState } from 'react';

export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem('theme');

        return stored ? 
            stored === 'dark' : 
            window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return { isDarkMode, toggleTheme };
}

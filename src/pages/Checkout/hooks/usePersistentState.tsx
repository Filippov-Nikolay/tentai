import { useState, useEffect } from 'react';

export default function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
            try {
                return JSON.parse(stored);
            } catch {
                return stored as unknown as T;
            }
        }
        return defaultValue;
    });

    useEffect(() => {
        const isObject = typeof value === 'object';
        localStorage.setItem(key, isObject ? JSON.stringify(value) : String(value));
    }, [key, value]);

    return [value, setValue];
}

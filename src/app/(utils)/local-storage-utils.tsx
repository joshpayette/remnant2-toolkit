import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [localValue, setValue] = useState(defaultValue);
    useEffect(() => {
        const stored = localStorage.getItem(key);
        setValue(stored ? JSON.parse(stored) : defaultValue);
    }, [key]);

    return { localValue } as const;
}
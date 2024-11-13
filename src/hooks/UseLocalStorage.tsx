"use client";

import { useEffect, useState } from "react";

type SetValue<T> = T | ((val: T) => T);

export function UseLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: SetValue<T>) => void] {
    
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (typeof window !== 'undefined') {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            }
        } catch (error) {
            console.error("Error retrieving local storage value:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const valueToStore = 
            typeof storedValue === "function"
            ? storedValue(storedValue)
            : storedValue;

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error("Error setting local storage value:", error);
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue];

}

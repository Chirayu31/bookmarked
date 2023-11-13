import React from "react";

const useLocalStorage = <T>(storageKey: string, fallbackState: T) => {

    const [value, setValue] = React.useState<T>(() => {
        const storedValue = localStorage.getItem(storageKey);
        return storedValue ? JSON.parse(storedValue) : fallbackState;
    });

    React.useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
};

export default useLocalStorage;
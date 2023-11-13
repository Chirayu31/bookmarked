import React, { Dispatch, SetStateAction } from "react";

const useLocalStorage = <T>(storageKey: string, fallbackState: T): [T, Dispatch<SetStateAction<T>>] => {

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
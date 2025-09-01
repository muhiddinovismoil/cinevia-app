export const setItem = <T>(key: string, value: T): void => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

export const getItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return null;
    }
};

export const updateItem = <T>(key: string, value: T): boolean => {
    try {
        if (localStorage.getItem(key) !== null) {
            setItem(key, value);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error updating localStorage:", error);
        return false;
    }
};

export const removeItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from localStorage:", error);
    }
};

export const clear = (): void => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
};

export const exists = (key: string): boolean => {
    return localStorage.getItem(key) !== null;
};

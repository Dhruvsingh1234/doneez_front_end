export const setStorage = (key: string, value: string | null): void => {
    if (typeof window !== 'undefined') {
        // Code is running in the browser, safe to use localStorage
        if (value) {
            localStorage.setItem(key, value);
        } else {
            localStorage.removeItem(key);
        }
    }
};
export const getStorage = (key: string): string | null => {
    if (typeof window !== 'undefined') {
        // Code is running in the browser, safe to use localStorage
        return localStorage.getItem(key);
    }
    // Code is running on the server, localStorage is not available
    return null;
};
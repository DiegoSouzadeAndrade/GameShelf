import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const reduxStorage = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
        return true;
    },
    getItem: (key: string): string | null => {
        const value = storage.getString(key);
        return value ?? null;
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
};
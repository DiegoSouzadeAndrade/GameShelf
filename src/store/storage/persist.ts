import { storage } from "./index";

const PERSIST_KEY = 'redux-state';

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        storage.set(PERSIST_KEY, serializedState);
    } catch (error) {
        console.error("Error saving state:", error);
    }
};

export const loadState = (): any => {
    try {
        const serializedState = storage.getString(PERSIST_KEY);
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        console.error("Error loading state:", error);
        return undefined;
    }
};

export const clearState = () => {
    storage.delete(PERSIST_KEY);
}

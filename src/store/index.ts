import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import { reduxStorage } from './mmkvStorage';
import {useDispatch} from 'react-redux';
import collectionReducer from './slices/collectionSlice';

const rootReducer = combineReducers({
  collection: collectionReducer,
});

const persistConfig = {
    key: 'root',
    storage: reduxStorage,
};

//const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

//export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

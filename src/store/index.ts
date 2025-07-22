import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import collectionReducer from './slices/collectionSlice';

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

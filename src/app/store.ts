import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import ProductsList, { ActionsTypes } from './ProductsList';

export const store = configureStore({
  reducer: {
    //TODO: check it
    //@ts-ignore
    productsList: ProductsList
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsTypes
>;

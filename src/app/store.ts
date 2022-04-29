import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ProductsList from './ProductsList';

export const store = configureStore({
  reducer: {
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
  Action<string>
>;

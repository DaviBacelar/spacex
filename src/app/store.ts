import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from '../features/launches/favourites-slice';
import { apiSlice } from '../features/launches/launches-api-slice';

export const store = configureStore({
  reducer: {
    favouritesLaunches: favouritesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

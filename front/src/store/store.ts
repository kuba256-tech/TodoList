import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Features/Users/UserSlice';

export const store = configureStore({
  reducer: {
    "users":userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

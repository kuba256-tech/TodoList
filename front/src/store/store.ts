import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../Features/Users/userSlice';
import { tasksReducer } from '../Features/Home/tasksSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

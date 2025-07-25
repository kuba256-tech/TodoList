import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from '../../typed';
import { registerUserThunk } from './userThunks';

interface IUserInitialState {
  user: IUser | null;
  registeringLoading: boolean;
  logingLoading: boolean;
}

const initialState: IUserInitialState = {
  user: null,
  registeringLoading: false,
  logingLoading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(registerUserThunk.pending, (state) => {
      state.registeringLoading = true;
    })
     .addCase(registerUserThunk.fulfilled, (state, {payload}) => {
      state.registeringLoading = false;
      state.user = payload.user
    })
     .addCase(registerUserThunk.rejected, (state) => {
      state.registeringLoading = false;
    })
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisteringLoading: (state) => state.registeringLoading,
    selectLoginLoading: (state) => state.logingLoading,
  },
});

export const userReducer = userSlice.reducer;
export const { selectUser, selectLoginLoading, selectRegisteringLoading } = userSlice.selectors;

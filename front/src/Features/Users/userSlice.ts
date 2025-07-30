import { createSlice } from '@reduxjs/toolkit';
import type { IGlobalError, IUser, IValidationError } from '../../types';
import { loginUserThunk, registerUserThunk } from './userThunks';

interface IUserInitialState {
  user: IUser | null;
  registeringLoading: boolean;
  registerError: null | IValidationError;
  logingLoading: boolean;
  loginError: null | IGlobalError;
}

const initialState: IUserInitialState = {
  user: null,
  registeringLoading: false,
  registerError: null,
  logingLoading: false,
  loginError: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unSetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.registeringLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.registeringLoading = false;
        state.user = payload.user;
      })
      .addCase(registerUserThunk.rejected, (state, { payload: error }) => {
        state.registeringLoading = false;
        state.registerError = error || null;
      });

    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.logingLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.logingLoading = false;
        state.user = payload.user;
      })
      .addCase(loginUserThunk.rejected, (state, { payload: error }) => {
        state.logingLoading = false;
        state.loginError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisteringLoading: (state) => state.registeringLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.logingLoading,
    selectLoginError: (state) => state.loginError,
  },
});

export const userReducer = userSlice.reducer;
export const { unSetUser } = userSlice.actions;
export const { selectUser, selectLoginLoading, selectRegisteringLoading, selectLoginError, selectRegisterError } =
  userSlice.selectors;

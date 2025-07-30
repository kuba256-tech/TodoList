import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IGlobalError, ILoginUser, IRegisterUser, IUser, IValidationError } from '../../types';
import { axiosApi } from '../../axiosApi';
import { AxiosError, isAxiosError } from 'axios';
import type { RootState } from '../../store/store';
import { unSetUser } from './userSlice';

export interface IRegisterAndLoading {
  user: IUser;
  message: string;
}

export const registerUserThunk = createAsyncThunk<
  IRegisterAndLoading,
  IRegisterUser,
  { rejectValue: IValidationError }
>('users/register', async (registerForm, { rejectWithValue }) => {
  try {
    const keys = Object.keys(registerForm) as (keyof IRegisterUser)[];
    const formData = new FormData();
    keys.forEach((key) => {
      if (registerForm[key] !== null) {
        formData.append(key, registerForm[key]);
      }
    });
    const { data } = await axiosApi.post('/users', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status == 400) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const loginUserThunk = createAsyncThunk<IRegisterAndLoading, ILoginUser, { rejectValue: IGlobalError }>(
  'users/login',
  async (loginForm, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post('/users/session', loginForm);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status == 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const logOutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'users/logOut',
  async (_arg, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    await axiosApi.delete('/users/logout', { headers: { Authorization: token } });
  },
);

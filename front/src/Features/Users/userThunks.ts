import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ILoginUser, IRegisterUser, IUser } from '../../typed';
import { axiosApi } from '../../axiosApi';

export interface IRegisterAndLoading {
  user: IUser;
  message: string;
}

export const registerUserThunk = createAsyncThunk<IRegisterAndLoading, IRegisterUser>(
  'users/register',
  async (registerForm) => {
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
      console.log(error);
    }
  },
);

export const loginUserThunk = createAsyncThunk<IRegisterAndLoading, ILoginUser>('users/login', async (loginForm) => {
  try {
    const { data } = await axiosApi.post('/users/session', loginForm);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

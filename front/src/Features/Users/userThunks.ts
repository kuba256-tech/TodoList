import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IRegisterUser, IUser } from '../../typed';
import { axiosApi } from '../../axiosApi';

export interface IRegisterAndLoading {
  user: IUser;
  message: string;
}

export const registerUserThunk = createAsyncThunk<IRegisterAndLoading,IRegisterUser>('users/register', async(registerForm) => {
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
});

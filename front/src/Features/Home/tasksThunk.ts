import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ITask } from '../../typed';
import { axiosApi } from '../../axiosApi';
import type { RootState } from '../../store/store';

export const postTaskThunk = createAsyncThunk<void, ITask, { state: RootState }>(
  'tasks/postTaskThunk',
  async (taskMutation, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    axiosApi.post('/tasks', taskMutation, { headers: { Authorization: token } });
  },
);

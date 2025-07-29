import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ITask, ITaskMutation } from '../../types';
import { axiosApi } from '../../axiosApi';
import type { RootState } from '../../store/store';

export const postTaskThunk = createAsyncThunk<ITask[], ITaskMutation, { state: RootState }>(
  'tasks/postTaskThunk',
  async (taskMutation, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    const { data } = await axiosApi.post('/tasks', taskMutation, { headers: { Authorization: token } });
    return data.tasks;
  },
);

export const fetchAllTasksThunk = createAsyncThunk<ITask[], void, { state: RootState }>(
  'tasks/fetchAllTasksThunk',
  async (_arg, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    const { data } = await axiosApi.get('/tasks', { headers: { Authorization: token } });
    return data;
  },
);

export const deleteTaskThunk = createAsyncThunk<void, string, { state: RootState }>(
  'tasks/deleteTaskThunk',
  async (taskId, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    await axiosApi.delete(`/tasks/${taskId}`, { headers: { Authorization: token } });
  },
);

export const mutateTaskThunk = createAsyncThunk<void, ITask, { state: RootState }>(
  'tasks/mutateTask',
  async (task, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    await axiosApi.put(`/tasks/${task._id}`, task, { headers: { Authorization: token } });
  },
);

export const mutateIsComplete = createAsyncThunk<void, ITask, { state: RootState }>(
  'tasks/mutateIsComplete',
  async (task, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    await axiosApi.patch(
      `/tasks/${task._id}`,
      { isCompleted: task.isCompleted },
      { headers: { Authorization: token } },
    );
  },
);

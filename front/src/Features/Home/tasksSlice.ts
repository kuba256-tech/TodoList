import { createSlice } from '@reduxjs/toolkit';
import type { ITask } from '../../types';
import { deleteTaskThunk, fetchAllTasksThunk, postTaskThunk } from './tasksThunk';

interface initialTasksState {
  tasks: ITask[];
  loadingTasks: boolean;
  postingTask: boolean;
  deletingTask: boolean;
}

const initialState: initialTasksState = {
  tasks: [],
  loadingTasks: false,
  postingTask: false,
  deletingTask: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTaskThunk.pending, (state) => {
        state.postingTask = true;
      })
      .addCase(postTaskThunk.fulfilled, (state, { payload }) => {
        state.postingTask = false;
        state.tasks = payload;
      })
      .addCase(postTaskThunk.rejected, (state) => {
        state.postingTask = false;
      });
    builder
      .addCase(fetchAllTasksThunk.pending, (state) => {
        state.loadingTasks = true;
      })
      .addCase(fetchAllTasksThunk.fulfilled, (state, { payload }) => {
        state.loadingTasks = false;
        state.tasks = payload;
      })
      .addCase(fetchAllTasksThunk.rejected, (state) => {
        state.loadingTasks = false;
      });

    builder
      .addCase(deleteTaskThunk.pending, (state) => {
        state.deletingTask = true;
      })
      .addCase(deleteTaskThunk.fulfilled, (state) => {
        state.deletingTask = false;
      })
      .addCase(deleteTaskThunk.rejected, (state) => {
        state.deletingTask = false;
      });
  },
  selectors: {
    selectAllTasks: (state) => state.tasks,
    selectTasksLoading: (state) => state.loadingTasks,
    selectPostingTasks: (state) => state.postingTask,
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { selectAllTasks, selectTasksLoading, selectPostingTasks } = tasksSlice.selectors;

import { createSlice } from '@reduxjs/toolkit';
import type { ITask } from '../../typed';
import { postTaskThunk } from './tasksThunk';

interface initialTasksState {
  tasks: ITask[];
  loadingTasks: boolean;
  postingTask: boolean;
}

const initialState: initialTasksState = {
  tasks: [],
  loadingTasks: false,
  postingTask: false,
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
      .addCase(postTaskThunk.fulfilled, (state) => {
        state.postingTask = false;
      })
      .addCase(postTaskThunk.rejected, (state) => {
        state.postingTask = false;
      });
  },
  selectors: {
    selectAllTasks: (state) => state.tasks,
    selectTasksLoading: (state) => state.loadingTasks,
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { selectAllTasks, selectTasksLoading } = tasksSlice.selectors;

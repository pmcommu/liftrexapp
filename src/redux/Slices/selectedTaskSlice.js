import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabId: null,
  taskId: null,
  status: null,
};

const selectedTaskSlice = createSlice({
  name: "selectedTask",
  initialState,
  reducers: {
    setSelectedTask(state, action) {
      const { tabId, taskId, status } = action.payload;
      state.tabId = tabId;
      state.taskId = taskId;
      state.status = status;
    },
    clearSelectedTask(state) {
      state.tabId = null;
      state.taskId = null;
      state.status = null;
    },
  },
});

export const { setSelectedTask, clearSelectedTask } =
  selectedTaskSlice.actions;

export default selectedTaskSlice.reducer;

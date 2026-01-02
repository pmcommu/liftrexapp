import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: null,        // 👈 single project details
  loading: false,
  error: null,
};

const projectDetailsSlice = createSlice({
  name: "projectDetails",
  initialState,
  reducers: {
    setProjectLoading(state, action) {
      state.loading = action.payload;
    },
    setProjectDetails(state, action) {
      state.project = action.payload;
      state.error = null;
    },
    setProjectError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearProjectDetails(state) {
      state.project = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setProjectLoading,
  setProjectDetails,
  setProjectError,
  clearProjectDetails,
} = projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;

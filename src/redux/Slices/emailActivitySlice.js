import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

// 🔥 THUNK
export const fetchEmailThread = createAsyncThunk(
  "emailActivity/fetchThread",
  async ({ proposalId, threadId, type }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/user/gmail-thread",
        { proposalId, threadId, type }
      );

      return res.data?.data; // 👈 backend data
    } catch (err) {
      return rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

const emailActivitySlice = createSlice({
  name: "emailActivity",
  initialState: {
    loading: false,
    error: null,
    thread: null, // 👈 email thread data
  },
  reducers: {
    clearEmailThread: (state) => {
      state.loading = false;
      state.error = null;
      state.thread = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailThread.fulfilled, (state, action) => {
        state.loading = false;
        state.thread = action.payload;
      })
      .addCase(fetchEmailThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmailThread } = emailActivitySlice.actions;
export default emailActivitySlice.reducer;

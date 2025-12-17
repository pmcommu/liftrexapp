import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  isFirstLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    // ⭐ Set full user + token together
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isFirstLogin = action.payload.isFirstLogin ?? state.isFirstLogin;
    },

    // ⭐ Update only user
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    // ⭐ Clear all auth data
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isFirstLogin = false;
    },

    // ⭐ Loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // ⭐ Mark after onboarding screens done
    setFirstLogin: (state, action) => {
      state.isFirstLogin = action.payload;
    },
  },
});

export const {
  setAuth,
  updateUser,
  logout,
  setLoading,
  setFirstLogin,
} = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const calculatePricingSlice = createSlice({
  name: "calculatePricing",
  initialState: {
    loading: false,
    pricingResponse: null,
    error: null,
  },
  reducers: {
    pricingStart: state => {
      state.loading = true;
      state.error = null;
    },
    pricingSuccess: (state, action) => {
      state.loading = false;
      state.pricingResponse = action.payload;
    },
    pricingError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  pricingStart,
  pricingSuccess,
  pricingError,
} = calculatePricingSlice.actions;

export default calculatePricingSlice.reducer;

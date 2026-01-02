import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectId: null,
  proposalId: null,
  costHistoryId: null,

  totalCost: 0,
  totalDue: 0,
  totalPaidAmount: 0,

  phaseDivision: 0,

  groups: [],            // grouped elevators
  ungroupedElevators: [],// normal elevators

  lastUpdated: null,
};

const paymentTermsSlice = createSlice({
  name: "paymentTerms",
  initialState,

  reducers: {
    setPaymentTerms(state, action) {
      return {
        ...state,
        ...action.payload,
        lastUpdated: Date.now(),
      };
    },

    resetPaymentTerms() {
      return initialState;
    },
  },
});

export const {
  setPaymentTerms,
  resetPaymentTerms,
} = paymentTermsSlice.actions;

export default paymentTermsSlice.reducer;

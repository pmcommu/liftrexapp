// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   inquiry: null,   // 👈 yahan full card data aayega
// };

// const selectedInquirySlice = createSlice({
//   name: "selectedInquiry",
//   initialState,
//   reducers: {
//     setSelectedInquiry: (state, action) => {
//       state.inquiry = action.payload;
//     },
//     clearSelectedInquiry: (state) => {
//       state.inquiry = null;
//     },
//   },
// });

// export const {
//   setSelectedInquiry,
//   clearSelectedInquiry,
// } = selectedInquirySlice.actions;

// export default selectedInquirySlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inquiry: null,                 // 👈 full card data
  openCreateProposalModal: false // 👈 NEW: dashboard modal flag
};

const selectedInquirySlice = createSlice({
  name: "selectedInquiry",
  initialState,
  reducers: {
    setSelectedInquiry: (state, action) => {
      state.inquiry = action.payload;
    },

    clearSelectedInquiry: (state) => {
      state.inquiry = null;
      state.openCreateProposalModal = false;
    },

    // 🔥 ADD THIS
    openCreateProposalModal: (state) => {
      state.openCreateProposalModal = true;
    },

    // 🔥 ADD THIS (important)
    resetCreateProposalModal: (state) => {
      state.openCreateProposalModal = false;
    },
  },
});

export const {
  setSelectedInquiry,
  clearSelectedInquiry,
  openCreateProposalModal,
  resetCreateProposalModal,
} = selectedInquirySlice.actions;

export default selectedInquirySlice.reducer;

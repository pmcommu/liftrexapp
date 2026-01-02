// import { createSlice } from "@reduxjs/toolkit";

// const calculateCostSlice = createSlice({
//   name: "calculateCost",
//   initialState: {
//     loading: false,
//     error: null,
//     resultsByForm: {}, // { M1: {...}, T1: {...} }
//   },
//   reducers: {
//     calculateStart: state => {
//       state.loading = true;
//       state.error = null;
//     },

//     calculateSuccess: (state, action) => {
//       const { formKey, data } = action.payload;
//       state.loading = false;
//       state.resultsByForm[formKey] = data;
//     },

//     calculateFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     clearFormResult: (state, action) => {
//       delete state.resultsByForm[action.payload];
//     },

//     clearAllResults: state => {
//       state.resultsByForm = {};
//     },

//     // ✅ ADD THIS FOR DRAFT LOAD
//     hydrateDraftResults: (state, action) => {
//       state.resultsByForm = action.payload || {};
//     },
//   },
// });

// export const {
//   calculateStart,
//   calculateSuccess,
//   calculateFail,
//   clearFormResult,
//   clearAllResults,
//   hydrateDraftResults, // ✅ EXPORT THIS
// } = calculateCostSlice.actions;

// export default calculateCostSlice.reducer;


// calculateCostSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const calculateCostSlice = createSlice({
//   name: "calculateCost",
//   initialState: {
//     loading: false,
//     error: null,
//     resultsByForm: {}, // { M1: {...}, T1: {...} }
//   },
//   reducers: {
//     calculateStart: state => {
//       state.loading = true;
//       state.error = null;
//     },

//     calculateSuccess: (state, action) => {
//       const { formKey, data } = action.payload;
//       state.loading = false;
//       state.resultsByForm[formKey] = data;
//     },

//     calculateFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     clearFormResult: (state, action) => {
//       delete state.resultsByForm[action.payload];
//     },

//     clearAllResults: state => {
//       state.resultsByForm = {};
//     },

//     // ✅ ONE ACTION for draft + edit + saved
//     hydrateDraftResults: (state, action) => {
//       state.resultsByForm = action.payload || {};
//     },
//   },
// });

// export const {
//   calculateStart,
//   calculateSuccess,
//   calculateFail,
//   clearFormResult,
//   clearAllResults,
//   hydrateDraftResults,
// } = calculateCostSlice.actions;

// export default calculateCostSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const calculateCostSlice = createSlice({
  name: "calculateCost",
  initialState: {
    loading: false,
    error: null,

    // 🔹 Elevator-wise calculated data
    resultsByForm: {}, // { M1: {...}, T1: {...} }

    // 🔹 GLOBAL price type (IMPORTANT)
    priceType: "Starter Price", // default
  },

  reducers: {
    calculateStart: state => {
      state.loading = true;
      state.error = null;
    },

    calculateSuccess: (state, action) => {
      const { formKey, data } = action.payload;
      state.loading = false;
      state.resultsByForm[formKey] = data;
    },

    calculateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearFormResult: (state, action) => {
      delete state.resultsByForm[action.payload];
    },

    clearAllResults: state => {
      state.resultsByForm = {};
      state.priceType = "Starter Price"; // ✅ reset on new inquiry
    },

    // ✅ Draft / Edit hydrate
    hydrateDraftResults: (state, action) => {
      state.resultsByForm = action.payload || {};
    },

    // ✅ PRICE TYPE SETTER (KEY PART)
    setPriceType: (state, action) => {
      state.priceType = action.payload;
    },

    // ✅ OPTIONAL (if needed)
    resetPriceType: state => {
      state.priceType = "Starter Price";
    },
  },
});

export const {
  calculateStart,
  calculateSuccess,
  calculateFail,
  clearFormResult,
  clearAllResults,
  hydrateDraftResults,
  setPriceType,       // 👈 NEW
  resetPriceType,     // 👈 OPTIONAL
} = calculateCostSlice.actions;

export default calculateCostSlice.reducer;

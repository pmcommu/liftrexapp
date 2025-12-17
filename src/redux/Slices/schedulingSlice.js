// import { createSlice } from "@reduxjs/toolkit";

// const schedulingSlice = createSlice({
//   name: "scheduling",
//   initialState: {
//     selectedSchedule: null,   // ← selected card data
//   },
//   reducers: {
//     setSelectedSchedule: (state, action) => {
//       state.selectedSchedule = action.payload;
//     },
//     clearSelectedSchedule: (state) => {
//       state.selectedSchedule = null;
//     },
//   },
// });

// export const { setSelectedSchedule, clearSelectedSchedule } = schedulingSlice.actions;
// export default schedulingSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const schedulingSlice = createSlice({
  name: "scheduling",
  initialState: {
    selectedSchedule: null,   // selected card data
    schedulingdetails: [],    // ⭐ NEW – store task details here
  },
  reducers: {
    setSelectedSchedule: (state, action) => {
      state.selectedSchedule = action.payload;
    },

    clearSelectedSchedule: (state) => {
      state.selectedSchedule = null;
    },

    // ⭐ NEW – set scheduling details
    setSchedulingDetails: (state, action) => {
      state.schedulingdetails = action.payload;
    },
  },
});

export const {
  setSelectedSchedule,
  clearSelectedSchedule,
  setSchedulingDetails,   // ⭐ export this
} = schedulingSlice.actions;

export default schedulingSlice.reducer;

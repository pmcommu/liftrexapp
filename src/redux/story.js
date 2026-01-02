import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import schedulingReducer from "./Slices/schedulingSlice";
import selectedTaskReducer from "./Slices/selectedTaskSlice";
import selectedInquiryReducer from "./Slices/selectedInquirySlice";
import projectDetailsReducer from "./Slices/projectDetailsSlice";
import calculateCostReducer from "./Slices/calculateCostSlice";
import paymentTermsReducer from "./Slices/paymentTermsSlice";
import calculatePricingReducer from "./Slices/calculatePricingSlice";
import emailActivityReducer from "./Slices/emailActivitySlice";
//import onboardingReducer from './Slices/onboardingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scheduling: schedulingReducer,
    selectedTask: selectedTaskReducer, 
    selectedInquiry: selectedInquiryReducer,
    projectDetails: projectDetailsReducer,
    calculateCost: calculateCostReducer,
    paymentTerms: paymentTermsReducer,
    calculatePricing: calculatePricingReducer,
    emailActivity: emailActivityReducer,
    //onboarding: onboardingReducer,
  },
  // thunk is included by default, no need to add manually
});

export default store;
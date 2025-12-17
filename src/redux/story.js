import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import schedulingReducer from "./Slices/schedulingSlice";
import selectedTaskReducer from "./Slices/selectedTaskSlice";
//import onboardingReducer from './Slices/onboardingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scheduling: schedulingReducer,
    selectedTask: selectedTaskReducer, 
    //onboarding: onboardingReducer,
  },
  // thunk is included by default, no need to add manually
});

export default store;
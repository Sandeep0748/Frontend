import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import skillReducer from './skillSlice';
import requestReducer from './requestSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillReducer,
    requests: requestReducer,
  },
});

export default store;

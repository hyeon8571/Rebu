// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import signupReducer from '../features/auth/signupSlice'; // signupSlice를 가져옵니다.

const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,  // 스토어에 signup 리듀서를 추가합니다.
  },
});

export default store;

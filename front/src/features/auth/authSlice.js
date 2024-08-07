import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  // other states like user data, error, etc.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      console.log("logout...") //debug
      // localStorage.removeItem("accessToken")
    },
    // add other reducers
  },
});

export const { setIsLogin, logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const initialState = {
  isLogin: false,
  nickName: "",
  profileType: 1
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
      localStorage.removeItem("accessToken")
      console.log("logout 성공") //debug
      navigate("/login", { replace: true })
    },
    // add other reducers
  },
});

export const { setIsLogin, logout, isLogin } = authSlice.actions;

export default authSlice.reducer;

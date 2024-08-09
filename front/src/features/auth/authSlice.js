import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';


const initialState = {
  // 로그인할때, 프로필 전환할 때 변경하기
  isLogin: false,
  nickName: "",
  profileType: 1 // 1:일반, 2:디자이너, 3:매장
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

    },
    // add other reducers
  },
});

export const { setIsLogin, logout, isLogin } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
// 여기서 navigate쓰면 안됨


const initialState = {
  // 로그인할때, 프로필 전환할 때 변경하기
  isLogin: false,
  nickname: "",
  profileType: 1 // 1:일반, 2:디자이너, 3:매장 //BE에서 로그인 할 때 받음
};

//loginSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) { //state:현재 상태, action:변동된 것들
      console.log("authSlice login")
      const data = action.payload //isLogin, nickname, profileType
      // state.isLogin = action.payload;
      return {
        isLogin: data.isLogin,
        nickname: data.nickname,
        // profileType: data.profileType //나중에 BE업뎃 후 넣기
      } //새로운 상태
    },
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem("access")
      console.log("redux-logout 성공") //debug
      return { ...initialState }
    },
    // add other reducers
  },
});

export const { login, logout, isLogin } = authSlice.actions;

export default authSlice.reducer;

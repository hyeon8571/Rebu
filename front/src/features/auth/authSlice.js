import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../views/Signup';
// import { useDispatch } from 'react-redux';
// 여기서 navigate쓰면 안됨


const initialState = {
  // 로그인할때, 프로필 전환할 때 변경하기
  isLogin: false,
  nickname: "",
  type: 1 // 1:일반, 2:디자이너, 3:매장 //BE에서 로그인 할 때 받음
};

//loginSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) { //state:현재 상태, action:변동된 것들
      console.log("authSlice login")
      const { nickname, type } = action.payload; //isLogin, nickname, type
      state.isLogin = true;
      state.nickname = nickname;
      state.type = type;
    },
    logout(state) {
      state.isLogin = false;
      state.nickname = "";
      state.type = 1;
      localStorage.removeItem("access")
      console.log("redux-logout 성공") //debug

    },
    // add other reducers
  },
});

export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;


// Thunk action creator
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auths/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.data.code === "로그인 성공 코드") {
      const access = response.headers["access"];
      const { type, nickname } = response.data.body;
      localStorage.setItem("access", access);

      dispatch(loginSuccess({ nickname, type }));
      return { success: true };
    } else {
      console.log("로그인 실패:", response.data.code);
      return { success: false, error: "로그인에 실패했습니다. 이메일이나 비밀번호를 다시 확인해주세요." };
    }
  } catch (error) {
    console.error("로그인 실패: ", error);
    return { success: false, error: "오류가 발생했습니다. 다시 시도해 주세요." };
  }
};

export default authSlice.reducer;
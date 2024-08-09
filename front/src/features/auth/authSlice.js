import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../views/Signup';
// import { useDispatch } from 'react-redux';
// 여기서 navigate쓰면 안됨


const initialState = {
  // 로그인할때, 프로필 전환할 때 변경하기
  isLogin: false,
  nickname: "",
  type: 1, // 1:일반, 2:디자이너, 3:매장 //BE에서 로그인 할 때 받음
  profile: null, //현재 프로필 데이터를 저장할 수 있는 상태 추가
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
      state.profile = null; // 로그아웃 시 프로필도 초기화
      localStorage.removeItem("access")
      console.log("redux-logout 성공") //debug

    },
    setProfile(state, action) {
      state.profile = action.payload; // 프로필 데이터 저장
    }
    // add other reducers
  },
});

export const { loginSuccess, logout, setProfile } = authSlice.actions;
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
      console.log(response)
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

// Thunk action to get profile
export const getProfile = (nickname) => async (dispatch) => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      headers: {
        access: access, // 토큰 전달
        "Content-Type": "application/json",
      },
    });

    console.log("프로필 성공?", response);
    dispatch(setProfile(response.data)); // 프로필 데이터를 상태에 저장
    return { success: true };
  } catch (error) {
    console.error("프로필 가져오기 실패: ", error);
    return { success: false, error: "프로필을 가져오는데 실패했습니다." };
  }
};

export default authSlice.reducer;
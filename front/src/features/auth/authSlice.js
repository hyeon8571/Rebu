// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../views/Signup'; // BASE_URL 경로는 확인 필요

const initialState = {
  isLogin: false,
  nickname: "",
  type: "COMMON",
  profile: {
    favoritesCnt: 0,
    followersCnt: 0,
    followingCnt: 0,
    imageSrc: null,
    introduction: null,
    nickname: "",
    private: false,
    relation: "OWN",
    reviewCnt: 0,
    scrapCnt: 0
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { nickname, type } = action.payload;
      state.isLogin = true;
      state.nickname = nickname;
      state.type = type;
    },
    logout(state) {
      state.isLogin = false;
      state.nickname = "";
      state.type = "COMMON";
      state.profile = initialState.profile;
      localStorage.removeItem("access");
    },
    setProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    }
  },
});

export const { loginSuccess, logout, setProfile } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auths/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.data.code === "로그인 성공 코드") {
      const access = response.headers["access"];
      console.log("로그인 성공", response)
      const { type, nickname } = response.data.body;
      localStorage.setItem("access", access);

      dispatch(loginSuccess({ nickname, type }));

      // 프로필 가져오기
      const profileResult = await dispatch(getProfile(nickname));
      if (profileResult.success) {
        return { success: true };
      } else {
        return { success: false, error: profileResult.error };
      }
    } else {
      return { success: false, error: "로그인에 실패했습니다. 이메일이나 비밀번호를 다시 확인해주세요." };
    }
  } catch (error) {
    return { success: false, error: "오류가 발생했습니다. 다시 시도해 주세요." };
  }
};

export const getProfile = (nickname) => async (dispatch) => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      },
    });

    console.log("getProfile성공", response)
    console.log(response.data.body)
    dispatch(setProfile(response.data.body));
    return { success: true };
  } catch (error) {
    return { success: false, error: "프로필을 가져오는데 실패했습니다." };
  }
};

export default authSlice.reducer;

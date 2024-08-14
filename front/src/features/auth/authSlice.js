// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../views/Signup'; // BASE_URL 경로는 확인 필요

const initialState = {
  isLogin: false,
  nickname: "",
  type: "COMMON",
  imageSrc: "",
  profile: { //profile 나중에 삭제하기
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
      const { nickname, type, imageSrc } = action.payload;
      state.isLogin = true;
      state.nickname = nickname;
      state.type = type;
      state.imageSrc = imageSrc;

    },
    logout(state) {
      state.isLogin = false;
      state.nickname = "";
      state.type = "COMMON";
      state.imageSrc = "";
      state.profile = initialState.profile;
      // localStorage 지우기
      localStorage.removeItem("access");
      localStorage.removeItem("nickname");
      localStorage.removeItem("type");
      localStorage.removeItem("imageSrc");
      localStorage.removeItem("isLogin");
      // localStorage.removeItem("refresh");
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

    if (response.data.code === "1A07") { //로그인 성공 코드
      const access = response.headers["access"];
      console.log("로그인 성공", response)
      const { nickname, type, imageSrc } = response.data.body;
      localStorage.setItem("access", access);
      console.log("login access", access);

      dispatch(loginSuccess({ nickname, type, imageSrc }));
      console.log("타입, 닉네임, 프로필이미지", type, nickname, imageSrc)
      return { success: true };

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



export const switchProfile = (nickname) => async (dispatch) => {
  const access = localStorage.getItem('access');
  console.log("existing access", access);
  console.log("switchProfile", nickname);
  try {
    const response = await axios.post(`${BASE_URL}/api/profiles/switch-profile`,
      // const response = await axios.post(`${BASE_URL}/api/switch-profile`,
      { nickname },  // 요청 바디에 닉네임을 전달
      {
        headers: {
          'Content-Type': 'application/json',
          'access': access
        }
      }
    );
    console.log("switchProfile", response);
    if (response.data.code === "1C09") {//프로필 전환 성공
      console.log(switchProfile, response.data);
      localStorage.setItem("access", response.headers['access']); // 기존에 있던 access 토큰을 새로운 access 토큰으로 교체
      const { nickname, type, imageSrc } = response.data.body;
      dispatch(loginSuccess({ nickname, type, imageSrc }));
      // localStorage에 저장
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("type", type);
      localStorage.setItem("imageSrc", imageSrc);
      localStorage.setItem("isLogin", true);

      return { success: true, data: response.data.body }
    } else {
      return { success: false, data: response.data.body }
    }
  } catch (error) {
    console.error('Error switching profile:', error);
    return { success: false, error: 'Failed to switch profile.' };
  }
}



export default authSlice.reducer;

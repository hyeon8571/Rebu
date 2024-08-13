// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../views/Signup"; // BASE_URL 경로는 확인 필요

const initialState = {
  isLogin: false,
  nickname: "",
  type: "COMMON",
  imageSrc: "",
  profile: {
    //profile 나중에 삭제하기
    favoritesCnt: 0,
    followersCnt: 0,
    followingCnt: 0,
    imageSrc: null,
    introduction: null,
    nickname: "",
    private: false,
    relation: "OWN",
    reviewCnt: 0,
    scrapCnt: 0,
  },
};

const authSlice = createSlice({
  name: "auth",
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
      localStorage.removeItem("access");
    },
    setProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
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

    if (response.data.code === "1A07") {
      const access = response.headers["access"];
      console.log("로그인 성공", response);
      const { type, nickname } = response.data.body;
      localStorage.setItem("access", access);
      localStorage.setItem("nickname", response.data.body.nickname);
      localStorage.setItem("type", response.data.body.type);

      dispatch(loginSuccess({ nickname, type }));
      console.log("타입, 닉네임", type, nickname);

      // 프로필 가져오기
      // const profileResult = await dispatch(getProfile(nickname));
      // if (profileResult.success) {
      return { success: true };
      // } else {
      // return { success: false, error: profileResult.error };
      // }
    } else {
      return {
        success: false,
        error:
          "로그인에 실패했습니다. 이메일이나 비밀번호를 다시 확인해주세요.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "오류가 발생했습니다. 다시 시도해 주세요.",
    };
  }
};

export const getProfile = (nickname) => async (dispatch) => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      headers: {
        access: access,
        "Content-Type": "application/json",
      },
    });

    console.log("getProfile성공", response);
    console.log(response.data.body);
    dispatch(setProfile(response.data.body));
    return { success: true };
  } catch (error) {
    return { success: false, error: "프로필을 가져오는데 실패했습니다." };
  }
};

// export const alarmsAgreement = () => async (dispatch) => {
//   const access = localStorage.getItem("access");
//   try {
//     const response = await axios.get(`${BASE_URL}/api/alarms/subscribe`, {
//       headers: {
//         "access": access,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("alarm axios", response)
//     // console.log(response.data.body)
//     // dispatch(setProfile(response.data.body));
//     return { success: true };
//   } catch (error) {
//     return { success: false, error: "알람 동의 sse연결 실패." };
//   }
// };

// SSE 연결을 위한 이벤트 소스 객체
// let eventSource = null;

// export const alarmsAgreement = () => async (dispatch) => {
//   const access = localStorage.getItem("access");

//   try {
//     // 기존 SSE 연결이 있다면 닫기
//     if (eventSource) {
//       eventSource.close();
//     }

//     // SSE 연결 설정
//     eventSource = new EventSource(`${BASE_URL}/api/alarms/subscribe`, {
//       headers: {
//         "access": access,
//       },
//       withCredentials: true // 쿠키를 포함하여 요청을 보내려면 이 옵션을 true로 설정
//     });

//     // 연결 성공 이벤트
//     eventSource.onopen = () => {
//       console.log("SSE 연결 성공");
//       dispatch({ type: 'ALARMS_AGREEMENT_SUCCESS' });
//     };

//     // 메시지 수신 이벤트
//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("SSE로부터 메시지 수신:", data);
//       dispatch({ type: 'ALARM_RECEIVED', payload: data });
//     };

//     // 에러 처리
//     eventSource.onerror = (error) => {
//       console.error("SSE 연결 에러:", error);
//       eventSource.close();
//       dispatch({ type: 'ALARMS_AGREEMENT_ERROR', payload: "SSE 연결 실패" });
//     };

//     return { success: true };
//   } catch (error) {
//     console.error("알람 동의 SSE 연결 실패:", error);
//     return { success: false, error: "알람 동의 SSE 연결 실패." };
//   }
// };

// // SSE 연결 종료 함수
// export const closeAlarmsConnection = () => {
//   if (eventSource) {
//     eventSource.close();
//     eventSource = null;
//   }
// };

export default authSlice.reducer;

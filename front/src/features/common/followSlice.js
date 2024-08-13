import axios from 'axios';
import { BASE_URL } from '../../views/Signup';

// 팔로잉 목록을 가져오는 함수
export const getFollowingList = async (nickname, page = 0) => {
  const access = localStorage.getItem('access');
  try {
    const response = await axios.get(`${BASE_URL}/api/follows/${nickname}/followings`, {
      headers: {
        'Content-Type': 'application/json',
        'access': access,
      },
      params: { page: page }, //쿼리 파라미터로 페이지 번호 전달
    });
    // API 응답 데이터 반환
    if (response.data.code === "1O02") { // 팔로잉 조회 성공 코드
      console.log('팔로잉 목록 조회 성공:', response.data);
      return { success: true, data: response.data };
    } else {
      console.log('팔로잉 목록 조회-프로필찾기 실패:', response.data);
      return { success: false, data: response.data };
    }
    // 요청 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("팔로잉 목록 가져오기 실패:", error);
    // 요청 실패 시 에러 반환
    return {
      success: false,
      error: error.response ? error.response.data : "팔로잉 목록 가져오기 실패",
    };
  }
};

// 팔로워 목록을 가져오는 API 요청 함수
export const getFollowerList = async (nickname, page = 0) => {
  const access = localStorage.getItem('access'); // 저장된 access token을 가져옵니다

  try {
    const response = await axios.get(`${BASE_URL}/api/follows/${nickname}/followers`, {
      headers: {
        'Content-Type': 'application/json', // 요청 본문 형식 설정
        'access': access, // access 토큰을 헤더에 포함
      },
      params: { page: page }, // 페이지 번호를 쿼리 파라미터로 전달
    });

    if (response.data.code === "1O03") { //팔로워 조회 성공 코드
      console.log("팔로워 목록 가져오기 성공:", response.data);
      return { success: true, data: response.data };
    } else {
      console.log("팔로워 목록 가져오기 실패:", response.data);
      return { success: false, data: response.data };
    }
    // 요청 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("팔로워 목록 가져오기 실패:", error);

    // 요청 실패 시 에러 반환
    return {
      success: false,
      error: error.response ? error.response.data : "팔로워 목록 가져오기 실패",
    };
  }
};



// 팔로우 추가 요청 함수
export const follow = async (nickname) => {
  const access = localStorage.getItem("access"); // 또는 적절한 방법으로 access 토큰을 가져오세요

  try {
    const response = await axios.post(`${BASE_URL}/api/follows`,
      { nickname: nickname }, // 요청 본문에 팔로우 대상 닉네임 포함
      {
        headers: {
          'Content-Type': 'application/json', // 요청 본문 형식 설정
          access: access, // access 토큰을 헤더에 포함
        },
      }
    );

    // 요청 성공 시 응답 데이터 반환
    return { success: true, data: response.data.body };
  } catch (error) {
    // 요청 실패 시 에러 반환
    console.error("팔로우 추가 실패:", error);
    return { success: false, error: error.response ? error.response.data : "팔로우 추가 실패" };
  }
};



// 팔로우 취소 요청 함수
export const unfollow = async (followId) => {
  const access = localStorage.getItem("access"); // 또는 적절한 방법으로 access 토큰을 가져오세요

  try {
    const response = await axios.delete(`${BASE_URL}/api/follows/${followId}`, {
      headers: {
        access: access, // access 토큰을 헤더에 포함
      },
    });

    // 요청 성공 시 응답 데이터 반환
    return { success: true, data: response.data.body };
  } catch (error) {
    // 요청 실패 시 에러 반환
    console.error("팔로우 취소 실패:", error);
    return { success: false, error: error.response ? error.response.data : "팔로우 취소 실패" };
  }
};
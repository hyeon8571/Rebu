import axios from 'axios';
import { BASE_URL } from '../../views/Signup';

// 팔로잉 목록을 가져오는 함수
export const fetchFollowingList = async (nickname) => {
  const access = localStorage.getItem('access');
  try {
    const response = await axios.get(`${BASE_URL}/api/follows/${nickname}/followings`, {
      headers: {
        'Content-Type': 'application/json',
        'access': access,
      },
    });
    // API 응답 데이터 반환
    console.log('Following list fetched:', response);
    return response.data.body;
  } catch (error) {
    console.error('Error fetching following list:', error);
    throw new Error('팔로잉 목록을 가져오는 데 실패했습니다.');
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
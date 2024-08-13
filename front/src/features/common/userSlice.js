import axios from 'axios';
import { BASE_URL } from '../../views/Signup';


// 일반 프로필 정보를 가져오는 함수
export const getCommonProfile = async (nickname) => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      // const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      },
    });
    if (response.data.code === "1C10") { //일반 프로필 조회 성공 코드
      console.log("getProfile성공", response)
      return { success: true, data: response.data.body };
    } else {
      console.log("getProfile실패", response)
      return { success: false, error: "프로필을 가져오는데 실패했습니다." };
    }
  } catch (error) {
    return { success: false, error: "프로필을 가져오는데 실패했습니다." };
  }
};



// 직원 프로필 정보를 가져오는 함수
export const getEmployeeProfile = async (nickname) => {
  const access = localStorage.getItem("access");
  console.log("getEmployeeProfile", nickname);
  try {
    // Axios 요청 보내기
    const response = await axios.get(`${BASE_URL}/api/profiles/employees/${nickname}`, {
      headers: {
        "Content-Type": "application/json",
        "access": access
      }
    });
    console.log("getEmployeeProfile", response);
    // 요청 성공 시 응답 데이터 반환
    if (response.data.code === "1D03") {//직원 프로필 조회 완료 코드
      console.log("직원 프로필 요청 성공:", response);
      return { success: true, data: response.data.body };
    } else {
      console.log("직원 프로필 요청 실패:", response);
      return { success: false, error: "직원 프로필 요청 실패." };
    }
  } catch (error) {
    // 요청 실패 시 에러 메시지 반환
    console.error("직원 프로필 요청 실패:", error);
    return { success: false, error: "직원 프로필 요청 실패." };
  }
};


export const getShopProfile = async (nickname) => {
  const access = localStorage.getItem('access'); // 토큰을 로컬 스토리지에서 가져옴
  console.log('getShopProfile', nickname);
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/shops/${nickname}`, {
      headers: {
        'Content-Type': 'application/json',
        'access': access
      }
    });

    return { success: true, data: response.data.body };
  } catch (error) {
    console.error('Error fetching shop profile:', error);
    return { success: false, error: 'Failed to fetch shop profile.' };
  }
};

export const getAllProfiles = async () => {
  const access = localStorage.getItem('access'); // 토큰을 로컬 스토리지에서 가져옴
  console.log('getAllProfiles');
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles`, {
      headers: {
        'Content-Type': 'application/json',
        'access': access
      }
    });
    if (response.data.code === "1C08") {
      return { success: true, data: response.data.body };
    } else {
      return { success: false, data: response.data.body };
    }
  } catch (error) {
    console.error('Error fetching all profiles:', error);
    return { success: false, error: 'Failed to fetch all profiles.' };
  }
};

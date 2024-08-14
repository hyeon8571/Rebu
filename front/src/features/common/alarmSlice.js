import axios from "axios";
import { LOCAL_URL } from "../../views/Login";
import { BASE_URL } from "../../views/Signup";


export const subscribeToAlarms = async () => {
  try {
    console.log("in subscribeToAlarms");
    const access = localStorage.getItem('access'); // 로컬 스토리지에서 토큰을 가져옴
    console.log("access", access);
    const response = await axios.get(`${BASE_URL}/api/alarms/subscribe`, {
      headers: {
        'Content-Type': 'application/json',
        'access': access,
      },
      withCredentials: true, //쿠키를 포함하여 요청 
    });

    console.log("response", response);
    // if (response.status === 200) {  // 요청이 성공했을 경우
    //   console.log('알림 구독 성공:', response.data);
    //   return {
    //     success: true,
    //     data: response.data,  // 서버로부터 받은 데이터를 반환
    //   };
    // } else {
    //   console.error('알림 구독 실패:', response.status);
    //   return {
    //     success: false,
    //     error: `알림 구독 실패: ${response.status}`,
    //   };
    // }
    return {
      success: false,
      data: response
    }
  } catch (error) {
    console.error('알림 구독 요청 중 오류 발생:', error);
    return {
      success: false,
      error: '알림 구독 요청 중 오류 발생',
    };
  }
};

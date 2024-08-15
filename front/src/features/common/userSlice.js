import axios from "axios";
import { BASE_URL } from "../../views/Signup";

// 일반 프로필 조회
export const getCommonProfile = async (nickname) => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      // const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      headers: {
        access: access,
        "Content-Type": "application/json",
      },
    });
    if (response.data.code === "1C10") {
      //일반 프로필 조회 성공 코드
      console.log("getProfile성공", response);
      return { success: true, data: response.data.body };
    } else {
      console.log("getProfile실패", response);
      return { success: false, error: "프로필을 가져오는데 실패했습니다." };
    }
  } catch (error) {
    return { success: false, error: "프로필을 가져오는데 실패했습니다." };
  }
};

// 직원 프로필 조회 API
export const getEmployeeProfile = async (nickname) => {
  const access = localStorage.getItem("access");
  console.log("getEmployeeProfile", nickname);
  try {
    // Axios 요청 보내기
    const response = await axios.get(
      `${BASE_URL}/api/profiles/employees/${nickname}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: access,
        },
      }
    );
    console.log("getEmployeeProfile", response);
    // 요청 성공 시 응답 데이터 반환
    if (response.data.code === "1C10") {
      //직원 프로필 조회 완료 코드
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

// 매장 프로필 조회 API
export const getShopProfile = async (nickname) => {
  const access = localStorage.getItem("access"); // 토큰을 로컬 스토리지에서 가져옴
  console.log("getShopProfile", nickname);
  try {
    const response = await axios.get(
      `${BASE_URL}/api/profiles/shops/${nickname}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: access,
        },
      }
    );

    return { success: true, data: response.data.body };
  } catch (error) {
    console.error("Error fetching shop profile:", error);
    return { success: false, error: "Failed to fetch shop profile." };
  }
};

// 일반 프로필 마이페이지 조회
export const getCommonMyProfile = async () => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/mypage`, {
      // const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      headers: {
        access: access,
        "Content-Type": "application/json",
      },
    });
    if (response.data.code === "1C10") {
      //일반 프로필 마이페이지 조회 성공 코드
      console.log("getCommonMyProfile 성공", response);
      return { success: true, data: response.data.body };
    } else {
      console.log("getCommonMyProfile 실패", response);
      return { success: false, error: "프로필을 가져오는데 실패했습니다." };
    }
  } catch (error) {
    return { success: false, error: "프로필을 가져오는데 실패했습니다." };
  }
};

// EMPLOYEE 프로필 마이페이지 조회
export const getEmployeeMyProfile = async () => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(
      `${BASE_URL}/api/profiles/employees/mypage`,
      {
        // const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
        headers: {
          access: access,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.code === "1C10") {
      //직원 프로필 마이페이지 조회 성공 코드
      console.log("getEmployeeMyProfile 성공", response);
      return { success: true, data: response.data.body };
    } else if (response.data.code === "0A15") {
      //엑세스 토큰 만료 코드
      console.log("getShopMyProfile 실패: 엑세스토큰 만료", response);
      return { success: false, error: "프로필을 가져오는데 실패했습니다." };
    } else {
      console.log("getEmployeeMyProfile 실패", response);
      return { success: false, error: "프로필을 가져오는데 실패했습니다." };
    }
  } catch (error) {
    return { success: false, error: "프로필을 가져오는데 실패했습니다." };
  }
};

// SHOP 매장 프로필 마이페이지 조회
export const getShopMyProfile = async () => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/shops/mypage`, {
      // const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
      headers: {
        access: access,
        "Content-Type": "application/json",
      },
    });
    if (response.data.code === "1C10") {
      //매장 프로필 마이페이지 조회 성공 코드
      console.log("getShopMyProfile 성공", response);
      return { success: true, data: response.data.body };
    } else if (response.data.code === "0A15") {
      //엑세스 토큰 만료 코드
      console.log("getShopMyProfile 실패: 엑세스토큰 만료", response);
      return { success: false, error: "프로필을 가져오는데 실패했습니다." };
    } else {
      console.log("getShopMyProfile 실패", response);
      return { success: false, error: "프로필을 가져오는데 실패했습니다." };
    }
  } catch (error) {
    return { success: false, error: "프로필을 가져오는데 실패했습니다." };
  }
};

// 가지고 있는 모든 프로필 목록 조회
export const getAllProfiles = async () => {
  const access = localStorage.getItem("access"); // 토큰을 로컬 스토리지에서 가져옴
  console.log("getAllProfiles");
  try {
    const response = await axios.get(`${BASE_URL}/api/profiles`, {
      headers: {
        "Content-Type": "application/json",
        access: access,
      },
    });
    if (response.data.code === "1C08") {
      return { success: true, data: response.data.body };
    } else {
      return { success: false, data: response.data.body };
    }
  } catch (error) {
    console.error("Error fetching all profiles:", error);
    return { success: false, error: "Failed to fetch all profiles." };
  }
};

//일반 프로필 자신 정보 조회 API
export const getCommonProfileInfo = async () => {
  const access = localStorage.getItem("access"); // Retrieve the token from localStorage

  try {
    const response = await axios.get(`${BASE_URL}/api/profiles/info`, {
      headers: {
        "Content-Type": "application/json",
        access: access,
      },
    });

    if (response.data.code === "1C11") {
      // 성공시
      console.log("일반 프로필 자신 정보 조회 성공:", response);
      return { success: true, data: response.data.body };
    } else {
      console.error("Failed to retrieve profile info:", response);
      return { success: false, error: "Failed to retrieve profile info." };
    }
  } catch (error) {
    console.error("Error fetching profile info:", error);
    return {
      success: false,
      error: "An error occurred while fetching the profile info.",
    };
  }
};

//프로필 사진 변경 API
export const updateProfileImage = async (nickname, imageFile) => {
  const access = localStorage.getItem("access"); // 저장된 access 토큰 가져오기
  console.log("프로필 사진 변경 호출");
  try {
    // FormData 객체를 생성하여 이미지 파일을 담습니다.
    const formData = new FormData();
    formData.append("imgFile", imageFile);
    // PATCH 요청을 보냅니다.
    const response = await axios.patch(
      `${BASE_URL}/api/profiles/${nickname}/image`, // 서버 엔드포인트 URL
      formData, // formData를 요청 본문으로 보냅니다.
      {
        headers: {
          "Content-Type": "multipart/form-data", // 헤더에 Content-Type 설정
          access: access, // access 토큰을 헤더에 포함
        },
      }
    );

    // 요청이 성공했을 때의 처리
    if (response.data.code === "1C05") {
      // 1C05은 프로필 이미지 변경 성공 코드 (가정)
      console.log("프로필 이미지 변경 성공:", response.data);
      console.log("이미지 파일", imageFile);
      localStorage.setItem("imageSrc", imageFile); // 로컬에 저장

      return { success: true, data: response.data.body };
    } else if (response.data.code === "0C08") {
      console.error("Profile image format mismatch:", response.data);
      return {
        success: false,
        error: "Profile image format mismatch",
      };
    } else {
      console.error("프로필 이미지 변경 실패:", response.data);
      return { success: false, error: "Unexpected response code" };
    }
  } catch (error) {
    // 요청이 실패했을 때의 처리
    console.error("프로필 이미지 변경 오류:", error);
    return {
      success: false,
      error: error.response?.data || "프로필 이미지 변경에 실패했습니다.",
    };
  }
};


//활동명 변경 API
export const updateWorkingName = async (nickname, newWorkingName) => {
  const access = localStorage.getItem("access"); // 저장된 access 토큰 가져오기
  try {
    // PATCH 요청을 보냅니다.
    const response = await axios.patch(
      `/api/profiles/employees/${nickname}/working-name`, // 엔드포인트 URL
      {
        // Request Body에 포함될 데이터
        "workingName": newWorkingName,
      },
      {
        // Request Header에 포함될 데이터
        headers: {
          'Content-Type': 'application/json',
          'access': access,
        },
      }
    );

    if (response.data.code === "1D02") {
      // 요청이 성공적으로 완료되었을 때의 처리
      console.log('활동명이 성공적으로 변경되었습니다:', response.data);
      return response.data;
    }
    else {
      console.error('활동명 변경 실패:', response.data);
      throw response.data;
    }
  } catch (error) {
    // 요청이 실패했을 때의 처리
    console.error('활동명 변경 중 오류가 발생했습니다:', error);
    throw error;
  }
};


// 전화번호 변경 API
export const updatePhoneNumber = async (nickname, newPhoneNumber) => {
  const access = localStorage.getItem("access"); // 저장된 access 토큰 가져오기
  try {
    const response = await axios.patch(`/api/profiles/${nickname}/phone`, {
      phone: newPhoneNumber
    }, {
      headers: {
        'Content-Type': 'application/json',
        'access': access
      }
    });

    // 요청이 성공한 경우 처리
    if (response.data.code === "1C06") {
      console.log('Phone number updated successfully:', response.data);
      return { success: true, data: response.data };
    } else {
      console.error('Failed to update phone number:', response.data);
      return { success: false, error: response.data };
    }
  } catch (error) {
    console.error('Error updating phone number:', error);
    return { success: false, error: error.message };
  }
};

//프로필 삭제 API
export const deleteProfile = async (nickname) => {
  try {
    const response = await axios.delete(`/api/profiles/${nickname}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // 요청이 성공한 경우 처리
    if (response.data.code === "1C07") {
      console.log('Profile deleted successfully:', response.data);
      return { success: true, data: response.data };
    } else {
      console.error('Failed to delete profile:', response.data);
      return { success: false, error: response.data };
    }
  } catch (error) {
    console.error('Error deleting profile:', error);
    return { success: false, error: error.message };
  }
};

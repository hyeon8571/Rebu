import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "./Signup";
import axios from "axios";

const TestProfile = () => {
  const nickname = useSelector((state) => state.auth.nickname); // 컴포넌트 내부에서 useSelector 사용
  const access = localStorage.getItem("access");
  console.log("토큰", access);
  const getProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/profiles/${nickname}`, {
        headers: {
          access: access, //우리는 token을 access로 받기로 했다
          // Authorization: `Bearer ${access}`,
          "Content-Type": "application/json", // 헤더에 Content-Type 추가
        },
      });

      console.log("프로필 성공?", response);
    } catch (error) {
      console.log(error);
      console.log("실패...");
    }
  };

  // 컴포넌트가 마운트되었을 때 getProfile 호출
  useEffect(() => {
    getProfile();
  }, []); // 빈 배열은 이 useEffect가 한 번만 실행되도록 함

  return (
    <>
      <h1>test page</h1>
    </>
  );
};

export default TestProfile;

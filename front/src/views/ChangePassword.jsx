import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupForm1 from "../components/user/SignupForm1";
import ButtonBack from "../components/common/ButtonBack";
import LoginTitle from "../components/common/LoginTitle";
import styled from "styled-components";
import { BASE_URL } from "./Signup";
import { isLogin } from "../features/auth/authSlice";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;

const ChangePassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const nextStep = async () => {
    // setStep(step + 1);
    // API 사용자 - 사용자 비밀번호 변경(PATCH)
    try {
      // Send the collected data to the server
      const response = await axios.patch(
        `${BASE_URL}/api/members/${email}/password`,
        { password: password }
      );
      console.log("비밀번호 재설정:", response);
      if (response.data.code === "비밀번호 변경 성공 코드") {
        // Handle successful password reset (e.g., redirect to login page)
        alert("비밀번호 변경 성공");
        console.log("비밀번호 변경 성공", password);
        console.log("로그인상태", isLogin);
        if (isLogin) {
          // 로그인 상태이면 프로필로
          navigate("/profile");
        } else {
          // 비로그인 상태면 로그인 화면으로
          navigate("/login");
        }
      } else {
        alert("비밀번호 변경 실패: ", response.data.code);
        console.log("비밀번호 변경 실패: ", response.data.code);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      // Handle password reset error
    }
  };
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  // const handleSubmit = async () => {
  //   try {
  //     // Send the collected data to the server
  //     const response = await axios.post(`${BASE_URL}/api/members`, formData);
  //     console.log("Signup successful:", response.data);
  //     // Handle successful signup (e.g., redirect to login page)
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     // Handle signup error
  //   }
  // };

  return (
    <>
      <div>
        <Container>
          <ButtonBack />
          <LoginTitle
            text={"비밀번호 재설정"}
            description={"가입할 때 사용하신 이메일로 인증코드를 보내드릴게요."}
          />
        </Container>
        {step === 1 && (
          <SignupForm1
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            purpose={"changePassword"}
            buttonTitle={"비밀번호 재설정"}
          />
        )}
      </div>
      {/* <button>비밀번호 재설정하기</button> */}
    </>
  );
};

export default ChangePassword;

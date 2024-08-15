import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignupForm1 from "../components/user/SignupForm1";
import SignupForm2 from "../components/user/SignupForm2";
import ButtonBack from "../components/common/ButtonBack";
import LoginTitle from "../components/common/LoginTitle";
import styled from "styled-components";

export const BASE_URL = "https://www.rebu.kro.kr";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    birth: "",
    phone: "",
    gender: "FEMALE", // Default value
  });
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);

  const handleChange = (input) => (e) => {
    setFormData((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/members`, formData);
      console.log("Signup formData:", formData);
      console.log("Signup response:", response);
      if (response.data.code === "1B00") {
        console.log("회원가입 성공");
        navigate("/login", { replace: true });
      } else if (response.data.code === "0B09") {
        console.log("이메일 중복검사 재실시");
      } else {
        console.log("회원가입 실패: ", response.data.code);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <Container>
        <ButtonBack />
        <LoginTitle text={"회원가입"} description={"REBU 가입을 환영합니다!"} />
      </Container>
      {step === 1 && (
        <SignupForm1
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          purpose={"signup"}
          buttonTitle={"Next"}
        />
      )}
      {step === 2 && (
        <SignupForm2
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Signup;

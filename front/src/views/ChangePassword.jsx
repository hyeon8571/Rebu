import { useState } from "react";
import axios from "axios";
import SignupForm1 from "../components/user/SignupForm1";
import ButtonBack from "../components/common/ButtonBack";
import LoginTitle from "../components/common/LoginTitle";
import styled from "styled-components";
import { BASE_URL } from "./Signup";

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
  const nextStep = () => {
    setStep(step + 1);
  };
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Send the collected data to the server
      const response = await axios.post(`${BASE_URL}/api/members`, formData);
      console.log("Signup successful:", response.data);
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error("Signup error:", error);
      // Handle signup error
    }
  };

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
          />
        )}
      </div>
      <button>비밀번호 재설정하기</button>
    </>
  );
};

export default ChangePassword;

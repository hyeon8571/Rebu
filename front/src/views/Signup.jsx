import { useState } from "react";
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
            text={"회원가입"}
            description={"REBU 가입을 환영합니다!"}
          />
          <h3
            style={{
              maxWidth: "70%",
              minWidth: "30%",
              color: "gray",
              padding: "auto 30 0",
            }}
          >
            REBU가입을 환영합니다! :3
          </h3>
        </Container>
        {step === 1 && (
          <SignupForm1
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <SignupForm2
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default Signup;

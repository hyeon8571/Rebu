import { useState } from "react";
import SignupForm1 from "../components/forms/SignupForm1";
import SignupForm2 from "../components/forms/SignupForm2";
import ButtonBack from "../components/common/ButtonBack";
import LoginTitle from "../components/common/LoginTitle";

import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;

const Signup = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
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
        {step === 1 && <SignupForm1 nextStep={nextStep} />}
        {step === 2 && <SignupForm2 />}
      </div>
      {/* <SignupForm1 /> */}
      {/* <SignupForm2 /> */}
    </>
  );
};

export default Signup;

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import {
  IoMdArrowRoundBack,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { ButtonStyles, ButtonHover } from "../common/ButtonLogin";
import "../../views/Login.css";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PasswordDiv = styled(Div)`
  &.password-field {
    margin-bottom: 0.5rem;
  }
`;

const SmallButton = styled.button`
  ${ButtonStyles}
  width: 30%;
  justify-content: end;
  white-space: nowrap;
  margin-left: 10px;
  font-size: 11px;
`;

const SubmitButton = styled.button`
  ${ButtonStyles}
  width: 30%;
  white-space: nowrap;
  margin-left: 10px;
  font-size: 11px;
  height: 50px;
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: whitesmoke;
  color: gray;
  padding: 0.5rem;
  border-radius: 1rem;
  top: -2.5rem;
  transform: translateX(-50%);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
`;

const InfoIconContainer = styled.div`
  cursor: pointer;
  position: relative;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

const SmallButtonHover = styled(ButtonHover)`
  width: 30%;
`;

const PwdIcon = styled("div")`
  display: flex;
  flex-direction: row;
  justify-self: stretch;
  align-items: center;
`;

const SignupForm1 = ({ nextStep }) => {
  const [email, setEmail] = useState("");
  const [emailVeri, setEmailVeri] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeri, setPasswordVeri] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // 입력받은 값들을 콘솔에 출력
    console.log("Email:", email);
    console.log("Email Verification:", emailVeri);
    console.log("Password:", password);
    console.log("Password Verification:", passwordVeri);

    if (true) {
      console.log("3");
      return nav("/signup/step2");
    }
    // 다음 단계로 이동
    // nextStep();
  };

  const emailChange = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    // const emailRegExp = /^[a-zA-Z0-9]{4,12}$/;

    // if (!emailRegExp.test(currentEmail)) {
    //   console.log("이메일 유효성");
    //   setEmailMsg("4-12사이 대소문자 또는 숫자만 입력가능");
    //   setIsEmail(false);
    // } else {
    //   console.log("ㅇㅋ");
    //   setEmailMsg("사용가능한 이메일입니다.");
    //   setIsEmail(true);
    // }
  };

  const emailVeriChange = (e) => {
    setEmailVeri(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const passwordVeriChange = (e) => {
    setPasswordVeri(e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="form">
          {/* 이메일 */}
          <Div>
            <div
              className="emailBox"
              style={{ maxWidth: "100%", justifyContent: "start" }}
            >
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="loginInput"
                value={email}
                onChange={emailChange}
                placeholder="이메일을 입력하세요"
                required
              />
              <p className="msg">{emailMsg}</p>
            </div>
            <SmallButtonHover>인증하기</SmallButtonHover>
          </Div>

          {/* 이메일 인증코드 */}
          <Div>
            <div
              className="emailBox"
              style={{ maxWidth: "100%", justifyContent: "start" }}
            >
              <label htmlFor="emailVerification" className="label">
                Email verification
              </label>
              <input
                type="emailVerification"
                id="emailVerification"
                className="loginInput"
                value={emailVeri}
                onChange={emailVeriChange}
                placeholder="인증코드를 입력하세요"
                required
              />
            </div>
            <SmallButtonHover>확인</SmallButtonHover>
          </Div>

          {/* 비밀번호 */}
          <PwdIcon>
            <div
              className="emailBox"
              style={{ maxWidth: "100%", justifyContent: "start" }}
            >
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="loginInput"
                value={password}
                onChange={passwordChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            {/* 비밀번호 필수요건 설명창 */}
            <InfoIconContainer>
              <IoMdInformationCircleOutline size="30" color="gray" />
              <Tooltip>
                비밀번호: 영문, 숫자, 특수문자 조합으로 이루어진 8~15자의
                문자열로 구성되어야 합니다.
              </Tooltip>
            </InfoIconContainer>
          </PwdIcon>

          {/* 비밀번호 인증 */}
          <Div>
            <div
              className="emailBox"
              style={{ maxWidth: "100%", justifyContent: "start" }}
            >
              <label htmlFor="passwordVerification" className="label">
                Password verification
              </label>
              <input
                type="password"
                id="passwordVerification"
                className="loginInput"
                value={passwordVeri}
                onChange={passwordVeriChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
          </Div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <SubmitButton type="submit">Next</SubmitButton>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default SignupForm1;

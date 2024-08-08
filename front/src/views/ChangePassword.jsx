import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import LoginTitle from "../components/common/LoginTitle";
// import ButtonLogin from "../components/common/ButtonLogin";
import "./Login.css";
import ButtonBack from "../components/common/ButtonBack";
import { ButtonStyles, ButtonHover } from "../components/common/ButtonLogin";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;
const Container2 = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 3rem;
  position: relative;
  /* max-width: 30%; */
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
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
  /* justify-content: end; */
  white-space: nowrap;
  margin-left: 10px;
  font-size: 11px;
  height: 50px;
`;

// info icon - hover
const Tooltip = styled.div`
  position: absolute;
  background-color: white;
  color: gray;
  padding: 0.5rem;
  border-radius: 0.25rem;
  top: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.$visible ? "1" : "0")};
  transition: opacity 0.2s;
`;

const InfoIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// //
// const smallButtonStyles = {
//   backgroundColor: { email } !== "" ? "blue" : "#a55eea",
//   border: "none",
//   borderRadius: "25px",
//   color: "white",
//   height: "3rem",
//   width: "30%",
//   cursor: "pointer",
//   whiteSpace: "nowrap",
// };

// //
// const SmallButtonDisabled = styled.button`
//   ${ButtonStyles}
//   background-color:gray;
//   width: 30%;
//   justify-content: end;
//   white-space: nowrap;
//   margin-left: 10px;
//   font-size: 11px;
// `;
const SmallButtonHover = styled(ButtonHover)`
  width: 30%;
`;

const ChangePassword = () => {
  // const isActive = useState(false);
  const [email, setEmail] = useState("");
  const [emailVeri, setEmailVeri] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeri, setPasswordVeri] = useState("");

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const emailVeriChange = (e) => {
    setEmailVeri(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  const passwordVeriChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <ButtonBack />
      <LoginTitle text={"비밀번호 재설정"} />
      <h3
        style={{
          maxWidth: "70%",
          minWidth: "30%",
          color: "gray",
          padding: "auto 30 0",
        }}
      >
        가입 할 때 사용하신 이메일로 인증코드를 보내드릴게요.
      </h3>

      {/* 이메일 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
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
            // style={{ padding: "auto 20" }}
          />
        </div>
        {/* <SmallButton>인증하기</SmallButton> */}
        {/* 그냥 보라색 버튼-0- */}
        <SmallButtonHover>인증하기</SmallButtonHover>
      </Div>

      {/* 이메일인증코드 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
          <label htmlFor="emailVerification" className="label">
            Email Verification
          </label>
          <input
            type="emailVerification"
            id="emailVerification"
            className="loginInput"
            value={emailVeri}
            onChange={emailVeriChange}
            placeholder="인증코드를 입력하세요"
          />
        </div>
        {/* <SmallButton>인증하기</SmallButton> */}
        {/* 그냥 보라색 버튼-0- */}
        <SmallButtonHover>확인</SmallButtonHover>
      </Div>

      {/* 비밀번호 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
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
          />
        </div>
        {/* 비밀번호 필수요건 설명창 */}
        <Container2>
          <InfoIconContainer
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <IoMdInformationCircleOutline size="30" color="gray" />
            <Tooltip $visible={tooltipVisible}>
              비밀번호: 영문, 숫자, 특수문자 조합으로 이루어진 8~15자의 문자열로
              구성되어야 합니다.
            </Tooltip>
          </InfoIconContainer>
        </Container2>

        {/* <SmallButton>인증하기</SmallButton> */}
        {/* 그냥 보라색 버튼-0- */}
        {/* <SmallButtonHover>확인</SmallButtonHover> */}
      </Div>

      {/* 비밀번호 인증 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
          <label htmlFor="passwordVerification" className="label">
            Password
          </label>
          <input
            type="passwordVerification"
            id="passwordVerification"
            className="loginInput"
            value={passwordVeri}
            onChange={passwordVeriChange}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        {/* 그냥 보라색 버튼-0- */}
        {/* <SmallButtonHover>확인</SmallButtonHover> */}
      </Div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <SubmitButton>변경하기</SubmitButton>
      </div>
    </Container>
  );
};

export default ChangePassword;

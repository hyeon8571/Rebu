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
import SignupForm1 from "../components/user/SignupForm1";

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
  background-color: whitesmoke;
  color: gray;
  padding: 0.5rem;
  border-radius: 1rem;
  top: -2.5rem;
  transform: translateX(-70%) translateY(25%);
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
const PwdIcon = styled("div")`
  display: flex;
  flex-direction: row;
  justify-self: stretch;
  align-items: center;
`;

const SmallButtonHover = styled(ButtonHover)`
  width: 30%;
`;

const FindPassword = () => {
  // const isActive = useState(false);
  const [email, setEmail] = useState("");
  const [emailVeri, setEmailVeri] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeri, setPasswordVeri] = useState("");
  // hover
  const [tooltipVisible, setTooltipVisible] = useState(false);
  // 비밀번호 변경하기-변경완료 페이지 이동
  const nav = useNavigate();
  const onClickChangedPwd = () => {
    return nav("/login/passwordChanged");
  };

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
    <>
      <Container>
        <ButtonBack />
        <LoginTitle text={"비밀번호 변경"} />
        <h3
          style={{
            maxWidth: "70%",
            minWidth: "30%",
            color: "gray",
            padding: "auto 30 0",
          }}
        >
          가입할 때 사용하신 이메일로 인증코드를 보내드릴게요.
        </h3>
      </Container>
      <SignupForm1 />
    </>
  );
};

export default FindPassword;

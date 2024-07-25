import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import styled from "styled-components";

import LoginTitle from "../components/common/LoginTitle";
import ButtonLogin from "../components/common/ButtonLogin";
import ButtonBack from "../components/common/ButtonBack";
import "./Login.css";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  //
  const onKeydown = (e) => {
    // 엔터키 눌렀을 때 로그인 가능
    if (e.keyCode === 13) {
      onsubmit();
    }
  };

  const onSubmit = () => {
    // if (content === "") {
    //   contentRef.current.focus();
    //   return;
    // }
    // MdOutlineCreate(content);
    // setContent(""); //빈 문자열로 초기화
  };
  //

  return (
    <>
      <Container>
        <ButtonBack />
        <LoginTitle
          text={"Hello Again!"}
          description={"Sign in to your account"}
        />

        <div className="emailBox">
          {/* <EmailBox> */}
          <label htmlFor="email" className="label">
            email address
          </label>
          <input
            type="email"
            id="email"
            className="loginInput"
            value={email}
            onChange={emailChange}
            placeholder="rebu@mail.com"
          />
        </div>
        <div className="emailBox">
          <label htmlFor="password" className="label">
            password
          </label>
          <input
            type="password"
            id="password"
            className="loginInput"
            value={password}
            onChange={passwordChange}
            placeholder="Enter your Password"
          />
        </div>

        <ButtonLogin text="Log in" destination="/main"></ButtonLogin>

        <div
          style={{
            fontSize: "11px",
            textAlign: "center",
            margin: "3rem auto 1rem",
          }}
        >
          <Link to={"/login/email"} style={{ textDecoration: "none" }}>
            이메일 찾기
          </Link>
          &nbsp;|&nbsp;
          <Link to={"/login/password"} style={{ textDecoration: "none" }}>
            비밀번호 찾기
          </Link>
          &nbsp;| &nbsp;
          <Link
            to={"/signup"}
            style={{ textDecoration: "none", color: "blueviolet" }}
          >
            회원가입
          </Link>
        </div>
        <div className="socialConnect">
          <img
            src={process.env.PUBLIC_URL + "/kakao.png"}
            alt="logo"
            width="50px"
          />
          <img
            src={process.env.PUBLIC_URL + "/naver.png"}
            alt="logo"
            width="50px"
          />
        </div>
        <div style={{ marginTop: "3rem" }}>
          <p
            style={{
              fontSize: "11px",
              textAlign: "center",
              color: "gray",
              margin: "1rem",
            }}
          >
            Don't have account? Sign up now!
          </p>

          <ButtonLogin
            text={"Sign up"}
            type={"Hover"}
            destination={"/signup"}
          ></ButtonLogin>
        </div>
      </Container>
    </>
  );
};

export default Login;

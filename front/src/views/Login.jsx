import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginUser, setEmail, setPassword } from "../features/auth/authSlice";
import LoginTitle from "../components/common/LoginTitle";
import ButtonLogin from "../components/common/ButtonLogin";
import ButtonBack from "../components/common/ButtonBack";
import "./Login.css";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
  height: 100vh;
`;

const Ptag = styled.p`
  margin: 0;
  margin-bottom: 0.3rem;
  color: red;
  font-size: 12px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const emailChange = (e) => {
    dispatch(setEmail(e.target.value));
    if (e.target.value !== "") {
      setEmailError(false);
    }
  };

  const passwordChange = (e) => {
    dispatch(setPassword(e.target.value));
    if (e.target.value !== "") {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    if (email === "") {
      setEmailError(true);
      hasError = true;
    }
    if (password === "") {
      setPasswordError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      // 비동기 로그인 요청
      await dispatch(loginUser({ email, password })).unwrap();
      // 로그인 성공 시 메인 페이지로 이동
      navigate("/main");
    } catch (err) {
      console.error("로그인 실패:", err);
      // 에러 메시지 설정
      alert(error || "로그인 실패. 다시 시도해 주세요.");
    }
  };

  return (
    <Container>
      <ButtonBack />
      <LoginTitle text="Hello Again!" description="Sign in to your account" />
      <form onSubmit={handleSubmit}>
        <div className="emailBox">
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="loginInput"
            value={email}
            onChange={emailChange}
            onBlur={() => {
              if (email === "") setEmailError(true);
            }}
            placeholder="rebu@mail.com"
            required
          />
        </div>
        {emailError && <Ptag>이메일 주소를 입력해주세요.</Ptag>}
        <div className="emailBox">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="loginInput"
            value={password}
            onChange={passwordChange}
            onBlur={() => {
              if (password === "") setPasswordError(true);
            }}
            placeholder="Enter your Password"
            required
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
          />
        </div>
        {passwordError && <Ptag>비밀번호를 입력해주세요.</Ptag>}
        <ButtonLogin text="Log in" type="submit" disabled={isLoading} />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          fontSize: "11px",
          textAlign: "center",
          margin: "3rem auto 1rem",
        }}
      >
        <Link
          to="/login/email"
          style={{ textDecoration: "none", color: "black" }}
        >
          이메일 찾기
        </Link>
        &nbsp;|&nbsp;
        <Link
          to="/login/password"
          style={{ textDecoration: "none", color: "black" }}
        >
          비밀번호 변경
        </Link>
      </div>
      <div className="socialConnect">
        <img
          src={process.env.PUBLIC_URL + "/kakao.png"}
          alt="Kakao"
          width="50px"
        />
        <img
          src={process.env.PUBLIC_URL + "/naver.png"}
          alt="Naver"
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
          Don't have an account? Sign up now!
        </p>
        <ButtonLogin text="Sign up" type="button" destination="/signup" />
      </div>
    </Container>
  );
};

export default Login;

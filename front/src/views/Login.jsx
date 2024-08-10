// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, alarmsAgreement } from "../features/auth/authSlice";
import styled from "styled-components";
import LoginTitle from "../components/common/LoginTitle";
import ButtonLogin from "../components/common/ButtonLogin";
import { ButtonStyles } from "../components/common/ButtonLogin";
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

const Button = styled.button`
  ${ButtonStyles}
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(email, password));

    if (result.success) {
      alert("로그인 성공");

      // 알람 동의 요청을 처리하고 결과를 기다립니다.
      // const alarmsResult = await dispatch(alarmsAgreement());
      navigate("/main", { replace: true }); // 로그인 성공 후 메인 페이지로 이동
    } else {
      alert(result.error);
    }
  };

  return (
    <Container className="page">
      <LoginTitle text="Hello Again!" description="Sign in to your account" />
      <form onSubmit={handleLogin}>
        <div className="emailBox">
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="loginInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (email === "") setEmailError(true);
              else setEmailError(false);
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
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => {
              if (password === "") setPasswordError(true);
              else setPasswordError(false);
            }}
            placeholder="Enter your Password"
            required
          />
        </div>
        {passwordError && <Ptag>비밀번호를 입력해주세요.</Ptag>}
        <Button type="submit">Login</Button>
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
          비밀번호 재설정
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

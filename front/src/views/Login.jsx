import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, getProfile } from "../features/auth/authSlice";
import { BASE_URL } from "./Signup";
//css
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

  const dispatch = useDispatch(); //redux
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // dispatch(login(loginParam))
    e.preventDefault(); //0ㅅ0
    const result = await dispatch(login(email, password));

    if (result.success) {
      alert("로그인 성공");

      // 로그인 성공 시 프로필조회 후 currentProfile에 데이터 저장
      // const currentProfile = await dispatch(getProfile(nickname));
      // result.payload에서 nickname을 가져옴
      // const nickname = result.payload.nickname; //로그인 성공 시 닉네임 가져옴
      // const nickname = useSelector((state) => state.auth.nickname);
      // const { nickname, type, isLogin } = useSelector((state) => state.auth);

      // 프로필 데이터 가져오기
      // const profile = await dispatch(getProfile(nickname));
      // if (profile.success) {
      //   console.log("프로필 조회 성공:", profile.payload);
      //   // navigate("/profile", { replace: true }); // 프로필 페이지로 이동
      // } else {
      //   alert("프로필 조회에 실패했습니다.");
      // }
      // console.log("nickname", nickname);
      navigate("/error", { replace: true });
    } else {
      alert(result.error);
    }
  };

  return (
    <Container className="page">
      {/* <ButtonBack /> */}

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

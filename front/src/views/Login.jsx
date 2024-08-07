import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../features/auth/authSlice";
import { BASE_URL } from "./Signup";
// import { loginUser } from "../features/auth/authSlice"; // Assuming loginUser is used to dispatch login actions
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); //0ㅅ0
    try {
      // 서버에 로그인 요청 - 비동기
      const response = await axios.post(
        `${BASE_URL}/api/auths/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // if the server expects cookies to be sent along with the request
        }
      );
      console.log("response:", response);
      if (response.data.code === "로그인 성공 코드") {
        // 서버에서 jwt 토큰 받기
        const accessToken = response.headers["access"];
        console.log("access token: ", accessToken);
        localStorage.setItem("accessToken", accessToken); //로컬저장소에 토큰 저장

        // 로그인 성공 표시
        console.log("로그인 성공");
        console.log(email, password);
        console.log("data", response);
        alert("로그인 성공");
        dispatch(setIsLogin(true)); //isLogin = true 로 설정

        navigate("/profile"); //프로필로 임시 이동..
      } else {
        //로그인 에러 코드
        console.log("로그인 실패:", response.data.code);
        alert(
          "로그인에 실패했습니다. 이메일이나 비밀번호를 다시 확인해주세요."
        );
        // console.log(response)
      }
    } catch (error) {
      // 로그인 실패 처리
      alert("로그인 실패");
      console.log("로그인 실패: ", error);
      // setError("로그인 실패. 다시 시도해 주세요.");
      if (error.response && error.response.status === 404) {
        console.error("리소스를 찾을 수 없음: ", error);
        setError("요청한 리소스를 찾을 수 없습니다.");
      } else {
        console.error("오류 발생: ", error);
        setError("오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <Container>
      <div style={{ padding: "1rem" }}></div> {/* 높이 맞추기 */}
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

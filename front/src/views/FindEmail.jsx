import React, { useState, useEffect } from "react";
import LoginTitle from "../components/common/LoginTitle";
import ButtonBack from "../components/common/ButtonBack";
import axios from "axios";
import { BASE_URL } from "./Signup";
import "../views/Login.css";
import styled, { css } from "styled-components";

const ButtonStyles = css`
  background-color: #a55eea;
  border: none;
  border-radius: 25px;
  color: white;
  height: 2rem;
  padding: auto;
  cursor: pointer;
  white-space: nowrap;
  /*   버튼안에 있는 텍스트가 화면이 줄어들더라도 줄바꿈되지 않도록 설정해줌*/
`;

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
  height: 100vh;
`;
const Div = styled.div`
  display: flex;
`;
const Button = styled.button`
  ${ButtonStyles}
  height:3.1rem;
  margin-top: 0;
  padding: 1rem;
  /* margin: 0.7rem; */
`;
const Button2 = styled.button`
  ${ButtonStyles}
  height:3.1rem;
  margin-top: 0.15rem;
  margin-left: 0.7rem;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  white-space: nowrap;
`;
const ErrorText = styled.p`
  color: red;
  margin: 0;
  padding: 0.5rem 0;
`;

const Timer = styled.p`
  color: red;
  font-weight: bold;
`;

const FindEmail = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneVeri, setPhoneVeri] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [isVerificationFieldVisible, setIsVerificationFieldVisible] =
    useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const nameChange = (e) => {
    const filteredValue = e.target.value.replace(
      /[^a-zA-Z\u3131-\u318E\uAC00-\uD7A3\s]/g,
      ""
    );
    setName(filteredValue);
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) return `${match[1]}-${match[2]}-${match[3]}`;
    const partialMatch = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
    if (partialMatch) {
      return `${partialMatch[1]}${
        partialMatch[2] ? `-${partialMatch[2]}` : ""
      }${partialMatch[3] ? `-${partialMatch[3]}` : ""}`;
    }
    return value;
  };

  const phoneVeriChange = (e) => {
    setPhoneVeri(e.target.value);
  };

  const showVerificationField = () => {
    setIsVerificationFieldVisible(true);
    startTimer();
  };

  const startTimer = () => {
    setTimeRemaining(300); // 5분 타이머
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const findEmail = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/members/find-email?name=${name}&phone=${phone}`
      );
      if (response.data.body) {
        alert(`Email: ${response.data.body}`);
      } else {
        alert("이메일이 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("Error while finding email:", error);
      alert("이메일을 찾는 중 오류가 발생했습니다.");
    }
  };

  const verifyPhoneCode = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auths/phone/verify`, {
        phone: phone,
        purpose: "signup",
        verifyCode: phoneVeri,
      });
      if (response.data.success) {
        alert("전화번호 인증이 완료되었습니다.");
        setIsCodeVerified(true);
      } else {
        alert("전화번호 인증에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error verifying phone code:", error);
      alert("전화번호 인증 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { name: "", phone: "" };

    if (!name.trim()) newErrors.name = "필수 입력 항목입니다";
    if (!phone.trim()) newErrors.phone = "필수 입력 항목입니다";

    if (newErrors.name || newErrors.phone) {
      setErrors(newErrors);
      return;
    }
    findEmail();
  };

  return (
    <Container>
      <ButtonBack />
      <LoginTitle text="이메일 찾기" />
      <h3 style={{ minWidth: "30%", color: "gray", padding: "1rem" }}>
        이름과 전화번호를 확인하여 이메일을 찾을 수 있어요.
      </h3>

      {/* 이름 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="loginInput"
            value={name}
            onChange={nameChange}
            placeholder="이름을 입력하세요"
          />
        </div>
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </Div>

      {/* 전화번호 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          <label htmlFor="phone" className="label">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            className="loginInput"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="전화번호를 입력하세요"
          />
        </div>
        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
      </Div>

      {/* 전화번호 인증 요청 */}
      <div>
        {!isVerificationFieldVisible && (
          <Button onClick={showVerificationField}>인증번호 요청</Button>
        )}
        <Div>
          {isVerificationFieldVisible && (
            <>
              <br />
              <div>
                <div
                  className="emailBox"
                  style={{ maxWidth: "100%", justifyContent: "start" }}
                >
                  <Div>
                    <label htmlFor="phoneVeri" className="label">
                      인증번호
                    </label>
                    <input
                      type="text"
                      id="phoneVeri"
                      className="loginInput"
                      value={phoneVeri}
                      onChange={phoneVeriChange}
                      placeholder="000000"
                    />
                    <Timer>
                      {timeRemaining > 0
                        ? `${formatTime(timeRemaining)}`
                        : "시간 초과"}
                    </Timer>
                  </Div>
                </div>
                <p
                  style={{ padding: "0 1rem", margin: "0 auto", color: "red" }}
                >
                  인증번호를 문자 메시지로 전송하였습니다
                </p>
              </div>
              <Button
                style={{ whiteSpace: "nowrap" }}
                onClick={verifyPhoneCode}
              >
                인증하기
              </Button>
            </>
          )}
        </Div>
      </div>

      <SubmitButtonContainer>
        <Button type="submit" onClick={handleSubmit}>
          이메일 찾기
        </Button>
      </SubmitButtonContainer>
    </Container>
  );
};

export default FindEmail;

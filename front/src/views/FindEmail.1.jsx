import React, { useState } from "react";
import LoginTitle from "../components/common/LoginTitle";
import ButtonBack from "../components/common/ButtonBack";
import axios from "axios";
import { BASE_URL } from "./Signup";
import ButtonLarge from "../components/common/ButtonDisabled";
import {
  Container,
  Div,
  ErrorText,
  Timer,
  SubmitButtonContainer,
  Button,
} from "./FindEmail";

export const FindEmail = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneVeri, setPhoneVeri] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [isVerificationFieldVisible, setIsVerificationFieldVisible] =
    useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isPtagVisible, setIsPtagVisible] = useState(false); // p태그 보이게하기
  const [isTimeout, setIsTimeout] = useState(false); // 시간 초과 상태 추가
  const [ptagMessage, setPtagMessage] = useState(
    "인증번호를 문자 메시지로 전송하였습니다"
  ); //p태그 내용

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

  // API: 휴대폰인증(6자리 코드)요청 POST -> 인증코드 폰으로 전송
  const sendPhoneVerification = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auths/phone/send`, {
        phone: phone,
        purpose: "findEmail",
      });
      console.log(response.data);
      if (response.data.code === "이메일 인증 코드 전송 성공 코드") {
        alert("인증번호가 발송되었습니다.");
        setIsVerificationFieldVisible(true);
      } else {
        alert("인증번호 발송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error sending phone verification:", error);
      alert("인증번호 발송 중 오류가 발생했습니다.");
    }
  };

  // 인증번호 요청 버튼 누르면 인증코드 input, 시간초 보임
  const showVerificationField = () => {
    sendPhoneVerification(); // API(POST)-휴대폰인증 요청
    setIsVerificationFieldVisible(true);
    setIsPtagVisible(true); //p태그 보이게
    startTimer();
  };

  const startTimer = () => {
    setTimeRemaining(300); // 5분 타이머 300
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setPtagMessage(
            "시간이 초과되었습니다. 다시 인증요청 버튼을 눌러주세요."
          );
          setIsTimeout(true); // 시간 초과 상태로 설정
          return 0;
        }
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

  // const phoneVeriChange = (e) => {
  //   setPhoneVeri(e.target.value);
  // };
  // 인증번호 확인 input 6자리수 제한
  const phoneVeriCodeChange = (e) => {
    const newCode = e.target.value.replace(/[^0-9]/g, "").slice(0, 6); // 숫자만 허용하고 6자리로 제한
    setPhoneVeri(newCode);
    // setEmptyFieldsMsg((prev) => ({ ...prev, phoneVeriCode: false }));
  };

  // 코드인증
  const verifyPhoneCode = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auths/phone/verify`, {
        phone: phone,
        purpose: "signup",
        verifyCode: phoneVeri,
      });
      console.log(phoneVeri, response.data);
      if (response.data.code === "전화번호 인증 성공 코드") {
        alert("전화번호 인증이 완료되었습니다.");
        setIsCodeVerified(true);
      } else {
        alert("전화번호 인증에 실패했습니다. 사유:" + response.data.code);
        // alert(`전화번호 인증에 실패했습니다. 오류 코드: ${response.data.code}`); //
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
          <ButtonLarge
            button={{
              disabled: name.length < 1 || phone.length < 11,
              onClick: showVerificationField,
              title: "인증번호 요청",
            }}
          />
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
                      onChange={phoneVeriCodeChange}
                      placeholder="000000"
                    />
                    <Timer>
                      {timeRemaining > 0
                        ? `${formatTime(timeRemaining)}`
                        : "시간 초과"}
                    </Timer>
                  </Div>
                </div>
                {/* p태그 조건부로 보이게만듦 */}
                {isPtagVisible && (
                  <p
                    style={{
                      padding: "0",
                      margin: "0 auto",
                      color: isTimeout ? "red" : "blue", // 시간 초과 시 빨간색
                      fontSize: "12px",
                    }}
                  >
                    {ptagMessage}
                  </p>
                )}
              </div>

              <ButtonLarge
                button={{
                  disabled: phoneVeri.length < 6,
                  onClick: isTimeout ? showVerificationField : verifyPhoneCode,
                  title: isTimeout ? "인증번호 요청" : "인증하기",
                }}
              ></ButtonLarge>
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

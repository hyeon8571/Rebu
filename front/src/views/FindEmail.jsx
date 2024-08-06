import LoginTitle from "../components/common/LoginTitle";
import ButtonBack from "../components/common/ButtonBack";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./Signup";
// import styled from "styled-components";
// import { ButtonStyles } from "../components/common/ButtonLogin";
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
  const [phoneVeriCode, setPhoneVeriCode] = useState("");

  // 인증요청시 인증번호 입력할 칸 나오게하기
  const [isVerificationFieldVisible, setIsVerificationFieldVisible] =
    useState(false);
  // 필수요소
  const [errors, setErrors] = useState({ name: "", phone: "" });
  // 인증번호 안에 남은 시간 보여주기
  const [timeRemaining, setTimeRemaining] = useState(0);

  const nameChange = (e) => {
    const filteredValue = e.target.value.replace(
      /[^a-zA-Z\u3131-\u318E\uAC00-\uD7A3\s]/g,
      ""
    );
    setName(filteredValue);
  };

  const phoneChange = (e) => {
    setPhone(e.target.value);
  };
  // const phoneVeriChange = (e) => {
  //   setPhoneVeriCode(e.target.value);
  // };

  const showVerificationField = () => {
    console.log(name, phone);
    findEmail();
    setIsVerificationFieldVisible(true);
    startTimer();
  };

  const startTimer = () => {
    setTimeRemaining(300); // 5분 타이머

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
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

  // phone 입력
  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };

  const formatPhoneNumber = (value) => {
    // 숫자만 남기기: 정규식을 사용하여 숫자가 아닌 모든 문자를 제거하고 최대 11자리까지 허용
    const cleaned = value.replace(/\D/g, "").slice(0, 11);

    // 010-0000-0000 형식으로 포맷팅
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    // 010-0000 또는 010-000-0000 형식으로 포맷팅
    const partialMatch = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
    if (partialMatch) {
      if (partialMatch[2]) {
        return `${partialMatch[1]}-${partialMatch[2]}${
          partialMatch[3] ? `-${partialMatch[3]}` : ""
        }`;
      }
      return partialMatch[1];
    }

    return value;
  };

  // 이메일찾기 axios-get
  const findEmail = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/members/find-email?name=${name}&phone=${phone}`
      );
      if (response.data.body) {
        // true가 중복이 있는 경우
        console.log("email:", response.data.body);
        alert("email:", response.data.body);
      } else {
        console.log(response);
        console.log("body가 비었음. 이메일 없음", response.data.body);
        alert("이메일이 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("Error while finding email:", error);
      console.log("이메일을 찾는 중 오류가 발생했습니다.");
      console.log(phone, name);
    }
  };

  // 인증번호 확인 input 6자리수 제한
  const phoneVeriCodeChange = (e) => {
    const newCode = e.target.value.replace(/[^0-9]/g, "").slice(0, 6); // 숫자만 허용하고 6자리로 제한
    setPhoneVeriCode(newCode);
    // setEmptyFieldsMsg((prev) => ({ ...prev, phoneVeriCode: false }));
  };

  // 코드번호 인증하기(6자리)
  // axios - POST phone/verify
  const verifyPhoneCode = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auths/phone/verify`, {
        phone: phone,
        purpose: "signup",
        verifyCode: phoneVeriCode,
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

    if (name.trim() === "") {
      newErrors.name = "필수 입력 항목입니다";
    }
    if (phone.trim() === "") {
      newErrors.phone = "필수 입력 항목입니다";
    }

    if (newErrors.name || newErrors.phone) {
      setErrors(newErrors);
      return;
    }

    // 폼 데이터 제출 로직
    console.log("폼 제출", name, phone);
  };

  return (
    <Container>
      <ButtonBack />
      <LoginTitle text={"이메일 찾기"} />
      <h3
        style={{
          // maxWidth: "95%",
          minWidth: "30%",
          color: "gray",
          padding: "auto 30 0",
        }}
      >
        번호 인증을 통해 이메일을 찾을 수 있어요.
      </h3>

      {/* 이름 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
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
        {/* 추가 */}
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </Div>

      {/* 전화번호 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
          <label htmlFor="phone" className="label">
            Phone number
          </label>
          <input
            type="phone"
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
                  {/* <EmailBox> */}
                  <Div>
                    <label htmlFor="phoneVeri" className="label">
                      인증번호
                    </label>
                    <input
                      type="phoneVeri"
                      id="phoneVeri"
                      className="loginInput"
                      value={phoneVeriCode}
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
                <p
                  style={{
                    padding: "0 1rem",
                    margin: "0 auto",
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  인증번호를 문자 메시지로 전송하였습니다
                </p>
              </div>
              <Button2
                style={{ whiteSpace: "nowrap" }}
                onClick={verifyPhoneCode}
              >
                인증하기
              </Button2>
              {/* <br /> */}
            </>
          )}
        </Div>
      </div>

      <SubmitButtonContainer>
        {/* <button type="submit">확인</button> */}
        <Button type="submit" onClick={handleSubmit}>
          확인
        </Button>
      </SubmitButtonContainer>
    </Container>
  );
};

export default FindEmail;

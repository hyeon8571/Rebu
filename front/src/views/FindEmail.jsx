import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginTitle from "../components/common/LoginTitle";
import ButtonBack from "../components/common/ButtonBack";
import axios from "axios";
import { BASE_URL } from "./Signup";
import "../views/Login.css";
import styled, { css } from "styled-components";
import ButtonLarge from "../components/common/ButtonDisabled";

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
  const [isPtagVisible, setIsPtagVisible] = useState(false); // p태그 보이게하기
  const [isTimeout, setIsTimeout] = useState(false); // 시간 초과 상태 추가
  const [ptagMessage, setPtagMessage] = useState(
    "인증번호를 문자 메시지로 전송하였습니다"
  ); //p태그 내용
  const [isEmailFound, setIsEmailFound] = useState(false);
  const [findEmailResult, setFindEmailResult] = useState("");
  const nav = useNavigate();
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

  // API: 휴대폰인증 (6자리 코드)요청 POST -> 인증코드 폰으로 전송
  const sendPhoneVerification = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auths/phone/send`, {
        phone: phone,
        purpose: "findEmail",
      });
      console.log(response.data);
      if (response.data.code === "전화번호 인증 코드 전송 성공") {
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

  // 인증번호 확인 input 6자리수 제한
  const phoneVeriCodeChange = (e) => {
    const newCode = e.target.value.slice(0, 6); // 6자리로 제한
    setPhoneVeri(newCode);
    // setEmptyFieldsMsg((prev) => ({ ...prev, phoneVeriCode: false }));
  };

  // API 휴대폰 인증번호 확인 (6자리 코드 휴대폰으로 받은 것 인증)
  const verifyPhoneCode = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auths/phone/verify`,
        {
          phone: phone,
          purpose: "findEmail",
          verifyCode: phoneVeri,
        },
        {
          withCredentials: true, //쿠키-세션 저장을 위한 옵션
        }
      );
      console.log("인증번호확인", phoneVeri, response);
      if (response.data.code === "전화번호 인증 성공 코드") {
        alert("전화번호 인증이 완료되었습니다.");
        console.log("전화번호 인증이 완료되었습니다.");
        setPtagMessage("전화번호 인증이 완료되었습니다.");
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

  // API 이메일 찾기 (GET)
  const findEmail = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/members/find-email?name=${name}&phone=${phone}`,
        { withCredentials: true } // 쿠키-세션을 함께 전송
      );
      console.log(
        `${BASE_URL}/api/members/find-email?name=${name}&phone=${phone}`
      );
      console.log("이메일찾기");
      console.log(response);
      const code = response.data.code;
      console.log("phone", phone);

      if (code === "이메일 찾기 성공 코드") {
        // 이메일이 존재하고, 찾았을 때
        alert(`Email: ${response.data.body}`); //debug

        setIsEmailFound(true);

        // const result = { email: response.data.body };
        const result = response.data.body;

        nav("/login/email-found", { state: result });
      } else if (code === "이름 형식 불일치") {
        // alert("이름을 형식에 맞게 입력해주세요. 한/영 2자이상 16자 이하"); //debug용
        setFindEmailResult(
          "이름을 형식에 맞게 입력해주세요. 한/영 2자이상 16자 이하"
        );
      } else if (code === "번호 미인증") {
        //번호 없는 사람 -> 회원가입 안한 사람?
        // alert("이메일이 존재하지 않습니다."); //debug용
        setFindEmailResult("이메일이 존재하지 않습니다. 번호미인증");
      } else {
        //프로필 낫 파운드
        alert("이메일이 존재하지 않습니다." + response.data.code);
      }
    } catch (error) {
      console.error("Error while finding email:", error);
      alert("이메일을 찾는 중 오류가 발생했습니다.");
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
              disabled: name.length < 1 || phone.length < 12,
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
                  // onClick: isTimeout ? showVerificationField : verifyPhoneCode,
                  onClick: () => {
                    if (isTimeout) {
                      setPhoneVeri(""); // 인증번호 입력 필드를 초기화
                      setIsTimeout(false); // isTimeout 상태를 false로 변경
                      showVerificationField(); // 인증번호 요청 함수 호출
                    } else {
                      verifyPhoneCode(); // 인증번호 확인 함수 호출
                    }
                  },
                  title: isTimeout ? "인증번호 요청" : "인증하기",
                }}
              ></ButtonLarge>
              {/* ㄴ 인증하기 버튼 -> 시간초과되면 인증번호 요청 버튼으로 바뀜*/}
            </>
          )}
        </Div>
      </div>

      {/* <SubmitButtonContainer> */}
      <Button type="submit" onClick={handleSubmit}>
        이메일 찾기
      </Button>
      {/* </SubmitButtonContainer> */}
      <h3>{findEmailResult}</h3>
    </Container>
  );
};

export default FindEmail;

import LoginTitle from "../components/common/LoginTitle";
import ButtonBack from "../components/common/ButtonBack";
import { useState } from "react";
import styled from "styled-components";
import "../views/Login.css";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
  height: 100vh;
`;
const Div = styled.div`
  display: flex;
  /* align-items:  */
  /* align-items: center; */
  /* justify-content: start; */
  /* justify-items: flex-start;
  justify-self: start; */
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
  // 인증요청시 인증번호 입력할 칸 나오게하기
  const [isVerificationFieldVisible, setIsVerificationFieldVisible] =
    useState(false);
  // 필수요소
  const [errors, setErrors] = useState({ name: "", phone: "" });
  // 인증번호 안에 남은 시간 보여주기
  const [timeRemaining, setTimeRemaining] = useState(0);

  const nameChange = (e) => {
    setName(e.target.value);
    // 문자열만 남기기 위해 정규식 사용
    // const filteredValue = value.replace(/[^a-zA-Z가-힣\s]/g, "");
  };
  const phoneChange = (e) => {
    setPhone(e.target.value);
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
    console.log("폼 제출");
  };

  return (
    <Container>
      <ButtonBack />
      <LoginTitle text={"이메일 찾기"} />
      <h3
        style={{
          maxWidth: "70%",
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
            type="name"
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
            onChange={phoneChange}
            placeholder="전화번호를 입력하세요"
          />
        </div>
        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
      </Div>

      {/* 전화번호 인증 요청 */}
      <div>
        {!isVerificationFieldVisible && (
          <button onClick={showVerificationField}>인증번호 요청</button>
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
              <button style={{ whiteSpace: "nowrap" }}>인증하기</button>
              {/* <br /> */}
            </>
          )}
        </Div>
      </div>

      <SubmitButtonContainer>
        {/* <button type="submit">확인</button> */}
        <button type="submit" onClick={handleSubmit}>
          확인
        </button>
      </SubmitButtonContainer>
    </Container>
  );
};

export default FindEmail;

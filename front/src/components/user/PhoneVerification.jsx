import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../views/Signup";
import styled, { css } from "styled-components";
import ButtonLarge from "../common/ButtonDisabled";
// import { ButtonStyles } from "../common/ButtonLogin";

const Div = styled.div`
  display: flex;
`;
const Timer = styled.p`
  color: red;
  font-weight: bold;
`;

const PhoneVerification = ({
  name,
  phone,
  setPhone,
  setIsPhoneVerified,
  purpose,
  checkDuplicate = false,
  setIsPhoneDuplicate,
}) => {
  // const [phone, setPhone] = useState(""); //phone
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [phoneCode, setPhoneCode] = useState(""); //phone
  const [isVerificationFieldVisible, setIsVerificationFieldVisible] =
    useState(false); //phone
  const [timeRemaining, setTimeRemaining] = useState(0); //phone 남은시간

  const [isPtagVisible, setIsPtagVisible] = useState(false); // p태그 보이게하기
  const [isTimeout, setIsTimeout] = useState(false); // 시간 초과 상태 추가
  const [ptagMessage, setPtagMessage] = useState(
    "인증번호를 문자 메시지로 전송하였습니다"
  ); //p태그 내용
  const [phoneMsg, setPhoneMsg] = useState(""); // 전화번호 중복 확인 메시지를 관리

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);

    // 전화번호가 11자리가 되었을 때 중복 체크
    if (checkDuplicate === true && formattedValue.length === 13) {
      // 010-0000-0000 형식은 13자
      checkPhoneAvailability(formattedValue);
    }
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

  // API-휴대폰 중복 확인(GET)
  const checkPhoneAvailability = async (phone) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/profiles/check-phone`, {
        params: { phone: phone, purpose: purpose },
      });
      if (response.data.code === "전화번호 중복 검사 성공 코드") {
        if (response.data.body === true) {
          // true가 중복이 있는 경우
          setPhoneMsg("중복된 전화번호입니다");
          setIsPhoneDuplicate(false);
        } else {
          setPhoneMsg("사용 가능한 전화번호입니다");
          setIsPhoneDuplicate(true);
        }
      } else {
        setPhoneMsg("전화번호 형식이 맞지 않습니다");
      }
    } catch (error) {
      console.error("Error checking phone availability:", error);
      setPhoneMsg("전화번호 확인 중 오류가 발생했습니다.");
      setIsPhoneValid(false);
    }
  };
  // API: 휴대폰인증 (6자리 코드)요청 POST -> 인증코드 폰으로 전송
  const sendPhoneVerification = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auths/phone/send`, {
        phone: phone,
        purpose: purpose,
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
    setPhoneCode(newCode);
    // setEmptyFieldsMsg((prev) => ({ ...prev, phoneVeriCode: false }));
  };

  // API 휴대폰 인증번호 확인 (6자리 코드 휴대폰으로 받은 것 인증)
  const verifyPhoneCode = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auths/phone/verify`,
        {
          phone: phone,
          purpose: purpose,
          verifyCode: phoneCode,
        },
        {
          withCredentials: true, //쿠키-세션 저장을 위한 옵션
        }
      );
      console.log("인증번호확인", phoneCode, response);
      if (response.data.code === "전화번호 인증 성공 코드") {
        alert("전화번호 인증이 완료되었습니다.");
        console.log("전화번호 인증이 완료되었습니다.");
        setPtagMessage("전화번호 인증이 완료되었습니다.");
        setIsPhoneVerified(true);
      } else {
        alert("전화번호 인증에 실패했습니다. 사유:" + response.data.code);
        // alert(`전화번호 인증에 실패했습니다. 오류 코드: ${response.data.code}`); //
      }
    } catch (error) {
      console.error("Error verifying phone code:", error);
      alert("전화번호 인증 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
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
                    <label htmlFor="phoneCode" className="label">
                      인증번호
                    </label>
                    <input
                      type="text"
                      id="phoneCode"
                      className="loginInput"
                      value={phoneCode}
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
                  disabled: phoneCode.length < 6,
                  // onClick: isTimeout ? showVerificationField : verifyPhoneCode,
                  onClick: () => {
                    if (isTimeout) {
                      setphoneCode(""); // 인증번호 입력 필드를 초기화
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
    </>
  );
};

export default PhoneVerification;

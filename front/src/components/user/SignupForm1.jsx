import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { ButtonStyles, ButtonHover } from "../common/ButtonLogin";
import "../../views/Login.css";
import BASE_URL from "../../views/Signup";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PasswordDiv = styled(Div)`
  &.password-field {
    margin-bottom: 0.5rem;
  }
`;

const SmallButton = styled.button`
  ${ButtonStyles}
  width: 30%;
  justify-content: end;
  white-space: nowrap;
  margin-left: 10px;
  font-size: 11px;
`;

const SubmitButton = styled.button`
  ${ButtonStyles}
  width: 30%;
  white-space: nowrap;
  margin-left: 10px;
  font-size: 11px;
  height: 50px;
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: whitesmoke;
  color: gray;
  padding: 0.5rem;
  border-radius: 1rem;
  top: -2.5rem;
  transform: translateX(-50%);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
`;

const InfoIconContainer = styled.div`
  cursor: pointer;
  position: relative;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

const SmallButtonHover = styled(ButtonHover)`
  width: 30%;
`;

const PwdIcon = styled("div")`
  display: flex;
  flex-direction: row;
  justify-self: stretch;
  align-items: center;
`;

const Msg = styled.p`
  font-size: 11px;
  padding: 0;
  margin: 0;
  color: ${(props) => (props.isValid ? "blue" : "red")};
`;

const SignupForm1 = ({ formData, handleChange, nextStep }) => {
  const nav = useNavigate();
  const [emailMsg, setEmailMsg] = useState(""); //pTag
  const [isEmailValid, setIsEmailValid] = useState(false); //이메일중복
  const [isEmailVerified, setIsEmailVerified] = useState(false); //이메일인증번호
  const [isChecking, setIsChecking] = useState(false);
  const [emailVerifyCode, setEmailVerifyCode] = useState(""); //이메일 인증코드
  const [passwordMsg, setPasswordMsg] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState(""); //
  const [emptyFieldsMsg, setEmptyFieldsMsg] = useState({
    email: false,
    emailVerifyCode: false,
    password: false,
    passwordConfirm: false,
  });

  // 디바운스 타이머 관리
  let debounceTimeout;

  // 이메일 중복 체크 함수(GET)
  const checkEmailAvailability = async (email) => {
    try {
      setIsChecking(true);

      const response = await axios.get(
        `${BASE_URL}/pi/members/check-email?email=${email}&purpose=signup`
      );
      if (!response.data.body) {
        //true면 중복
        setEmailMsg("사용 가능한 이메일입니다.");
        setIsEmailValid(true);
      } else {
        setEmailMsg("이미 사용 중인 이메일입니다.");
        setIsEmailValid(false);
      }
    } catch (error) {
      console.error("Error checking email availability:", error);
      setEmailMsg("이메일 확인 중 오류가 발생했습니다.");
      setIsEmailValid(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    handleChange("email")(e);
    setEmptyFieldsMsg((prev) => ({ ...prev, email: false }));

    // 디바운스 타이머 초기화
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // 디바운스 설정 (예: 500ms 후 중복 체크 실행)
    debounceTimeout = setTimeout(() => {
      if (email) {
        checkEmailAvailability(email);
      }
    }, 500);
  };

  const handleEmailBlur = () => {
    if (!formData.email) {
      setEmptyFieldsMsg((prev) => ({ ...prev, email: true }));
    }
  };

  // 이메일 코드 인증용
  const handleEmailVerifyCodeChange = (e) => {
    const newCode = e.target.value.replace(/[^0-9]/g, "").slice(0, 6); // 숫자만 허용하고 6자리로 제한
    setEmailVerifyCode(newCode);
    setEmptyFieldsMsg((prev) => ({ ...prev, emailVerifyCode: false }));
  };

  const handleEmailVerifyCodeBlur = () => {
    if (!emailVerifyCode) {
      setEmptyFieldsMsg((prev) => ({ ...prev, emailVerifyCode: true }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    handleChange("password")(e);
    if (validatePassword(password)) {
      setPasswordMsg("유효한 비밀번호입니다.");
      setIsPasswordValid(true);
    } else {
      setPasswordMsg(
        "비밀번호는 8~15자의 영문, 숫자, 특수문자 조합이어야 합니다."
      );
      setIsPasswordValid(false);
    }
    // 비밀번호 확인 필드와 비교
    if (passwordConfirm && password !== passwordConfirm) {
      setPasswordConfirmMsg("비밀번호가 일치하지 않습니다.");
    } else if (passwordConfirm) {
      setPasswordConfirmMsg("비밀번호가 일치합니다.");
    }
    setEmptyFieldsMsg((prev) => ({ ...prev, password: false }));
  };

  const handlePasswordBlur = () => {
    if (!formData.password) {
      setEmptyFieldsMsg((prev) => ({ ...prev, password: true }));
    }
  };

  const handlePasswordConfirmChange = (e) => {
    const confirmPassword = e.target.value;
    setPasswordConfirm(confirmPassword);
    if (confirmPassword !== formData.password) {
      setPasswordConfirmMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmMsg("비밀번호가 일치합니다.");
    }
    setEmptyFieldsMsg((prev) => ({ ...prev, passwordConfirm: false }));
  };

  const handlePasswordConfirmBlur = () => {
    if (!passwordConfirm) {
      setEmptyFieldsMsg((prev) => ({ ...prev, passwordConfirm: true }));
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (
      isEmailVerified &&
      isPasswordValid &&
      formData.password === passwordConfirm
    ) {
      nextStep();
    } else {
      alert("모든 필드를 올바르게 입력하고 이메일 인증을 완료해주세요.");
    }
  };

  // 테스트용 handleNext.. 테스트 끝나면 위에 있는 코드로 바꾸기
  // const handleNext = (event) => {
  //   event.preventDefault();
  //   // Temporarily allowing the Next button to work without validation checks
  //   nextStep();
  // };

  // 이메일 인증
  const handleVerifyEmail = async () => {
    if (formData.email && isEmailValid) {
      try {
        // 이메일 인증 API 호출
        setIsChecking(true);
        const response = await axios.post(`${BASE_URL}/api/auths/email/send`, {
          email: formData.email,
          purpose: "signup",
        });
        if (response.data.success) {
          alert("인증 이메일이 발송되었습니다. 이메일을 확인해주세요.");
          setIsEmailVerified(true);
        } else {
          alert(response.data.message || "이메일 발송에 실패했습니다.");
        }
      } catch (error) {
        console.error("이메일 인증 오류:", error);
        alert("이메일 인증 중 오류가 발생했습니다.");
      } finally {
        setIsChecking(false);
      }
    } else {
      alert("유효한 이메일을 입력해주세요.");
    }
  };

  // 이메일 인증번호
  const handleVerifyEmailCode = async () => {
    if (formData.email && emailVerifyCode) {
      try {
        // 이메일 인증 API 호출
        const response = await axios.post(
          `${BASE_URL}/api/auths/email/verify`,
          {
            email: formData.email,
            purpose: "signup",
            verifyCode: emailVerifyCode,
          }
        );
        if (response.data.success) {
          alert("이메일 인증이 완료되었습니다.");
          setIsEmailVerified(true);
        } else {
          alert(response.data.message || "이메일 인증에 실패했습니다.");
        }
      } catch (error) {
        console.error("이메일 인증 코드 확인 오류:", error);
        alert("이메일 인증 코드 확인 중 오류가 발생했습니다.");
      }
    } else {
      alert("이메일과 인증 코드를 입력해주세요.");
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
    return passwordRegex.test(password);
  };

  return (
    <Container>
      <form onSubmit={handleNext}>
        <div className="form">
          <Div>
            <div
              className="emailBox"
              style={{ maxWidth: "100%", justifyContent: "start" }}
            >
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="loginInput"
                value={formData.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
            <SmallButtonHover
              type="button"
              onClick={handleVerifyEmail}
              disabled={!formData.email || !isEmailValid || isChecking}
            >
              인증하기
            </SmallButtonHover>
          </Div>
          <Msg isValid={isEmailValid}>
            {isChecking ? "확인 중..." : emailMsg}
          </Msg>
          {emptyFieldsMsg.email && <Msg isValid={false}>내용을 입력하세요</Msg>}

          {/* 이메일인증번호확인 */}
          <Div>
            <div
              className="emailBox"
              style={{ maxWidth: "100%", justifyContent: "start" }}
            >
              <label htmlFor="email" className="label">
                Email verification code
              </label>
              <input
                type="text"
                id="emailCode"
                className="loginInput"
                value={emailVerifyCode}
                onChange={handleEmailVerifyCodeChange}
                onBlur={handleEmailVerifyCodeBlur}
                placeholder="6자리 인증번호를 입력하세요"
                required
              />
            </div>
            <SmallButtonHover
              type="button"
              onClick={handleVerifyEmailCode}
              disabled={
                !formData.email ||
                !isEmailValid ||
                isChecking ||
                isEmailVerified
              }
            >
              {isEmailVerified ? "인증완료" : "인증하기"}
            </SmallButtonHover>
          </Div>
          {/* <Msg isValid={isEmailVerified}>
            {isEmailVerified
              ? "이메일 인증 완료"
              : formData.email && !isEmailVerified
              ? "이메일 인증 필요"
              : ""}
          </Msg> */}

          {emptyFieldsMsg.emailVerifyCode && (
            <Msg isValid={false}>내용을 입력하세요</Msg>
          )}

          {/* 비밀번호 */}
          <Div>
            <div
              className="emailBox"
              style={{ maxWidth: "100%", justifyContent: "start" }}
            >
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="loginInput"
                value={formData.password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <InfoIconContainer>
              <IoMdInformationCircleOutline size="30" color="gray" />
              <Tooltip>
                비밀번호 유효성검사 (영문, 숫자, 특수문자 조합으로 이루어진
                8~15자의 문자열로 이루어진 비밀번호)
              </Tooltip>
            </InfoIconContainer>
          </Div>
          <Msg isValid={isPasswordValid}>{passwordMsg}</Msg>
          {emptyFieldsMsg.password && (
            <Msg isValid={false}>내용을 입력하세요</Msg>
          )}

          {/* 비밀번호 확인 */}
          <div
            className="emailBox"
            style={{ maxWidth: "100%", justifyContent: "start" }}
          >
            <label htmlFor="passwordConfirm" className="label">
              Password verification
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="loginInput"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              onBlur={handlePasswordConfirmBlur}
              placeholder="비밀번호를 한 번 더 확인해주세요"
              required
            />
          </div>
          <Msg isValid={passwordConfirm === formData.password}>
            {passwordConfirmMsg}
          </Msg>
          {emptyFieldsMsg.passwordConfirm && (
            <Msg isValid={false}>내용을 입력하세요</Msg>
          )}

          <div style={{ display: "flex", justifyContent: "end" }}>
            <SubmitButton type="submit">Next</SubmitButton>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default SignupForm1;

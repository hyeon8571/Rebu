import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneVerification from "./PhoneVerification";
import { BASE_URL } from "../../views/Signup";
import styled from "styled-components";
import "../../views/Login.css";
import { ButtonStyles, ButtonHover } from "../common/ButtonLogin";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LargeButton = styled.button`
  ${ButtonStyles}
  font-size:18px;
  /* font-weight: bold; */
  margin-top: 3rem;
`;

const SmallButton = styled.button`
  ${ButtonStyles}
  width: 5rem;
  height: 1.8rem;
  justify-content: end;
  white-space: nowrap;
  margin-left: 0;
  font-size: 11px;
`;

const MidiumButton = styled.button`
  ${ButtonStyles}
  width: 30%;
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

const Msg = styled.p`
  font-size: 11px;
  padding: 0;
  margin: 0;
  color: ${(props) => (props.isValid ? "blue" : "red")};
`;

// 버튼처럼 보이게 하는 스타일
const RadioButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-bottom: 0.3rem;
  flex: 1;
`;

const Button = styled.button`
  background-color: ${(props) => (props.checked ? "#a55eea" : "#f0f0f0")};
  color: ${(props) => (props.checked ? "#fff" : "#000")};
  border: 1px solid ${(props) => (props.checked ? "#a55eea" : "#ccc")};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  flex: 1;
  margin: 0;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.checked ? "#8117eb" : "#e0e0e0")};
  }
`;

const SignupForm2 = ({
  formData, // 부모 컴포넌트로부터 받은 formData
  handleChange, // 부모 컴포넌트로부터 받은 handleChange
  setFormData, // 부모 컴포넌트로부터 받은 setFormData
  handleSubmit: parentHandleSubmit, // 부모 컴포넌트의 handleSubmit
}) => {
  const navigate = useNavigate();

  // 닉네임
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null); //입력 후 닉네임 중복체크 용 타이머

  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false); // 전화번호 중복 체크 결과를 저장하기 위한 상태 추가
  const [phoneMsg, setPhoneMsg] = useState(""); //ptag
  // const [isPhoneValid, setIsPhoneValid] = useState(false); // code 6자리 인증용
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); //전화번호 코드 인증 완료

  // 성별
  // const [gender, setGender] = useState(formData.gender || "FEMALE");

  const handleNameChange = (e) => {
    const filteredValue = e.target.value.replace(
      /[^a-zA-Z\u3131-\u318E\uAC00-\uD7A3\s]/g,
      ""
    );
    setFormData({ ...formData, name: filteredValue }); // formData 상태 업데이트
  };

  // 닉네임 정규식 체크 및 상태 업데이트
  const handleNicknameChange = (e) => {
    const { value } = e.target;
    // 정규식: 영문, 숫자, 특수문자(-_)의 조합으로 2~15자
    const regex =
      /^(?![_-])[A-Za-z0-9](?:[A-Za-z0-9]|[-_](?![_-])){0,14}[A-Za-z0-9]?$/;

    console.log(value);

    // 정규식에 맞거나 비어 있을 경우에만 상태 업데이트
    if (regex.test(value) || value === "") {
      handleChange("nickname")(e);
    }

    // 기존 타이머 제거
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // 닉네임 중복 체크를 위한 디바운싱 처리 (500ms)
    setDebounceTimeout(
      setTimeout(() => {
        if (value) {
          checkNicknameAvailability(value);
        }
      }, 500)
    );
  };

  // cleanup function to clear timeout
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  // API - 닉네임 중복확인 GET <- (nickname지워야할지도?)
  const checkNicknameAvailability = async (nickname) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/profiles/check-nickname`,
        {
          params: {
            nickname: nickname,
            purpose: "signup",
          },
        }
      );
      console.log("닉네임 중복 확인", response);

      if (response.data.code === "닉네임 중복 검사 성공 코드") {
        console.log("닉네임 중복 검사 성공");
        if (response.data.body === true) {
          // true가 중복이 있는 경우
          setNicknameMsg("중복된 닉네임입니다");
          setIsNicknameValid(false);
        } else {
          // 중복 검사 성공 + 중복 닉네임 없음
          setNicknameMsg("사용 가능한 닉네임입니다");
          setIsNicknameValid(true);
        }
      }
    } catch (error) {
      console.error("Error checking nickname availability:", error);
      setNicknameMsg("닉네임 확인 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
    }
  };

  const handleBirthChange = (e) => {
    const { value } = e.target;

    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, "");

    // Format the value as YYYY-MM-DD
    let formattedValue = cleanValue;

    if (cleanValue.length > 4) {
      formattedValue = cleanValue.slice(0, 4) + "-" + cleanValue.slice(4);
    }
    if (cleanValue.length > 6) {
      formattedValue = formattedValue.slice(0, 7) + "-" + cleanValue.slice(6);
    }

    // Regular expression: Only allow YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    console.log("birth:", formattedValue);

    // If the value matches the regex or is still in the middle of typing, update the state
    if (regex.test(formattedValue) || cleanValue.length < 8) {
      handleChange("birth")({ target: { value: formattedValue } });
    }
  };
  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  // const setIsPhoneVerified = (value) => {
  //   isPhoneVerified(value);
  // };

  // 성별
  const handleGenderChange = (value) => {
    handleChange("gender")({ target: { value } });
  };

  // 폼 제출 전 유효성 검사
  const validateForm = () => {
    if (!formData.name) {
      alert("이름을 입력하세요.");
      return false;
    }
    if (!isNicknameValid) {
      alert("닉네임을 올바르게 입력하세요.");
      return false;
    }
    if (!formData.birth) {
      alert("생년월일을 입력하세요.");
      return false;
    }
    // if (!formData.gender) {
    //   alert("성별을 선택하세요.");
    //   return false;
    // }
    if (!formData.phone) {
      alert("전화번호를 입력하세요.");
      return false;
    }
    if (!isPhoneVerified) {
      alert("전화번호 인증을 완료하세요.");
      return false;
    }
    if (isPhoneDuplicate) {
      alert("이미 회원가입한 전화번호입니다.");
      return false;
    }
    // if (!isCodeVerified) {
    //   alert("전화번호를 올바르게 입력하세요.");
    //   return false;
    // }
    return true;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("폼제출", formData);
    if (validateForm()) {
      try {
        await parentHandleSubmit();
        navigate("/signup-completed"); // SignupComp 페이지로 이동
      } catch (error) {
        console.error("Form submission error:", error);
        // 에러 처리 로직 추가 필요!
      }
    }
  };

  return (
    <Container>
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          <label htmlFor="name" className="label">
            이름
          </label>
          <input
            type="text"
            id="name"
            className="loginInput"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
          />
        </div>
      </Div>
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          <label htmlFor="nickname" className="label">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            className="loginInput"
            value={formData.nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력하세요"
            maxLength={16}
            minLength={3}
          />
        </div>
        <InfoIconContainer>
          <IoMdInformationCircleOutline size="30" color="gray" />
          <Tooltip>
            <li>길이는 3자 이상 16자 이하입니다.</li>
            <li>알파벳 소문자, 대문자, 숫자, _, -만을 포함합니다.</li>
            <li>_ 또는 -로 시작하지 않습니다.</li>
            <li>_ 또는 -가 연속해서 두 번 이상 나오지 않습니다.</li>
            <li>_ 또는 -로 끝나지 않습니다.</li>
          </Tooltip>
        </InfoIconContainer>
      </Div>
      <Msg style={{ color: isNicknameValid ? "blue" : "red" }}>
        {nicknameMsg}
      </Msg>
      {/* 생년월일 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          <label htmlFor="birthday" className="label">
            생년월일
          </label>
          <input
            type="text"
            id="birthday"
            className="loginInput"
            value={formData.birth}
            onChange={handleBirthChange}
            placeholder="YYYY-MM-DD"
          />
        </div>
      </Div>
      {/* 성별 선택 */}
      <Div style={{ margin: 0, padding: 0 }}>
        <RadioButtonContainer>
          <Button
            type="button"
            checked={formData.gender === "FEMALE"}
            onClick={() => handleGenderChange("FEMALE")}
          >
            여성
          </Button>
          <Button
            type="button"
            checked={formData.gender === "MALE"}
            onClick={() => handleGenderChange("MALE")}
          >
            남성
          </Button>
        </RadioButtonContainer>
      </Div>
      {/* // 전화번호 중복체크 및 인증 */}
      <PhoneVerification
        name={formData.name}
        phone={formData.phone}
        setPhone={handlePhoneChange}
        setIsPhoneVerified={setIsPhoneVerified}
        purpose={"signup"}
        checkDuplicate={true}
        setIsPhoneDuplicate={setIsPhoneDuplicate}
      />

      {/* 생성 버튼 */}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <LargeButton onClick={handleSubmit}>CREATE</LargeButton>
      </div>
    </Container>
  );
};

export default SignupForm2;

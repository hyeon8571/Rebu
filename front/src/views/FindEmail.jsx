import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./Signup";
import "../views/Login.css";
import styled, { css } from "styled-components";
import LoginTitle from "../components/common/LoginTitle";
import ButtonBack from "../components/common/ButtonBack";
import PhoneVerification from "../components/user/PhoneVerification";
import { ButtonStyles } from "../components/common/ButtonLogin";

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
  /* /* height:3.1rem; */
  margin-top: 2rem;
  /* padding: 1rem; */
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

const FindEmail = () => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const [phone, setPhone] = useState(""); // phone - props
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 폰 인증 상태 -props

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
        setFindEmailResult("휴대폰 번호를 미인증 하셨습니다.");
      } else {
        // alert("이메일이 존재하지 않습니다." + response.data.code);
        setFindEmailResult("이메일이 존재하지 않습니다."); //프로필 낫 파운드
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

      {/* 휴대폰 인증 */}
      <PhoneVerification
        name={name}
        phone={phone}
        setPhone={setPhone}
        setIsPhoneVerified={setIsPhoneVerified}
        purpose={"findEmail"}
        // checkDuplicate={false}
      />

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

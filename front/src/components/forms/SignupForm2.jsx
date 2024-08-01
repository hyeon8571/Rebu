import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import LoginTitle from "../common/LoginTitle";
// import ButtonLogin from "../components/common/ButtonLogin";
import "../../views/Login.css";
import ButtonBack from "../common/ButtonBack";
import { ButtonStyles, ButtonHover } from "../common/ButtonLogin";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
`;
const Container2 = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 3rem;
  position: relative;
  /* max-width: 30%; */
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
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
  /* justify-content: end; */
  white-space: nowrap;
  margin-left: 10px;
  font-size: 11px;
  height: 50px;
`;

// info icon - hover
const Tooltip = styled.div`
  position: absolute;
  background-color: whitesmoke;
  color: gray;
  padding: 0.5rem;
  /* border: 1px solid lightgray; */
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

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  white-space: nowrap;
`;

const PwdIcon = styled("div")`
  display: flex;
  flex-direction: row;
  justify-self: stretch;
  align-items: center;
`;

const SignupForm2 = () => {
  // const isActive = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneVeri, setPhoneVeri] = useState("");
  // hover
  const [tooltipVisible, setTooltipVisible] = useState(false);
  // 비밀번호 변경하기-변경완료 페이지 이동
  const nav = useNavigate();
  const onClickChangedPwd = () => {
    return nav("/login/passwordChanged");
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const nicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const birthdayChange = (e) => {
    setBirthday(e.target.value);
  };
  const phoneChange = (e) => {
    setPhone(e.target.value);
  };
  const phoneVeriChange = (e) => {
    setPhoneVeri(e.target.value);
  };

  // 인증요청시 인증번호 입력할 칸 나오게하기
  const [isVerificationFieldVisible, setIsVerificationFieldVisible] =
    useState(false);

  const showVerificationField = () => {
    setIsVerificationFieldVisible(true);
  };

  return (
    <Container>
      <ButtonBack />
      <LoginTitle text={"회원가입2"} description={"REBU 가입을 환영합니다!"} />
      <h3
        style={{
          maxWidth: "70%",
          minWidth: "30%",
          color: "gray",
          padding: "auto 30 0",
        }}
      >
        REBU가입을 환영합니다! :3
      </h3>

      {/* 이름 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
          <label htmlFor="name" className="label">
            이름
          </label>
          <input
            type="name"
            id="name"
            className="loginInput"
            value={name}
            onChange={nameChange}
            placeholder="이름을 입력하세요"
            // style={{ padding: "auto 20" }}
          />
        </div>
        {/* <SmallButton>인증하기</SmallButton> */}
        {/* 그냥 보라색 버튼-0- */}
        {/* <SmallButtonHover>인증하기</SmallButtonHover> */}
      </Div>

      {/* 닉네임 */}
      {/* <Div> */}
      <PwdIcon>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
          <label htmlFor="nickname" className="label">
            닉네임
          </label>
          <input
            type="nickname"
            id="nickname"
            className="loginInput"
            value={nickname}
            onChange={nicknameChange}
            placeholder="닉네임을 입력하세요"
          />
        </div>
        <InfoIconContainer>
          <IoMdInformationCircleOutline size="30" color="gray" />
          <Tooltip>
            닉네임: 영문, 한글, 숫자, 특수문자(-_^*) 조합으로 이루어진 2~15자의
            문자열로 구성되어야 합니다.
          </Tooltip>
        </InfoIconContainer>
      </PwdIcon>
      {/* <SmallButton>인증하기</SmallButton> */}
      {/* 그냥 보라색 버튼-0- */}
      {/* <SmallButtonHover>확인</SmallButtonHover> */}
      {/* </Div> */}

      {/* 생년월일 */}
      {/* <Div> */}

      <div
        className="emailBox"
        style={{ maxWidth: "100%", justifyContent: "start" }}
      >
        {/* <EmailBox> */}
        <label htmlFor="birthday" className="label">
          생년월일
        </label>
        <input
          type="birthday"
          id="birthday"
          className="loginInput"
          value={birthday}
          onChange={birthdayChange}
          placeholder="YYYYMMDD"
        />
      </div>
      {/* 비밀번호 필수요건 설명창 */}

      {/* <SmallButton>인증하기</SmallButton> */}
      {/* 그냥 보라색 버튼-0- */}
      {/* <SmallButtonHover>확인</SmallButtonHover> */}
      {/* </Div> */}

      {/* 전화번호 */}
      <Div>
        <div
          className="emailBox"
          style={{ maxWidth: "100%", justifyContent: "start" }}
        >
          {/* <EmailBox> */}
          <label htmlFor="phone" className="label">
            전화번호
          </label>
          <input
            type="phone"
            id="phone"
            className="loginInput"
            value={phone}
            onChange={phoneChange}
            placeholder="01012345678"
          />
        </div>
        {/* 전화번호 끝 */}
      </Div>
      <div>
        {!isVerificationFieldVisible && (
          <button onClick={showVerificationField}>번호인증</button>
        )}
        <Div>
          {isVerificationFieldVisible && (
            <>
              <br />
              <div
                className="emailBox"
                style={{ maxWidth: "100%", justifyContent: "start" }}
              >
                {/* <EmailBox> */}
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
              </div>

              <button style={{ whiteSpace: "nowrap" }}>인증하기</button>
            </>
          )}
        </Div>
      </div>

      <SubmitButtonContainer>
        <button type="submit">CREATE</button>
      </SubmitButtonContainer>
    </Container>
  );
};

export default SignupForm2;

import LoginTitle from "../components/common/LoginTitle";
import styled, { css, ButtonStyles } from "styled-components";
import ButtonLogin from "../components/common/ButtonLogin";

// import
// const LoginTitle2 = styled.LoginTitle`

// `
const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
  height: 100vh;
`;

const ChangePasswordCompl = () => {
  return (
    <>
      <Container>
        <div style={{ padding: "3rem 0" }}>
          <LoginTitle text={"비밀번호 변경 완료"} />
        </div>
        <p style={{ height: "40vh" }}></p>
        <ButtonLogin
          text="로그인"
          destination="/login"
          styled={{ marginTop: "300px" }}
        ></ButtonLogin>
      </Container>
    </>
  );
};

export default ChangePasswordCompl;

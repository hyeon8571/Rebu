import LoginTitle from "../components/common/LoginTitle";
import styled from "styled-components";
import ButtonLogin from "../components/common/ButtonLogin";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
  height: 100vh;
`;

const SignupComp = () => {
  return (
    // <div>
    <Container>
      <LoginTitle
        text="Welcome to REBU!"
        description="It's so nice to meet you :D"
      />
      <div style={{ marginBottom: "5rem", textAlign: "center" }}>
        <h3>회원가입이 완료되었습니다.</h3>
        <h3>로그인하러 가볼까요?</h3>
        <h3>♪~ᕕ( ᐛ )ᕗ~♪</h3>
      </div>
      <ButtonLogin text={"로그인하기"} destination={"/login"}></ButtonLogin>
    </Container>
    // </div>
  );
};

export default SignupComp;

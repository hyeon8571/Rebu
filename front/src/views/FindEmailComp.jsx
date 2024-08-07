import { useLocation } from "react-router-dom";
import LoginTitle from "../components/common/LoginTitle";
import styled from "styled-components";
import ButtonLogin from "../components/common/ButtonLogin";

const Container = styled.div`
  align-items: center;
  margin: 2rem 3rem;
  height: 100vh;
`;

const Div = styled.div`
  margin: 1rem 0;
`;
const SignupComp = () => {
  const location = useLocation();
  const email = location.state; // 전달된 데이터

  return (
    // <div>
    <Container>
      <LoginTitle
        text="이메일 찾기 완료"
        description="It's so nice to meet you again :D"
      />
      <div style={{ marginBottom: "5rem", textAlign: "center" }}>
        <h3>이메일 찾기가 완료되었습니다.</h3>
        <h3>로그인하러 가볼까요?</h3>
        <h3>♪~ᕕ( ᐛ )ᕗ~♪</h3>
      </div>
      <div>
        <h3>{email}</h3>
      </div>
      <Div>
        <ButtonLogin text={"로그인하기"} destination={"/login"}></ButtonLogin>
      </Div>
      <Div>
        <ButtonLogin
          text={"비밀번호 변경하기"}
          destination={"/login/password"}
        ></ButtonLogin>
      </Div>
    </Container>
    // </div>
  );
};

export default SignupComp;

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
  const navigate = useNavigate();
  const email = location.state; // 전달된 데이터

  useEffect(() => {
    // 이메일 찾기를 거치지 않고 접근할 경우 홈으로 리다이렉트
    if (!email) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

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
        <h4>고객님의 이메일은</h4>
        <h3>{email}</h3>
        <h4>입니다</h4>
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

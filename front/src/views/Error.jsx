import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100vh; /* 전체 화면을 차지 */
  padding: 0 2rem 25rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: gray;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.h4`
  color: gray;
  text-align: start;
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 10rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: calc(100% - 4rem); /* 좌우 패딩을 고려한 버튼 너비 */
  max-width: 400px;
  padding: 1rem;
  background: #943aee;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background: #762dba;
  }
`;

const Notfound = () => {
  const nav = useNavigate();
  // useSelector는 컴포넌트 내부에서 호출
  const { nickname, type, isLogin } = useSelector((state) => state.auth);

  const onClickMain = () => {
    nav("/main");
  };

  return (
    <Container>
      <div>
        <h2>로그인 상태</h2>
        <p>닉네임: {nickname || "Guest"}</p>
        <p>타입: {type}</p>
        <p>로그인 여부: {isLogin ? "로그인됨" : "로그인되지 않음"}</p>
      </div>
      <Title>서비스에 접속할 수 없습니다.</Title>
      <Description>
        기술적인 문제로 일시적으로 접속되지 않았습니다.
        <br />
        잠시 후 다시 이용 부탁드리며 이용에 불편을 드려 사과드립니다.
      </Description>
      <ButtonContainer>
        <Button onClick={onClickMain}>메인 페이지로 돌아가기</Button>
      </ButtonContainer>
    </Container>
  );
};

export default Notfound;

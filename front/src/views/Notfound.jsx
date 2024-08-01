import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

  const onClickMain = () => {
    nav("/main");
  };

  return (
    <Container>
      <Title>페이지를 찾을 수 없습니다.</Title>
      <Description>
        페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.
      </Description>
      <ButtonContainer>
        <Button onClick={onClickMain}>메인 페이지로 돌아가기</Button>
      </ButtonContainer>
    </Container>
  );
};

export default Notfound;

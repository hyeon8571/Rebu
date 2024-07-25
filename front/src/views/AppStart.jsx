import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const AppStart = () => {
  const nav = useNavigate();
  const onClickButton = () => {
    return nav("/login");
  };
  return (
    <>
      <Div>
        <h1>편리한 예약</h1>
        <button onClick={onClickButton} style={{ height: 30, width: 90 }}>
          시작하기
        </button>
      </Div>
    </>
  );
};

export default AppStart;

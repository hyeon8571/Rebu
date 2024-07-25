import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
const ButtonBackWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬합니다 */
  align-items: center; /* 세로 중앙 정렬을 위해 추가 */
  margin-bottom: 1.5rem;
  /* box-shadow: "0px 0px 290px 0px rgba(100, 100, 100, 0.2)"; */
`;
const ButtonBack = () => {
  const nav = useNavigate();
  const onClickIconBack = () => {
    return nav(-1);
  };
  return (
    <ButtonBackWrapper>
      <button
        onClick={onClickIconBack}
        style={{
          backgroundColor: "#943aee",
          borderRadius: 3,
          border: 0,
          margin: 0,
          padding: 0,
          boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.3)",
          //  X and Y offsets relative to the element, blur and spread radius, and color(r,g,b,opacity).
        }}
      >
        <IoMdArrowRoundBack size="22" color="white" />
      </button>
    </ButtonBackWrapper>
  );
};

export default ButtonBack;

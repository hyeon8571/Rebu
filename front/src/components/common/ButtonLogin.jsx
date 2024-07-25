//ButtonLogin.jsx
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

// default
export const ButtonStyles = css`
  background-color: #a55eea;
  border: none;
  border-radius: 25px;
  color: white;
  height: 3rem;
  width: 100%;
  cursor: pointer;
  white-space: nowrap;
  /*   버튼안에 있는 텍스트가 화면이 줄어들더라도 줄바꿈되지 않도록 설정해줌*/
`;

const Button = styled.button`
  ${ButtonStyles}
`;

export const ButtonHover = styled(Button)`
  ${ButtonStyles}
  background-color: white;
  border: 1px solid gray;
  color: black;
  &:hover {
    background-color: #a55eea;
    color: white;
  }
`;

const ButtonLogin = ({ text, type, destination }) => {
  const nav = useNavigate();
  const onClickButton = () => {
    return nav(destination);
  };

  // let ButtonComponent;

  const ButtonComponent = type === "Hover" ? ButtonHover : Button;
  return <ButtonComponent onClick={onClickButton}>{text}</ButtonComponent>;
};

export default ButtonLogin;

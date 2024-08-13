import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div``;

const Button = styled.button`
  width: 120px;
  height: 40px;
  line-height: 40px;
  align-self: center;
  box-sizing: border-box;
  border: 0;
  font-size: 12px;
  color: ${(props) => (props.disabled ? "gray" : "white")};
  background-color: ${(props) =>
    props.disabled ? "lightgray" : props.theme.primary};
  border-radius: 0.5rem;

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
  margin-bottom: 10px;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 100px;
    height: 40px;
    line-height: 30px;
    margin-bottom: 5px;
  }
`;

const ReviewButton = ({ button }) => {
  return (
    <ButtonWrapper>
      <Button disabled={button.status} onClick={button.onClick}>
        {button.title}
      </Button>
    </ButtonWrapper>
  );
};

export default ReviewButton;

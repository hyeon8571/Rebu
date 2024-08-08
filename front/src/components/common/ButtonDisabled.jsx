import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.div``;

const Button = styled.button`
  width: 150px;
  height: 50px;
  line-height: 50px;
  align-self: center;
  box-sizing: border-box;
  border: 0;
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
  }
`;

const ButtonLarge = ({ button }) => {
  return (
    <ButtonWrapper>
      <Button disabled={button.disabled} onClick={button.onClick}>
        {button.title}
      </Button>
    </ButtonWrapper>
  );
};

export default ButtonLarge;

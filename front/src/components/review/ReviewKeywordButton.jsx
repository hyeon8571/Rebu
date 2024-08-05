import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.div``;

const Button = styled.button`
  width: 150px;
  height: 50px;
  align-self: center;
  box-sizing: border-box;
  border: 0;
  color: ${(props) => (props.highlight ? "#fff" : props.theme.text)};
  background-color: ${(props) =>
    props.highlight
      ? "#B475F3"
      : props.theme.value === "dark" && props.theme.secondary};
  border-radius: 0.5rem;
  margin-bottom: 10px;
  font-weight: 500;
  transition: background-color 0.075s linear;
  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;

const ButtonIcon = styled.img`
  max-width: 24px;
  max-height: 24spx;
`;

const ButtonSmall = ({ button }) => {

  return (
    <ButtonWrapper>
      <Button highlight={button.highlight}  onClick={button.onClick}>
      <ButtonIcon src={button.img}/>
        {button.title}
      </Button>
    </ButtonWrapper>
  );
};

ButtonSmall.propTypes = {
  button: PropTypes.shape({
    img : PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    highlight: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default ButtonSmall;

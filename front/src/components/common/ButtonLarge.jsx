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
  color: ${(props) => (props.highlight ? "#fff" : props.theme.text)};
  background-color: ${(props) =>
    props.highlight
      ? props.theme.primary
      : props.theme.value === "dark" && props.theme.secondary};
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
      <Button onClick={button.onClick} highlight={button.highlight}>
        {button.title}
      </Button>
    </ButtonWrapper>
  );
};

ButtonLarge.propTypes = {
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    highlight: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default ButtonLarge;

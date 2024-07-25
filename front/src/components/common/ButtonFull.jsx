import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonFullWrapper = styled.div`
  width: 100%;
  float: left;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  width: 50%;
  height: 2rem;
  float: left;
  max-width: 320px;
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  margin-bottom: 0;
  border: 0;
  border-radius: 0.5rem;
  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;

const ButtonFull = ({ buttons }) => {
  if (!buttons) {
    return null;
  }

  return (
    <ButtonFullWrapper>
      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={button.onClick}
          className={`half ${button.highlight ? "highlight" : ""}`}
        >
          {button.title}
        </Button>
      ))}
    </ButtonFullWrapper>
  );
};

ButtonFull.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      highlight: PropTypes.bool,
    })
  ).isRequired,
};

export default ButtonFull;

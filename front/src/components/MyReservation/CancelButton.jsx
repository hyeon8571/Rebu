import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MdCancel } from "react-icons/md";

const ButtonWrapper = styled.div``;

const Button = styled.button`
  width: 80px;
  height: 30px;
  align-self: center;
  box-sizing: border-box;
  color: white;
  font-size: 12px;
  border: 0;
  color: ${(props) => (props.unable ? "gray" : "white")};
  background: ${(props) => (props.unable ? "lightgray" : "#ff2525")};
  border-radius: 0.5rem;
  margin-bottom: 10px;
  font-weight: 600;

  &:hover {
    box-shadow: ${(props) => (props.unable ? "none" : props.theme.boxShadow)};
  }
`;

const StyledCancelIcon = styled(MdCancel)`
  padding-right: 0.2rem;
`;

const ButtonSmall = ({ button }) => {
  return (
    <ButtonWrapper>
      <Button
        onClick={button.onClick}
        unable={button.unable}
        disabled={button.unable}
      >
        <StyledCancelIcon />
        {button.title}
      </Button>
    </ButtonWrapper>
  );
};

ButtonSmall.propTypes = {
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default ButtonSmall;

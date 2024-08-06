import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonWrapper = styled.div``;

const Button = styled.button`
  @media (max-width: 768px) {
    width: 42vw;
    font-size: 12px;
  }
  width: 15vw;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: center;
  box-sizing: border-box;
  border: 0;
  color: ${(props) => (props.highlight ? "#fff" : props.theme.text)};
  background-color: ${(props) =>
    props.highlight
      ? "#B475F3"
      : props.theme.value === "dark" && props.theme.secondary};
  border: ${(props) =>
    props.highlight ? " 1px solid gray" : "1px solid rgb(0,0,0,0)"};
  border-radius: 0.5rem;
  margin-bottom: 10px;
  transition: background-color 0.075s linear;
  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;

const ButtonIcon = styled.img`
  max-width: 28px;
  max-height: 28px;
`;

const ContentWrapper = styled.div``;

const ContentTitle = styled.div`
  font-weight: 600;
`;

const ButtonSmall = ({ button }) => {
  return (
    <ButtonWrapper>
      <Button highlight={button.highlight} onClick={button.onClick}>
        <ContentWrapper>
          <ButtonIcon src={button.img} />
        </ContentWrapper>
        <ContentTitle>{button.title}</ContentTitle>
      </Button>
    </ButtonWrapper>
  );
};

ButtonSmall.propTypes = {
  button: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    highlight: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default ButtonSmall;

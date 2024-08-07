import styled from "styled-components";
import { useState } from "react";
import ButtonSmall from "../common/ButtonSmall";

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  justify-content: space-around;
`;

const DescriptionContainer = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default function CheckReservation({
  setIsConfirmed,
  setIsModalOpen,
  children,
}) {
  const Button1 = {
    id: 1,
    title: "예약",
    onClick: () => setIsConfirmed(true),
    highlight: true,
  };

  const Button2 = {
    id: 2,
    title: "취소",
    onClick: () => {
      setIsModalOpen(false);
    },
    highlight: false,
  };

  return (
    <>
      <DescriptionContainer>예약을 진행하시겠습니까?</DescriptionContainer>
      <ButtonContainer>
        <ButtonSmall button={Button1}></ButtonSmall>
        <ButtonSmall button={Button2}></ButtonSmall>
      </ButtonContainer>
    </>
  );
}

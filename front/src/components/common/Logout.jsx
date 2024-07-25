import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${(props) =>
      props.theme.value === "light" ? '#ffffff' : '#e5e5e5'};
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 80%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalText = styled.h4`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #943AEE;
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LogoutButton = styled.button`
  background: #943AEE;
  color: white;
  border: none;
  padding: 10px 20px;
  width: 100px;
  border-radius: 4px;
  cursor: pointer;
`;

  const CancelButton = styled.button`
  background: #cccccc;
  color: black;
  border: none;
  padding: 10px 20px;
  width: 100px;
  border-radius: 4px;
  cursor: pointer;
`;


const Logout = ({LogoutModalOpen, closeModal}) => {
  
  const logout = () => {
    //로그아웃 로직//
    closeModal();
  };

  const cancel = () => {
    closeModal();
  };

  return (
    <>
    {LogoutModalOpen && (
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </ModalHeader>
          <ModalText>로그아웃 하시겠습니까?</ModalText>
          <ModalButtonContainer>
              <LogoutButton onClick={logout}>로그아웃</LogoutButton>
              <CancelButton onClick={cancel}>취소</CancelButton>
          </ModalButtonContainer>
        </ModalContent>
      </ModalOverlay>
      )}
    </>
  )
};

export default Logout;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiEditAlt } from "react-icons/bi";

const InfoBox = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  @media (max-width: 375px) {
    margin-left: 15px;
    margin-right: 15px;
  }
`;

const NameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgEdit = styled(BiEditAlt)`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const Name = styled.h2`
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 375px) {
    font-size: 22px;
  }
`;

const IntroduceInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Introduction = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
`;

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
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  margin: 0;
`;

const ModalInput = styled.textarea`
  width: 95%;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;


const ModalButton = styled.button`
  background: #943AEE;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #943AEE;
  }
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


const InfoComponent = ({ currentUser, loginUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIntroduce, setNewIntroduce] = useState(currentUser.introduction);
  const [tempIntroduce, setTempIntroduce] = useState(currentUser.introduction);

  useEffect(() => {
    setNewIntroduce(currentUser.introduction);
    setTempIntroduce(currentUser.introduction);
  }, [currentUser.introduction]);

  const openModal = () => {
    setTempIntroduce(newIntroduce);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleIntroduceChange = (e) => {
    setTempIntroduce(e.target.value);
  };

  const saveIntroduce = () => {
    // Introduce 정보를 업데이트하는 로직을 여기에 추가합니다.
    setNewIntroduce(tempIntroduce);
    closeModal();
  };

  return (
    <InfoBox>
      <NameInfo>
        <Name>{currentUser.nickname}</Name>
      </NameInfo>
      <IntroduceInfo>
        <Introduction>{newIntroduce}</Introduction> &nbsp;
        {currentUser.nickname === loginUser.nickname ? (
          <ImgEdit onClick={openModal} />
        ) : ("")}
      </IntroduceInfo>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>소개글 수정</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalInput value={tempIntroduce} onChange={handleIntroduceChange} />
            <ModalButtonContainer>
                <ModalButton onClick={saveIntroduce}>저장</ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </InfoBox>
  );
};

export default InfoComponent;

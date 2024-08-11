import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart, FaRegStar } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import StoreMark from "../../assets/images/storemark.png";

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

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 8px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Name = styled.h2`
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 375px) {
    font-size: 22px;
  }
`;

const StoreMarkBox = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  @media (max-width: 375px) {
    width: 18px;
  height: 18px;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #ffcc00;
  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const RatingText = styled.span`
  color: ${(props) => (props.theme.value === "light" ? "#777777" : "#ffffff")};
`;

const ImgLike = styled(FaRegHeart)`
  font-size: 20px;
  color: #943Aee;
  cursor: pointer;
`;

const ImgLikeActive = styled(FaHeart)`
  font-size: 20px;
  color: #943aee;
  cursor: pointer;
`;

const ImgEdit = styled(BiEditAlt)`
  width: 18px;
  height: 18px;
  cursor: pointer;
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

const InfoComponent = ({ currentUser, loginUser, rating, likeshop }) => {
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
  
  const handleLikeToggle = () => {
    // 매장 즐겨찾기 등록 api psot 호출
  };

  const handleunLikeToggle = () => {
    // 매장 즐겨찾기 삭제 api delete 호출
  };

  const saveIntroduce = async () => {
    try {
      const access = localStorage.getItem('access');
      // 백엔드 API 엔드포인트 주소
      const url = `${BASE_URL}/api/profiles/${currentUser.nickname}/introduction`;

      // 업데이트할 데이터
      // const updatedData = {
      //   introduction: tempIntroduce,
      // };

      const headers = {
        "Content-Type": "application/json",
        "access" : access
      }

      // PATCH 요청 보내기
      const response = await axios.patch(url, {
        introduction: tempIntroduce,
      }, {headers});

      // 성공 시 추가로 처리할 작업이 있다면 여기에 작성
      console.log('소개글이 성공적으로 수정되었습니다:', response.data);
    } catch (error) {
      // 에러 처리 로직 작성
      console.error('소개글 수정에 실패했습니다:', error);
    }
    setNewIntroduce(tempIntroduce)
    closeModal();
  };

  return (
    <InfoBox>
      <NameInfo>
        <LeftContainer>
          <Name>{currentUser.nickname}</Name>
          <StoreMarkBox src={StoreMark} />
          <Rating>
            <FaRegStar />
        
            <RatingText>{rating}</RatingText>
          </Rating>
        </LeftContainer>
        <RightContainer>
          {currentUser.nickname !== loginUser ? (
            likeshop.map((shop) => {shop.nickname === currentUser.nickname}) ? (
              <ImgLikeActive onClick={handleunLikeToggle} />
            ) : (<ImgLike onClick={handleLikeToggle} />)
          ) : ("")}
        </RightContainer>
      </NameInfo>

      <IntroduceInfo>
        <Introduction>{newIntroduce}</Introduction> &nbsp;
        {currentUser.nickname === loginUser && (
          <ImgEdit onClick={openModal} />
        )}
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

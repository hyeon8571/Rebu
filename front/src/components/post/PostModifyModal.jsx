import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosClose } from "react-icons/io";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom'; // useNavigate 훅을 가져옵니다.

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  align-items: center;
`;

const CloseButton = styled(IoIosClose)`
  background: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: #943AEE;
  }
`;

const ModalContent = styled.div`
  background-color: ${(props) =>
    props.theme.value === "light" ? '#ffffff' : '#e5e5e5'};
  border-radius: 8px;
  padding: 10px 20px;
  width: 350px;
  height: 660px;
  @media (max-width: 375px) {
    height: 550px;
  }
  max-width: 80%;
`;

const HeaderText = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin: 10px 15px;
  @media (max-width: 375px) {
    font-size: 17px;
  }
`;

const Content = styled.div`
  margin: 10px auto;
  width: 90%;
  height: 550px;
  @media (max-width: 375px) {
    height: 450px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #bcbcbc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fbf8fe" : props.theme.secondary};
`;

const DateModify = styled.p`
  font-size: 17px;
  margin-bottom: 5px;
  margin-top: 10px;
  margin-left: 25px;
  align-self: flex-start;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TitleContent = styled.h3`
  margin-bottom: 10px;
  margin-left: 10%;
  align-self: flex-start;
  font-size: 17px;
  @media (max-width: 475px) {
    font-size: 15px;
  }
`;

const SlideImg = styled.div`
  width: 75%;
  padding-top: 75%; /* 정사각형을 만들기 위해 패딩 */
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
  border-radius: 8px;
`;

const SlideBack = styled(IoIosArrowBack)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 10px;
  background-color: rgba(141, 141, 141, 0.5);
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.5s ease;
  z-index: 1;
  ${(props) => props.disabled && `
    cursor: not-allowed;
    opacity: 0.5;
  `}
`;

const SlideFront = styled(IoIosArrowForward)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  right: 10px;
  background-color: rgba(141, 141, 141, 0.5);
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.5s ease;
  z-index: 1;
  ${(props) => props.disabled && `
    cursor: not-allowed;
    opacity: 0.5;
  `}
`;

const PostImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 잘리지 않게 조정 */
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#943AEE" : "#c5c5c5")};
  margin: 0 4px;
  z-index: 1;
`;

const TextArea = styled.textarea`
  width: 75%;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  border: ${(props) =>
    props.theme.value === "light" ? "1px solid #b475f3" : "1px solid #4c4c4c"};
  resize: none;
  outline: none;
  &:focus {
    border: 2px solid #CA9EF6;
    box-shadow: 0 0 15px rgba(180, 117, 243, 0.5);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 80%;
`;

const Button = styled.button`
  width: 40%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  @media (max-width: 475px) {
    font-size: 13px;
  }
`;

const CancelButton = styled(Button)`
  background: #cccccc;
  color: black;
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background: #943AEE;
  color: white;
  cursor: pointer;
`;

const PostModify = ({ postModifyModalOpen, closeModal, index, post, currentUser, onSave }) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const [current, setCurrent] = useState(0);
  const length = post.imageSrcs?.length;
  const [content, setContent] = useState(post.content);
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
  const location = useLocation();

  const nextSlide = () => {
    if (current < length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSaveClick = () => {
    const updatedPost = {
      ...post,
      content: content,
      // modifiedDate: today
    };

    // 부모 컴포넌트에 수정된 게시글을 전달
    onSave(updatedPost, index);

    // 게시글 상세 페이지로 이동
    if (currentUser.type === "COMMON") {
      navigate('/profile', { state: { post: updatedPost, postId: index } });
    } else if (currentUser.type === "SHOP") {
      navigate('/store-profile', { state: { post: updatedPost, postId: index } });
    };
    
    // 모달 닫기
    closeModal();
  };

  return (
    <ModalOverlay>
      {postModifyModalOpen && (
        <ModalContent>
          <ModalHeader>
            <HeaderText>게시글 수정</HeaderText>
            <CloseButton onClick={closeModal} />
          </ModalHeader>
          <Content>
            <DateModify>수정날짜 : {formattedDate}</DateModify>
            <TitleContent>사진</TitleContent>
            <SlideImg>
              <SlideBack onClick={prevSlide} disabled={current === 0} />
              <SlideFront onClick={nextSlide} disabled={current === length - 1} />
              {post.imageSrcs.map((slide, imgIndex) => (
                <PostImage
                  key={imgIndex}
                  src={slide}
                  alt={`Slide ${imgIndex}`}
                  style={{ display: imgIndex === current ? "block" : "none" }}
                />
              ))}
              <DotsWrapper>
                {post.imageSrcs.map((_, imgIndex) => (
                  <Dot key={imgIndex} active={imgIndex === current} />
                ))}
              </DotsWrapper>
            </SlideImg>
            <TitleContent>내용</TitleContent>
            <TextArea value={content} onChange={handleContentChange} />
            <ButtonContainer>
              <CancelButton onClick={closeModal}>취소</CancelButton>
              <SaveButton onClick={handleSaveClick}>수정 완료</SaveButton>
            </ButtonContainer>
          </Content>
        </ModalContent>
      )}
    </ModalOverlay>
  );
};

export default PostModify;

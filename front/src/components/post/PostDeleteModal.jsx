import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BASE_URL } from '../../views/Signup';

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

const PostDeleteButton = styled.button`
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


const PostDelete = ({nickname, postId, PostDeleteModalOpen, closeModal, type }) => {


  const postdelete = () => {
    //게시글 삭제 로직//
    if (type === "COMMON") {
      const access = localStorage.getItem('access');
      axios.delete(`${BASE_URL}/api/profiles/${nickname}/reviews/${postId}`, {
        headers: {
          "access" : access,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        console.log(response + "리뷰가 성공적으로 삭제되었습니다.");
        closeModal();
        
        // 여기서 추가적인 작업 (예: 페이지 리로드 또는 상태 업데이트)
      })
      .catch(error => {
        console.log("삭제 중 오류 발생:", error);
      });
    } else {
      const access = localStorage.getItem('access');
      axios.delete(`${BASE_URL}/api/feeds/${postId}`, {
        headers: {
          "access" : access,
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        console.log(response + "피드가 성공적으로 삭제되었습니다.");
        closeModal();
        // 여기서 추가적인 작업 (예: 페이지 리로드 또는 상태 업데이트)
      })
      .catch(error => {
        console.log("삭제 중 오류 발생:", error);
      });
    }
    };


  const cancel = () => {
    closeModal();
  };

  return (
    <>
    {PostDeleteModalOpen && (
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </ModalHeader>
          <ModalText>게시글을 삭제하시겠습니까?</ModalText>
          <ModalButtonContainer>
              <PostDeleteButton onClick={postdelete}>확인</PostDeleteButton>
              <CancelButton onClick={cancel}>취소</CancelButton>
          </ModalButtonContainer>
        </ModalContent>
      </ModalOverlay>
      )}
    </>
  )
};

export default PostDelete;
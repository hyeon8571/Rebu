import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileCreateModal from "./ProfileCreateModal";
import { getAllProfiles } from "../../features/common/userSlice";
import axios from "axios";

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
    props.theme.value === "light" ? "#ffffff" : "#e5e5e5"};
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 80%;
  position: relative; /* Add this line */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  position: absolute; /* Add this line */
  top: 10px; /* Add this line */
  right: 10px; /* Add this line */
`;

// const ModalText = styled.h4`
//   text-align: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
// `;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #943aee;
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateButton = styled.button`
  background: #943aee;
  color: white;
  border: none;
  padding: 10px 20px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const CancelButton = styled.button`
  background: #cccccc;
  color: black;
  border: none;
  padding: 10px 20px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
`;

// const ProfileImage = styled.img`
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   object-fit: cover;
//   margin-bottom: 10px;
// `;

const ModalText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  max-width: 40px; // 원래 크기보다 작게 조정
  max-height: 40px; // 원래 크기보다 작게 조정
  object-fit: cover;
  margin-right: 10px; // 이미지와 텍스트 간의 간격
`;

const NicknameText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ProfileChangeModal = ({ ProfileChangeModalOpen, closeModal }) => {
  const [isProfileCreateModalOpen, setIsProfileCreateModalOpen] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await getAllProfiles();
        console.log("프로필 목록", profiles);
      } catch (err) {
        console.error("프로필 목록을 불러오는 중 오류 발생", err);
      }
    };
    fetchProfiles();
  }, []);

  const handleCreateProfile = () => {
    // 프로필 생성을 위해 ProfileCreateModal을 열도록 설정
    setIsProfileCreateModalOpen(true);
  }; // 모달열기
  const handleCloseProfileCreateModal = () => {
    setIsProfileCreateModalOpen(false);
  }; //모달닫기

  // const profileImageSrc = profile.imgSrc || "/logo.png";
  const profileImageSrc = "/logo.png";
  // const { nickname } = useSelector((state) => state.auth);
  const profile2 = useState([]);
  return (
    <>
      {ProfileChangeModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ textAlign: "center" }}>계정 전환</h2>
            <div>{profiles}</div>
            <ModalHeader>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>

            <ModalText>
              <ProfileImage src={profileImageSrc} alt="ProfileImage" />
              <NicknameText>{profile.nickname}</NicknameText>
            </ModalText>
            <hr></hr>

            <ModalButtonContainer>
              <CreateButton onClick={handleCreateProfile}>
                Create Profile
              </CreateButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* ProfileCreateModal 컴포넌트 추가 */}
      {isProfileCreateModalOpen && (
        <ProfileCreateModal
          ProfileCreateModalOpen={isProfileCreateModalOpen}
          closeModal={handleCloseProfileCreateModal}
        />
      )}
    </>
  );
};

export default ProfileChangeModal;

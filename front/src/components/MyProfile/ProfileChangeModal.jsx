import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileCreateModal from "./ProfileCreateModal";
import { getAllProfiles } from "../../features/common/userSlice";
import { switchProfile } from "../../features/auth/authSlice";

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
  display: flex;
  flex-direction: column;
  align-items: center; /* 컨텐츠를 가운데 정렬 */
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

const ModalText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 각 프로필 간의 간격을 위해 */
  width: 100%;
  cursor: pointer; /* 클릭 가능하게 설정 */
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 50px; // 원래 크기보다 작게 조정
  height: 50px; // 원래 크기보다 작게 조정
  object-fit: cover;
  margin-right: 15px; // 이미지와 텍스트 간의 간격
  /* margin-bottom: 10px; */
`;

const NicknameText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ProfileChangeModal = ({
  ProfileChangeModalOpen,
  closeModal,
  handleSettingClick,
}) => {
  const [isProfileCreateModalOpen, setIsProfileCreateModalOpen] =
    useState(false);
  const [profiles, setProfiles] = useState([]); // profiles 상태
  const [error, setError] = useState(null); // error 상태

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getAllProfiles();
        console.log("프로필 목록", response);
        if (response.success) {
          setProfiles(response.data); // 프로필 상태 업데이트
        } else {
          console.log(response);
        }
      } catch (err) {
        console.error("프로필 목록을 불러오는 중 오류 발생", err);
      }
    };
    fetchProfiles(); // 컴포넌트 마운트 시 fetchProfiles 함수 실행
  }, []);

  const handleCreateProfile = () => {
    // 프로필 생성을 위해 ProfileCreateModal을 열도록 설정
    setIsProfileCreateModalOpen(true);
  }; // 모달열기
  const handleCloseProfileCreateModal = () => {
    setIsProfileCreateModalOpen(false);
  }; //모달닫기

  // switchProfile 함수 호출
  const handleProfileSwitch = async (nickname) => {
    try {
      console.log("handleProfileSwitch", nickname);
      const switchResult = await dispatch(switchProfile(nickname));
      console.log("handleProfileSwitch 결과", switchResult);
      if (switchResult.success) {
        console.log("프로필 전환 요청이 성공적으로 전송되었습니다.");
      } else {
        console.error("프로필 전환 요청 중 오류 발생:", error);
      }
      return switchResult;
    } catch (error) {
      console.error("프로필 전환 요청 중 오류 발생:", error);
    }
  };

  // 프로필 전환
  const handleProfileClick = async (nickname) => {
    const switchResult = await handleProfileSwitch(nickname);
    if (switchResult && switchResult.success) {
      console.log("프로필 전환 성공:", switchResult.data);
      const owner = "own";
      navigate(
        `/profile/${switchResult.data.nickname}/${switchResult.data.type}/${owner}`,
        { replace: true }
      ); // 프로필 페이지로 이동
      handleSettingClick(); // 설정 모달 닫기
    }
  };
  const profileImageSrc = "/img.webp";
  // const profile2 = useState([]);
  return (
    <>
      {ProfileChangeModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2 style={{ textAlign: "center" }}>프로필 전환</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "start",
              }}
            >
              {profiles.map((profile, index) => (
                <ProfileContainer
                  key={index}
                  onClick={() =>
                    handleProfileClick(profile.nickname, profile.type)
                  }
                >
                  <ProfileImage
                    src={
                      profile.imageSrc
                        ? `https://www.rebu.kro.kr/data${profile.imageSrc}`
                        : profileImageSrc
                    }
                    alt="Profile"
                  />
                  <NicknameText>
                    {profile.nickname} &nbsp;
                    {profile.type === "SHOP"
                      ? "매장"
                      : profile.type === "EMPLOYEE"
                      ? "디자이너"
                      : ""}
                  </NicknameText>
                </ProfileContainer>
              ))}
            </div>
            <ModalHeader>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>

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

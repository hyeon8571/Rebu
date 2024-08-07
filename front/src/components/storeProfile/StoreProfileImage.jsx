import React, { useState, useEffect, useRef }from "react";
import styled, { keyframes } from "styled-components";

// 그라디언트 애니메이션을 정의합니다.
const rotateGradient = keyframes`
  0% {
    background: linear-gradient(0deg, #943aee, #af4261);
  }
  10% {
    background: linear-gradient(36deg, #943aee, #af4261);
  }
  20% {
    background: linear-gradient(72deg, #943aee, #af4261);
  }
  30% {
    background: linear-gradient(108deg, #943aee, #af4261);
  }
  40% {
    background: linear-gradient(144deg, #943aee, #af4261);
  }
  50% {
    background: linear-gradient(180deg, #943aee, #af4261);
  }
  60% {
    background: linear-gradient(216deg, #943aee, #af4261);
  }
  70% {
    background: linear-gradient(260deg, #943aee, #af4261);
  }
  80% {
    background: linear-gradient(290eg, #943aee, #af4261);
  }
  90% {
    background: linear-gradient(320eg, #943aee, #af4261);
  }
  100% {
    background: linear-gradient(340deg, #943aee, #af4261);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 20px;
  margin-left: 30px;
  @media (max-width: 375px) {
    margin-left: 15px;
    margin-right: 15px;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;

const OutterCircleOnline = styled.a`
  display: flex;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  animation: ${rotateGradient} 3s linear infinite; /* linear 추가 */
`;

const OutterCircleOffline = styled.a`
  display: flex;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: gray;
`;

const Insideimg = styled.img`
  align-self: center;
  vertical-align: middle;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: transform 0.5s;
`;

const FollowInfo = styled.div`
  display: flex;
  text-align: center;
  margin-top: 10px;
`;

const FollowerInfo = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-left: 30px;
  @media (max-width: 375px) {
    margin-left: 15px;
    margin-right: 10px;
  }
  position: relative;
`;

const FollowingInfo = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-left: 30px;
  @media (max-width: 375px) {
    margin-left: 10px;
    margin-right: 15px;
  }
  position: relative;
`;

const FollowText = styled.span`
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;

const FollowCount = styled.span`
  margin-bottom: 3px;
  font-size: 15px;
`;

const FollowList = styled.div`
  height: 60px;
  border: 1px solid;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 500px;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) =>
      props.theme.value === "light" ? '#ffffff' : '#e5e5e5'};
  color: black;
  padding: 10px 20px;
  border: 1.5px solid #943AEE;
  border-radius: 8px;
  width: 80%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  margin: 0 auto;
`;

const CloseButton = styled.button`
  background: transparent;
  color: #943AEE;
  font-size: 25px;
  border: none;
  /* padding: 5px; */
  border-radius: 5px;
  cursor: pointer;
  float: right;
`;


export default function ProfileLarge({ currentUser, time, followers, following }) {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const online = time < 300;
  const followersModalRef = useRef(null);
  const followingModalRef = useRef(null);

  const handleOpenFollowersModal = () => {
    setIsFollowersModalOpen(true);
  };

  const handleCloseFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  const handleOpenFollowingModal = () => {
    setIsFollowingModalOpen(true);
  };

  const handleCloseFollowingModal = () => {
    setIsFollowingModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (followersModalRef.current && !followersModalRef.current.contains(event.target)) {
      setIsFollowersModalOpen(false);
    }
    if (followingModalRef.current && !followingModalRef.current.contains(event.target)) {
      setIsFollowingModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ProfileContainer>
    <ImgBox>
      <React.Fragment>
        {online ? (
          <OutterCircleOnline>
            <Insideimg src={currentUser.imageSrc} alt="Profile" />
          </OutterCircleOnline>
        ) : (
          <OutterCircleOffline>
            <Insideimg src={currentUser.imageSrc}></Insideimg>
          </OutterCircleOffline>
        )}
      </React.Fragment>
    <FollowInfo>
      <FollowerInfo>
        <FollowCount>{currentUser.followerCnt}</FollowCount>
        <FollowText onClick={handleOpenFollowersModal}> 팔로워</FollowText>
      </FollowerInfo>
      <FollowingInfo>
        <FollowCount>{currentUser.followingCnt}</FollowCount>
        <FollowText onClick={handleOpenFollowingModal}> 팔로잉</FollowText>
      </FollowingInfo>
    </FollowInfo>
    </ImgBox>
    

    {isFollowersModalOpen && (
        <ModalOverlay>
          <ModalContent ref={followersModalRef}>
            <ModalHeader>
              <ModalTitle>팔로워 목록</ModalTitle>
              <CloseButton onClick={handleCloseFollowersModal}>&times;</CloseButton>
            </ModalHeader>
            <hr style={{borderColor: '#EDE0FB'}}/>
            {/* 팔로워 목록을 여기에 렌더링 */}
            <FollowList>팔로워 1</FollowList>
            <FollowList>팔로워 2</FollowList>
            <FollowList>팔로워 3</FollowList>
            <FollowList>팔로워 4</FollowList>
            <FollowList>팔로워 5</FollowList>
            {/* 추가 팔로워 */}
          </ModalContent>
        </ModalOverlay>
      )}

      {isFollowingModalOpen && (
        <ModalOverlay>
          <ModalContent ref={followingModalRef}>
            <ModalHeader>
              <ModalTitle>팔로잉 목록</ModalTitle>
              <CloseButton onClick={handleCloseFollowingModal}>&times;</CloseButton>
            </ModalHeader>
            <hr style={{borderColor: '#EDE0FB'}}/>
            {/* 팔로잉 목록을 여기에 렌더링 */}
            <FollowList>팔로잉 1</FollowList>
            <FollowList>팔로잉 2</FollowList>
            <FollowList>팔로잉 3</FollowList>
            <FollowList>팔로잉 4</FollowList>
            {/* 추가 팔로잉 */}
          </ModalContent>
        </ModalOverlay>
      )}
    
    </ProfileContainer>
  );
}

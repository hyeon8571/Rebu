import React, { useState, useEffect, useRef } from "react";
import {
  getFollowerList,
  getFollowingList,
  follow,
} from "../../features/common/followSlice";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import FollowList from "./FollowList";
import nullImg from "../../assets/images/img.webp";

// Gradiant animation
const rotateGradient = keyframes`
  0% {
    background: linear-gradient(0deg, #943aee, #af4261);
  }
  100% {
    background: linear-gradient(340deg, #943aee, #af4261);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
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
  animation: ${rotateGradient} 3s linear infinite;
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
  justify-content: center;
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

const FollowListContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  @media (min-width: 768px) {
    left: 55%;
  }
  transform: translateX(-50%);
  width: 90%;
  @media (min-width: 768px) {
    width: 80%;
  }
  max-width: 500px;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : "#e5e5e5"};
  color: black;
  padding: 10px;
  border: 1.5px solid #943aee;
  border-radius: 8px;
  width: 90%;
  max-height: 50vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  @media (max-width: 375px) {
    font-size: 16px;
  }
  margin: 0 auto;
`;

const CloseButton = styled.button`
  background: transparent;
  color: #943aee;
  font-size: 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FollowButton = styled.button`
  margin-top: 10px;
  width: ${(props) => (props.following === "FOLLOWING" ? "120px" : "90px")};
  height: 40px;
  background-color: ${(props) =>
    props.following === "FOLLOWING" ? "#f4ebfd" : "#b475f3"};
  color: ${(props) =>
    props.following === "FOLLOWING" ? "#943aee" : "#ffffff"};
  border: 2px solid #b475f3;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.following === "FOLLOWING" ? "#f4ebfd" : "#b475f3"};
  }
`;

export default function ProfileLarge({ currentUser, time }) {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const online = time < 300;
  const followersModalRef = useRef(null);
  const followingModalRef = useRef(null);
  const [relation, setRelation] = useState(currentUser.relation);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 팔로잉 목록
  const [followings, setFollowings] = useState([]); //팔로잉 목록
  const [followers, setFollowers] = useState([]); //팔로워 목록

  const targetNickname = currentUser.nickname; //MyProfile컴포넌트에서 props로 넘겨준 profile(currentUser profile)

  const { nickname } = useSelector((state) => state.auth); //로그인한 사용자의 닉네임

  // 무한 스크롤 - 페이지네이션
  const [currentPage, setCurrentPage] = useState(0); // 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 여부

  // API- 팔로잉 목록 불러오기
  const loadFollowings = async () => {
    if (hasMore) {
      const result = await getFollowingList(targetNickname, currentPage);
      if (result.success) {
        setFollowings((prevFollowings) => [
          ...prevFollowings,
          ...result.data.body.content,
        ]);
        const last = result.data.body.last;
        setHasMore(last === false); // 마지막 페이지인지 확인
      } else {
        setError(result.error);
      }
    }
  };

  // API- 팔로워 목록 불러오기
  const loadFollowers = async () => {
    if (hasMore) {
      const result = await getFollowerList(targetNickname, currentPage);
      if (result.success) {
        setFollowers((prevFollowers) => [
          ...prevFollowers,
          ...result.data.body.content,
        ]);
        const last = result.data.body.last;
        setHasMore(last === false); // 마지막 페이지인지 확인
      } else {
        setError(result.error);
      }
    }
  };

  // 팔로잉 모달을 열 때 데이터 로드
  const handleOpenFollowingModal = () => {
    // 상태 초기화
    setCurrentPage(0);
    setFollowings([]);
    setHasMore(true); // 추가된 부분

    // 모달 열기
    setIsFollowingModalOpen(true);

    // 데이터 로드
    loadFollowings();
  };

  // 팔로워 모달을 열 때 데이터 로드
  const handleOpenFollowersModal = () => {
    // 상태 초기화
    setCurrentPage(0);
    setFollowers([]);
    setHasMore(true);

    // 모달 열기
    setIsFollowersModalOpen(true);

    // 데이터 로드
    loadFollowers();
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 10 && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
      if (isFollowersModalOpen) {
        loadFollowers();
      } else if (isFollowingModalOpen) {
        loadFollowings();
      }
    }
  };

  useEffect(() => {
    const modalRef = isFollowersModalOpen
      ? followersModalRef.current
      : followingModalRef.current;

    if (modalRef) {
      modalRef.addEventListener("scroll", handleScroll);
      return () => modalRef.removeEventListener("scroll", handleScroll);
    }
  }, [isFollowersModalOpen, isFollowingModalOpen, hasMore]);

  // 팔로우하기 Follow API
  const handleFollow = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await follow(targetNickname);

      if (result.success) {
        setSuccess("팔로우가 성공적으로 추가되었습니다.");
        setRelation("FOLLOWING");
      } else {
        setError(result.error || "팔로우 추가 실패");
      }
    } catch (error) {
      setError("알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  const handleUnfollow = () => {
    setRelation("NONE");
    // setLoading(true);
    // setError(null);
    // setSuccess(null);

    // try {
    //   const result = await unfollow(targetNickname);

    //   if (result.success) {
    //     setSuccess("팔로우가 성공적으로 추가되었습니다.");
    //     setRelation("FOLLOWING");
    //   } else {
    //     setError(result.error || "팔로우 추가 실패");
    //   }
    // } catch (error) {
    //   setError("알 수 없는 오류가 발생했습니다.");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleCloseFollowingModal = () => {
    setIsFollowingModalOpen(false);
    // 추가된 부분
    setFollowings([]);
    setCurrentPage(0);
    setHasMore(true);
  };
  const handleCloseFollowersModal = () => {
    setIsFollowersModalOpen(false);
    setFollowers([]);
    setCurrentPage(0);
    setHasMore(true);
  };

  const handleClickOutside = (event) => {
    if (
      followersModalRef.current &&
      !followersModalRef.current.contains(event.target)
    ) {
      setIsFollowersModalOpen(false);
    }
    if (
      followingModalRef.current &&
      !followingModalRef.current.contains(event.target)
    ) {
      setIsFollowingModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ProfileContainer>
      <ImgBox>
        <React.Fragment>
          {currentUser.imageSrc === null ? (
            <OutterCircleOffline>
              <Insideimg src={nullImg}></Insideimg>
            </OutterCircleOffline>
          ) : online ? (
            <OutterCircleOnline>
              <Insideimg
                src={"https://www.rebu.kro.kr/data/" + currentUser.imageSrc}
                alt="Profile"
              />
            </OutterCircleOnline>
          ) : (
            <OutterCircleOffline>
              <Insideimg
                src={"https://www.rebu.kro.kr/data/" + currentUser.imageSrc}
              ></Insideimg>
            </OutterCircleOffline>
          )}
        </React.Fragment>

        <div>
          <FollowInfo>
            <FollowerInfo>
              <FollowCount>{currentUser.followerCnt}</FollowCount>
              <FollowText onClick={handleOpenFollowersModal}>팔로워</FollowText>
            </FollowerInfo>
            <FollowingInfo>
              <FollowCount>{currentUser.followingCnt}</FollowCount>
              <FollowText onClick={handleOpenFollowingModal}>팔로잉</FollowText>
            </FollowingInfo>
          </FollowInfo>
        </div>
      </ImgBox>

      {currentUser.relation !== "OWN" && (
        <FollowButton
          following={relation}
          onClick={
            currentUser.relation === "FOLLOWING" ? handleUnfollow : handleFollow
          }
        >
          {currentUser.relation === "FOLLOWING" ? "언팔로우" : "팔로우"}
        </FollowButton>
      )}

      {isFollowersModalOpen && (
        <ModalOverlay>
          <ModalContent ref={followersModalRef}>
            <ModalHeader>
              <ModalTitle>팔로워 목록</ModalTitle>
              <CloseButton onClick={handleCloseFollowersModal}>
                &times;
              </CloseButton>
            </ModalHeader>
            <hr style={{ borderColor: "#EDE0FB" }} />
            <FollowListContainer>
              {followers.map((follower, index) => (
                <FollowList
                  key={index}
                  follower={follower}
                  time={130}
                  handleCloseFollowersModal={handleCloseFollowersModal}
                />
              ))}
              {isLoading && <p>로딩 중...</p>}
            </FollowListContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {isFollowingModalOpen && (
        <ModalOverlay>
          <ModalContent ref={followingModalRef}>
            <ModalHeader>
              <ModalTitle>팔로잉 목록</ModalTitle>
              <CloseButton onClick={handleCloseFollowingModal}>
                &times;
              </CloseButton>
            </ModalHeader>
            <hr style={{ borderColor: "#EDE0FB" }} />
            <FollowListContainer>
              {followings.map((follower, index) => (
                <FollowList
                  key={index}
                  follower={follower}
                  time={130}
                  handleCloseFollowingModal={handleCloseFollowingModal}
                />
              ))}
              {isLoading && <p>로딩 중...</p>}
            </FollowListContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </ProfileContainer>
  );
}

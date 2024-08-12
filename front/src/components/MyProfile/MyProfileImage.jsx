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
  max-height: 50vh; /* 화면 높이의 절반으로 제한 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */
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
  /* padding: 5px; */
  border-radius: 5px;
  cursor: pointer;
  float: right;
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 팔로잉 목록
  const [followings, setFollowings] = useState([]); //팔로잉 목록
  const [followers, setFollowers] = useState([]); //팔로워 목록

  const targetNickname = currentUser.nickname; //현재 프로필 페이지의 사용자 닉네임
  const { nickname } = useSelector((state) => state.auth); //로그인한 사용자의 닉네임

  // 무한 스크롤 - 페이지네이션
  const [currentPage, setCurrentPage] = useState(0); // 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // API- 팔로잉 목록 불러오기
  useEffect(() => {
    const getFollowings = async () => {
      if (hasMore) {
        // 더 불러올 데이터가 있는 경우에만 API 호출
        const result = await getFollowingList(targetNickname, currentPage);
        // const last = result.data.body.last === undefined ? true : result.data.body.last;

        if (result.success) {
          const last = result.data.body.last;
          setFollowings((prevFollowings) => [
            ...prevFollowings,
            ...result.data.body.content,
          ]);
          setHasMore(last === false); // 마지막 페이지인지 확인
          console.log("팔로잉 목록", result.data.body);
        } else {
          setError(result.error);
        }
      }
    };
    getFollowings();
  }, [targetNickname, currentPage]); // currentPage 변경 시 getFollowings 호출

  //API- 팔로워 목록 불러오기
  useEffect(() => {
    const getFollowers = async () => {
      if (hasMore) {
        // 더 불러올 데이터가 있을 때에만 API 호출
        const result = await getFollowerList(targetNickname, currentPage); // cirrentPage : 현재 페이지 번호
        if (result.success) {
          setFollowers((prevFollowers) => [
            ...prevFollowers, // 이전 목록에 다음 목록들 추가
            ...result.data.body.content,
          ]);
          const last = result.data.body.last;
          setHasMore(last === false); // 다음 페이지가 있는지 여부
          // last= true -> 다음 페이지 없음 false: 다음 페이지 있음
          console.log("팔로워 목록", result.data.body);
          setCurrentPage((prevPage) => prevPage + 1);
        } else {
          setError(result.error);
        }
      }
    };
    getFollowers();
  }, [targetNickname, currentPage]); // currentPage 변경 시 getFollowings 호출

  // 스크롤 이벤트 핸들러
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 10 && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
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

  // 팔로우 버튼 - 수정 필요
  const handleFollow = async () => {
    // setRelation("FOLLOWING");
    // 팔로우 결과에 따라 버튼이 눌린걸로 바뀌게 해줘야함
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await follow(targetNickname);

      if (result.success) {
        setSuccess("팔로우가 성공적으로 추가되었습니다.");
        console.log(currentUser.relation);
        // 추가적인 성공 처리가 필요할 경우 여기에 추가
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
  };

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
      {/* <p>
        {currentUser.relation} {relation}
      </p> */}
      {currentUser.relation !== "OWN" && (
        <FollowButton
          following={relation}
          onClick={
            currentUser.relation === "FOLLOWING" ? handleUnfollow : handleFollow
          }
        >
          {currentUser.relation === "FOLLOWING" ? "팔로우 취소" : "팔로우"}
        </FollowButton>
      )}

      {isFollowersModalOpen && (
        <ModalOverlay>
          <ModalContent ref={followersModalRef}>
            <ModalHeader>
              <ModalTitle>팔로워 목록</ModalTitle>
              {/* <CloseButton onClick={handleCloseFollowersModal}> */}
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
              {!hasMore && <p>더 이상 팔로워가 없습니다.</p>}
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
            </FollowListContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </ProfileContainer>
  );
}

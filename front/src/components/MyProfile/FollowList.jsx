import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { follow, unfollow } from "../../features/common/followSlice";

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

const FollowerContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const OutterCircleOnline = styled.a`
  display: flex;
  justify-content: center;
  width: 56px;
  height: 56px;
  @media (max-width: 475px) {
    width: 46px;
    height: 46px;
  }
  border-radius: 50%;
  margin-right: 10px;
  animation: ${rotateGradient} 3s linear infinite; /* linear 추가 */
`;

const OutterCircleOffline = styled.a`
  display: flex;
  justify-content: center;
  width: 56px;
  height: 56px;
  @media (max-width: 475px) {
    width: 46px;
    height: 46px;
  }
  border-radius: 50%;
  background: gray;
`;

const Insideimg = styled.img`
  align-self: center;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  @media (max-width: 475px) {
    width: 40px;
    height: 40px;
  }
  border-radius: 50%;
  transition: transform 0.5s;
`;

const Info = styled.div`
  flex: 1;
`;

const Username = styled.div`
  color: #8534d6;
  font-weight: bold;
  margin-bottom: 5px;
  @media (max-width: 475px) {
    width: 14px;
  }
`;

const Description = styled.div`
  color: #555;
  @media (max-width: 475px) {
    font-size: 13px;
  }
`;

const Button = styled.button`
  background-color: #8b00ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  @media (max-width: 475px) {
    font-size: 13px;
  }
  cursor: pointer;
`;

const FollowList = ({
  follower,
  time,
  isMyProfile,
  // buttonText,
  handleCloseFollowingModal,
  handleCloseFollowersModal,
}) => {
  const online = time < 300;
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("");

  const handleProfileClick = () => {
    // '/profile' 경로로 이동하고, follower.nickname을 state로 전달
    console.log("프로필 클릭:", follower.nickname);
    navigate(`/profile/${follower.nickname}/${follower.type}`);

    // 함수가 존재할 때만 호출
    if (handleCloseFollowingModal) {
      handleCloseFollowingModal();
    }

    if (handleCloseFollowersModal) {
      handleCloseFollowersModal();
    }
  };

  // const handleChat = () => {};

  const getButtonText = (isMyProfile, follower) => {
    if (isMyProfile === "yes") {
      // 본인의 프로필일 경우
      if (follower.isFollow === true) {
        return "언팔로우";
      } else if (follower.isFollow === false) {
        return "맞팔로우";
      }
    } else {
      // 다른 사용자의 프로필일 경우
      if (follower.isFollow === true) {
        return "언팔로우";
      } else if (follower.isFollow === false) {
        return "팔로우";
      }
    }
    console.log("팔로우?", isMyProfile, follower); // 기본값
    return "팔로우?"; // 기본값
  };

  useEffect(() => {
    const text = getButtonText(isMyProfile, follower);
    setButtonText(text);
  }, [isMyProfile, follower]);

  // 팔로우하기 Follow API
  const handleFollow = async () => {
    // setLoading(true);
    // setError(null);
    // setSuccess(null);

    try {
      const result = await follow(follower.nickname);

      if (result.success) {
        console.log(result, "팔로우 성공");
        // setSuccess("팔로우가 성공적으로 추가되었습니다.");
        // setRelation("FOLLOWING");
        // setFollowersCount((prevCount) => prevCount + 1);
        setButtonText("언팔로우");
      } else {
        // setError(result.error || "팔로우 추가 실패");
        console.log(result, "팔로우 실패");
      }
    } catch (error) {
      console.log("error 발생", error);
      // setError("알 수 없는 오류가 발생했습니다.");
    } finally {
      // setLoading(false);
    }
  };

  //팔로우 취소하기 Unfollow API
  const handleUnfollow = async () => {
    // setLoading(true);
    // setError(null);
    // setSuccess(null);

    try {
      const result = await unfollow(follower.followId);

      if (result.success) {
        // setSuccess("팔로우가 취소되었습니다.");
        console.log(result, "팔로우 취소 성공");
        setButtonText("팔로우");
        // setRelation("NONE");
        // setFollowersCount((prevCount) => prevCount - 1); //팔로우 수 줄이기
      } else {
        // setError(result.error || "팔로우 취소 실패");
        console.log(result, "error, 팔로우 취소 실패");
      }
    } catch (error) {
      // setError("알 수 없는 오류가 발생했습니다.");
      console.log("error 발생", error);
    } finally {
      // setLoading(false);
    }
  };

  // 버튼 클릭 시 실행될 핸들러 함수
  const handleClick = () => {
    if (buttonText === "팔로우" || buttonText === "맞팔로우") {
      handleFollow(); // 팔로우 함수 실행
    } else if (buttonText === "언팔로우") {
      handleUnfollow(); // 언팔로우 함수 실행
    }
  };

  return (
    <FollowerContainer>
      <React.Fragment>
        {online ? (
          <OutterCircleOnline>
            <Insideimg
              src={
                follower.imgSrc
                  ? `https://www.rebu.kro.kr/data/${follower.imgSrc}`
                  : "/img.webp"
              }
              alt="Profile"
            />
          </OutterCircleOnline>
        ) : (
          <OutterCircleOffline>
            <Insideimg
              src={
                follower.imgSrc
                  ? `https://www.rebu.kro.kr/data/${follower.imgSrc}`
                  : "/img.webp"
              }
              alt="Profile"
            />
          </OutterCircleOffline>
        )}
      </React.Fragment>

      <Info>
        <Username onClick={handleProfileClick}>{follower.nickname}</Username>
        <Description>{follower.introduction}</Description>
      </Info>
      <Button onClick={handleClick}>{buttonText}</Button>
    </FollowerContainer>
  );
};

export default FollowList;

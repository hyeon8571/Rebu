import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { postCards } from "../util/postDatas";
import { scrapCards } from "../util/scrapDatas";
import { storeCards } from "../util/storeDatas";
import TabComponent from "../components/common/Tab";
import ProfileImage from "../components/MyProfile/MyProfileImage";
import Img from "../assets/images/cha.png";
import ProfileInfo from "../components/MyProfile/MyProfileInfo";
import Header from "../components/MyProfile/MyProfileHeader";
import ReviewGrid from "../components/MyProfile/ReviewGrid";
import ScrapGrid from "../components/MyProfile/ScrapGrid";
import LikesCard from "../components/MyProfile/LikesCard";

export const Wrapper = styled.div`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
  transition: background-color 0.5s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 768px;
  margin-bottom: 70px;
`;

const ProfileContainer = styled.div`
  max-width: 768px;
  width: 100%;
`;

const StickyTabContainer = styled.div`
  position: ${(props) => (props.isSticky ? "fixed" : "relative")};
  top: ${(props) => (props.isSticky ? '50px' : 'auto')}; 
  right: ${(props) => (props.isSticky ? "25%" : "0px")};
  transition: background-color 0.5s linear;
  z-index: 4;
  @media (max-width: 768px) {
    width: 100%;
    right: 0%;
  };
  width: ${(props) => (props.isSticky ? "50%" : "100%")};
  max-width: 768px;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
`;

const GridContainer = styled.div`
  max-width: 768px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const IntroduceBox = styled.div`
  height: 30%;
`;

// 예시 - 현재 프로필의 유저
let currentUser = {
  profile_src: Img,
  introduce : "나는 차은우 나는 뷰티 마스터 V",
  type: "COMMON",
  name: "차은우",
  nickname: "Cha_Cha",
  email: "cha0730@naver.com",
  birth: "1997-07-30",
  phone: "010-1234-5678",
  gender: "true",
  following: {
    nickname: "jiwon",
  },
  follower: {
    nickname: "jiwon",
  }
};

// 예시 - 로그인한 유저
let loginUser = {
  profile_src: Img,
  introduce : "나는 차은우 나는 뷰티 마스터 V",
  type: "COMMON",
  name: "차은우",
  nickname: "Cha_Cha",
  email: "cha0730@naver.com",
  birth: "1997-07-30",
  phone: "010-1234-5678",
  gender: "true",
  following: {
    nickname: "jiwon",
  },
  follower: {
    nickname: "jiwon",
  }
};

const ReviewCount = postCards.length;
const ScrapCount = scrapCards.length;
const LikesCount = storeCards.length;

const FollowersCount = 10;
const FollowingCount = 12;

const ProfilePage = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const updatedUser = location.state?.user;
  const [currentTab, setCurrentTab] = useState(0);
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [scrapPhotos, setScrapPhotos] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [key, setKey] = useState(0);
  const tabRef = useRef(null);

  if (updatedUser) {
    currentUser = updatedUser
    loginUser = updatedUser
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tabRef.current) {
        setIsSticky(tabRef.current.getBoundingClientRect().top <= 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const reviewPhotos = postCards.flatMap(postcard => postcard.img);
    const scrapPhotos = scrapCards.flatMap(scrapcard => scrapcard.img);
    setReviewPhotos(reviewPhotos);
    setScrapPhotos(scrapPhotos);
  },[])

  const tabTitle = [
    { name: "Post", content: "Post", count: ReviewCount },
    { name: "Scrap", content: "Scrap", count: ScrapCount },
    { name: "Likes", content: "Likes", count: LikesCount },
  ];

  const renderGrid = () => {
    const content = tabTitle[currentTab].content;

    if (content === "Post") {
      return <ReviewGrid key={key} uploadedPhotos={reviewPhotos} Card={postCards} currentUser={currentUser} />;
    } else if (content === "Scrap") {
      return <ScrapGrid key={key} uploadedPhotos={scrapPhotos} Card={scrapCards} currentUser={currentUser} />;
    } else if (content === "Likes") {
      return (
        <React.Fragment key={key}>
          {storeCards.map((item) => (
            <LikesCard key={item.id} Card={item} button={item.button} />
          ))}
        </React.Fragment>
      );
    }
  };

  const handleTabChange = (index) => {
    setCurrentTab(index);
    setKey(prevKey => prevKey + 1); // 같은 탭을 클릭해도 리렌더링
  };

  return (
    <Wrapper>
      <Header theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} loginUser={loginUser} />
      <ProfileContainer>
        <IntroduceBox>
          <ProfileImage
            currentUser={currentUser}
            time={130}
            followers={FollowersCount}
            following={FollowingCount}
          />
          <ProfileInfo currentUser={currentUser} loginUser={loginUser} />
        </IntroduceBox>
        <div ref={tabRef}>
          <StickyTabContainer isSticky={isSticky}>
            <TabComponent
              tabTitle={tabTitle}
              currentTab={currentTab}
              onTabChange={handleTabChange}
            />
          </StickyTabContainer>
        </div>
      </ProfileContainer>
      <GridContainer>{renderGrid()}</GridContainer>
    </Wrapper>
  );
};

export default ProfilePage;
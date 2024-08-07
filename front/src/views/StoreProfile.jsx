import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { postCards } from "../util/postDatas";
import { scrapCards } from "../util/scrapDatas";
import { storeCards } from "../util/storeDatas";
import TabComponent from "../components/storeProfile/StoreProfileTab";
import ProfileImage from "../components/storeProfile/StoreProfileImage";
import Img from "../assets/images/ssafyhair.png";
import userImg from "../assets/images/cha.png";
import ProfileInfo from "../components/storeProfile/StoreProfileInfo";
import Header from "../components/storeProfile/StoreProfileHeader";
import ReviewGrid from "../components/storeProfile/ReviewGrid";
import PostGrid from "../components/storeProfile/PostGrid";
import TimeTable from "../components/reservation/TimeTable";

const Wrapper = styled.div`
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
  position: ${(props) => (props.isSticky ? 'sticky' : 'relative')};
  top: ${(props) => (props.isSticky ? '0' : 'auto')};
  left: 0;
  right: 0;
  width: 100%;
  max-width: 768px;
  transition: all 0.5s ease-in-out;
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
  -ms-overflow-style: none; /* IE와 Edge */
  scrollbar-width: none; /* Firefox */
`;

const IntroduceBox = styled.div`
  height: 30%;
`;

// 예시 - 현재 프로필
let currentUser = {
  profile_src: Img,
  introduction: "싸피 앞 메가박스 건물에 위치하고 있습니다:)",
  type: "store",
  category: "헤어",
  name: "사피 헤어샵",
  license_num: "12345678",
  nickname: "SSAFY_hair",
  address: "경북 구미시 인동",
  rank: 4.8,
  reservation_interval: 10,
  phone: "010-1234-5678",
  following: {
    nickname: "jiwon",
  },
  follower: {
    nickname: "cha_cha",
  }
};



const ProfilePage = ({ theme, toggleTheme }) => {
  const location = useLocation();
  // const updatedUser = location.state?.user;
  const shopProfile = location.state?.shop;
  const loginUser = location.state?.user;
  const [likesUser, setLikesUser] = useState(loginUser);
  const [currentTab, setCurrentTab] = useState(0);
  // const [reviewPhotos, setReviewPhotos] = useState([]);
  // const [scrapPhotos, setScrapPhotos] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [key, setKey] = useState(0);
  const tabRef = useRef(null);
  const [shopPost, setShopPost] = useState([]);

  useEffect(() => {
    fetch('data/shoppost.json')
      .then(res => res.json())
      .then((data) => {
        setShopPost(data.body);
      })      
  }, []);

  const updateLikes = (newLikes) => {
    setLikesUser({
      ...likesUser,
      likes: newLikes
    });
  };

  // if (updatedUser) {
  //   currentUser = updatedUser;
  //   loginUser = updatedUser;
  // }

  const handleScroll = () => {
    if (tabRef.current) {
      const tabTop = tabRef.current.getBoundingClientRect().top;
      const newIsSticky = tabTop <= 0;
      setIsSticky(newIsSticky);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   const reviewPhotos = postCards.flatMap(postcard => postcard.img);
  //   const scrapPhotos = scrapCards.flatMap(scrapcard => scrapcard.img);
  //   setReviewPhotos(reviewPhotos);
  //   setScrapPhotos(scrapPhotos);
  // }, []);

  const tabTitle = [
    { name: "Post", content: "Post", count: shopProfile.feedCnt},
    { name: "Review", content: "Review", count: shopProfile.reviewCnt},
    { name: "Reservation", content: "Reservation", count: shopProfile.reservationCnt},
  ];

  const renderGrid = () => {
    const content = tabTitle[currentTab].content;

    if (content === "Post") {
      return <PostGrid key={key} Card={shopPost} currentUser={shopProfile} loginUser={loginUser}/>;
    } else if (content === "Review") {
      return <ReviewGrid key={key} loginUser={loginUser}/>;
    } else if (content === "Reservation") {
      return <TimeTable />;
    }
  };

  const handleTabChange = (index) => {
    setCurrentTab(index);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <Wrapper>
      <Header theme={theme} toggleTheme={toggleTheme} currentUser={shopProfile} loginUser={loginUser} />
      <ProfileContainer>
        <IntroduceBox>
          <ProfileImage
            currentUser={shopProfile}
            time={130}
          />
          <ProfileInfo currentUser={shopProfile} loginUser={likesUser} updateLikes={updateLikes} />
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

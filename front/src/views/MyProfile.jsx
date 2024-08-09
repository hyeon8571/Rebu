import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import TabComponent from "../components/MyProfile/MyProfileTab";
import ProfileImage from "../components/MyProfile/MyProfileImage";
import ProfileInfo from "../components/MyProfile/MyProfileInfo";
import Header from "../components/MyProfile/MyProfileHeader";
import ReviewGrid from "../components/MyProfile/ReviewGrid";
import LikesCard from "../components/MyProfile/LikesCard";


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
  top: ${(props) => (props.isSticky ? '0' : 'auto')}; // 화면 상단에 고정되도록 설정
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

const ProfilePage = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const updatedUser = location.state?.user;
  const updatedProfile = location.state?.profile;
  const [currentTab, setCurrentTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [key, setKey] = useState(0);
  const tabRef = useRef(null);
  const [profile, setProfile] = useState([]);
  const [likeCard, setLikeCard] = useState([]);
  const [reviewdata, setReveiwData] = useState([]);
  const [scrapdata, setScrapData] = useState([]);
  const [followerdata, setFollowerData] = useState([]);
  const [followingdata, setFollowingData] =useState([]);
  const [loginUser, setLoginUser] = useState([]);
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  
  
  useEffect(() => {
    fetch('/mockdata/loginuser.json')
      .then(res => res.json())
      .then((data) => {
        setLoginUser(data.body);
      })      
  }, []);

  useEffect(() => {
    fetch('/mockdata/followerlist.json')
      .then(res => res.json())
      .then((data) => {
        setFollowerData(data.body);
      })      
  }, []);

  useEffect(() => {
    fetch('/mockdata/followinglist.json')
      .then(res => res.json())
      .then((data) => {
        setFollowingData(data.body);
      })      
  }, []);

  useEffect(() => {
    fetch('/mockdata/reviewdata.json')
      .then(res => res.json())
      .then((data) => {
        const matchedReview = data.body.filter(review => review.nickname === loginUser.nickname);
        const matchedScrap = data.body.filter(scrap => scrap.isScraped === true && scrap.nickname !== loginUser.nickname);
        setReveiwData(matchedReview || data.body);
        setScrapData(matchedScrap || data.body);
      })      
  }, [loginUser]);

  useEffect(() => {
    fetch('/mockdata/likeshop.json')
      .then(res => res.json())
      .then((data) => {
        setLikeCard(data.body);
      })      
  }, []);

  useEffect(() => {
    fetch('/mockdata/personalprofile.json')
      .then(res => res.json())
      .then((data) => {
        const matchedProfile = data.body.find(profile => profile.nickname === loginUser.nickname);
        setProfile(matchedProfile || data.body);
      })      
  }, [loginUser]);

  useEffect(() => {
    if (updatedUser) {
      setLoginUser(updatedUser);
    }
  }, [updatedUser]);

  useEffect(() => {
    if (updatedProfile) {
      setProfile(updatedProfile);
    }
  }, [updatedProfile]);


  const handleScroll = () => {
    if (tabRef.current) {
      const tabTop = tabRef.current.getBoundingClientRect().top;
      const newIsSticky = tabTop <= 0;
      setIsSticky(newIsSticky);
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 스크롤 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 의존성 배열이 비어 있어 처음 마운트될 때만 실행됨


  const tabTitle = [
    { name: "Post", content: "Post", count: profile.reviewCnt},
    { name: "Scrap", content: "Scrap", count: profile.scrapCnt},
    { name: "Likes", content: "Likes", count: profile.likeCnt},
  ];

  const renderGrid = () => {
    const content = tabTitle[currentTab].content;

    if (content === "Post") {
      return <ReviewGrid key={key} Card={reviewdata} currentUser={profile} loginUser={loginUser} />;
    } else if (content === "Scrap") {
      return <ReviewGrid key={key} Card={scrapdata} currentUser={profile} loginUser={loginUser} />;
    } else if (content === "Likes") {
      return (
        <React.Fragment key={key}>
          {likeCard.map((item) => (
            <LikesCard key={item.id} Card={item} />
          ))}
        </React.Fragment>
    )}
  };

  const handleTabChange = (index) => {
    setCurrentTab(index);
    setKey(prevKey => prevKey + 1); // 같은 탭을 클릭해도 리렌더링
  };

  return (
    <Wrapper>
      <Header theme={theme} toggleTheme={toggleTheme} currentUser={profile} loginUser={loginUser} />
      <ProfileContainer>
        <IntroduceBox>
          <ProfileImage
            currentUser={profile}
            time={130}
            followerdata={followerdata}
            followingdata={followingdata}
          />
          <ProfileInfo currentUser={profile} loginUser={loginUser} />
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

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import TabComponent from "../components/storeProfile/StoreProfileTab";
import ProfileImage from "../components/storeProfile/StoreProfileImage";
import ProfileInfo from "../components/storeProfile/StoreProfileInfo";
import Header from "../components/storeProfile/StoreProfileHeader";
import ReviewGrid from "../components/storeProfile/ReviewGrid";
import PostGrid from "../components/storeProfile/PostGrid";
import TimeTable from "../components/reservation/TimeTable";
import DesignerGrid from "../components/reservation/DesignerDisplay";

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

const ProfilePage = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const shopProfile = location.state?.shop;
  const loginUser = location.state?.user;
  const [likesUser, setLikesUser] = useState(loginUser);
  const [currentTab, setCurrentTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [key, setKey] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('예약현황'); // 중첩된 탭의 상태를 추가합니다.
  const tabRef = useRef(null);
  const [shopPost, setShopPost] = useState([]);
  const [reviewdata, setReviewdata] = useState([]);
  const [ratingAvg, setRatingAvg] = useState(0);
  const [followerdata, setFollowerData] = useState([]);
  const [followingdata, setFollowingData] =useState([]);
  const [likeshop, setLikeshop] = useState([]);

  useEffect(() => {
    fetch('/mockdata/likeshop.json')
      .then(res => res.json())
      .then((data) => {
        setLikeshop(data.body);
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
        const shopReview = data.body.filter(review => shopProfile.nickname === review.shopNickname && shopProfile.nickname !== review.nickname);
        setReviewdata(shopReview || data.body);
      })      
  }, [reviewdata, shopProfile]);

  useEffect(() => {
    if (reviewdata.length > 0) {
      const totalRating = reviewdata.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = reviewdata.length > 0 ? (totalRating / reviewdata.length).toFixed(2) : 0;
      setRatingAvg(averageRating);
    }
  });
  
  useEffect(() => {
    fetch('/mockdata/shoppost.json')
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

  const tabTitle = [
    { name: "Post", content: "Post", count: shopProfile.feedCnt},
    { name: "Review", content: "Review", count: shopProfile.reviewCnt},
    { name: "Reservation", content: "Reservation", count: shopProfile.reservationCnt},
  ];

  const tabName = ['예약현황', "디자이너"];

  const renderGrid = () => {
    const content = tabTitle[currentTab].content;

    if (content === "Post") {
      return <PostGrid key={key} Card={shopPost} currentUser={shopProfile} loginUser={loginUser}/>;
    } else if (content === "Review") {
      return <ReviewGrid key={key} Card={reviewdata} currentUser={shopProfile} loginUser={loginUser}/>;
    } else if (content === "Reservation") {
      return activeSubTab === '예약현황' ? <TimeTable /> : <DesignerGrid />;
    }
  };

  const handleTabChange = (index) => {
    setCurrentTab(index);
    setKey(prevKey => prevKey + 1);
  };

  const handleSubTabChange = (tab) => {
    setActiveSubTab(tab);
  };

  return (
    <Wrapper>
      <Header theme={theme} toggleTheme={toggleTheme} currentUser={shopProfile} loginUser={loginUser} />
      <ProfileContainer>
        <IntroduceBox>
          <ProfileImage
            currentUser={shopProfile}
            time={130}
            followerdata={followerdata}
            followingdata={followingdata}
          />
          <ProfileInfo currentUser={shopProfile} loginUser={likesUser} updateLikes={updateLikes} rating={ratingAvg} likeshop={likeshop}/>
        </IntroduceBox>
        <div ref={tabRef}>
          <StickyTabContainer isSticky={isSticky}>
            <TabComponent
              tabTitle={tabTitle}
              currentTab={currentTab}
              onTabChange={handleTabChange}
              tabName={tabName}
              onSubTabChange={handleSubTabChange} // 서브탭 변경 함수를 전달합니다.
              activeSubTab={activeSubTab} // 현재 활성화된 서브탭을 전달합니다.
            />
          </StickyTabContainer>
        </div>
      </ProfileContainer>
      <GridContainer>{renderGrid()}</GridContainer>
    </Wrapper>
  );
};

export default ProfilePage;

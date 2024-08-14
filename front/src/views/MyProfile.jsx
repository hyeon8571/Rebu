import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "./Signup";
import {
  getCommonProfile,
  getEmployeeProfile,
  getShopProfile,
} from "../features/common/userSlice";
import TabComponent from "../components/MyProfile/MyProfileTab";
import ProfileImage from "../components/MyProfile/MyProfileImage";
import ProfileInfo from "../components/MyProfile/MyProfileInfo";
import Header from "../components/MyProfile/MyProfileHeader";
import ReviewGrid from "../components/MyProfile/ReviewGrid";
import ScrapGrid from "../components/MyProfile/ScrapGrid";
import LikesCard from "../components/MyProfile/LikesCard";
import TimeTable from "../components/reservation/TimeTable";
import DesignerGrid from "../components/reservation/DesignerDisplay";
import ShopTabComponent from "../components/storeProfile/StoreProfileTab";
import ShopProfileInfo from "../components/storeProfile/StoreProfileInfo";
import Login from "./Login";

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
  transition: background-color 0.5s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  /* max-width: 768px; */
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  /* max-width: 768px; */
  width: 100%;
`;

const StickyTabContainer = styled.div`
  position: flex;
  /* position: ${(props) => (props.isSticky ? "sticky" : "relative")}; */
  top: ${(props) =>
    props.isSticky ? "0" : "auto"}; // 화면 상단에 고정되도록 설정
  left: 0;
  right: 0;
  width: 100%;
  /* max-width: 768px; */
  transition: all 0.5s ease-in-out;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#ffffff" : props.theme.body};
`;

const GridContainer = styled.div`
  /* max-width: 768px; */
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

const ProfilePage = ({ theme, toggleTheme, handleLogout }) => {
  const location = useLocation();
  const updatedUser = location.state?.user;
  const updatedProfile = location.state?.profile;
  const [currentTab, setCurrentTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [key, setKey] = useState(0);
  const tabRef = useRef(null);
  const [tabTitle, setTabTitle] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState("예약현황");
  const [likeCard, setLikeCard] = useState([]);
  const [reviewdata, setReveiwData] = useState([]);
  const [ratingAvg, setRatingAvg] = useState(0);
  const [scrapdata, setScrapData] = useState([]);
  const [postdata, setPostdata] = useState([]);
  const [followerdata, setFollowerData] = useState([]);
  const [followingdata, setFollowingData] = useState([]);
  const [loginUser, setLoginUser] = useState([]);

  // Redux 상태에서 필요한 정보 가져오기
  const loginNickname = localStorage.getItem("nickname");
  const loginType = localStorage.getItem("type");
  const { nickname, type } = useParams(); // URL 파라미터에서 nickname과 type을 추출
  const [profile, setProfile] = useState([]); //profile 조회
  const [error, setError] = useState(null);

  // 다른사람 프로필 조회시 필요한 정보
  // const [tempNickname, setTempNickname] = useState(nickname);
  // const [tempType, setTempType] = useState(type);

  // 타입별 프로필 조회
  useEffect(() => {
    if (type === "COMMON") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/profiles/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setProfile(response.data.body);
        })
        .catch((err) => {
          console.log("사용자 프로필 데이터를 찾지 못했습니다");
        });
    } else if (type === "SHOP") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/profiles/shops/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setProfile(response.data.body);
        })
        .catch((err) => {
          console.log("매장 프로필 데이터를 찾지 못했습니다");
        });
    } else if (type === "EMPLOYEE") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/profiles/employees/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setProfile(response.data.body);
        })
        .catch((err) => {
          console.log("직원 프로필 데이터를 찾지 못했습니다");
        });
    }
  }, [nickname, type]);

  // 타입별 프로필 정보 조회
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       let response;

  //       switch (type) {
  //         case "COMMON":
  //           response = await getCommonProfile(nickname);
  //           break;
  //         case "EMPLOYEE":
  //           response = await getEmployeeProfile(nickname);
  //           break;
  //         case "SHOP":
  //           response = await getShopProfile(nickname);
  //           break;
  //         default:
  //           throw new Error("Invalid profile type");
  //       }

  //       if (response.success) {
  //         setProfile(response.data);
  //         console.log("success", profile);
  //       } else {
  //         console.log("Failed to load profile");
  //         setError("Failed to load profile");
  //       }
  //     } catch (err) {
  //       setError("An error occurred while fetching the profile");
  //     }
  //   };

  //   fetchProfile();
  // }, [nickname, type]);

  // if (error) {
  //   console.log(error);
  // }

  // if (!profile) {
  //   console.log("Loading...");
  // }

  // 타입별 리뷰 전체 조회
  useEffect(() => {
    if (type === "COMMON") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/feeds/reviews/profiles/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setReveiwData(response.data.body);
        })
        .catch((err) => {
          console.log("사용자 리뷰 데이터를 찾지 못했습니다");
        });
    } else if (type === "SHOP") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/feeds/reviews/shops/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setReveiwData(response.data.body);
        })
        .catch((err) => {
          console.log("매장 리뷰 데이터를 찾지 못했습니다");
        });
    } else if (type === "EMPLOYEE") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/feeds/reviews/employees/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setReveiwData(response.data.body);
        })
        .catch((err) => {
          console.log("직원 리뷰 데이터를 찾지 못했습니다");
        });
    }
  }, [profile]);

  // 가게 평점 계산
  useEffect(() => {
    if (reviewdata?.length > 0) {
      const totalRating = reviewdata.reduce(
        (acc, review) => acc + review.feed.rating,
        0
      );
      const averageRating =
        reviewdata.length > 0
          ? (totalRating / reviewdata.length).toFixed(1)
          : 0;
      setRatingAvg(averageRating);
    }
  });

  // 스크랩 조회
  useEffect(() => {
    if (type !== "SHOP") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/feeds`, {
          params: {
            scrapedBy: nickname,
          },
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("스크랩 데이터를 조회했습니다");
          console.log(response.data.body);
          setScrapData(response.data.body);
        })
        .catch((err) => {
          console.log("스크랩 데이터를 찾지 못했습니다");
        });
    }
  }, [profile]);

  // 매장, 직원 피드(post) 조회
  useEffect(() => {
    if (type === "SHOP") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/feeds/shops/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setPostdata(response.data.body);
        })
        .catch((err) => {
          console.log("매장 피드 데이터를 찾지 못했습니다");
        });
    } else if (type === "EMPLOYEE") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/feeds/employees/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setPostdata(response.data.body);
        })
        .catch((err) => {
          console.log("직원 피드 데이터를 찾지 못했습니다");
        });
    }
  }, [profile]);

  // 매장 즐겨찾기 전체 조회
  useEffect(() => {
    if (type === "COMMON") {
      const access = localStorage.getItem("access");
      axios
        .get(`${BASE_URL}/api/shop-favorites/${nickname}`, {
          headers: {
            access: access,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.body.content);
          setLikeCard(response.data.body.content);
        })
        .catch((err) => {
          console.log("즐겨찾기 데이터를 찾지 못했습니다");
        });
    }
  }, [profile]);

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

  //타입별 탭 구분
  useEffect(() => {
    if (type === "COMMON") {
      setTabTitle([
        { name: "Review", content: "Review", count: profile?.reviewCnt },
        { name: "Scrap", content: "Scrap", count: profile?.scrapCnt },
        { name: "Likes", content: "Likes", count: profile?.favoritesCnt },
      ]);
    } else if (type === "SHOP") {
      setTabTitle([
        { name: "Post", content: "Post", count: profile?.feedCnt },
        { name: "Review", content: "Review", count: profile?.reviewCnt },
        {
          name: "Reservation",
          content: "Reservation",
          count: profile?.reservationCnt,
        },
      ]);
    } else if (type === "EMPLOYEE") {
      setTabTitle([
        { name: "Post", content: "Post", count: profile?.feedCnt },
        { name: "Review", content: "Review", count: profile?.reviewCnt },
        { name: "Scrap", content: "Scrap", count: profile?.scrapCnt },
      ]);
    }
  }, [profile]);

  const tabName = ["예약현황", "디자이너"];

  const renderGrid = () => {
    const content = tabTitle[currentTab]?.content;

    if (content === "Post") {
      return (
        <ReviewGrid
          key={key}
          Card={postdata}
          currentUser={profile}
          loginUser={loginNickname}
          type={type}
          currentTab={currentTab}
          reviewdata={renderGrid}
        />
      );
    } else if (content === "Scrap") {
      return (
        <ScrapGrid
          key={key}
          Card={scrapdata}
          currentUser={profile}
          loginUser={loginNickname}
        />
      );
    } else if (content === "Likes") {
      return (
        <>
          {likeCard.map((item) => (
            <LikesCard key={item.id} Card={item} loginUser={loginNickname} />
          ))}
          {likeCard == false && (
            <h3 style={{ color: "#b475f3", fontSize: "18px" }}>
              좋아요한 가게가 없습니다
            </h3>
          )}
        </>
      );
    } else if (content === "Review") {
      return (
        <ReviewGrid
          key={key}
          Card={reviewdata}
          currentUser={profile}
          loginUser={loginNickname}
          type={type}
          currentTab={currentTab}
          reviewdata={reviewdata}
        />
      );
    } else if (content === "Reservation") {
      return activeSubTab === "예약현황" ? <TimeTable /> : <DesignerGrid />;
    }
  };

  const handleSubTabChange = (tab) => {
    setActiveSubTab(tab);
  };

  const handleTabChange = (index) => {
    if (index >= 0 && index < tabTitle.length) {
      setCurrentTab(index);
      setKey((prevKey) => prevKey + 1); // 같은 탭을 클릭해도 리렌더링
    }
  };

  return (
    <Wrapper>
      <>
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          currentUser={profile}
          loginUser={loginNickname}
          handleLogout={handleLogout}
        />
        <ProfileContainer>
          <IntroduceBox>
            <ProfileImage currentUser={profile} time={130} />
            {type === "SHOP" ? (
              <ShopProfileInfo
                currentUser={profile}
                loginUser={loginNickname}
                rating={ratingAvg}
              />
            ) : (
              <ProfileInfo currentUser={profile} loginUser={loginNickname} />
            )}
          </IntroduceBox>
          <div ref={tabRef}>
            <StickyTabContainer isSticky={isSticky}>
              {type === "SHOP" ? (
                <ShopTabComponent
                  tabTitle={tabTitle}
                  currentTab={currentTab}
                  onTabChange={handleTabChange}
                  tabName={tabName}
                  onSubTabChange={handleSubTabChange} // 서브탭 변경 함수를 전달합니다.
                  activeSubTab={activeSubTab} // 현재 활성화된 서브탭을 전달합니다.
                />
              ) : (
                <TabComponent
                  tabTitle={tabTitle}
                  currentTab={currentTab}
                  onTabChange={handleTabChange}
                />
              )}
            </StickyTabContainer>
          </div>
        </ProfileContainer>
        <GridContainer>{renderGrid()}</GridContainer>
      </>
    </Wrapper>
  );
};

export default ProfilePage;

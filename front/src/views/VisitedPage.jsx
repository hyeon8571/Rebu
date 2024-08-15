import styled from "styled-components";
import { useState, useEffect } from "react";
import VisitedCard from "../components/review/VisitedCard";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Wrapper = styled.div`
  @media (max-width: 768px) {
    padding-top: 4rem;
  }
  padding-top: 5rem;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
`;

const PageInstruction = styled.div`
  padding-top: 0.3rem;
`;

const PageTitleContainer = styled.div`
  padding-left: 4rem;
  padding-bottom: 2rem;
  @media (max-width: 768px) {
    padding-left: 2rem;
    padding-bottom: 1rem;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 16px;
  color: #999;
`;

function calculateVisit(date, timeTaken) {
  const givenTime = new Date(date);
  const currentTime = new Date();
  const timeAfter = new Date(givenTime.getTime() + timeTaken * 60 * 1000);

  return currentTime > givenTime;
}

const BASE_URL = "https://www.rebu.kro.kr";
const nickname = localStorage.getItem("nickname");

export default function VisitedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { nickname, type, isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/api/reservations/profiles/${nickname}?start-date=2023-08-01&end-date=2025-08-30`,
        {
          headers: {
            "Content-Type": "application/json",
            Access: localStorage.getItem("access"),
          },
        }
      )
      .then((response) => {
        setData(sortedData);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header title={"리뷰 작성"} />
      <Wrapper>
        <PageTitleContainer>
          <PageTitle>방문한 곳</PageTitle>
          <PageInstruction>리뷰를 작성할 항목을 선택해주세요</PageInstruction>
        </PageTitleContainer>
        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <NoDataMessage>방문한 곳이 없습니다.</NoDataMessage>
        ) : (
          data
            .filter(
              (item) =>
                calculateVisit(item.startDateTime, item.menu.timeTaken) &&
                (item.reservationStatus === "RECEIVED" ||
                  item.reservationStatus === "ACCEPTED")
            )
            .map((item) => (
              <VisitedCard
                key={item.id}
                Card={{
                  img: item.shop.imageSrc,
                  title: item.shop.name,
                  menu: item.menu.title,
                  date: item.startDateTime,
                  nickname: item.shop.nickname,
                  designer:
                    item.employee.workingName + " " + item.employee.role,
                  status: item.isReviewed,
                }}
                button={{
                  id: item.id,
                  title: item.isReviewed ? "작성완료" : "작성하기",
                  status: item.isReviewed,
                  onClick: () => {
                    navigate("/postrevw", {
                      state: {
                        info: {
                          reservationId: item.id,
                          img: item.shop.imageSrc,
                          title: item.shop.name,
                          menu: item.menu.title,
                          nickname: item.shop.nickname,
                          designer:
                            item.employee.workingName +
                            " " +
                            item.employee.role,
                          date: item.startDateTime,
                          price: item.menu.price,
                        },
                      },
                    });
                  },
                  highlight: true,
                }}
              />
            ))
        )}
      </Wrapper>
    </>
  );
}

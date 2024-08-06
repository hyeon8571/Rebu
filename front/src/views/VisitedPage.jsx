import styled from "styled-components";
import { useState, useEffect } from "react";
import VisitedCard from "../components/review/VisitedCard";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";

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

export default function VisitedPage() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/data/reviewdata.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsondata) => {
        setData(jsondata.body);
        console.log(jsondata.body);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
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
        {data.length === 0 ? (
          <p>Loading...</p>
        ) : (
          data
            .filter((item) => item.reservation.reservationStatus === "DONE")
            .map((item) => (
              <VisitedCard
                key={item.reservation.id}
                Card={{
                  img: item.shop.imageSrc,
                  title: item.shop.name,
                  menu: item.menu.title,
                  date: item.reservation.startTime,
                }}
                button={{
                  id: item.reservation.id,
                  title:
                    item.reservation.reviewStatus === "WRITTEN"
                      ? "작성완료"
                      : "작성하기",
                  status: item.reservation.reviewStatus === "WRITTEN",
                  onClick: () => {
                    navigate("/postrevw", {
                      state: {
                        info: {
                          img: item.shop.imageSrc,
                          title: item.shop.name,
                          menu: item.menu.title,
                          designer:
                            item.employee.workingName +
                            " " +
                            item.employee.role,
                          date: item.reservation.startTime,
                        },
                      },
                    });
                  },
                  highlight:
                    item.reservation.reviewStatus === "WRITTEN" ? false : true,
                }}
              />
            ))
        )}
      </Wrapper>
    </>
  );
}

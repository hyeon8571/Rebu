import styled from "styled-components";
import { useState, useEffect } from "react";
import VisitedCard from "../components/review/VisitedCard";
import Header from "../components/common/Header";

const Wrapper = styled.div`
  @media (max-width: 768px) {
    padding-top: 3rem;
  }
  padding-top: 4rem;
`;

export default function VisitedPage() {
  const [data, setData] = useState([]);

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
        <div>방문한 곳</div>
        <div>리뷰를 작성할 곳을 선택해주세요</div>
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
                      ? "작성하기"
                      : "작성완료",
                  onClick: () => {},
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

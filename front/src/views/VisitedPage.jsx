import styled from "styled-components";
import { useEffect } from "react";
import VisitedCard from "../components/review/VisitedCard";
import { visitedCards } from "../util/visitedDatas";

const Wrapper = styled.div``;
export default function VisitedPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Wrapper>
      {visitedCards.map((item) => (
        <VisitedCard
          key={item.id}
          Card={item}
          button={item.button}
        ></VisitedCard>
      ))}
    </Wrapper>
  );
}

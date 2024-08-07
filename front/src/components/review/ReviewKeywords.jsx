import styled from "styled-components";
import ReviewKeywordButton from "./ReviewKeywordButton";

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 768px) {
    justify-content: space-around;
  }
`;

const InvisibleBlock = styled.div`
  width: 15vw;
  display: block;
  @media (max-width: 768px) {
    visibility: none;
  }
`;

export default function ReviewKeywords({ keywords, handleChecked }) {
  console.log(process.env.PUBLIC_URL);
  return (
    <ButtonsContainer>
      {keywords.map((item, index) => (
        <ReviewKeywordButton
          key={item.id}
          button={{
            id: index,
            title: item.keyword,
            img: process.env.PUBLIC_URL + "keyword/" + item.imgURL,
            onClick: () => handleChecked(index),
            highlight: item.checked,
          }}
        />
      ))}
      <InvisibleBlock></InvisibleBlock>
      <InvisibleBlock></InvisibleBlock>
    </ButtonsContainer>
  );
}

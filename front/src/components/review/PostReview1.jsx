import styled from "styled-components";

const ShopInfoContainer = styled.div`
  display: flex;
`;

export default function PostReview1({ info }) {
  return (
    <>
      <ShopInfoContainer>
        <ImgWrapper></ImgWrapper>
        <TitleText></TitleText>
        <VisitDate>방문 날짜 : </VisitDate>
      </ShopInfoContainer>
      <input type="number" min={1} max={5} />
    </>
  );
}

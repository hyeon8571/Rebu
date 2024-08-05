import styled from "styled-components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewKeywordButton from "./ReviewKeywordButton";
import img from "../../assets/images/cha.png";

const ShopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;
`;

const ImgWrapper = styled.img`
  width: 150px;
  height: 150px;
  max-width: 120px;
  max-height: 120px;

  @media (max-width: 768px) {
    max-width: 100px;
    max-height: 100px;
  }

  border-radius: 8rem;
`;

const TitleText = styled.div`
font-weight: 600;
`;

const VisitDate = styled.div`
  color : gray;
  font-size: 14px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

`
const RateContainer = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom : 1rem;
  margin-top : 1rem;

`;

const RateTextContainer = styled.div`
  display: flex;
  padding-top : 0.5rem;
  margin-left: 0.5rem;
`;

const RateTextWrapper = styled.div`
  margin-right : 0.3rem;
  padding-left : 0.3rem;
  padding-right : 0.3rem;
  border-radius: 0.3rem;
  vertical-align: middle;
  border: 1px solid ${(props)=>props.theme.value==="light" ? "gray" : "lightgray"};
`;

export default function PostReview1() {
  const [rate, setRate] = useState(0);
  const [keywords, setKeywords] = useState(false);
  const location = useLocation();
  const { info } = location.state;

  return (
    <Container>
      <ShopInfoContainer>
        <ImgWrapper src={info.img}></ImgWrapper>
        <TitleText>{info.title}</TitleText>
        <VisitDate>방문 날짜 : {info.date}</VisitDate>
      </ShopInfoContainer>

    <TitleText>별점</TitleText>
    <RateContainer>
      <ReactStars
        count={5}
        size={24}
        isHalf={true}
        onChange={setRate}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
        />
        <RateTextContainer>
          <RateTextWrapper>{rate===0 ? "? " : rate}</RateTextWrapper> / 5
        </RateTextContainer>
      </RateContainer>
      <ReviewKeywordButton button={{
        id: 1,
        title: "사장님이 친절해요",
        img: img,
        onClick: () => {setKeywords(!keywords)},
        highlight : keywords,
      }}></ReviewKeywordButton>
        <ReviewKeywordButton button={{
        id: 2,
        title: "디자인이 아름다워요",
        img: img,
        onClick: () => {setKeywords(!keywords)},
        highlight : keywords,
      }}></ReviewKeywordButton>
     </Container>
  );
}

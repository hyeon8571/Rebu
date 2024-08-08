import styled from "styled-components";
import { useState } from "react";
import Lottie from "lottie-react";
import Alert from "../../assets/images/validationAlert.json";
import ReviewStar from "./ReviewStar";
import ReviewKeywords from "./ReviewKeywords";
import ReservationInfo from "./ReservationInfo";

const TitleText = styled.div`
  display: flex;
  font-size: 20px;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  font-weight: 600;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ConstraintsText = styled.div`
  font-size: 14px;
  padding-left: 0.3rem;
  vertical-align: bottom;
`;

const StyledLottie = styled(Lottie)`
  padding-left: 0.5rem;
`;

const keywordList = [
  {
    id: 1,
    keyword: "원하는 스타일로 잘해줘요",
    imgURL: "style.png",
    checked: false,
  },
  {
    id: 2,
    keyword: "시술이 꼼꼼해요",
    imgURL: "ggomggom.png",
    checked: false,
  },
  {
    id: 3,
    keyword: "친절해요",
    imgURL: "kind.png",
    checked: false,
  },
  {
    id: 4,
    keyword: "디자인 추천을 잘해줘요",
    imgURL: "recommend.png",
    checked: false,
  },
  {
    id: 5,
    keyword: "디자인이 다양해요",
    imgURL: "design.png",
    checked: false,
  },
  {
    id: 6,
    keyword: "가격이 합리적이에요",
    imgURL: "price.png",
    checked: false,
  },
  {
    id: 7,
    keyword: "매장이 청결해요",
    imgURL: "clean.png",
    checked: false,
  },
  {
    id: 8,
    keyword: "상담이 자세해요",
    imgURL: "consult.png",
    checked: false,
  },
  {
    id: 9,
    keyword: "대화가 즐거워요",
    imgURL: "conversation.png",
    checked: false,
  },
  {
    id: 10,
    keyword: "맞춤케어를 잘해줘요",
    imgURL: "care.png",
    checked: false,
  },
];



export default function PostReview1({ isRateAlert, setIsRateAlert, isAlert, setIsAlert, animationKey, setAnimationKey, info, review, setReview }) {
  const [rate, setRate] = useState(0);
  const [selectedKeyword, setSelectedKeyword] = useState(0);
  const [keywords, setKeywords] = useState(keywordList);
  const LIMIT_KEYWORD_NUM = 4;

  
  function handleRate(rate) {
    const doubleRate = rate * 2;
    setIsRateAlert(false);
    setReview({
      ...review,
      rate: Number(doubleRate),
    });
    setRate(rate);
  }
  function handleChecked(index) {
    if (keywords[index].checked || selectedKeyword <= LIMIT_KEYWORD_NUM) {
      const newKeywords = keywords.map((item) => {
        if (item.id === index+1) {
          return {
            ...item,
            checked: !item.checked,
          };
        } else {
          return item;
        }
      });
      setSelectedKeyword(selectedKeyword + (keywords[index].checked ? -1 : 1));
      setKeywords(newKeywords);

      const keywordIds = newKeywords
        .filter((item) => item.checked)
        .map((item) => item.id);

      setReview({
        ...review,
        keywords: keywordIds,
      });
      setIsAlert(false);
    } else {
      setAnimationKey(animationKey + 1);
      setIsAlert(true);
    }
  }

  return (
    <Container>
      <TitleText>방문 정보</TitleText>
      <ReservationInfo info={info} />

      <TitleText id="rate">
        별점
        {isRateAlert && (
          <StyledLottie key={animationKey} animationData={Alert} loop={false} />
        )}
      </TitleText>

      <ReviewStar rate={rate} handleRate={handleRate} />

      <TitleText id="keyword">
        리뷰 키워드
        <ConstraintsText alert={isAlert}>(필수 1개, 최대 5개)</ConstraintsText>
        {isAlert && (
          <StyledLottie key={animationKey} loop={false} animationData={Alert} />
        )}
      </TitleText>
      <ReviewKeywords keywords={keywords} handleChecked={handleChecked} />
    </Container>
  );
}

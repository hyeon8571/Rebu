import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewKeywordButton from "./ReviewKeywordButton";
import Lottie from "lottie-react";
import Alert from "../../assets/images/validationAlert.json";
import ButtonLarge from "../common/ButtonLarge";

const ShopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 4rem);
  color: white;
  border-radius: 0.75rem;
  padding : 1rem;
  margin : 1rem;

   @media (max-width: 768px) {
    padding :0.5rem;
    margin : 0.5rem;
    width: calc(100% - 2rem);
  }
  background-color: ${(props) => props.theme.value==="light" ? "#CFB5E9" : "#999999"};
 

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
  display: flex;
  font-size: 20px;
  margin-bottom: 0.2rem;
  font-weight: 600;
  align-items: center;
`;

const VisitDate = styled.div`
  color: gray;
  font-size: 14px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding : 1rem;
  @media (max-width: 768px) {
    padding :1rem;
  }
`;
const RateContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  width: 70%;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#F7F8FA" : "#B7B7B7"};
`;

const RateTextContainer = styled.div`
  display: flex;
  padding-top: 0.5rem;
  margin-left: 0.5rem;
`;

const RateTextWrapper = styled.div`
  margin-right: 0.3rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  border-radius: 0.3rem;
  vertical-align: middle;
  border: 2px solid
    ${(props) => (props.theme.value === "light" ? "gray" : "lightgray")};
`;

const ConstraintsText = styled.div`
  font-size: 14px;
  padding-left: 0.3rem;
  vertical-align: bottom;
`;

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

const StyledLottie = styled(Lottie)`
  padding-left: 0.5rem;
`;

const ButtonWrapper = styled.div`
  width: calc(100% - 1rem);
  display: flex;
  justify-content: end;
  padding-top: 3rem;
`;

const DesignerText = styled.div`
  color: ${(props) => props.theme.primary};
  font-weight: 600;
  margin-bottom: 0.1rem;
`;

const keywordList = [
  {
    id: 0,
    keyword: "원하는 스타일로 잘해줘요",
    imgURL: "style.png",
    checked: false,
  },
  {
    id: 1,
    keyword: "시술이 꼼꼼해요",
    imgURL: "ggomggom.png",
    checked: false,
  },
  {
    id: 2,
    keyword: "친절해요",
    imgURL: "kind.png",
    checked: false,
  },
  {
    id: 3,
    keyword: "디자인 추천을 잘해줘요",
    imgURL: "recommend.png",
    checked: false,
  },
  {
    id: 4,
    keyword: "디자인이 다양해요",
    imgURL: "design.png",
    checked: false,
  },
  {
    id: 5,
    keyword: "가격이 합리적이에요",
    imgURL: "price.png",
    checked: false,
  },
  {
    id: 6,
    keyword: "매장이 청결해요",
    imgURL: "clean.png",
    checked: false,
  },
  {
    id: 7,
    keyword: "상담이 자세해요",
    imgURL: "consult.png",
    checked: false,
  },
  {
    id: 8,
    keyword: "대화가 즐거워요",
    imgURL: "conversation.png",
    checked: false,
  },
  {
    id: 9,
    keyword: "맞춤케어를 잘해줘요",
    imgURL: "care.png",
    checked: false,
  },
];

function scrollUp() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

export default function PostReview1() {
  const [rate, setRate] = useState(0);
  const [selectedKeyword, setSelectedKeyword] = useState(0);
  const [keywords, setKeywords] = useState(keywordList);
  const [isAlert, setIsAlert] = useState(false);
  const [isRateAlert, setIsRateAlert] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const location = useLocation();
  const { info } = location.state;
  const navigate = useNavigate();

  const LIMIT_KEYWORD_NUM = 4;

  function checkProps() {
    if (selectedKeyword === 0) {
      setIsAlert(true);
      setAnimationKey(animationKey + 1);
      return;
    }
    if (rate === 0) {
      setIsRateAlert(true);
      setAnimationKey(animationKey + 1);
      setTimeout(() => scrollUp(), 100);

      return;
    }

    const idList = [];
    keywords.map((item) => {
      if (item.checked) {
        idList.push(item.id);
      }
    });

    navigate("/postrevw2", {
      state: {
        review: {
          rating: rate,
          reviewKeyworidlds: keywords.map((item) => {
            if (item.checked) {
              return item.id;
            }
          }),
        },
      },
    });

    // console.log({
    //   review: {
    //     rating: rate,
    //     reviewKeyworidlds: idList,
    //   },
    // });
  }
  function handleRate(rate) {
    setIsRateAlert(false);
    setRate(rate);
  }
  function handleChecked(index) {
    if (keywords[index].checked || selectedKeyword <= LIMIT_KEYWORD_NUM) {
      const newKeywords = keywords.map((item) => {
        if (item.id === index) {
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
      setIsAlert(false);
    } else {
      setAnimationKey(animationKey + 1);
      setIsAlert(true);
    }
  }

  return (
    <Container>
      <ShopInfoContainer>
        <ImgWrapper src={info.img}></ImgWrapper>
        <TitleText>{info.title}</TitleText>
        <DesignerText>{info.designer}</DesignerText>
        <VisitDate>방문 날짜 : {info.date}</VisitDate>
      </ShopInfoContainer>

      <TitleText>
        별점
        {isRateAlert && (
          <StyledLottie key={animationKey} animationData={Alert} loop={false} />
        )}
      </TitleText>
      <RateContainer>
        <ReactStars
          count={5}
          size={24}
          isHalf={true}
          value={rate}
          onChange={handleRate}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#943AEE"
        />
        <RateTextContainer>
          <RateTextWrapper>{rate === 0 ? "? " : rate}</RateTextWrapper> / 5
        </RateTextContainer>
      </RateContainer>
      <TitleText>
        리뷰 키워드
        <ConstraintsText alert={isAlert}>(필수 1개, 최대 5개)</ConstraintsText>
        {isAlert && (
          <StyledLottie key={animationKey} loop={false} animationData={Alert} />
        )}
      </TitleText>

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
      <ButtonWrapper>
        <ButtonLarge
          button={{
            id: 1,
            title: "다음",
            onClick: checkProps,
            highlight: true,
          }}
        ></ButtonLarge>
      </ButtonWrapper>
    </Container>
  );
}

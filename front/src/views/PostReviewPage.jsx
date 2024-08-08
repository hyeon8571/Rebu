import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostReview1 from "../components/review/PostReview1";
import PostReview2 from "../components/review/PostReview2";
import ButtonLarge from "../components/common/ButtonLarge";

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: end;
  width: 95%;
`;

function scrollUp(top) {
  window.scrollTo({
    top: top,
    left: 0,
    behavior: "smooth",
  });
}

export default function PostReview() {
  const [review, setReview] = useState({
    rate: 0,
    keywords: [],
    images: [],
    contents: "",
    hashTags: [],
  });
  const [isRateAlert, setIsRateAlert] = useState(false);
  const [isKeywordsAlert, setIsKeywordsAlert] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isImgAlert, setIsImgAlert] = useState(false);
  const location = useLocation();
  const { info } = location.state;
  const navigate = useNavigate();

  function ValidationReview() {
    const ratePosition =
      document.getElementById("rate").getBoundingClientRect().top + scrollY;
    const keywordPosition =
      document.getElementById("keyword").getBoundingClientRect().top + scrollY;
    const imgPosition =
      document.getElementById("img").getBoundingClientRect().top + scrollY;

    if (review.rate === 0) {
      setIsRateAlert(true);
      setAnimationKey(animationKey + 1);
      setTimeout(() => scrollUp(ratePosition), 100);
    }
    if (review.keywords.length === 0) {
      setIsKeywordsAlert(true);
      setAnimationKey(animationKey + 1);
      if (review.rate !== 0) {
        setTimeout(() => scrollUp(keywordPosition), 100);
      }
    }
    if (review.images.length === 0) {
      setIsImgAlert(true);
      setAnimationKey(animationKey + 1);
      if (review.rate !== 0 && review.keywords.length !== 0) {
        setTimeout(() => scrollUp(imgPosition), 100);
      }
    }
  }

  function handleSubmit() {
    ValidationReview();
    console.log(review);
  }

  return (
    <>
      <PostReview1
        isRateAlert={isRateAlert}
        setIsRateAlert={setIsRateAlert}
        setAnimationKey={setAnimationKey}
        isAlert={isKeywordsAlert}
        setIsAlert={setIsKeywordsAlert}
        info={info}
        animationKey={animationKey}
        review={review}
        setReview={setReview}
      />
      <PostReview2
        review={review}
        setReview={setReview}
        isImgAlert={isImgAlert}
        setIsImgAlert={setIsImgAlert}
        animationKey={animationKey}
      />
      <ButtonWrapper>
        <ButtonLarge
          button={{
            id: 1,
            title: "작성",
            onClick: () => {
              handleSubmit();
            },
            highlight: true,
          }}
        />
      </ButtonWrapper>
    </>
  );
}

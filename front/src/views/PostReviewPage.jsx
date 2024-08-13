import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostReview1 from "../components/review/PostReview1";
import PostReview2 from "../components/review/PostReview2";
import ButtonLarge from "../components/common/ButtonLarge";
import ModalPortal from "../util/ModalPortal";
import ModalNoBackNoExit from "../components/common/ModalNoBackNoExit";
import CheckReview from "../components/review/ModalCheckReview";
import axios from "axios";
import { BASE_URL } from "../util/commonFunction";
import { useSelector } from "react-redux";

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
  const location = useLocation();
  const { info } = location.state;
  const navigate = useNavigate();
  const [review, setReview] = useState({
    reservationId: info.reservationId,
    rating: 0,
    reviewKeywordIds: [],
    images: [],
    content: "",
    hashtags: [],
  });
  const [isRateAlert, setIsRateAlert] = useState(false);
  const [isKeywordsAlert, setIsKeywordsAlert] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isImgAlert, setIsImgAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isSubmitOk, setIsSubmitOk] = useState("");

  const { nickname, type, isLogin } = useSelector((state) => state.auth);
  function ValidationReview() {
    let Check = true;
    const ratePosition =
      document.getElementById("rate").getBoundingClientRect().top + scrollY;
    const keywordPosition =
      document.getElementById("keyword").getBoundingClientRect().top + scrollY;
    const imgPosition =
      document.getElementById("img").getBoundingClientRect().top + scrollY;

    if (review.rating === 0) {
      setIsRateAlert(true);
      setAnimationKey(animationKey + 1);
      setTimeout(() => scrollUp(ratePosition), 100);
      Check = false;
    }
    if (review.reviewKeywordIds.length === 0) {
      setIsKeywordsAlert(true);
      setAnimationKey(animationKey + 1);
      if (review.rating !== 0) {
        setTimeout(() => scrollUp(keywordPosition), 100);
      }
      Check = false;
    }
    if (review.images.length === 0) {
      setIsImgAlert(true);
      setAnimationKey(animationKey + 1);
      if (review.rating !== 0 && review.reviewKeywordIds.length !== 0) {
        setTimeout(() => scrollUp(imgPosition), 100);
      }
      Check = false;
    }
    if (Check) {
      setIsModalOpen(true);
    }
  }

  async function submitReview() {
    console.log(review);
    setSubmitLoading(true);
    setIsModalOpen(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feeds/reviews`,
        {
          images: review.images,
          reservationId: review.reservationId,
          reviewKeywordIds: review.reviewKeywordIds,
          rating: 5,
          content: review.content,
          hashtags: review.hashtags,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Access:
              "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsIm5pY2tuYW1lIjoicmVidTM5IiwidHlwZSI6IkNPTU1PTiIsImlhdCI6MTcyMzQ3ODQ5NSwiZXhwIjo5NzIzNDgwMjk1fQ.ca5yEAdzAFZ9SpB2xE1x5IUlfI9_wssEMbVFvANRBMQ",
          },
        }
      );
      if (response.data.body === 200) {
        console.log(response);
        // navigate("/somewhere");
        setIsModalOpen(true);
        setSubmitLoading(false);
        setIsSubmitOk("OK");
        return true;
      }
    } catch (error) {
      console.error("Error submitting the review:", error);
      setSubmitLoading(false);
      setIsSubmitOk("FAIL");
      return false;
    }
  }

  function handleSubmit() {
    ValidationReview();
    console.log(review);
  }

  return (
    <>
      <ModalPortal>
        <ModalNoBackNoExit isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <CheckReview
            setIsModalOpen={setIsModalOpen}
            submitReview={submitReview}
            setSubmitLoading={setSubmitLoading}
            setIsSubmitOk={setIsSubmitOk}
            isSubmitOk={isSubmitOk}
            uploaded={isSubmitOk}
          ></CheckReview>
        </ModalNoBackNoExit>
      </ModalPortal>
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

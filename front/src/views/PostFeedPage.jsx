import styled from "styled-components";
import { useState } from "react";
import ButtonLarge from "../components/common/ButtonLarge";
import PostFeed from "../components/PostFeed/PostFeed";
import axios from "axios";
import { BASE_URL } from "../util/commonFunction";
import ModalPortal from "../util/ModalPortal";
import ModalNoBackNoExit from "../components/common/ModalNoBackNoExit";
import CheckFeed from "../components/PostFeed/CheckFeed";

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

export default function PostFeedPage() {
  const [feed, setFeed] = useState({
    images: [],
    content: "",
    hashtags: [],
  });
  const [animationKey, setAnimationKey] = useState(0);
  const [isImgAlert, setIsImgAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isSubmitOk, setIsSubmitOk] = useState(false);

  async function submitFeed() {
    let endpointURL = "";
    if (localStorage.getItem("type") === "EMPLOYEE") {
      endpointURL = "/api/feeds/employee";
    } else if (localStorage.getItem("type") === "SHOP") {
      endpointURL = "/api/feeds/shop";
    }

    const formData = new FormData();
    formData.append("content", feed.content);
    formData.append("hashtags", feed.hashtags);

    // Assuming feed.images is an array of files
    feed.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    console.log(formData);

    try {
      const response = await axios.post(`${BASE_URL}${endpointURL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Access: `${localStorage.getItem("access")}`,
        },
      });

      console.log(response);
      setIsModalOpen(true);
      setSubmitLoading(false);
      setIsSubmitOk("OK");
    } catch (error) {
      console.error("Error submitting the Feed:", error);
      setSubmitLoading(false);
      setIsSubmitOk("FAIL");
      return false;
    }
  }

  function ValidationFeed() {
    const imgPosition =
      document.getElementById("img").getBoundingClientRect().top + scrollY;
    if (feed.images.length === 0) {
      setIsImgAlert(true);
      setAnimationKey(animationKey + 1);
      setTimeout(() => scrollUp(imgPosition), 100);
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (ValidationFeed()) {
      submitFeed();
    }
    console.log(feed);
  }
  return (
    <>
      <ModalPortal>
        <ModalNoBackNoExit isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <CheckFeed
            setIsModalOpen={setIsModalOpen}
            submitFeed={handleSubmit}
            setSubmitLoading={setSubmitLoading}
            setIsSubmitOk={setIsSubmitOk}
            isSubmitOk={isSubmitOk}
            uploaded={isSubmitOk}
          ></CheckFeed>
        </ModalNoBackNoExit>
      </ModalPortal>
      <PostFeed
        feed={feed}
        setFeed={setFeed}
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
              setIsModalOpen(true);
            },
            highlight: true,
          }}
        />
      </ButtonWrapper>
    </>
  );
}

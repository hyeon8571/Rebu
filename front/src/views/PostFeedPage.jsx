import styled from "styled-components";
import { useState } from "react";
import ButtonLarge from "../components/common/ButtonLarge";
import PostReview2 from "../components/review/PostReview2";
import PostFeed from "../components/PostFeed/PostFeed";

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
    contents: "",
    hashTags: [],
  });
  const [animationKey, setAnimationKey] = useState(0);
  const [isImgAlert, setIsImgAlert] = useState(false);

  function ValidationFeed() {
    const imgPosition =
      document.getElementById("img").getBoundingClientRect().top + scrollY;
    if (feed.images.length === 0) {
      setIsImgAlert(true);
      setAnimationKey(animationKey + 1);
      setTimeout(() => scrollUp(imgPosition), 100);
    }
  }

  function handleSubmit() {
    ValidationFeed();
    console.log(feed);
  }
  return (
    <>
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
              handleSubmit();
            },
            highlight: true,
          }}
        />
      </ButtonWrapper>
    </>
  );
}

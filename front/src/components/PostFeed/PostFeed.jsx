import styled from "styled-components";
import { useEffect, useState } from "react";
import AddHashTag from "../review/addHashTag";
import ImgUploader from "../review/ImgUploader";
import Lottie from "lottie-react";
import Alert from "../../assets/images/validationAlert.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (max-width: 768px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const TitleText = styled.div`
  display: flex;
  font-size: 20px;
  margin-top: 2rem;
  margin-bottom: 0.2rem;
  font-weight: 600;
  align-items: center;
`;

const RequestTextArea = styled.textarea`
  width: 80%;
  max-width: 500px;
  height: 240px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  justify-self: center;
  border-radius: 0.3rem;
  resize: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const StyledLottie = styled(Lottie)`
  padding-left: 0.5rem;
`;

const ConstraintText = styled.div`
  font-size: 16px;
  color: ${(props) => (props.theme.value === "light" ? "gray" : "lightgray")};
`;

const photoInRow = (width) => {
  if (width < 768) {
    return Math.floor((width - 16) / 128);
  } else return Math.floor((width - 32) / 408);
};

export default function PostFeed({
  animationKey,
  isImgAlert,
  setIsImgAlert,
  feed,
  setFeed,
}) {
  const [uploadImgUrls, setUploadImgUrls] = useState([]);
  const [imgNum, setImgNum] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hashTags, setHashTags] = useState([]);
  const [feedText, setFeedText] = useState("");

  const list = Array.from({
    length:
      photoInRow(windowWidth) -
      (imgNum % photoInRow(windowWidth)) -
      1 +
      (imgNum === 5 ? 1 : 0),
  });

  function handleReviewContent(e) {
    setFeedText(e.target.value);
    setFeed({
      ...feed,
      content: e.target.value,
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <TitleText id="img">
        사진 <ConstraintText>(최소 1장, 최대 5장)</ConstraintText>
        {isImgAlert && (
          <StyledLottie key={animationKey} animationData={Alert} loop={false} />
        )}
      </TitleText>
      <ImgUploader
        list={list}
        imgNum={imgNum}
        uploadImgUrls={uploadImgUrls}
        setImgNum={setImgNum}
        setUploadImgUrls={setUploadImgUrls}
        setIsImgAlert={setIsImgAlert}
        review={feed}
        setReview={setFeed}
      />
      <TitleText>게시글 내용</TitleText>
      <RequestTextArea
        placeholder="게시글을 작성해주세요"
        onChange={(e) => handleReviewContent(e)}
      />

      <TitleText>해시태그</TitleText>
      <AddHashTag
        review={feed}
        setReview={setFeed}
        hashTags={hashTags}
        setHashTags={setHashTags}
      />
    </Container>
  );
}

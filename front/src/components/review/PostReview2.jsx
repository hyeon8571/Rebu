import styled from "styled-components";
import { useEffect, useState } from "react";
import AddHashTag from "./addHashTag";
import ImgUploader from "./ImgUploader";

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

const ConstraintText = styled.div`
  font-size: 16px;
  color: ${(props) => (props.theme.value === "light" ? "gray" : "lightgray")};
`;

const photoInRow = (width) => {
  if (width < 768) {
    return Math.floor((width - 16) / 128);
  } else return Math.floor((width - 32) / 403);
};

export default function PostReview2() {
  const [uploadImgUrls, setUploadImgUrls] = useState([]);
  const [imgNum, setImgNum] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hashTags, setHashTags] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const list = Array.from({
    length:
      photoInRow(windowWidth) -
      (imgNum % photoInRow(windowWidth)) -
      1 +
      (imgNum === 5 ? 1 : 0),
  });

  console.log(photoInRow(windowWidth));

  console.log(windowWidth);
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
      <TitleText>
        사진 <ConstraintText>(최소 1장, 최대 5장)</ConstraintText>
      </TitleText>
      <ImgUploader
        list={list}
        imgNum={imgNum}
        uploadImgUrls={uploadImgUrls}
        setImgNum={setImgNum}
        setUploadImgUrls={setUploadImgUrls}
      />
      <TitleText>리뷰 내용</TitleText>
      <RequestTextArea
        placeholder="리뷰를 작성해주세요"
        onChange={(e) => setReviewText(e.target.value)}
      />

      <TitleText>해시태그</TitleText>
      <AddHashTag hashTags={hashTags} setHashTags={setHashTags} />
    </Container>
  );
}

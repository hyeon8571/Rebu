import styled from "styled-components";
import { useState } from "react";
import AddHashTag from "./addHashTag";

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
const ImgDisplayer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const UploadedImg = styled.img`
  width: 200px;
  height: 200px;
  border: 2px solid gray;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  @media (max-width: 768px) {
    width: 125px;
    height: 125px;
  }
`;

const ExampleImg = styled.img`
  width: 200px;
  height: 200px;
  border: 2px dotted black;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  @media (max-width: 768px) {
    width: 125px;
    height: 125px;
  }
`;

const InvisibleDiv = styled.div`
  width: 200px;
  height: 200px;
  @media (max-width: 768px) {
    width: 125px;
    height: 125px;
  }
`;

const InvisibleInput = styled.input`
  display: none;
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

export default function PostReview2() {
  const [uploadImgUrls, setUploadImgUrls] = useState([]);
  const [imgNum, setImgNum] = useState(0);

  const photoInRow = () => {
    if (window.width <= 768) {
      return Math.floor(screen.width / 125) - 1;
    } else return Math.floor(screen.width / 200) - 1;
  };

  console.log(photoInRow());

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFiles = Array.from(files);
    const newUrls = [];

    uploadFiles.forEach((uploadFile) => {
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        newUrls.push(reader.result);
        // 모든 파일이 다 읽힌 후 상태 업데이트
        if (newUrls.length === uploadFiles.length) {
          setUploadImgUrls((prevUrls) => [...prevUrls, ...newUrls]);
        }
      };
    });
  };

  return (
    <Container>
      <TitleText>사진</TitleText>
      <ImgDisplayer>
        {uploadImgUrls.map((url, index) => (
          <UploadedImg key={index} src={url} alt={`upload-${index}`} />
        ))}

        <label for="file">
          <ExampleImg src={process.env.PUBLIC_URL + "/addphoto.png"} />
        </label>
        <InvisibleDiv></InvisibleDiv>
        <InvisibleDiv></InvisibleDiv>
        <InvisibleDiv></InvisibleDiv>
        <InvisibleInput
          type="file"
          multiple
          id="file"
          onChange={onchangeImageUpload}
        />
      </ImgDisplayer>

      <TitleText>리뷰 내용</TitleText>
      <RequestTextArea placeholder="리뷰를 작성해주세요"/>
      <TitleText>해시 태그</TitleText>
      <AddHashTag/>
    </Container>
  );
}

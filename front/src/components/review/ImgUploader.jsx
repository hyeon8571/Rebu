import styled from "styled-components";
import { MdCancel } from "react-icons/md";

const ImgDisplayer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ImgWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  &:hover svg {
    display: block;
  }
`;

const UploadedImg = styled.img`
  width: 200px;
  height: 200px;
  border: 2px solid gray;
  border-radius: 1rem;
  background-size: contain;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  @media (max-width: 768px) {
    width: 125px;
    height: 125px;
  }

  &:hover {
    opacity: 0.33;
  }
`;

const ExampleImg = styled.img`
  width: 200px;
  height: 200px;
  border: 2px dotted black;
  border-radius: 1rem;
  background-color: white;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  @media (max-width: 768px) {
    width: 125px;
    height: 125px;
  }
`;

const InvisibleDiv = styled.div`
  width: 204px;
  height: 204px;
  @media (max-width: 768px) {
    width: 128px;
    height: 128px;
  }
`;

const InvisibleInput = styled.input`
  display: none;
`;

const DelIcon = styled(MdCancel)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(85, 85, 85, 0.8);
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: none;
`;

export default function ImgUploader({
  list,
  imgNum,
  uploadImgUrls,
  setUploadImgUrls,
  setImgNum,
  setIsImgAlert,
  review,
  setReview,
}) {
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
          const allUrls = [...uploadImgUrls, ...newUrls];
          setUploadImgUrls(allUrls);
          setReview({
            ...review,
            images: allUrls,
          });
        }
      };
    });
    setIsImgAlert(false);
    setImgNum(imgNum + uploadFiles.length);
  };

  const handleDelete = (index) => {
    const newUrls = uploadImgUrls.filter((_, i) => i !== index);
    setUploadImgUrls(newUrls);
    setReview({
      ...review,
      images: newUrls,
    });
    setImgNum(imgNum - 1);
  };

  return (
    <ImgDisplayer>
      {uploadImgUrls.map((url, index) => (
        <ImgWrapper key={index} onClick={() => handleDelete(index)}>
          <UploadedImg src={url} alt={`upload-${index}`} />
          <DelIcon size={24} />
        </ImgWrapper>
      ))}

      {imgNum < 5 && (
        <label htmlFor="file">
          <ExampleImg src={process.env.PUBLIC_URL + "/addphoto.png"} />
        </label>
      )}

      {list.map(() => {
        return <InvisibleDiv />;
      })}
      <InvisibleInput
        type="file"
        multiple
        id="file"
        accept="image/*"
        onChange={onchangeImageUpload}
      />
    </ImgDisplayer>
  );
}

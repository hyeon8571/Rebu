import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectComponent from "./../components/AddMenu/MenuSelectBox";
import ButtonLarge from "../components/common/ButtonLarge";
import Lottie from "lottie-react";
import validationAlert from "../assets/images/validationAlert.json";
import ModalPortal from "../util/ModalPortal";
import ModalNoBackNoExit from "../components/common/ModalNoBackNoExit";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonSmall from "../components/common/ButtonSmall";
import confirmLottie from "../assets/images/confirmLottie.json";
import Header from "../components/common/Header";
import ImgUploader from "../components/common/MultipleImgUploader";
import axios from "axios";
import { BASE_URL } from "../util/commonFunction";

// 공통 스타일 분리
const StyledInputBox = styled.input`
  border: 1px solid #000;
  border-radius: 0.3rem;
  height: 30px;
  padding: 0 20px;
  box-sizing: border-box;
  width: 40vw;
  max-width: 420px;
  min-width: 240px;
  display: flex;
`;

const InstructionInputBox = styled(StyledInputBox).attrs({ as: "textarea" })`
  height: 100px;
  resize: none;
  &::placeholder {
    padding-top: 0.5rem;
  }
`;

const ValidationText = styled.div`
  padding-left: 0.2rem;
  padding-top: 0.2rem;
  font-size: 14px;
  color: red;
  opacity: 0.8;
`;

const TitleText = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Left align items */
  width: 40vw;
  max-width: 420px;
  min-width: 240px;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  display: flex;
  @media (max-width: 768px) {
    padding-top: 3rem;
  }
  padding-top: 4rem;
  flex-direction: column;
  align-items: center;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 1.5rem;
`;

const ImgWrapper = styled.img`
  border: 2px solid
    ${(props) => (props.theme.value === "light" ? "black" : "white")};
  width: 200px;
  height: 200px;
  max-width: 200px;
  border-radius: 1rem;
`;

const NumberInput = styled.input`
  border: 1px solid #000;
  border-radius: 3px;
  height: 30px;
  padding: 0 20px;
  box-sizing: border-box;
  width: 25vw;
  max-width: 420px;
  min-width: 240px;
  display: flex;
  &::placeholder {
    text-align: end;
  }
  &:focus + .placeholder,
  &:not(:placeholder-shown) + .placeholder {
    display: block;
  }
`;

const ErrorText = styled.div`
  color: #ff7777;
  font-weight: 550;
  margin-bottom: 1rem;
  white-space: pre-line; /* 추가된 스타일 */
`;

const ErrorMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const DescriptionContainer = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 1rem;
  text-align: center;
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MenuData = {};

export default function AddMenu() {
  const location = useLocation();
  const { categories, originMenu } = location.state || {};
  const [category, setCategory] = useState(
    originMenu ? originMenu.category : ""
  );
  const [name, setName] = useState(originMenu ? originMenu.title : "");
  const [description, setDescription] = useState(
    originMenu ? originMenu.content : ""
  );
  const [time, setTime] = useState(originMenu ? originMenu.timeTaken : "");
  const [cost, setCost] = useState(originMenu ? originMenu.price : "");
  const [uploadImgUrls, setUploadImgUrls] = useState(
    originMenu ? originMenu.images : []
  );
  const [errors, setErrors] = useState({});
  const [animationKey, setAnimationKey] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitOk, setIsSubmitOk] = useState("FAIL");

  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("type") === "COMMON" ||
      localStorage.getItem("type") === "SHOP"
    ) {
      alert("접근 권한이 없습니다.");
      navigate(-1);
    }
  }, []);

  async function submitEditMenu() {
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/menus${originMenu.id}`,
        {
          category: category,
          title: name,
          content: description,
          timeTaken: Number(time),
          price: Number(cost),
          images: uploadImgUrls,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Access: `${localStorage.getItem("access")}`,
          },
        }
      );
      if (response.data.code && response.data.code.startsWith("1")) {
        console.log(response);
        setIsModalOpen(true);
        setIsSubmitOk("OK");
        return true;
      }
    } catch (error) {
      console.error("Error editting the menu:", error);
      setTimeout(() => {
        setIsSubmitOk("FAIL");
      }, 100);
      return false;
    }
  }

  async function submitAddMenu() {
    console.log({
      category: category,
      title: name,
      content: description,
      timeTaken: Number(time),
      price: Number(cost),
      images: uploadImgUrls,
    });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/menus`,
        {
          category: category,
          title: name,
          content: description,
          timeTaken: Number(time),
          price: Number(cost),
          images: uploadImgUrls,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Access: `${localStorage.getItem("access")}`,
          },
        }
      );

      if (response.data.code && response.data.code.startsWith("1")) {
        console.log(response);
        setIsModalOpen(true);
        setIsSubmitOk("OK");
        return true;
      }
      console.log(response);
    } catch (error) {
      console.error("Error editting the menu:", error);
      setIsSubmitOk("FAIL");
      return false;
    }
  }

  const IMG_URL = process.env.PUBLIC_URL;

  const handleNumberInput = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/\D/g, "");
    }
    return value;
  };

  const handleSubmit = () => {
    const newErrors = {};
    const timeValue = Number(time);
    const costValue = Number(cost);

    if (!category) newErrors.category = "시술 분류를 선택해주세요";
    if (!name) newErrors.name = "시술명을 입력해주세요";
    if (!description) newErrors.description = "시술설명을 입력해주세요";
    if (!time) newErrors.time = "시술 시간을 입력해주세요";
    if (time && (isNaN(timeValue) || timeValue <= 0 || timeValue > 360))
      newErrors.time = "시술 시간은 0보다 크고 360분 이하이어야 합니다";
    if (!cost) newErrors.cost = "시술 비용을 입력해주세요";
    if (cost && (isNaN(costValue) || costValue <= 0))
      newErrors.cost = "시술 비용은 0보다 커야 합니다";
    if (!uploadImgUrls) newErrors.uploadImgUrl = "사진을 업로드해주세요";

    if (Object.keys(newErrors).length > 0) {
      console.log("??");
      setAnimationKey(animationKey + 1);
      setErrors(newErrors);
      setIsError(true);
    } else {
      setIsError(false);
      setIsModalOpen(true);
      if (originMenu) {
        submitEditMenu();
      } else {
        submitAddMenu();
      }
      // formData 객체를 이용하여 필요한 작업 수행
      setErrors({});
    }
  };

  return (
    <div style={{ padding: "0", margin: "0" }}>
      <Header title={originMenu ? "시술수정" : "시술추가"}></Header>
      <Container>
        <ModalPortal>
          <ModalNoBackNoExit isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
            <ModalContentContainer>
              <DescriptionContainer>
                {" "}
                {originMenu
                  ? "시술이 수정되었습니다."
                  : "시술이 추가되었습니다."}
              </DescriptionContainer>
              {isSubmitOk === "OK" && (
                <Lottie
                  loop={false}
                  autoPlay={true}
                  style={{ width: "100px" }}
                  animationData={confirmLottie}
                ></Lottie>
              )}
              <ButtonSmall
                button={{
                  id: 1,
                  title: "확인",
                  onClick: () => {
                    setIsModalOpen(false);
                  },
                  highlight: true,
                }}
              ></ButtonSmall>
            </ModalContentContainer>
          </ModalNoBackNoExit>
        </ModalPortal>
        <InputWrapper>
          <TitleText>시술분류</TitleText>
          <SelectComponent
            options={categories}
            setCategory={setCategory}
            category={category}
          />
          {errors.category && (
            <ValidationText>{errors.category}</ValidationText>
          )}
        </InputWrapper>
        <InputWrapper>
          <TitleText>시술명</TitleText>
          <StyledInputBox
            value={name}
            placeholder="시술명"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <ValidationText>{errors.name}</ValidationText>}
        </InputWrapper>
        <InputWrapper>
          <TitleText>시술설명</TitleText>
          <InstructionInputBox
            value={description}
            placeholder="시술설명"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <ValidationText>{errors.description}</ValidationText>
          )}
        </InputWrapper>
        <InputWrapper>
          <TitleText>시술시간</TitleText>
          <NumberInput
            value={time}
            placeholder="(분)"
            onChange={(e) => setTime(handleNumberInput(e))}
          />
          {errors.time && <ValidationText>{errors.time}</ValidationText>}
        </InputWrapper>
        <InputWrapper>
          <TitleText>시술 비용</TitleText>
          <NumberInput
            value={cost}
            placeholder="(원)"
            onChange={(e) => setCost(handleNumberInput(e))}
          />
          {errors.cost && <ValidationText>{errors.cost}</ValidationText>}
        </InputWrapper>
        <InputWrapper>
          <TitleText style={{ paddingTop: "1rem" }}>사진 업로드</TitleText>
          <ImgUploader
            uploadImgUrls={uploadImgUrls}
            setUploadImgUrls={setUploadImgUrls}
            imgLimit={1}
          ></ImgUploader>
        </InputWrapper>
        {isError && (
          <ErrorMsgContainer>
            <Lottie
              key={animationKey}
              loop={false}
              animationData={validationAlert}
            ></Lottie>
            <ErrorText>입력 항목을 확인해주세요</ErrorText>
          </ErrorMsgContainer>
        )}

        <SubmitButtonWrapper>
          <ButtonLarge
            button={{
              title: "메뉴 생성",
              onClick: handleSubmit,
              highlight: true,
            }}
          />
        </SubmitButtonWrapper>
      </Container>
    </div>
  );
}

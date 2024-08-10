import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosClose } from "react-icons/io";
import ModalPortal from "../../util/ModalPortal";
import ModalNoBackNoExit from "../../components/common/ModalNoBackNoExit";
import SelectComponent from "../../components/AddMenu/MenuSelectBox";
import ButtonLarge from "../../components/common/ButtonLarge";
import Lottie from "lottie-react";
import validationAlert from "../../assets/images/validationAlert.json";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonSmall from "../../components/common/ButtonSmall";
import confirmLottie from "../../assets/images/confirmLottie.json";
import ImgUploader from "../../components/common/MultipleImgUploader";

const ModalOverlay = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  align-items: center;
`;

const CloseButton = styled(IoIosClose)`
  background: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: #943AEE;
  }
`;

const ModalContent = styled.div`
  overflow-y: auto;
  background-color: ${(props) =>
    props.theme.value === "light" ? '#ffffff' : '#e5e5e5'};
  border-radius: 8px;
  padding: 10px 20px;
  width: 350px;
  /* height: 700px; */
  @media (max-width: 375px) {
    /* height: 550px; */
  }
  max-width: 80%;
`;

const HeaderText = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin: 10px 15px;
  @media (max-width: 375px) {
    font-size: 17px;
  }
`;

const Content = styled.div`
  margin: 10px auto;
  width: 90%;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  /* height: 700px; */
  @media (max-width: 375px) {
    /* height: 450px; */
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #bcbcbc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fbf8fe" : props.theme.secondary};
`;

const StyledInputBox = styled.input`
  border: 1px solid #000;
  border-radius: 0.3rem;
  height: 30px;
  padding: 0 20px;
  box-sizing: border-box;
  width: 20vw;
  max-width: 420px;
  min-width: 240px;
  display: flex;
`;

const InstructionInputBox = styled(StyledInputBox).attrs({ as: "textarea" })`
  display: flex;
  max-width: 420px;
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
  width: 20vw;
  max-width: 420px;
  min-width: 240px;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem;
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
  width: 20vw;
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

const AddMenuModal = ({addMenuModalOpen, closeModal}) => {
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

  const navigate = useNavigate();

  const IMG_URL = process.env.PUBLIC_URL;


  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };
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
    if (!uploadImgUrl) newErrors.uploadImgUrl = "사진을 업로드해주세요";

    if (Object.keys(newErrors).length > 0) {
      setAnimationKey(animationKey + 1);
      setErrors(newErrors);
      setIsError(true);
    } else {
      setIsError(false);
      setIsModalOpen(true);
      const formData = {
        category,
        name,
        description,
        time: timeValue,
        cost: costValue,
        uploadImgUrl,
      };
      console.log(formData);
      // formData 객체를 이용하여 필요한 작업 수행
      setErrors({});
    }
  };


  return (
    <ModalOverlay>
    {addMenuModalOpen && (
      <ModalContent>
        <ModalHeader>
          <HeaderText title={originMenu ? "시술수정" : "시술추가"}></HeaderText>
          <CloseButton onClick={closeModal} />
        </ModalHeader>

        <Content>
        <ModalPortal>
          <ModalNoBackNoExit isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
            <ModalContentContainer>
              <DescriptionContainer>
                {" "}
                {originMenu
                  ? "시술이 수정되었습니다."
                  : "시술이 추가되었습니다."}
              </DescriptionContainer>
              {isModalOpen && (
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
          <ButtonSmall
            button={{
              title: "메뉴 생성",
              onClick: handleSubmit,
              highlight: true,
            }}
          />
        </SubmitButtonWrapper>
        </Content>
      </ModalContent>
    )}
    </ModalOverlay>
  )
};

export default AddMenuModal;
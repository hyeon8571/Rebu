import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  max-width: 768px;
  margin: 0px auto;
  margin-bottom: 70px;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fff" : props.theme.body};
  border-radius: 8px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fff" : props.theme.body};
`;

const HeaderText = styled.p`
  font-size: 18px;
  margin-left: 15px;
  margin-bottom: 10px;
  @media (max-width: 375px) {
    font-size: 17px;
  }
`;

const BackButton = styled(FiChevronLeft)`
  width: 24px;
  height: 24px;
  margin-top: 10px;
  cursor: pointer;
`;

const Content = styled.div`
  margin: 30px auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  border-radius: 8px;
  border: 1px solid #bcbcbc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.theme.value === "light" ? "#fbf8fe" : props.theme.secondary};
`;

const DateModify = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
  margin-top: 10px;
  margin-left: 25px;
  align-self: flex-start;
  @media (max-width: 475px) {
    font-size: 16px;
  }
`;

const TitleContent = styled.h3`
  margin-bottom: 10px;
  margin-left: 10%;
  align-self: flex-start;
  @media (max-width: 475px) {
    font-size: 17px;
  }
`;

const ImgBox = styled.img`
  width: 75%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
  border: ${(props) =>
    props.theme.value === "light" ? "1px solid #fff" : "1px solid #4c4c4c"};
`;

const TextArea = styled.textarea`
  width: 75%;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  border: ${(props) =>
    props.theme.value === "light" ? "1px solid #ccc" : "1px solid #4c4c4c"};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 85%;
`;

const Button = styled.button`
  width: 40%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  @media (max-width: 475px) {
    font-size: 13px;
  }
`;

const CancelButton = styled(Button)`
  background: #cccccc;
  color: black;
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background: #943AEE;
  color: white;
  cursor: pointer;
`;


const PostModify = () => {
  const location = useLocation();
  const item = location.state.item
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const [content, setContent] = useState(item.content);

  const handleBackClick = () => {
    window.history.back();  // 뒤로 가기
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCancelClick = () => {
    window.history.back();  // 취소 버튼도 뒤로 가기
  };

  const handleSaveClick = () => {
    // 수정된 내용 저장 로직
    const updatedPost = {
      ...item,
      content: content,
      modifiedDate: today
    };
    console.log(updatedPost);
    
    //서버에 수정된 데이터 전송
  };

  useEffect(() => {
    // 여기서 게시글 데이터를 받아오는 API 호출 로직 추가 가능
  }, []);


  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick} />
        <HeaderText>게시글 수정</HeaderText>
      </Header>
      <Content>
        <DateModify>수정날짜 : {formattedDate}</DateModify>
        <TitleContent>사진</TitleContent>
        <ImgBox src={item.img} alt="img"/>
        <TitleContent>내용</TitleContent>
        <TextArea value={content} onChange={handleContentChange} />
        <ButtonContainer>
          <CancelButton onClick={handleCancelClick}>취소</CancelButton>
          <SaveButton onClick={handleSaveClick}>수정 완료</SaveButton>
        </ButtonContainer>
      </Content>
    </Container>
  )
};

export default PostModify;
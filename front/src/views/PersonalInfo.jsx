import React from 'react';
import styled from 'styled-components';
import { FiChevronLeft } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  max-width: 768px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* margin-top: 20px; */
`;

const HeaderText = styled.p`
  font-size: 20px;
  margin-left: 15px;
`;

const BackButton = styled(FiChevronLeft)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 5px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;

const UserRole = styled.span`
  background-color: #e0e0e0;
  border-radius: 15px;
  padding: 5px 10px;
  margin-top: 10px;
  color: #333;
`;

const Form = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #bcbcbc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


const Label = styled.p`
  flex: 1;
  font-weight: bold;
`;

const Input = styled.input`
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const EditButton = styled.button`
  background-color: #943AEE;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #943AEE;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const PersonalInfo = () => {
  const handleBackClick = () => {
    window.history.back();  // 뒤로 가기
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackClick} />
        <HeaderText>개인정보 확인</HeaderText>
      </Header>
      <ProfileImage src="https://via.placeholder.com/100" alt="Profile" />
      <UserInfo>
        <UserRole>일반 사용자</UserRole>
      </UserInfo>
      <Form>
       
          <Label>닉네임</Label>
          <Input type="text" value="Lee_Yu_Seung" readOnly />
          <EditButton>수정</EditButton>
       
          <br />
          <Label>이메일</Label>
          <Input type="email" value="lee_yu_seung@gmail.com" readOnly />
       
          <br />
          <Label>생년월일</Label>
          <Input type="text" value="1999.9.9" readOnly />
     
          <br />
          <Label>전화번호</Label>
          <Input type="text" value="010-0000-0000" readOnly />
          <EditButton>수정</EditButton>
     
          <br />
          <Label>성별</Label>
          <Input type="text" value="남" readOnly />
   
      </Form>
      <DeleteButton>회원탈퇴</DeleteButton>
    </Container>
  );
};

export default PersonalInfo;

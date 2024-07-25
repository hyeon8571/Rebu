import React from 'react';
import styled from 'styled-components';
import { FiChevronLeft } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 760px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
  margin-top: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const UserRole = styled.span`
  background-color: #e0e0e0;
  border-radius: 15px;
  padding: 5px 10px;
  margin-top: 10px;
  color: #333;
`;

const Form = styled.form`
  width: 100%;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  flex: 1;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
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
      </Header>
      <ProfileImage src="https://via.placeholder.com/100" alt="Profile" />
      <UserInfo>
        <UserRole>일반 사용자</UserRole>
      </UserInfo>
      <Form>
        <FormGroup>
          <Label>닉네임</Label>
          <Input type="text" value="Lee_Yu_Seung" readOnly />
          <EditButton>수정</EditButton>
        </FormGroup>
        <FormGroup>
          <Label>이메일</Label>
          <Input type="email" value="lee_yu_seung@gmail.com" readOnly />
        </FormGroup>
        <FormGroup>
          <Label>생년월일</Label>
          <Input type="text" value="1999.9.9" readOnly />
        </FormGroup>
        <FormGroup>
          <Label>전화번호</Label>
          <Input type="text" value="010-0000-0000" readOnly />
          <EditButton>수정</EditButton>
        </FormGroup>
        <FormGroup>
          <Label>성별</Label>
          <Input type="text" value="남" readOnly />
        </FormGroup>
      </Form>
      <DeleteButton>회원탈퇴</DeleteButton>
    </Container>
  );
};

export default PersonalInfo;

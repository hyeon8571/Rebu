import React, { useState } from 'react';
import styled from 'styled-components';

const InputBoxContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const UserAvatar = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const InputBox = ({ onSend, loginUser }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <InputBoxContainer>
      <UserAvatar>
        <img src={loginUser.imgsrc} alt={loginUser.username} />
      </UserAvatar>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메세지를 입력하세요"
      />
      <Button onClick={handleSend}>Send</Button>
    </InputBoxContainer>
  );
};

export default InputBox;

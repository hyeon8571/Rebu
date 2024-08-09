import React, { useState } from 'react';
import styled from 'styled-components';
import ChatMessage from '../chat/ChatMessage';
import InputBox from '../chat/ChatInput';

const ChatWindowContainer = styled.div`
  width: 400px;
  height: 600px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: scroll;
`;

const ChatWindow = ({ loginUser, chatUser, currentUser }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    const newMessage = { id: messages.length + 1, user: loginUser.nickname, text: message, isSent: true, imgsrc: currentUser.imageSrc };
    setMessages([...messages, newMessage]);
  };

  return (
    <ChatWindowContainer>
      <MessagesContainer>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} chatUser={chatUser} />
        ))}
      </MessagesContainer>
      <InputBox onSend={sendMessage} loginUser={currentUser} />
    </ChatWindowContainer>
  );
};

export default ChatWindow;

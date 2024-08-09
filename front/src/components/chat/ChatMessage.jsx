import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: ${({ isSent }) => (isSent ? 'flex-end' : 'flex-start')};
`;

const UserAvatar = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const MessageContent = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: #f1f1f1;
  
  img {
    max-width: 100%;
    border-radius: 10px;
  }
`;

const ChatMessage = ({ message, chatUser }) => {
  const isSent = message.isSent;
  const avatarSrc = chatUser.imageSrc;

  return (
    <MessageContainer isSent={isSent}>
      <UserAvatar>
        <img src={avatarSrc} alt={message.user} />
      </UserAvatar>
      <MessageContent>
        {message.image && <img src={message.image} alt="message attachment" />}
        <p>{message.text}</p>
      </MessageContent>
    </MessageContainer>
  );
};

export default ChatMessage;

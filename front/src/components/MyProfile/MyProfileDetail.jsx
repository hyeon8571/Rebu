import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegComment, FaStar } from "react-icons/fa";


const PostWrapper = styled.div`
  background-color: ${(props) => (props.theme.value === "light" ? "#ffffff" : props.theme.body)};
  width: 100%;
  max-width: 600px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: bold;
`;

const Location = styled.span`
  color: #8e8e8e;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ActionIcon = styled.div`
  margin-right: 15px;
  font-size: 1.2em;
`;

const Likes = styled.div`
  padding: 0 10px;
  font-weight: bold;
`;

const PostDescription = styled.div`
  padding: 0 10px;
  margin-bottom: 10px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #ffcc00;
`;

const PostDetail = ({photo}) => {
  return (
    <PostWrapper>
      <PostHeader>
        <ProfileImage src={photo} alt="Profile" />
        <ProfileDetails>
          <Username>Cha_cha</Username>
          <Location>싸피 네일</Location>
        </ProfileDetails>
      </PostHeader>
      <PostImage src={photo} alt="Post" />
      <PostActions>
        <ActionIcon><FaHeart /></ActionIcon>
        <ActionIcon><FaRegComment /></ActionIcon>
      </PostActions>
      <Likes>좋아요 100개</Likes>
      <PostDescription>남자 네일 케어는 싸피 네일에서!</PostDescription>
      <Rating>
        <FaStar />
        4.75
      </Rating>
    </PostWrapper>
  );
};

export default PostDetail;

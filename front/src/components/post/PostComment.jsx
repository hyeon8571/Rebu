import React, { useState } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart, FaArrowRight, FaTrashAlt } from "react-icons/fa";

const CommentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  justify-content: space-between;
`;

const CommentUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentHeader = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const CommnetDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const CommentUsername = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => (props.theme.value === "light" ? "#555555" : "#cccccc")};
  margin-bottom: 2px;
`;

const CommentContent = styled.span`
  color: ${(props) => (props.theme.value === "light" ? "#000" : "#e5e5e5")};
  font-size: 14px;
`;

const CommentTime = styled.span`
  color: ${(props) => (props.theme.value === "light" ? "#8e8e8e" : "#cccccc")};
  font-size: 11px;
  margin-left: 10px;
  margin-top: 2px;
`;

const ReplyLink = styled.span`
  color: #a961f1;
  cursor: pointer;
  font-size: 12px;
  margin-top: 5px;
  margin-right: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CommentImage = styled.img`
  width: 40px;
  height: 40px;
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentTextInput = styled.input`
  display: flex;
  padding: 10px 15px;
  border: 2px solid #d1a6f7;
  width: calc(100% - 50px);
  height: 17px;
  @media (max-width: 768px) {
    height: 12px;
  }
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  box-shadow: 0 0 10px rgba(209, 166, 247, 0.5);
  transition: all 0.3s ease;
  &:focus {
    border-color: #b475f3;
    box-shadow: 0 0 15px rgba(186, 126, 250, 0.7);
  }
`;

const NewCommentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  width: 40px;
  height: 40px;
  background-color: #ba7efa;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(186, 126, 250, 0.5);
  transition: all 0.3s ease;
  &:hover {
    background-color: #b475f3;
    box-shadow: 0 0 15px rgba(159, 99, 219, 0.7);
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #999999;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: #ff1a1a;
  }
`;

const LikeButton = styled.button`
  background: none;
  color: ${(props) => (props.theme.value === "light" ? "#717171" : "#cccccc")};
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 0px;
  &:hover {
    color: #ff4d4d;
  }
`;

const LikeCount = styled.p`
  color: ${(props) => (props.theme.value === "light" ? "#8e8e8e" : "#cccccc")};
  margin-top: 0;
  margin-bottom: 0;
  text-align: end;
  margin-right: 10px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const timeSince = (date) => {
  const milliSeconds = new Date() - date;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

const PostComment = ({ comment, information, posts, setPosts, currentUser, index }) => {
  const [newComments, setNewComments] = useState(
    Array(information.length).fill("")
  );
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [replies, setReplies] = useState({});
  const [likes, setLikes] = useState({});

  const handleNewCommentChange = (index, value) => {
    const updatedNewComments = [...newComments];
    updatedNewComments[index] = value;
    setNewComments(updatedNewComments);
  };

  const handleReplyChange = (commentId, value) => {
    setReplies({
      ...replies,
      [commentId]: value,
    });
  };

  const handleAddComment = (index) => {
    const updatedPosts = [...posts];
    const newComment = {
      id: new Date().getTime(), // Unique ID for each comment
      nickname: currentUser.nickname,
      content: newComments[index],
      createAt: new Date().toISOString(),
      imageSrc: currentUser.imageSrc, // Assuming currentUser has an img property
      likes: 0,
    };
    updatedPosts[index].comment.push(newComment);
    setPosts(updatedPosts);

    // Reset the new comment input
    const updatedNewComments = [...newComments];
    updatedNewComments[index] = "";
    setNewComments(updatedNewComments);
  };

  const handleAddReply = (postIndex, commentId) => {
    const updatedPosts = [...posts];
    const newReply = {
      id: new Date().getTime(), // Unique ID for each reply
      writer: currentUser.name,
      content: replies[commentId] || "",
      created_at: new Date().toISOString(),
      img: currentUser.imageSrc, // Assuming currentUser has an img property
      likes: 0,
    };

    const commentIndex = updatedPosts[postIndex].comment.findIndex(
      (comment) => comment.id === commentId
    );

    if (commentIndex >= 0) {
      updatedPosts[postIndex].comment[commentIndex].replies =
        updatedPosts[postIndex].comment[commentIndex].replies || [];
      updatedPosts[postIndex].comment[commentIndex].replies.push(newReply);
    }

    setPosts(updatedPosts);
    setReplies({
      ...replies,
      [commentId]: "",
    });
    setReplyingTo(null);
  };

  const handleDeleteComment = (postIndex, commentIndex) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comment.splice(commentIndex, 1);
    setPosts(updatedPosts);
  };

  const handleDeleteReply = (postIndex, commentIndex, replyIndex) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].comment[commentIndex].replies.splice(replyIndex, 1);
    setPosts(updatedPosts);
  };

  const handleReplyToggle = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleShowRepliesToggle = (commentId) => {
    setShowReplies({
      ...showReplies,
      [commentId]: !showReplies[commentId],
    });
  };

  const handleLikeToggle = (
    postIndex,
    commentIndex,
    isReply = false,
    replyIndex = null
  ) => {
    const updatedPosts = [...posts];
    if (isReply && replyIndex !== null) {
      const reply =
        updatedPosts[postIndex].comment[commentIndex].replies[replyIndex];
      reply.likes = (reply.likes || 0) + (likes[reply.id] ? -1 : 1);
      setLikes({
        ...likes,
        [reply.id]: !likes[reply.id],
      });
    } else {
      const comment = updatedPosts[postIndex].comment[commentIndex];
      comment.likes = (comment.likes || 0) + (likes[comment.id] ? -1 : 1);
      setLikes({
        ...likes,
        [comment.id]: !likes[comment.id],
      });
    }
    setPosts(updatedPosts);
  };

  const handleKeyPress = (e, index, type = "comment", commentId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "comment") {
        handleAddComment(index);
      } else if (type === "reply") {
        handleAddReply(index, commentId);
      }
    }
  };

  return (
    <>
      {comment.map((comment, idx) => (
        <div key={idx}>
          <CommentItem>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CommentUserImage src={comment.comment.imageSrc} alt="User" />
              <CommnetDetails>
                <CommentHeader>
                  <CommentUsername>{comment.comment.nickname}</CommentUsername>
                  <CommentTime>
                    {timeSince(new Date(comment.comment.createAt))}
                  </CommentTime>
                </CommentHeader>
                <CommentContent>{comment.comment.content}</CommentContent>
                <div style={{ display: "flex" }}>
                  <ReplyLink onClick={() => handleShowRepliesToggle(comment.comment.id)}>
                    {showReplies[comment.comment.id] ? "답글숨기기" : "답글보기"}
                  </ReplyLink> &nbsp;&nbsp;
                  <ReplyLink onClick={() => handleReplyToggle(comment.comment.id)}>
                    답글달기
                  </ReplyLink>
                </div>
              </CommnetDetails>
            </div>
            <div>
              {comment.comment.nickname === currentUser.nickname && (
                <DeleteButton onClick={() => handleDeleteComment(index, idx)}>
                  <FaTrashAlt />
                </DeleteButton>
              )}
              <LikeButton onClick={() => handleLikeToggle(index, idx)}>
                {likes[comment.comment.id] ? <FaHeart color="red" /> : <FaRegHeart />}
              </LikeButton>
              {comment.comment.likeCount > 0 && <LikeCount>{comment.comment.likeCount}</LikeCount>}
            </div>
          </CommentItem>

          {showReplies[comment.comment.id] &&
            comment.commentNested &&
            comment.commentNested.map((reply, replyIdx) => (
              <CommentItem key={replyIdx} style={{ marginLeft: "40px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CommentUserImage src={reply.imageSrc} alt="User" />
                  <CommnetDetails>
                    <CommentHeader>
                      <CommentUsername>{reply.nickname}</CommentUsername>
                      <CommentTime>
                        {timeSince(new Date(reply.createAt))}
                      </CommentTime>
                    </CommentHeader>
                    <CommentContent>{reply.content}</CommentContent>
                  </CommnetDetails>
                </div>
                <div>
                  {reply.nickname === currentUser.nickname && (
                    <DeleteButton
                      onClick={() => handleDeleteReply(index, idx, replyIdx)}
                    >
                      <FaTrashAlt />
                    </DeleteButton>
                  )}
                  <LikeButton
                    onClick={() =>
                      handleLikeToggle(index, idx, true, replyIdx)
                    }
                  >
                    {likes[reply.id] ? <FaHeart color="red" /> : <FaRegHeart />}
                  </LikeButton>
                  {reply.likeCount > 0 && <LikeCount>{reply.likeCount}</LikeCount>}
                </div>
              </CommentItem>
            ))}

          {replyingTo === comment.comment.id && (
            <CommentInputWrapper>
              <CommentImage src={currentUser.imageSrc} alt="User" />
              <CommentInputContainer>
                <CommentTextInput
                  type="text"
                  placeholder="답글 추가"
                  value={replies[comment.comment.id] || ""}
                  onChange={(e) =>
                    handleReplyChange(comment.comment.id, e.target.value)
                  }
                  onKeyPress={(e) =>
                    handleKeyPress(e, index, "reply", comment.comment.id)
                  }
                />
                <NewCommentButton
                  onClick={() => handleAddReply(index, comment.comment.id)}
                >
                  <FaArrowRight />
                </NewCommentButton>
              </CommentInputContainer>
            </CommentInputWrapper>
          )}
        </div>
      ))}
      <CommentInputWrapper>
        <CommentImage src={currentUser.imageSrc} alt="User" />
        <CommentInputContainer>
          <CommentTextInput
            type="text"
            placeholder="댓글 추가"
            value={newComments[index]}
            onChange={(e) => handleNewCommentChange(index, e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
          <NewCommentButton onClick={() => handleAddComment(index)}>
            <FaArrowRight />
          </NewCommentButton>
        </CommentInputContainer>
      </CommentInputWrapper>
    </>
  );
};

export default PostComment;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart, FaArrowRight, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../views/Signup";

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

// 시간 계산 함수
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

const PostComment = ({ information, posts, setPosts, currentUser, index, feedId }) => {
  const [newComments, setNewComments] = useState(Array(information.length).fill(""));
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [replies, setReplies] = useState({});
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);
  const [nestedComments, setNestedComments] = useState({});
  const [page, setPage] = useState(0);

  // 댓글 조회
  useEffect(() => {
    const access = localStorage.getItem('access');
    axios.get(`${BASE_URL}/api/comments?feedId=${feedId}&page=${page}&size=10`, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      console.log(res.data.body.content)
      setComments(res.data.body.content);
    })
    .catch(err => {
      console.log(err + '댓글을 찾지 못했습니다');
    });
  }, [feedId, page]);

  // 새로운 댓글 입력
  const handleNewCommentChange = (index, value) => {
    const updatedNewComments = [...newComments];
    updatedNewComments[index] = value;
    setNewComments(updatedNewComments);
  };

  // 댓글 등록
  const handleAddComment = (index) => {
    const access = localStorage.getItem('access');
    axios.post(`${BASE_URL}/api/comments`, {
      feedId: feedId,
      content: newComments[index],
    }, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      console.log("댓글이 등록되었습니다.");
      setComments(prevComments => [response.data.body, ...prevComments]);
      const updatedNewComments = [...newComments];
      updatedNewComments[index] = ""; 
      setNewComments(updatedNewComments);
      console.log(comments)
    })
    .catch(error => {
      console.log("등록 중 오류 발생:", error);
    });
  };


// 댓글 삭제
  const handleDeleteComment = (commentId) => {
    const access = localStorage.getItem('access');
    axios.delete(`${BASE_URL}/api/comments/${commentId}`, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      }
    })
    .then(() => {
      setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
      console.log("댓글이 삭제되었습니다.");
    })
    .catch(error => {
      console.log("삭제 중 오류 발생:", error);
    });
  };

  const handleReplyChange = (commentId, value) => {
    setReplies({
      ...replies,
      [commentId]: value,
    });
  };

  // 대댓글 등록
  const handleAddReply = (commentId) => {
    const access = localStorage.getItem('access');
    axios.post(`${BASE_URL}/api/comments/`, {
      feedId: feedId,
      parentCommentId: commentId,
      content: replies[commentId],
    }, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      setReplies(prevReplies => ({
        ...prevReplies,
        [commentId]: "",
      }));
      setShowReplies(prevShowReplies => ({
        ...prevShowReplies,
        [commentId]: true,
      }));
      setNestedComments(prevNestedComments => ({
        ...prevNestedComments,
        [commentId]: [response.data.body, ...(prevNestedComments[commentId] || [])]
      }));
      console.log("대댓글이 등록되었습니다.");
    })
    .catch(error => {
      console.log("대댓글 등록 중 오류 발생:", error);
    });
  };

  // 대댓글 삭제
  const handleDeleteReply = (commentId, nestedCommentId) => {
    const access = localStorage.getItem('access');
    axios.delete(`${BASE_URL}/api/comments/${nestedCommentId}`, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      }
    })
    .then(() => {
      setNestedComments(prevNestedComments => ({
        ...prevNestedComments,
        [commentId]: prevNestedComments[commentId].filter(nested => nested.commentId !== nestedCommentId)
      }));
      console.log("대댓글이 삭제되었습니다.");
    })
    .catch(error => {
      console.log("대댓글 삭제 중 오류 발생:", error);
    });
  };

  // 대댓글 조회
  const fetchReplies = (commentId) => {
    const access = localStorage.getItem('access');
    axios.get(`${BASE_URL}/api/comments/nested`, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      },
      params: {
        commentId: commentId,
        page: 0,
        size: 10,
      }
    })
    .then(res => {
      console.log(res.data.body)
      setNestedComments(prevNestedComments => ({
        ...prevNestedComments,
        [commentId]: res.data.body.content
      }));
    })
    .catch(err => {
      console.log(err + '대댓글을 찾지 못했습니다.');
    });
  };

  // 답글보기
  const handleShowRepliesToggle = (commentId) => {
    setShowReplies(prevShowReplies => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
    if (!showReplies[commentId]) {
      fetchReplies(commentId);
    }
  };

  // 댓글 좋아요
  const handleLikeToggle = (commentId, isNested = false, nestedCommentId = null) => {
    const access = localStorage.getItem('access');
    const url = `${BASE_URL}/api/likes/comment/`

    axios.post(url, {commentId}, {
      headers: {
        "access": access,
        "Content-Type": "application/json",
      }
    })
    .then(() => {
      if (isNested) {
        setNestedComments(prevNestedComments => ({
          ...prevNestedComments,
          [commentId]: prevNestedComments[commentId].map(nested => 
            nested.commentId === nestedCommentId 
            ? { ...nested, likeCount: nested.likeCount + (likes[nestedCommentId] ? -1 : 1) } 
            : nested
          )
        }));
      } else {
        setComments(prevComments => prevComments.map(comment => 
          comment.commentId === commentId 
          ? { ...comment, likeCount: comment.likeCount + (likes[commentId] ? -1 : 1) } 
          : comment
        ));
      }
      setLikes(prevLikes => ({
        ...prevLikes,
        [isNested ? nestedCommentId : commentId]: !prevLikes[isNested ? nestedCommentId : commentId],
      }));
    })
    .catch(error => {
      console.log("좋아요 토글 중 오류 발생:", error);
    });
  };

  // 입력
  const handleKeyPress = (e, index, type = "comment", commentId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "comment") {
        handleAddComment(index);
      } else if (type === "reply") {
        handleAddReply(commentId);
      }
    }
  };

  return (
    <>
      {comments.map((comment, idx) => (
        <div key={idx}>
          <CommentItem>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CommentUserImage src={"https://www.rebu.kro.kr/data/" + comment.imageSrc} alt="User" />
              <CommnetDetails>
                <CommentHeader>
                  <CommentUsername>{comment.nickname}</CommentUsername>
                  <CommentTime>
                    {timeSince(new Date(comment.createAt))}
                  </CommentTime>
                </CommentHeader>
                <CommentContent>{comment.content}</CommentContent>
                <div style={{ display: "flex" }}>
                  <ReplyLink onClick={() => handleShowRepliesToggle(comment?.commentId)}>
                    {showReplies[comment?.commentId] ? "답글숨기기" : "답글보기"}
                  </ReplyLink> &nbsp;&nbsp;
                  <ReplyLink onClick={() => setReplyingTo(replyingTo === comment.commentId ? null : comment.commentId)}>
                    답글달기
                  </ReplyLink>
                </div>
              </CommnetDetails>
            </div>
            <div>
              {comment?.nickname === currentUser.nickname && (
                <DeleteButton onClick={() => handleDeleteComment(comment?.commentId)}>
                  <FaTrashAlt />
                </DeleteButton>
              )}
              <LikeButton onClick={() => handleLikeToggle(comment?.commentId)}>
                {likes[comment?.commentId] ? <FaHeart color="red" /> : <FaRegHeart />}
              </LikeButton>
              {comment?.likeCount > 0 && <LikeCount>{comment?.likeCount}</LikeCount>}
            </div>
          </CommentItem>

          {showReplies[comment?.commentId] && nestedComments[comment?.commentId] && nestedComments[comment?.commentId].map((reply, replyIdx) => (
            <CommentItem key={replyIdx} style={{ marginLeft: "40px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CommentUserImage src={"https://www.rebu.kro.kr/data/" + reply?.imageSrc} alt="User" />
                <CommnetDetails>
                  <CommentHeader>
                    <CommentUsername>{reply?.nickname}</CommentUsername>
                    <CommentTime>
                      {timeSince(new Date(reply?.createAt))}
                    </CommentTime>
                  </CommentHeader>
                  <CommentContent>{reply?.content}</CommentContent>
                </CommnetDetails>
              </div>
              <div>
                {reply?.nickname === currentUser.nickname && (
                  <DeleteButton onClick={() => handleDeleteReply(comment?.commentId, reply?.commentId)}>
                    <FaTrashAlt />
                  </DeleteButton>
                )}
                <LikeButton onClick={() => handleLikeToggle(comment?.commentId, true, reply?.commentId)}>
                  {likes[reply?.commentId] ? <FaHeart color="red" /> : <FaRegHeart />}
                </LikeButton>
                {reply?.likeCount > 0 && <LikeCount>{reply?.likeCount}</LikeCount>}
              </div>
            </CommentItem>
          ))}

          {replyingTo === comment?.commentId && (
            <CommentInputWrapper>
              <CommentImage src={"https://www.rebu.kro.kr/data/" + currentUser.imageSrc} alt="User" />
              <CommentInputContainer>
                <CommentTextInput
                  type="text"
                  placeholder="답글 추가"
                  value={replies[comment?.commentId] || ""}
                  onChange={(e) => handleReplyChange(comment?.commentId, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, index, "reply", comment?.commentId)}
                />
                <NewCommentButton onClick={() => handleAddReply(comment?.commentId)}>
                  <FaArrowRight />
                </NewCommentButton>
              </CommentInputContainer>
            </CommentInputWrapper>
          )}
        </div>
      ))}
      <CommentInputWrapper>
        <CommentImage src={"https://www.rebu.kro.kr/data/" + currentUser.imageSrc} alt="User" />
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

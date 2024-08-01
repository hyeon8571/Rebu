import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegComment, FaRegStar, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FiSend, FiMoreVertical } from "react-icons/fi";
import { MdPlace } from "react-icons/md";
import PostDelete from "./PostDeleteModal";
import PostComment from "./PostComment";
import { PiShareFatBold } from "react-icons/pi";



const PostWrapper = styled.div`
  background-color: ${(props) => (props.theme.value === "light" ? "#fbf8fe" : "#404040")};
  width: 80%;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  padding: 10px;
  position: relative;
  @media (max-width: 375px) {
    font-size: 14.5px;
  }
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
  color: ${(props) => (props.theme.value === "light" ? "#8e8e8e" : "#ffffff")};
  text-decoration: underline;
  cursor: pointer;
`;

const PostImage = styled.img`
  margin: auto;
  width: 95%;
  height: auto;
`;

const ScrapIcon = styled.div`
  color: #943AEE;
  font-size: 28px;
  margin-top: 10px;
  position: relative;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 3%;
  padding: 5px;
  border-radius: 10px;
  background-color: ${(props) => (props.theme.value === "light" ? "#ffffff" : "#e5e5e5")};
  color: black;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(21, 17, 17, 0.1);
  width: 140px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    border-radius: 5px;
    background-color: #f0f0f0;
  }
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  padding: 10px;
  @media (max-width: 375px) {
    font-size: 15px;
  }
`;

const ActionIcon = styled.div`
  margin-left: 5px;
  margin-right: 15px;
  font-size: 1.2em;
  cursor: pointer;
`;

const ShareIcon = styled(PiShareFatBold)`
  width: 21px;
  height: 22px;
  margin-top: 2px;
  cursor: pointer;
`;

const Likes = styled.div`
  padding: 0 15px;
  font-weight: bold;
  @media (max-width: 375px) {
    font-size: 14.5px;
  }
`;

const PostDescription = styled.div`
  padding: 0 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  @media (max-width: 375px) {
    font-size: 14.5px;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  @media (max-width: 375px) {
    font-size: 14.5px;
  }
`;

const CommentText = styled.div`
  padding: 0 10px;
  margin-bottom: 10px;
  margin-top: 5px;
  text-decoration: underline;
  cursor: pointer;
`;

const PostTime = styled.span`
  color: ${(props) => (props.theme.value === "light" ? "#8e8e8e" : "#ffffff")};
  font-size: 0.9em;
  margin-top: 5px;
  margin-right: 10px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #ffcc00;
  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const RatingText = styled.span`
  color: ${(props) => (props.theme.value === "light" ? "#777777" : "#ffffff")};
`;

const CommentList = styled.div`
  padding: 0 10px;
  margin-bottom: 10px;
  max-height: ${(props) => (props.expanded ? "auto" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
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


const PostDetail = ({ information, currentUser }) => {
  const [showDropdown, setShowDropdown] = useState(Array(information.length).fill(false));
  const [PostDeleteModalOpen, setPostDeleteModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [posts, setPosts] = useState(information);
  const [expandedComments, setExpandedComments] = useState(Array(information.length).fill(false));
  const dropdownRefs = useRef([]);
  const navigate = useNavigate();

  const handleLikeToggle = (index) => {
    const updatedPosts = [...information];
    updatedPosts[index].isLiked = !updatedPosts[index].isLiked;
    setPosts(updatedPosts);
  };

  const handleScrapToggle = (index) => {
    const updatedPosts = [...information];
    updatedPosts[index].isScrapped = !updatedPosts[index].isScrapped;
    setPosts(updatedPosts);
  };

  const handleMoreOptionToggle = (index) => {
    const updatedShowDropdown = [...showDropdown];
    updatedShowDropdown.forEach((_, i) => {
      if (i === index) {
        updatedShowDropdown[i] = !updatedShowDropdown[i];
      } else {
        updatedShowDropdown[i] = false;
      }
    });
    setShowDropdown(updatedShowDropdown);
  };

  const handleClickOutside = (event) => {
    dropdownRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        const updatedShowDropdown = [...showDropdown];
        updatedShowDropdown[index] = false;
        setShowDropdown(updatedShowDropdown);
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const postDeleteModalOpen = (id) => {
    setPostDeleteModalOpen(true);
    setPostIdToDelete(id);
  };

  const closeModal = () => {
    setPostDeleteModalOpen(false);
    setShowDropdown(Array(information.length).fill(false));
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    closeModal();
  };

  const toggleComments = (index) => {
    const updatedExpandedComments = [...expandedComments];
    updatedExpandedComments[index] = !updatedExpandedComments[index];
    setExpandedComments(updatedExpandedComments);
  };


  return (
    <>
      {information.map((item, index) => (
        <PostWrapper key={index}>
          <PostHeader>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ProfileImage src={item.userimg} alt="Profile" />
              <ProfileDetails>
                <Username>{item.nickname}</Username>
                <Location>
                  <MdPlace />
                  {item.shop}
                </Location>
              </ProfileDetails>
            </div>
            <div style={{ position: "relative" }}>
              {item.nickname === currentUser.nickname ? (
                <ScrapIcon onClick={() => handleMoreOptionToggle(index)}>
                  <FiMoreVertical />
                </ScrapIcon>
              ) : (
                <ScrapIcon onClick={() => handleScrapToggle(index)}>
                  {item.isScrapped ? <FaBookmark /> : <FaRegBookmark />}
                </ScrapIcon>
              )}

              <DropdownMenu
                ref={(el) => (dropdownRefs.current[index] = el)}
                show={showDropdown[index]}
              >
                <DropdownItem onClick={() => navigate("/post-modify", {state : {item: item}})}>
                  게시글 수정
                </DropdownItem>
                <hr style={{ margin: "5px 0px" }} />
                <DropdownItem onClick={postDeleteModalOpen}>
                  게시글 삭제
                </DropdownItem>
                {PostDeleteModalOpen && (
                  <PostDelete
                    PostDeleteModalOpen={PostDeleteModalOpen}
                    closeModal={closeModal}
                    postId={postIdToDelete}
                    deletePost={() => deletePost(postIdToDelete)}
                  />
                )}
              </DropdownMenu>
            </div>
          </PostHeader>
          <PostImage src={item.img} alt={`Selected ${index}`} />
          <PostActions>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ActionIcon onClick={() => handleLikeToggle(index)}>
                {item.isLiked ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
              </ActionIcon>
              <ActionIcon>
                <FaRegComment onClick={() => toggleComments(index)}/>
              </ActionIcon>
              <ActionIcon>
                <ShareIcon />
              </ActionIcon>
            </div>
            <Rating>
              <FaRegStar />
              &nbsp;
              <RatingText>{item.rank}</RatingText>
            </Rating>
          </PostActions>
          <Likes>좋아요 {item.likes}개</Likes>
          <PostDescription>{item.content}</PostDescription>

          <BottomWrapper>
            <CommentText onClick={() => toggleComments(index)}>
              댓글 {item.comment.length}개
            </CommentText>
            <PostTime>{timeSince(new Date(item.created_at))}</PostTime>
          </BottomWrapper>
          
          <CommentList expanded={expandedComments[index]}>
            {expandedComments[index] && (
              <PostComment
                item={item}
                currentUser={currentUser}
                information={information}
                posts={posts}
                setPosts={setPosts}
                index={index}
              />
            )}
          </CommentList>
        </PostWrapper>
      ))}
    </>
  );
};

export default PostDetail;

import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import stringSimilarity from "string-similarity";
import ProfileMedium from "../common/ProfileMedium";
import AlternativeImg from "../../assets/images/img.webp";
import Lottie from "lottie-react";
import Loading from "../../assets/images/LoadingLottie.json";
import { throttle } from "lodash";

const SearchModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 500px;
  height: 600px;
  min-height: 600px;
  background: ${(props) => props.theme.body};
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
    height: 600px;
    min-height: 100%;
    top: 0;
    transform: translate(-50%, 0);
    border-radius: 0;
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 85%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => (props.theme.value === "light" ? "#333" : "#fff")};
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex: 1;
`;

const LottieWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;
const StyledLottie = styled(Lottie)`
  position: absolute;
  bottom: 10%;
  width: 100px;
  height: 100px;
`;

const ResultItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }

  span {
    font-size: 16px;
    color: ${(props) => (props.theme.value === "light" ? "#333" : "#fff")};
    font-weight: 600;
    text-decoration: ${({ isHashtag }) => (isHashtag ? "underline" : "none")};
    padding-left: 0.4rem;
  }
`;

const SearchModal = ({ isOpen, setIsOpen }) => {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isHashtag, setIsHashtag] = useState(false);

  const BASE_URL = "https://www.rebu.kro.kr";
  const size = 10;

  const resultListRef = useRef(null);

  const fetchProfiles = useCallback(async (newQuery, newPage) => {
    setLoading(true);
    try {
      let response;
      if (newQuery.startsWith("#")) {
        response = await axios.get(
          `${BASE_URL}/api/feeds/search-hashtags?keyword=${newQuery.slice(
            1
          )}&size=${size}&page=${newPage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Access: localStorage.getItem("access"),
            },
          }
        );
      } else {
        response = await axios.get(
          `${BASE_URL}/api/profiles/search?keyword=${newQuery}&size=${size}&page=${newPage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Access: localStorage.getItem("access"),
            },
          }
        );
      }

      let newProfiles = newQuery.startsWith("#")
        ? response.data.body
        : response.data.body.content;

      if (newQuery.startsWith("#")) {
        setIsHashtag(true);
      } else {
        setIsHashtag(false);
      }

      if (!newQuery.startsWith("#") && newProfiles) {
        newProfiles = newProfiles.sort((a, b) => {
          const similarityA = stringSimilarity.compareTwoStrings(
            newQuery.toLowerCase(),
            a.nickname.toLowerCase()
          );
          const similarityB = stringSimilarity.compareTwoStrings(
            newQuery.toLowerCase(),
            b.nickname.toLowerCase()
          );
          return similarityB - similarityA;
        });
      }

      setProfiles((prevProfiles) =>
        newPage === 0 ? newProfiles : [...prevProfiles, ...newProfiles]
      );

      if (newProfiles.length < size) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error fetching profiles or hashtags:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleScroll = throttle(() => {
    if (resultListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = resultListRef.current;

      // console.log("scrollHeight:", scrollHeight);
      // console.log("scrollTop:", scrollTop);
      // console.log("clientHeight:", clientHeight);

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, 500);

  useEffect(() => {
    if (resultListRef.current) {
      resultListRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (resultListRef.current) {
        resultListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, hasMore]);

  useEffect(() => {
    if (query.length > 0) {
      setPage(0);
      fetchProfiles(query, 0);
    } else {
      setProfiles([]);
    }
  }, [query, fetchProfiles]);

  useEffect(() => {
    if (page > 0 && query.length > 0) {
      fetchProfiles(query, page);
    }
  }, [page, query, fetchProfiles]);

  return (
    <SearchModalWrapper isOpen={isOpen}>
      <ModalContent>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="프로필 또는 해시태그를 검색해보세요"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
              setHasMore(true);
              setProfiles([]);
            }}
          />
          <CloseButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            ×
          </CloseButton>
        </SearchInputWrapper>
        {loading && page === 0 ? (
          <LottieWrapper>
            <StyledLottie animationData={Loading}></StyledLottie>
          </LottieWrapper>
        ) : (
          <ResultList ref={resultListRef} id="modal-content">
            {profiles.map((profile, index) => (
              <Link
                to={
                  query.startsWith("#")
                    ? `/hashtag/${profile.hashtag}`
                    : `/profile/${profile.nickname}`
                }
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ResultItem key={index} isHashtag={query.startsWith("#")}>
                  {!isHashtag && (
                    <ProfileMedium
                      img={profile.imgSrc ? profile.imgSrc : AlternativeImg}
                      time={0}
                    />
                  )}
                  <span>
                    {query.startsWith("#")
                      ? "#" + profile.hashtag
                      : profile.nickname}
                  </span>
                </ResultItem>
              </Link>
            ))}
          </ResultList>
        )}
        {loading && page > 0 && (
          <LottieWrapper>
            <StyledLottie animationData={Loading}></StyledLottie>
          </LottieWrapper>
        )}
      </ModalContent>
    </SearchModalWrapper>
  );
};

export default SearchModal;

import styled from "styled-components";
import { useState } from "react";

const HashTagContainer = styled.div`
  .hashTags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-left: 1rem;
  }
  .hashTagInput {
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 1rem;
  }
`;

const HashTag = styled.button`
  background: ${(props) => props.theme.primary};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 1rem;
  cursor: pointer; /* Make the button look clickable */
  &:hover {
    background-color: #ff4545;
  }
`;

const isEmptyValue = (value) => {
  return value === null || value === undefined || value.trim() === "";
};

export default function FeedHashTag({ feed, setFeed, hashTags, setHashTags }) {
  const [inputHashTag, setInputHashTag] = useState("");

  const addHashTag = (e) => {
    const allowedCommand = ["Comma", "Enter", "Space", "NumpadEnter"];
    if (!allowedCommand.includes(e.code)) return;

    if (isEmptyValue(e.target.value.trim())) {
      return setInputHashTag("");
    }

    let newHashTag = e.target.value.trim();
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, "");
    }
    if (newHashTag.includes(",")) {
      newHashTag = newHashTag.split(",").join("");
    }

    if (isEmptyValue(newHashTag)) return;

    setHashTags((prevHashTags) => {
      const newSet = [...new Set([...prevHashTags, newHashTag])];
      setReview({
        ...reed,
        hashTags: newSet,
      });
      return newSet;
    });

    setInputHashTag("");
  };

  const keyDownHandler = (e) => {
    if (e.code !== "Enter" && e.code !== "NumpadEnter") return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.target.value)) {
      setInputHashTag("");
    }
  };

  const deleteHashTag = (hashTagToDelete) => {
    const newHashTags = (prevHashTags) =>
      prevHashTags.filter((hashTag) => hashTag !== hashTagToDelete);
    setHashTags(newHashTags);
    setFeed({
      ...feed,
      hashtags: newHashTags,
    });
  };

  const changeHashTagInput = (e) => {
    setInputHashTag(e.target.value);
  };

  return (
    <HashTagContainer>
      <div className="hashTags">
        {hashTags.length > 0 &&
          hashTags.map((hashTag) => {
            return (
              <HashTag
                key={hashTag}
                onClick={() => deleteHashTag(hashTag)}
                className="tag"
              >
                #{hashTag}
              </HashTag>
            );
          })}

        <input
          value={inputHashTag}
          onChange={changeHashTagInput}
          onKeyUp={addHashTag}
          onKeyDown={keyDownHandler}
          placeholder="#해시태그를 등록해보세요. (최대 10개)"
          className="hashTagInput"
        />
      </div>
    </HashTagContainer>
  );
}

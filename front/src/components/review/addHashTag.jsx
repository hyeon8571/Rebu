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
  cursor: pointer;
  &:hover {
    background-color: #ff4545;
  }
`;

const isEmptyValue = (value) => {
  return value === null || value === undefined || value.trim() === "";
};

export default function AddHashTag({
  review,
  setReview,
  hashTags,
  setHashTags,
}) {
  const [inputHashTag, setInputHashTag] = useState("");

  const addHashTag = () => {
    if (isEmptyValue(inputHashTag.trim())) {
      return setInputHashTag("");
    }

    let newHashTag = inputHashTag.trim();
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
        ...review,
        hashtags: newSet,
      });
      return newSet;
    });

    setInputHashTag("");
  };

  const keyUpHandler = (e) => {
    const allowedKeys = ["Enter", "Comma", " "]; // " " is for Space
    if (allowedKeys.includes(e.key)) {
      e.preventDefault();
      addHashTag();
    }
  };

  const changeHashTagInput = (e) => {
    setInputHashTag(e.target.value);
  };

  const deleteHashTag = (hashTagToDelete) => {
    const newHashTags = hashTags.filter(
      (hashTag) => hashTag !== hashTagToDelete
    );
    setHashTags(newHashTags);
    setReview({
      ...review,
      hashtags: newHashTags,
    });
  };

  return (
    <HashTagContainer>
      <div className="hashTags">
        {hashTags.length > 0 &&
          hashTags.map((hashTag) => (
            <HashTag
              key={hashTag}
              onClick={() => deleteHashTag(hashTag)}
              className="tag"
            >
              #{hashTag}
            </HashTag>
          ))}

        <input
          value={inputHashTag}
          onChange={changeHashTagInput}
          onKeyUp={keyUpHandler}
          placeholder="#해시태그를 등록해보세요. (최대 10개)"
          className="hashTagInput"
        />
      </div>
    </HashTagContainer>
  );
}

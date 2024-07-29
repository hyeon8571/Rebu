import { useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
  width: 60px;

  display: flex;
  cursor: pointer;

  > .toggle-container {
    width: 60px;
    height: 24px;
    border-radius: 0.5rem;
    background-color: rgb(238, 108, 227);
  }

  .toggle-text {
    color: rgb(238, 108, 227); // 텍스트 색상
    font-weight: bold; // 텍스트 굵기
    transition: color 0.5s;
    font-size: 13px;
  }

  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(57, 150, 237);
    transition: 0.5s;

    .toggle-text {
      color: rgb(57, 150, 237); // 텍스트 색상 변경
      font-size: 13px;
    }
  }

  > .toggle-circle {
    position: absolute;
    text-align: center;
    margin: 0px;
    top: 1px;
    left: 1px;
    width: 35px;
    height: 22px;
    border-radius: 0.5rem;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }

  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    left: 24px;
    transition: 0.5s;
  }
`;

// const Desc = styled.div`
//   //설명 부분의 CSS를 구현
//   text-align: center;
//   margin: 0px;
// `;

const Toggle = ({ isMan, toggleHandler }) => {
  return (
    <>
      <ToggleContainer
        // 클릭하면 토글이 켜진 상태(isMan)를 boolean 타입으로 변경하는 메소드가 실행
        onClick={toggleHandler}
      >
        {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
        {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
        {/* toggle-circle 클래스를 가진 div 엘리멘트에 Toggle Switch가 ON인 상태일 경우 '여성', 그렇지 않은 경우 '남성'을 조건부 렌더링 */}
        <div
          className={`toggle-container ${isMan ? "toggle--checked" : null}`}
        ></div>
        <div className={`toggle-circle ${isMan ? "toggle--checked" : null}`}>
          <span className="toggle-text">{isMan ? "남성" : "여성"}</span>
        </div>
      </ToggleContainer>
      {/* Desc 컴포넌트를 활용*/}
      {/* Toggle Switch가 ON인 상태일 경우에 Desc 컴포넌트 내부의 텍스트를 '여성'으로, 그렇지 않은 경우 '남성'. 조건부 렌더링을 활용. */}
      {/* {isMan === false ?
      <Desc><span className='여성'>여성</span></Desc> :
      <Desc><span className='남성'>남성</span></Desc>} */}
      {/* <Desc>
        {isMan ? '남성' : '여성'}
      </Desc> */}
    </>
  );
};

export default Toggle;

import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import PropTypes from 'prop-types';
import PostDetail from "../post/PostDetail";
import ReviewKeywordStat from "../storeProfile/ReviewKeywordStat";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto; /* 중앙 정렬을 위한 추가 */
`;

const ReviewKeywordBtn = styled.button`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#f4ebfd" :"#9e4def"};
  border: 1.5px solid #d1a6f7;
  outline: none;
  border-radius: 12px;      
  padding: 5px 10px;      
  font-size: 13px;       
  color: ${(props) =>
    props.theme.value === "light" ? "#000" :"#fff"};        
  cursor: pointer;
  &:hover {
    border-color: #b475f3;
    box-shadow: 0 0 15px rgba(186, 126, 250, 0.3);
  }
 `;

const ReviewKeywordBtnActive = styled.button`
  background-color: ${(props) =>
    props.theme.value === "light" ? "#f4ebfd" :"#b475f3"};
  border: 1.5px solid #b475f3;
  /* box-shadow: 0 0 15px rgba(186, 126, 250, 0.4); */
  outline: none;
  border-radius: 12px;      
  padding: 5px 10px;      
  font-size: 13px;       
  color: ${(props) =>
    props.theme.value === "light" ? "#000" :"#fff"};     
  cursor: pointer;
  &:hover {
    border-color: #b475f3;
    box-shadow: 0 0 15px rgba(186, 126, 250, 0.3);
  }
  `;

 const ReviewKeywordList = styled.div`
  padding: 0 10px;
  width: 90%;
  max-height: ${(props) => (props.expanded ? "auto" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
 `;

const GridItem = styled.div`
  padding: 5px;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function GridComponent({ Card, currentUser, loginUser, currentTab }) {
  const [layouts, setLayouts] = useState({ lg: [], md: [] });
  const containerRef = useRef(null);
  const [rowHeight, setRowHeight] = useState(150);
  const [selectedPhotos, setSelectedPhotos] = useState(null);
  const [openReviewKeyword, setOpenReviewKeyword] = useState(false);
  const [keywordBtnActive, setKeywordBtnActive] = useState(false);
  
  console.log(currentTab)

  const scrollDown = () => {
    window.scrollBy({
      top: 200,
      left: 0,
      behavior: "smooth",
    });
  };

  const handletoggleContent = () => {
    setOpenReviewKeyword(!openReviewKeyword);
    setKeywordBtnActive(!keywordBtnActive);
    if (!openReviewKeyword) {
    setTimeout(() => scrollDown(), 100);
    }
  };


  const generateLayout = useCallback((photos) => {
    return photos.map((photo, index) => ({
      i: `photo-${index}`,
      x: index % 3,
      y: Math.floor(index / 3),
      w: 1,
      h: 1,
      minW: 1,
      maxW: 1,
      minH: 1,
      maxH: 1,
      static: false,
    }));
  }, []);

  useEffect(() => {
    setLayouts({
      lg: generateLayout(Card),
      md: generateLayout(Card),
    });

    const updateRowHeight = () => {
      if (containerRef.current) {
        const gridWidth = containerRef.current.clientWidth / 3;
        setRowHeight(gridWidth);
      }
    };

    window.addEventListener("resize", updateRowHeight);
    updateRowHeight();

    return () => {
      window.removeEventListener("resize", updateRowHeight);
    };
  }, [Card, generateLayout]);

  const handlePhotoClick = (index) => {
    setSelectedPhotos(Card.slice(index));
  };



  return (
    <>
     {keywordBtnActive && currentTab === 1 ? (
        <ReviewKeywordBtnActive onClick={handletoggleContent}>리뷰 키워드</ReviewKeywordBtnActive>
      ) : (
        <ReviewKeywordBtn onClick={handletoggleContent}>리뷰 키워드</ReviewKeywordBtn>
      )}
      <ReviewKeywordList expanded={openReviewKeyword}>
        {openReviewKeyword && (
          <ReviewKeywordStat reviewNum={100}/>
        )}
      </ReviewKeywordList>
      {selectedPhotos ? (
        <PostDetail information={selectedPhotos} currentUser={currentUser} loginUser={loginUser} />
      ) : (
        <GridContainer ref={containerRef}>
          <ResponsiveGridLayout
            layouts={layouts}
            breakpoints={{ lg: 768, md: 425 }}
            cols={{ lg: 3, md: 3 }}
            rowHeight={rowHeight}
            width={containerRef.current ? containerRef.current.clientWidth : 768}
            isDraggable={false}
            isResizable={false}
          >
            {Card.map((item, index) => (
              <GridItem
                key={`photo-${index}`}
                data-grid={layouts.lg[index]}
                onClick={() => handlePhotoClick(index)}
              >
                <Photo src={"https://www.rebu.kro.kr/data/" + item.review?.imageSrcs[0]} alt={`uploaded-${index}`} />
              </GridItem>
            ))}
          </ResponsiveGridLayout>
        </GridContainer>
      )}
    </>
  );
}

// GridComponent.propTypes = {
//   uploadedPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
//   Card: PropTypes.arrayOf(PropTypes.object).isRequired,
//   currentUser: PropTypes.object.isRequired,
// };

export default GridComponent;

import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import PropTypes from 'prop-types';
import PostDetail from "../post/PostDetail";
import { CiLock } from "react-icons/ci";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto; /* 중앙 정렬을 위한 추가 */
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

const PrivateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`

const LockImg = styled(CiLock)`
  width: 120px;
  height: 120px;
`;

const LockText = styled.span`
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function GridComponent({ Card, currentUser, loginUser }) {
  const [layouts, setLayouts] = useState({ lg: [], md: [] });
  const containerRef = useRef(null);
  const [rowHeight, setRowHeight] = useState(150);
  const [selectedPhotos, setSelectedPhotos] = useState(null);
  const [isPrivate, setIsPrivate] = useState(currentUser.isPrivate);

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
      {isPrivate ? (
        <PrivateContainer>
          <LockImg />
          <LockText>비공개 항목입니다</LockText>
        </PrivateContainer>
      ) : (
        <>
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
                <Photo src={item.imageSrcs[0]} alt={`uploaded-${index}`} />
              </GridItem>
            ))}
          </ResponsiveGridLayout>
        </GridContainer>
      )}
      </>
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

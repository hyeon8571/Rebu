import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridContainer = styled.div`
  display: grid;
  /* grid-template-columns: 2fr 3fr; */
  height: 150px;
  width: 100%;
  max-width: 768px;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.7rem;
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
  height: 100%; // 그리드 아이템 높이에 맞춰서 조정
  object-fit: cover;
`;

function GridComponent({ uploadedPhotos }) {
  const [layouts, setLayouts] = useState({ lg: [], md: [] });
  const containerRef = useRef(null);
  const [rowHeight, setRowHeight] = useState(150); // 초기 rowHeight 설정

  useEffect(() => {
    const generateLayout = (photos) => {
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
      }));
    };

    const newLayout = generateLayout(uploadedPhotos);
    setLayouts({
      lg: newLayout,
      md: newLayout,
    });
  }, [uploadedPhotos]);

  useEffect(() => {
    const updateRowHeight = () => {
      if (containerRef.current) {
        const gridWidth = containerRef.current.clientWidth / 3; // 그리드 열 수에 따라 변경
        const newHeight = gridWidth; // 그리드 항목의 높이를 너비와 동일하게 설정
        setRowHeight(newHeight);
      }
    };

    window.addEventListener("resize", updateRowHeight);
    updateRowHeight(); // 초기 실행

    return () => {
      window.removeEventListener("resize", updateRowHeight);
    };
  }, []);

  return (
    <GridContainer ref={containerRef}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 1024 }}
        cols={{ lg: 3, md: 3 }}
        rowHeight={rowHeight}
        width={containerRef.current ? containerRef.current.clientWidth : 0}
      >
        {uploadedPhotos.map((photo, index) => (
          <GridItem key={`photo-${index}`} data-grid={layouts.lg[index]}>
            <Photo src={photo} alt={`uploaded-${index}`} />
          </GridItem>
        ))}
      </ResponsiveGridLayout>
    </GridContainer>
  );
}

export default GridComponent;

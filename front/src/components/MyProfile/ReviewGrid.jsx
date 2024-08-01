import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import PostDetail from "../post/PostDetail";


const ResponsiveGridLayout = WidthProvider(Responsive);

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 768px;
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

function GridComponent({ uploadedPhotos, Card, currentUser }) {
  const [layouts, setLayouts] = useState({ lg: [], md: [] });
  const containerRef = useRef(null);
  const [rowHeight, setRowHeight] = useState(150);
  const [selectedPhotos, setSelectedPhotos] = useState(null);

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
        static: true,
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
        const gridWidth = containerRef.current.clientWidth / 3;
        const newHeight = gridWidth;
        setRowHeight(newHeight);
      }
    };

    window.addEventListener("resize", updateRowHeight);
    updateRowHeight();

    return () => {
      window.removeEventListener("resize", updateRowHeight);
    };
  }, []);

  const handlePhotoClick = (index) => {
    const selectedPhotos = Card.slice(index);
    setSelectedPhotos(selectedPhotos);
  };

  return (
    <>
      {selectedPhotos !== null ? (
        <PostDetail information={selectedPhotos} currentUser={currentUser} />
      ) : (
        <GridContainer ref={containerRef}>
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 1024 }}
            cols={{ lg: 3, md: 3 }}
            rowHeight={rowHeight}
            width={containerRef.current ? containerRef.current.clientWidth : 0}
            isDraggable={false}
            isResizable={false}
          >
            {Card.map((item, index) => (
              <GridItem
                key={`photo-${index}`}
                data-grid={layouts.lg[index]}
                onClick={() => handlePhotoClick(index)}
              >
                <Photo src={item.img} alt={`uploaded-${index}`} />
              </GridItem>
            ))}
          </ResponsiveGridLayout>
        </GridContainer>
      )}
    </>
  );
}

export default GridComponent;

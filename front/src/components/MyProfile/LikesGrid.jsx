import React from 'react';
import styled from 'styled-components';
import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridItem = styled.div`
  /* border: 1px solid #000; */
  padding: 10px;
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

function GridComponent() {
  const LAYOUTS = {
    lg: [
      { i: "a", x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 },
      { i: "b", x: 1, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 },
      { i: "c", x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 },
    ],
    md: [
      { i: "a", x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 },
      { i: "b", x: 1, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 },
      { i: "c", x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 },
    ],
  };

  return (
    <div>
      <ResponsiveGridLayout
        className="layout"
        layouts={LAYOUTS}
        breakpoints={{ lg: 1024, md: 768 }}
        cols={{ lg: 3, md: 3 }}
      >
        {LAYOUTS.md.map((el) => (
          <GridItem key={el.i} {...el}>
            <h3>좋아요</h3>
            <p>
              요기는 좋아요한 가게들
              레뷰 화이팅!
            </p>
          </GridItem>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

export default GridComponent;

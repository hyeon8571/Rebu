import React from 'react';
import styled from 'styled-components';
import GridLayout from "react-grid-layout";
 


import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

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
          <div key={el.i} {...el}>
            <h3>리뷰🎬</h3>
            <p>
              요기는 레뷰의 게시글 입니다.
              레뷰 화이팅!
            </p>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

export default GridComponent;
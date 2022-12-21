import styled from "@emotion/styled";
import React, { createRef, useCallback } from "react";

const Wrapper = styled.div`
  margin: 20px;
  width: 1000px;
  height: 700px;
  overflow-x: scroll;
  overflow-y: scroll;

  border: 10px solid lightgray;
`;

const Board = styled.div`
  position: relative;
  height: 3000px;
  width: 3000px;

  background-size: 20px 20px;
  background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);
`;

interface Props {
  onClick: (x: number, y: number) => void;
  nodes: number[][];
  nodeRadius: number;
}

function Workboard({ onClick, nodeRadius, nodes }: Props) {
  const wrapperRef = createRef<HTMLDivElement>();
  const boardRef = createRef<HTMLDivElement>();
  const onBoardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const x =
        e.pageX +
        (wrapperRef.current?.scrollLeft ?? 0) -
        (boardRef.current?.offsetLeft ?? 0);
      const y =
        e.pageY +
        (wrapperRef.current?.scrollTop ?? 0) -
        (boardRef.current?.offsetTop ?? 0);
      onClick(x, y);
    },
    [onClick, wrapperRef, boardRef]
  );
  return (
    <Wrapper ref={wrapperRef}>
      <Board ref={boardRef} onClick={onBoardClick}>
        <svg height="3000" width="3000">
          <circle
            cx={0}
            cy={0}
            r={20}
            stroke="blue"
            strokeWidth="3"
            fill="red"
          />
          {nodes.map((node) => (
            <circle
              key={node[2]}
              cx={node[0]}
              cy={node[1]}
              r={nodeRadius}
              stroke="black"
              strokeWidth="3"
              fill="red"
            />
          ))}
        </svg>
      </Board>
    </Wrapper>
  );
}

export default Workboard;

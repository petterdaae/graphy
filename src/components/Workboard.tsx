import styled from "@emotion/styled";
import React, { createRef, useCallback } from "react";

const Wrapper = styled.div`
  width: 90vw;
  height: 90vh;

  overflow-x: scroll;
  overflow-y: scroll;
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
  edges: number[][];
  nodeRadius: number;
  nodeFill: string;
  nodeStroke: string;
  nodeStrokeWidth: number;
  boardWidth: number;
  boardHeight: number;
}

function Workboard({
  onClick,
  nodeRadius,
  nodes,
  nodeFill,
  nodeStroke,
  nodeStrokeWidth,
  boardWidth,
  boardHeight,
  edges,
}: Props) {
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
        <svg height={boardHeight} width={boardWidth}>
          {edges.map(([from, to, key]) => (
            <line
              key={key}
              x1={nodes[from][0]}
              y1={nodes[from][1]}
              x2={nodes[to][0]}
              y2={nodes[to][1]}
              stroke="red"
              strokeWidth={3}
            />
          ))}
          {nodes.map((node) => (
            <circle
              key={node[2]}
              cx={node[0]}
              cy={node[1]}
              r={nodeRadius}
              stroke={nodeStroke}
              strokeWidth={nodeStrokeWidth}
              fill={nodeFill}
            />
          ))}
        </svg>
      </Board>
    </Wrapper>
  );
}

export default Workboard;

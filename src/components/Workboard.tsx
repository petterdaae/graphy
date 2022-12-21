import styled from "@emotion/styled";
import React, { createRef, useCallback } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 95vh;

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

interface Node {
  xPos: number;
  yPos: number;
  radius: number;
}

interface Edge {
  fromIndex: number;
  toIndex: number;
}

interface Props {
  onClick: (x: number, y: number) => void;
  nodes: Node[];
  edges: Edge[];
  nodeFill: string;
  nodeStroke: string;
  nodeStrokeWidth: number;
  boardWidth: number;
  boardHeight: number;
  edgeStroke: string;
  edgeStrokeWidth: number;
}

function Workboard({
  onClick,
  nodes,
  nodeFill,
  nodeStroke,
  nodeStrokeWidth,
  boardWidth,
  boardHeight,
  edges,
  edgeStroke,
  edgeStrokeWidth,
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
          {edges.map((edge, index) => (
            <line
              key={index}
              x1={nodes[edge.fromIndex].xPos}
              y1={nodes[edge.fromIndex].yPos}
              x2={nodes[edge.toIndex].xPos}
              y2={nodes[edge.toIndex].yPos}
              stroke={edgeStroke}
              strokeWidth={edgeStrokeWidth}
            />
          ))}
          {nodes.map((node, index) => (
            <circle
              key={index}
              cx={node.xPos}
              cy={node.yPos}
              r={node.radius}
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

export { Workboard };
export type { Node, Edge };

import styled from "@emotion/styled";
import React, { createRef, useCallback, useEffect, useState } from "react";

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

type EventType = "mousedown" | "mouseup" | "mousemove";

interface Node {
  xPos: number;
  yPos: number;
  radius: number;
  deleted: boolean;
}

interface Edge {
  fromIndex: number;
  toIndex: number;
}

interface Props {
  eventListener: (eventType: EventType, x: number, y: number) => void;
  nodes: Node[];
  edges: Edge[];
  nodeFill: string;
  nodeStroke: string;
  nodeStrokeWidth: number;
  boardWidth: number;
  boardHeight: number;
  edgeStroke: string;
  edgeStrokeWidth: number;
  selectedNode: number | null;
}

function Workboard({
  nodes,
  nodeFill,
  nodeStroke,
  nodeStrokeWidth,
  boardWidth,
  boardHeight,
  edges,
  edgeStroke,
  edgeStrokeWidth,
  selectedNode,
  eventListener,
}: Props) {
  const wrapperRef = createRef<HTMLDivElement>();
  const boardRef = createRef<HTMLDivElement>();

  const getCoordinates = useCallback(
    (pageX: number, pageY: number): number[] => {
      const x =
        pageX +
        (wrapperRef.current?.scrollLeft ?? 0) -
        (boardRef.current?.offsetLeft ?? 0);
      const y =
        pageY +
        (wrapperRef.current?.scrollTop ?? 0) -
        (boardRef.current?.offsetTop ?? 0);
      return [x, y];
    },
    [wrapperRef, boardRef]
  );

  // const onBoardClick = useCallback(
  //   (e: React.MouseEvent<HTMLDivElement>) => {
  //     const [x, y] = getCoordinates(e.pageX, e.pageY);
  //     onClick(x, y);
  //   },
  //   [onClick, getCoordinates]
  // );

  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const current = boardRef.current;

    function down(e: MouseEvent) {
      const [x, y] = getCoordinates(e.pageX, e.pageY);
      eventListener("mousedown", x, y);
      setMouseDown(true);
    }

    function up(e: MouseEvent) {
      const [x, y] = getCoordinates(e.pageX, e.pageY);
      eventListener("mouseup", x, y);
      setMouseDown(false);
    }

    function move(e: MouseEvent) {
      if (mouseDown) {
        const [x, y] = getCoordinates(e.pageX, e.pageY);
        eventListener("mousemove", x, y);
      }
    }

    current?.addEventListener("mousedown", down);
    current?.addEventListener("mouseup", up);
    current?.addEventListener("mousemove", move);

    return () => {
      current?.removeEventListener("mousedown", down);
      current?.removeEventListener("mouseup", up);
      current?.removeEventListener("mousemove", move);
    };
  }, [boardRef, setMouseDown, mouseDown, getCoordinates, eventListener]);

  return (
    <Wrapper ref={wrapperRef}>
      <Board ref={boardRef}>
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
          {nodes.map(
            (node, index) =>
              !node.deleted && (
                <circle
                  key={index}
                  cx={node.xPos}
                  cy={node.yPos}
                  r={node.radius}
                  stroke={index === selectedNode ? "green" : nodeStroke}
                  strokeWidth={nodeStrokeWidth}
                  fill={nodeFill}
                  onDrag={(e) => console.log(e)}
                />
              )
          )}
        </svg>
      </Board>
    </Wrapper>
  );
}

export { Workboard };
export type { Node, Edge, EventType };

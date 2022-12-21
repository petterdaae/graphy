import { useState } from "react";
import { Workboard, Node, Edge } from "./components/Workboard";

const NODE_RADIUS = 10;
const NODE_FILL = "lightblue";
const NODE_STROKE = "blue";
const NODE_STROKE_WIDTH = 3;
const BOARD_WIDTH = 3000;
const BOARD_HEIGHT = 3000;

function App() {
  const [nodes, setNodes] = useState<Node[]>([
    { xPos: 100, yPos: 100 },
    { xPos: 200, yPos: 100 },
    { xPos: 100, yPos: 200 },
    { xPos: 200, yPos: 200 },
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { fromIndex: 0, toIndex: 1 },
    { fromIndex: 2, toIndex: 3 },
  ]);
  return (
    <div>
      <Workboard
        onClick={(x, y) => {
          setNodes((prev) => [...prev, { xPos: x, yPos: y }]);
        }}
        nodes={nodes}
        nodeRadius={NODE_RADIUS}
        nodeFill={NODE_FILL}
        nodeStroke={NODE_STROKE}
        nodeStrokeWidth={NODE_STROKE_WIDTH}
        boardWidth={BOARD_WIDTH}
        boardHeight={BOARD_HEIGHT}
        edges={edges}
      />
    </div>
  );
}

export default App;

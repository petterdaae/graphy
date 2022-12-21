import { useState } from "react";
import Workboard from "./components/Workboard";

const NODE_RADIUS = 10;
const NODE_FILL = "lightblue";
const NODE_STROKE = "blue";
const NODE_STROKE_WIDTH = 3;
const BOARD_WIDTH = 3000;
const BOARD_HEIGHT = 3000;

function App() {
  const [nodes, setNodes] = useState<number[][]>([
    [100, 100, 0],
    [200, 200, 1],
    [100, 200, 2],
    [200, 100, 3],
  ]);
  const [edges, setEdges] = useState<number[][]>([
    [0, 1, 1],
    [2, 3, 2],
  ]);
  return (
    <div>
      <Workboard
        onClick={(x, y) => {
          setNodes((prev) => [...prev, [x, y, prev.length]]);
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

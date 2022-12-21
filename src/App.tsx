import { useState } from "react";
import Workboard from "./components/Workboard";

const NODE_RADIUS = 20;
const NODE_FILL = "lightblue";
const NODE_STROKE = "lightgray";
const NODE_STROKE_WIDTH = 2;
const BOARD_WIDTH = 3000;
const BOARD_HEIGHT = 3000;

function App() {
  const [nodes, setNodes] = useState([[50, 50, 0]]);
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
      />
    </div>
  );
}

export default App;

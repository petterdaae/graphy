import { useState } from "react";
import Workboard from "./components/Workboard";

const NODE_RADIUS = 20;

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
      />
    </div>
  );
}

export default App;

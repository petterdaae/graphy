import { useState } from "react";
import Workboard from "./components/Workboard";

function App() {
  const [nodes, setNodes] = useState([[50, 50, 0]]);
  return (
    <div>
      <Workboard
        onClick={(e) => {
          setNodes((prev) => [...prev, [e.pageX, e.pageY, prev.length]]);
        }}
        nodes={nodes}
      />
    </div>
  );
}

export default App;

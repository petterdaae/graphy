import { setegid } from "process";
import { useCallback, useState } from "react";
import Toolbar from "./components/Toolbar";
import { Workboard, Node, Edge } from "./components/Workboard";

const NODE_RADIUS = 20;
const NODE_FILL = "lightblue";
const NODE_STROKE = "blue";
const NODE_STROKE_WIDTH = 3;
const BOARD_WIDTH = 3000;
const BOARD_HEIGHT = 3000;
const EDGE_STROKE = "red";
const EDGE_STROKE_WIDTH = 3;

function clickIsInsideNode(
  clickX: number,
  clickY: number,
  node: Node
): boolean {
  const distanceFromCenter = Math.sqrt(
    Math.pow(clickX - node.xPos, 2) + Math.pow(clickY - node.yPos, 2)
  );
  return distanceFromCenter <= node.radius;
}

function isNodeClick(
  clickX: number,
  clickY: number,
  nodes: Node[]
): number | null {
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (clickIsInsideNode(clickX, clickY, nodes[i])) {
      return i;
    }
  }
  return null;
}

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);

  const [edges, setEdges] = useState<Edge[]>([]);

  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const onBoardClick = useCallback(
    (x: number, y: number) => {
      const prevSelectedNode = selectedNode;
      setSelectedNode(null);
      let nodeClick = isNodeClick(x, y, nodes);
      if (nodeClick !== null) {
        if (prevSelectedNode !== null) {
          console.log("new edge click:", nodeClick);
          setEdges((prev) => [
            ...prev,
            {
              fromIndex: prevSelectedNode as number,
              toIndex: nodeClick as number,
            },
          ]);
          return;
        }
        console.log("node click:", nodeClick);
        setSelectedNode(nodeClick);
        return;
      }
      setNodes((prev) => [...prev, { xPos: x, yPos: y, radius: NODE_RADIUS }]);
    },
    [nodes, selectedNode, setEdges, setNodes, setSelectedNode]
  );
  return (
    <div>
      <Toolbar />
      <Workboard
        onClick={onBoardClick}
        nodes={nodes}
        nodeFill={NODE_FILL}
        nodeStroke={NODE_STROKE}
        nodeStrokeWidth={NODE_STROKE_WIDTH}
        boardWidth={BOARD_WIDTH}
        boardHeight={BOARD_HEIGHT}
        edges={edges}
        edgeStroke={EDGE_STROKE}
        edgeStrokeWidth={EDGE_STROKE_WIDTH}
        selectedNode={selectedNode}
      />
    </div>
  );
}

export default App;

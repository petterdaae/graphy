import { useCallback, useState } from "react";
import Toolbar from "./components/Toolbar";
import { Workboard, Node, Edge, EventType } from "./components/Workboard";

const NODE_RADIUS = 15;
const NODE_FILL = "lightgray";
const NODE_STROKE = "gray";
const NODE_STROKE_WIDTH = 3;
const BOARD_WIDTH = 3000;
const BOARD_HEIGHT = 3000;
const EDGE_STROKE = "green";
const EDGE_STROKE_WIDTH = 2;

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
  const [graph, setGraph] = useState<{ nodes: Node[]; edges: Edge[] }>({
    nodes: [],
    edges: [],
  });
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  const eventListener = useCallback(
    (e: EventType, x: number, y: number) => {
      switch (e) {
        case "mousedown":
          const prevSelectedNode = selectedNode;
          setSelectedNode(null);
          const nodeClick = isNodeClick(x, y, graph.nodes);
          if (nodeClick !== null) {
            if (prevSelectedNode !== null) {
              if (prevSelectedNode === nodeClick) {
                setSelectedNode(null);
                return;
              }
              setGraph((prev) => ({
                ...prev,
                edges: [
                  ...prev.edges,
                  {
                    fromIndex: prevSelectedNode as number,
                    toIndex: nodeClick as number,
                  },
                ],
              }));
              return;
            }
            setSelectedNode(nodeClick);
            return;
          }
          setGraph((prev) => ({
            ...prev,
            nodes: [
              ...prev.nodes,
              { xPos: x, yPos: y, radius: NODE_RADIUS, deleted: false },
            ],
          }));
          break;
        case "mousemove":
          if (selectedNode !== null) {
            setIsMoving(true);
            const copy = graph.nodes.slice();
            copy[selectedNode] = { ...copy[selectedNode], xPos: x, yPos: y };
            setGraph((prev) => ({ ...prev, nodes: copy }));
          }
          break;
        case "mouseup":
          if (isMoving) {
            setIsMoving(false);
            setSelectedNode(null);
          }
          break;
      }
    },
    [isMoving, graph, selectedNode]
  );

  const onDelete = useCallback(() => {
    setGraph((prev) => ({
      edges: prev.edges.filter(
        (edge) =>
          edge.fromIndex !== selectedNode && edge.toIndex !== selectedNode
      ),
      nodes: prev.nodes.map((node, index) =>
        index === selectedNode ? { ...node, deleted: true } : node
      ),
    }));
    setSelectedNode(null);
  }, [selectedNode]);

  return (
    <div>
      <Toolbar
        deleteEnabled={selectedNode !== null && !isMoving}
        onDeleteClick={onDelete}
        onConnectAllVerticesClick={() => {
          setGraph((prev) => {
            const allEdges = [];
            for (let i = 0; i < prev.nodes.length; i++) {
              for (let j = i + 1; j < prev.nodes.length; j++) {
                if (!graph.nodes[i].deleted && !graph.nodes[j].deleted) {
                  allEdges.push({ fromIndex: i, toIndex: j });
                }
              }
            }
            return { ...prev, edges: allEdges };
          });
        }}
      />
      <Workboard
        nodes={graph.nodes}
        nodeFill={NODE_FILL}
        nodeStroke={NODE_STROKE}
        nodeStrokeWidth={NODE_STROKE_WIDTH}
        boardWidth={BOARD_WIDTH}
        boardHeight={BOARD_HEIGHT}
        edges={graph.edges}
        edgeStroke={EDGE_STROKE}
        edgeStrokeWidth={EDGE_STROKE_WIDTH}
        selectedNode={selectedNode}
        eventListener={eventListener}
      />
    </div>
  );
}

export default App;

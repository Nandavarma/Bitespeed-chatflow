import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ReactFlow,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
  Background,
} from "@xyflow/react";
import type {
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import TextNode from "./TextNode";
import type { NodeData } from "./TextNode";
import { toast, ToastContainer } from "react-toastify";

interface CanvasProps {
  nodes: Node<NodeData>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Canvas({
  nodes,
  setNodes,
  edges,
  setEdges,
  setSelectedNodeId,
}: CanvasProps) {
  const { addNodes, screenToFlowPosition } = useReactFlow();
  // useCallback is use throughout so that no unnecessary recreation of items is made.
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;
      // Get the position of the current node using viewport for calculating position
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();

      const position = screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Creating a newNode of desired type(textNode)
      const newNode: Node<NodeData> = {
        id: uuidv4(),
        type: "textNode",
        position,
        data: { label: "" },
      };

      addNodes([newNode]);
    },
    [addNodes, screenToFlowPosition]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  // if the node is connected to another, then update it's connections
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // Upon clicking we store the node.id to use it in the SettingsPanel.tsx for input updation.
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node<NodeData>) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const handleSave = () => {
    const hasMultipleNodes = nodes.length > 1;

    // Identify target handles without connections:
    const targetHandles = nodes.map((node) => node.id);
    const connectedTargets = edges.map((edge) => edge.target);
    const unconnectedTargets = targetHandles.filter(
      (target) => !connectedTargets.includes(target)
    );

    // Save Work Functionality to track validity
    const multipleEmptyTargets = unconnectedTargets.length > 1;

    if (hasMultipleNodes && multipleEmptyTargets) {
      toast.error("One or more nodes have empty target handles.");
    } else {
      toast.success("Successfully saved the flow!");
    }
  };

  return (
    <div className="relative w-full h-[92vh]">
      <button
        onClick={handleSave}
        className="absolute top-2 right-2 z-10 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-3 py-1.5 rounded shadow transition cursor-pointer"
      >
        Save Work
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        fitView
        nodeTypes={{ textNode: TextNode }}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

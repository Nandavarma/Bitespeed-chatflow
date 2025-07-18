import { useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import Canvas from "./Canvas";
import NodePanel from "./NodePanel";
import SettingsPanel from "./SettingsPanel";
import type { NodeData } from "./TextNode";
import type { Node, Edge } from "@xyflow/react";

export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node<NodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    // Using the ReactFlowProvider(custom by react-flow) to maintain the state.
    <ReactFlowProvider>
      <div className="w-screen h-[92vh] flex">
        <div className="w-10/12">
          <Canvas
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            setSelectedNodeId={setSelectedNodeId}
          />
        </div>

        <div className="w-2/12 bg-gradient-to-b from-slate-800 to-slate-900 border-l border-slate-700 shadow-inner flex flex-col">
          <h1 className="text-gray-200 text-base font-semibold p-3 border-b border-slate-600">
            {selectedNodeId ? "Settings Panel" : "Node Panel"}
          </h1>

          {/* If there is a selectNodeId available, only then we display the settings panel for that node */}
          <div className="flex-1 overflow-y-auto p-2">
            {selectedNodeId ? (
              <SettingsPanel
                selectedNodeId={selectedNodeId}
                setSelectedNodeId={setSelectedNodeId}
                nodes={nodes}
                setNodes={setNodes}
              />
            ) : (
              <NodePanel />
            )}
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

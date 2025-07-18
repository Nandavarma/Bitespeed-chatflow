import type { Node } from "@xyflow/react";
import type { NodeData } from "./TextNode";

interface SettingsPanelProps {
  selectedNodeId: string;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  nodes: Node<NodeData>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;
}

export default function SettingsPanel({
  selectedNodeId,
  setSelectedNodeId,
  nodes,
  setNodes,
}: SettingsPanelProps) {
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (!selectedNode) return null;

  // If the id matches with the current, than we update the text with the input.
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newValue } }
          : node
      )
    );
  };

  const handleClose = () => {
    setSelectedNodeId(null);
  };

  return (
    <div className="p-4 bg-slate-900 rounded-xl shadow-md text-gray-100 w-full max-w-sm h-[30vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-200">Edit Node</h2>
        <button
          onClick={handleClose}
          className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors border border-red-400 hover:border-red-300 rounded px-2 py-0.5"
        >
          Close
        </button>
      </div>
      <textarea
        className="w-full h-[20vh] resize-none p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm text-gray-200 placeholder-gray-400 shadow-inner"
        value={selectedNode.data.label}
        onChange={handleChange}
        placeholder="Enter the message here..."
      />
    </div>
  );
}

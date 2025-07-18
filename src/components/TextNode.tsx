import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

export interface NodeData extends Record<string, unknown> {
  label: string;
}

export default function TextNode(props: NodeProps<NodeData>) {
  const { data } = props;
  // This creates singular nodes of type TextNode, each time you drag a node.
  return (
    <div className="bg-white rounded shadow p-2 border border-gray-300 w-fit max-w-[200px]">
      <div className="text-xs font-medium text-gray-800 text-center bg-sky-100 rounded px-1 py-0.5">
        Text Message
      </div>
      <div className="border-b border-gray-300 my-1" />
      {/* The data below contains the data entered in the settings panel. */}
      <div className="text-sm text-gray-700 text-center break-words max-w-[180px] whitespace-pre-wrap mx-auto">
        {data.label?.trim() || "Your Text Here"}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

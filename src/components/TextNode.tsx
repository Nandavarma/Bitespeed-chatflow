import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

export interface NodeData extends Record<string, unknown> {
  label: string;
}

// This creates singular nodes of type TextNode, each time you drag a node.
//@ts-expect-error props issue
export default function TextNode(props: NodeProps<NodeData>) {
  const { data } = props;

  // Runtime guard to avoid "unknown" issues
  //@ts-expect-error dependent on NodeData
  const label = typeof data.label === "string" ? data.label.trim() : "";

  return (
    <div className="bg-white rounded shadow p-2 border border-gray-300 w-fit max-w-[200px]">
      <div className="text-xs font-medium text-gray-800 text-center bg-sky-100 rounded px-1 py-0.5">
        Text Message
      </div>
      <div className="border-b border-gray-300 my-1" />
      <div className="text-sm text-gray-700 text-center break-words max-w-[180px] whitespace-pre-wrap mx-auto">
        {label || "Your Text Here"}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

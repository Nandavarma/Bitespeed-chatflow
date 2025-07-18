export default function NodePanel() {
  // Add more Node Types below if needed (Future use).
  const nodeTypes = [{ type: "textNode", label: "Text Message" }];

  // when a node is dragged we need to place the exact node into the canvas.
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    //   Display all the available node types
    <div className="flex flex-col gap-2 p-3 bg-slate-900 rounded-xl shadow-md w-full max-w-xs">
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="cursor-move bg-slate-700 text-gray-100 text-sm font-medium p-2 rounded-lg shadow hover:bg-slate-600 transition-colors text-center select-none"
          onDragStart={(e) => onDragStart(e, node.type)}
          draggable
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

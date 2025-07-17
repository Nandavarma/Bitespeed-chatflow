import Canvas from "./Canvas";
export default function FlowBuilder() {
  return (
    <div className="w-screen h-92vh flex">
      <div className="w-10/12">
        <Canvas />
      </div>
      <div className="w-2/12 bg-amber-400">
        <h1>nanda</h1>
      </div>
    </div>
  );
}

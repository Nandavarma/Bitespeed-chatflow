import Canvas from "./Canvas";
export default function FlowBuilder() {
  return (
    <div className="w-screen h-92vh flex">
      <div className="w-10/12">
        <Canvas />
      </div>
      <div className="w-2/12 bg-slate-700 flex flex-col">
        <h1 className="text-gray-200 text-lg m-2 p-2 font-semibold border-b-1 border-gray-400">
          Node Panel
        </h1>
      </div>
    </div>
  );
}

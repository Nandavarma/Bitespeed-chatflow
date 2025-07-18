import "./App.css";
import Header from "./components/Header";
import FlowBuilder from "./components/FlowBuilder";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <FlowBuilder />
    </div>
  );
}

export default App;

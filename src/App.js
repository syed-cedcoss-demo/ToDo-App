import { ToastContainer } from "react-toastify";
import TableView from "./components/home/TableView";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      <TableView />
    </div>
  );
}

export default App;

import "./App.css";
import DummyData from "./components/DummyData";
import AddData from "./components/AddData";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DummyData />} />
        <Route path="/addData" element={<AddData />} />
      </Routes>
    </BrowserRouter>
       
      
    </>
  );
}

export default App;

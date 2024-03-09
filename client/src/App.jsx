import "./App.css";
import DummyData from "./components/DummyData";
import AddData from "./components/AddData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateData from "./components/UpdateData";
import LoginPage from "./components/Login";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DummyData />} />
        <Route path="/addData" element={<AddData />} />
        <Route path="/updateData/:id" element={<UpdateData />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
       
      
    </>
  );
}

export default App;

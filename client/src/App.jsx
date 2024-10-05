import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
function App() {

  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}

export default App;



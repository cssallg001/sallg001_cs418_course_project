import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import TwoFactorAuthentication from "./components/TwoFactorAuthentication";
import ResetPassword from "./components/ResetPassword";
function App() {

  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/authentication" element={<TwoFactorAuthentication/>}/>
    <Route path="/resetPassword" element={<ResetPassword/>}/>
    </Routes>
  );
}

export default App;



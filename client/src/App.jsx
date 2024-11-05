import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/Register";
import TwoFactorAuthentication from "./components/TwoFactorAuthentication";
import ForgotUserPassword from "./components/ForgotUserPassword.jsx";
import MYSQLTesting from "./components/mysqlTesting.jsx";
import AdvisingPortal from "./components/AdvisingPortal.jsx";
import PrerequisiteForm from "./components/PrerequisiteForm.jsx";

function App() {

  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/adminDashboard" element={<AdminDashboard/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/authentication" element={<TwoFactorAuthentication/>}/>
    <Route path="forgotUserPassword" element={<ForgotUserPassword/>}/>
    <Route path="/msqlTesting" element={<MYSQLTesting/>}/>
    <Route path="/advisingPortal" element={<AdvisingPortal/>}/>
    <Route path="/prerequisiteForm" element={<PrerequisiteForm/>}/>
    </Routes>
  );
}

export default App;



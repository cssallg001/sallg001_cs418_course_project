import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();


  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = "/public/home.png";
  }, []);










  function handleLoginPage() {
    navigate("/login");
  }

  function handleRegistrationPage() {
    navigate("/register");
  }

  function handleAboutPage() {
    navigate("/about");
  }

  function handleMySQLPage() {
    navigate("/msqlTesting");
  }

  return (
    <div className="mysqltesting-container">
      <div className="container">
        <div className="Title">
          <h1 className="text-center">Home</h1>
          <form onSubmit={handleLoginPage}>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <form onSubmit={handleRegistrationPage}>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <form onSubmit={handleAboutPage}>
            <button type="submit" className="btn btn-primary">
              About
            </button>
          </form>
          <form onSubmit={handleMySQLPage}>
            <button type="submit" className="btn btn-primary">
              MySQL Testing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

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
    link.href = "/public/about.png";
  }, []);


  function handleBackPage() {
    navigate("/home");
  }

  return (
    <div className="mysqltesting-container">
      <div className="container">
        <div className="Title">
          <h1 className="text-center">About</h1>

          <p>CS 418 Course Project</p>
          <p>By Sean Allgaier</p>

          <form onSubmit={handleBackPage}>
            <button type="submit" className="btn btn-createAccount">
              Go back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

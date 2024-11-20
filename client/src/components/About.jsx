import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = "/public/about.png";
  }, []);

  useEffect(() => {
    document.title = "About - Course Advising";
  }, []);

  function handleBackPage() {
    navigate("/home");
  }

  return (
    <div className="mysqltesting-container">
      <div className="Title">
        <div className="mysqltesting-menu-container">
          <h1 className="text-center">About</h1>
          <form onSubmit={handleBackPage}>
            <button type="submit" className="btn btn-createAccount">
              Go back
            </button>
          </form>
        </div>
      </div>
      <div className="advising-portal-container">
        <h2 className="text-center">CS 418 Course Project</h2>
        <h2 className="text-center">By Sean Allgaier</h2>
      </div>
    </div>
  );
}

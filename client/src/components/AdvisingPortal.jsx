import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function AdvisingPortal() {
  const navigate = useNavigate();

  function handleAdvisingHistory() {
    navigate("/advisingHistory");
  }
  function handleAdvisingRequest() {
    navigate("/advisingRequest");
  }
  function handleBackPage() {
    navigate("/dashboard");
  }

  return (
    <div className="mysqltesting-container">
      <div className="Title">
        <div className="mysqltesting-menu-container">
          <h1 className="text-center">Advising Portal</h1>
          <form onSubmit={handleAdvisingHistory}>
            <button type="submit" className="btn btn-createAccount">
              Advising History
            </button>
          </form>
          <form onSubmit={handleAdvisingRequest}>
            <button type="submit" className="btn btn-createAccount">
              Advising Request
            </button>
          </form>
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

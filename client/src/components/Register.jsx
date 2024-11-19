import React, { useRef, useState, useEffect } from "react";
import ReCaptcha from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = "/public/reg.png";
  }, []);

  useEffect(() => {
    document.title = "Register - Course Advising"
 }, []);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword1, setEnteredPassword1] = useState("");
  const [enteredPassword2, setEnteredPassword2] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const [userStateVal, setUserStateVal] = useState(false);
  const [errVal, setErrVal] = useState("");

  const [adminStateVal, setAdminStateVal] = useState("");

  const [confirmedPassword, setConfirmedPassword] = useState("");

  const refRecaptcha = useRef(null);

  /* 
        if userStateVal == 0, user came from registration screen
        else if userStateVal == 1, user came from login screen
        else, userStateVal is invalid
    */
  /* 
        if errVal === 0, passwords don't match
        else if errVal === 1, email already in use
        else, errVal is invalid
    */

  const handleRegister = async (e) => {
    e.preventDefault();

    const currentValue = refRecaptcha.current.getValue();

    if (!currentValue) {
      alert("Verify you are human!");
    } else {
      try {
        if (enteredPassword1 !== enteredPassword2) {
          setErrVal(0);
          throw new Error("Error: Passwords do not match");
        } else {
          setConfirmedPassword(enteredPassword1);
          const formBody = JSON.stringify({
            email: enteredEmail,
          });

          //const response= await fetch(import.meta.env.VITE_API_KEY + '/user/verifyIfEmailExists',{
          //const response= await fetch('http://localhost:8080/user/verifyIfEmailExists',{
          const response = await fetch(
            "https://sallg001-cs418-course-project.onrender.com/user/verifyIfEmailExists",
            {
              method: "POST",
              body: formBody,
              headers: {
                "content-type": "application/json",
              },
            }
          );

          if (!response.ok) {
            setErrVal(1);
            throw new Error("Registration failed: Email already in use"); // Handle HTTP errors
          }

          const data = await response.json();
          console.log("Fetched user data:", data); // Log the fetched data

          if (data.message === "Email is available") {
            // Check if Registration is successful
            // If registration is successful, redirect to the authentication page
            //setPasswordError("Current password is incorrect");
            setUserStateVal(false);
            setAdminStateVal(0);
            localStorage.setItem("storedUserData", JSON.stringify(data.user));
            localStorage.setItem("storedEmail", enteredEmail);
            localStorage.setItem("storedFirstName", enteredFirstName);
            localStorage.setItem("storedLastName", enteredLastName);
            localStorage.setItem(
              "storedUserStateVal",
              JSON.stringify(userStateVal)
            );
            localStorage.setItem(
              "storedAdminStateVal",
              JSON.stringify(adminStateVal)
            );
            localStorage.setItem("storedConfirmedPassword", enteredPassword1);
            console.log("userStateVal = " + userStateVal);
            navigate("/authentication");
          } else {
            // Show error message if registration fails
            console.log("Error: Email already in use. Please try again.");
            setErrorMessage("Error: Email already in use. Please try again.");
          }
        }
      } catch (error) {
        if (errVal === 0) {
          console.error("Registration Error: Passwords do not match", error);
          setErrorMessage("Error: Passwords do not match");
        } else if (errVal === 1) {
          console.error("Registration Error: Email already in use", error);
          setErrorMessage("Error: Email already in use. Please try again.");
        }
      }
    }
  };

  function handleBackPage() {
    navigate("/home");
  }

  return (
    <div className="mysqltesting-container">
      <div className="container mt-5">
        <h1 className="Title">
          <h1 className="text-center">Register</h1>
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">First Name: </label>
            <input
              type="text"
              className="form-control"
              value={enteredFirstName}
              onChange={(e) => setEnteredFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name: </label>
            <input
              type="text"
              className="form-control"
              value={enteredLastName}
              onChange={(e) => setEnteredLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email: </label>
            <input
              type="email"
              className="form-control"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password: </label>
            <input
              type="Password"
              className="form-control"
              value={enteredPassword1}
              onChange={(e) => setEnteredPassword1(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password: </label>
            <input
              type="Password"
              className="form-control"
              value={enteredPassword2}
              onChange={(e) => setEnteredPassword2(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <div className="form_group_recaptcha">
            <ReCaptcha
              required
              sitekey={import.meta.env.VITE_SITE_KEY}
              ref={refRecaptcha}
            ></ReCaptcha>
          </div>
        </form>
        <form onSubmit={handleRegister}>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <form onSubmit={handleBackPage}>
          <button type="submit" className="btn btn-createAccount">
            Go back
          </button>
        </form>
      </div>
    </div>
  );
}

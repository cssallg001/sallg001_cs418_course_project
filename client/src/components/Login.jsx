import React, { useRef, useState, useEffect } from "react";
import ReCaptcha from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const navigate = useNavigate();
  const [userStateVal, setUserStateVal] = useState(true);
  const [adminStateVal, setAdminStateVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");
  const refRecaptcha = useRef(null);

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = "/public/login.png";
  }, []);

  useEffect(() => {
    document.title = "Login - Course Advising";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const currentValue = refRecaptcha.current.getValue();

    if (!currentValue) {
      alert("Verify you are human!");
    } else {
      try {
        const formBody = JSON.stringify({
          email: enteredEmail,
          Password: enteredPassword,
        });

        //const response= await fetch('http://localhost:8080/user/login',{
        const response = await fetch(
          "https://sallg001-cs418-course-project.onrender.com/user/login",
          {
            //const response= await fetch(import.meta.env.VITE_API_KEY + '/user/login',{
            method: "POST",
            body: formBody,
            headers: {
              "content-type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Login failed"); // Handle HTTP errors
        }

        const data = await response.json();
        console.log("Fetched user data:", data); // Log the fetched data

        console.log("Login Screen:");
        console.log("    Email: " + enteredEmail);
        console.log("    Password: " + enteredPassword);

        if (data.message === "isAdmin") {
          setAdminStateVal("1");
        }

        // Check if login is successful
        if (data.message === "user logged in successfully") {
          // If login is successful, redirect to the authentication page

          console.log("    UserID: " + data.data[0].user_id);
          console.log("    UserID: " + JSON.stringify(data.data[0].user_id));
          console.log("    UserID: " + parseInt(data.data[0].user_id));

          setUserStateVal(true);
          localStorage.setItem("storedUserData", JSON.stringify(data.user));
          localStorage.setItem(
            "storedUserID",
            JSON.stringify(parseInt(data.data[0].user_id)),
          );
          localStorage.setItem("storedUserData", JSON.stringify(data.user));
          localStorage.setItem("storedUserStateVal", userStateVal);
          localStorage.setItem("storedEmail", enteredEmail);
          localStorage.setItem("storedConfirmedPassword", enteredPassword);
          localStorage.setItem(
            "storedAdminStateVal",
            JSON.stringify(adminStateVal),
          );
          console.log("userStateVal = " + userStateVal);
          console.log("adminStateVal = " + adminStateVal);
          navigate("/authentication");
        } else {
          // Show error message if login fails
          console.log("Invalid credentials. Please try again.");
          setErrorMessage("Invalid credentials. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("Invalid Credentials. Please try again.");
      }
    }
  };

  function handleBackPage() {
    navigate("/home");
  }

  function handleForgotPassword() {
    navigate("/forgotUserPassword");
  }

  return (
    <div className="mysqltesting-container">
      <div className="Title">
        <div className="mysqltesting-menu-container">
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleBackPage}>
            <button type="submit" className="btn btn-createAccount">
              Go back
            </button>
          </form>
        </div>
      </div>
      <div className="advising-portal-container">
        <form onSubmit={handleLogin}>
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
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
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

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <form onSubmit={handleForgotPassword}>
          <button type="submit" className="btn btn-createAccount">
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
}

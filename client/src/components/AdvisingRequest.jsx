import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReCaptcha from "react-google-recaptcha";
import "../index.css";

export default function AdvisingRequest() {
  const navigate = useNavigate();

  const [lastTerm, setLastTerm] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [lastGPA, setLastGPA] = useState("");

  const [courseArray, setCourseArray] = useState([]);
  const [prereqArray, setPrereqArray] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [subErrorMessage, setSubErrorMessage] = useState("");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [userID, setUserID] = useState("");

  const [invalidOutputPrereq, setInvalidOutputPrereq] = useState(false);
  const [invalidOutputCourses, setInvalidOutputCourses] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState("Pending");

  const [nextAdvisingID, setNextAdvisingID] = useState(0);

  const [clickStatus, setClickStatus] = useState(false);

  const [maxAdvisingID, setMaxAdvisingID] = React.useState([
    {
      id: "",
    },
  ]);

  const refRecaptcha = useRef(null);

  useEffect(() => {
    const fetchLargestAdvisingID = async () => {
      const response = await fetch(
        //http://localhost:8080/user_registration/yoink_advising_id"
        "https://sallg001-cs418-course-project.onrender.com/user_registration/yoink_advising_id",
        //import.meta.env.VITE_API_KEY + '/user_registration/yoink_advising_id'
      );
      const data = await response.json();
      setMaxAdvisingID(data.data[0].advisingID);
      setNextAdvisingID(parseInt(data.data[0].advisingID) + 1);

      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const concatDate = year + "-" + month + "-" + day;

      console.log("concatDate = " + concatDate);
    };
    fetchLargestAdvisingID();
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("storedEmail");
    if (storedEmail) {
      const parsedData = storedEmail;
      setEnteredEmail(parsedData);
    }
  }, []);

  useEffect(() => {
    const storedID = localStorage.getItem("storedUserID");
    if (storedID) {
      const parsedData = storedID;
      setUserID(parsedData);
    }
  }, []);

  function hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }

  function hasMatchingValues(arr1, arr2) {
    return arr1.some((value) => arr2.includes(value));
  }

  // Section that sets prereq information for the dropdown menus
  const [prereqOptions, setPrereqOptions] = useState([]);
  const [prereqRows, setPrereqRows] = React.useState([
    {
      dropdown: "",
    },
  ]);

  const handlePrereqInputChange = (e, index) => {
    const values = [...prereqRows];

    if (e.target.id === "dropdown") {
      values[index].dropdown = (parseInt(e.target.value) - 1).toString();
      values[index].dropdown = (parseInt(e.target.value) - 1).toString();
    }
    setPrereqRows(values);
    setPrereqArray(values.dropdown);
    console.log(prereqRows);
  };

  const handlePrereqAddRow = () => {
    setPrereqRows([
      ...prereqRows,
      {
        dropdown: "",
      },
    ]);

    setCourseArray(...prereqRows.dropdown);
  };

  useEffect(() => {
    const fetchPrereqData = async () => {
      const response = await fetch(
        //http://localhost:8080/prerequisites/prereqAdvisingPortalRequest"
        "https://sallg001-cs418-course-project.onrender.com/prerequisites/prereqAdvisingPortalRequest",
        //import.meta.env.VITE_API_KEY + '/prerequisites/prereqAdvisingPortalRequest'
      );
      const data = await response.json();

      const formattedOptions = data.data.map((prereqData) => ({
        value: prereqData.prereq_id,
        label: prereqData.prereqName,
      }));

      setPrereqOptions(formattedOptions);
    };

    fetchPrereqData();
  }, []);

  // Section that sets course information
  const [courseOptions, setCourseOptions] = useState([]);
  const [courseRows, setCourseRows] = React.useState([
    {
      dropdown: "",
    },
  ]);

  const handleCourseInputChange = (e, index) => {
    const values = [...courseRows];

    if (e.target.id === "dropdown") {
      values[index].dropdown = e.target.value;
    }
    setCourseRows(values);
    //setCourseArray(JSON.stringify(courseRows.dropdown))
    console.log(courseRows);
    //setCourseArray(JSON.parse(courseRows));
  };

  const handleCourseAddRow = () => {
    setCourseRows([
      ...courseRows,
      {
        dropdown: "",
      },
    ]);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await fetch(
        //import.meta.env.VITE_API_KEY + '/course/courseAdvisingPortalRequest'
        //'http://localhost:8080/prerequisites/course/courseAdvisingPortalRequest'
        "https://sallg001-cs418-course-project.onrender.com/course/courseAdvisingPortalRequest",
      );
      const data = await response.json();

      const formattedOptions = data.data.map((courseData) => ({
        value: courseData.course_id,
        label: courseData.courseName,
      }));

      setCourseOptions(formattedOptions);
    };

    fetchCourseData();
  }, []);

  function handleBackPage() {
    navigate("/advisingPortal");
  }

  const handleAdvisingEntryInformation = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  };

  const [selectedPrereqOptions, setSelectedPrereqOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCourseArray([]);
    setPrereqArray([]);
    setErrorMessage("");
    setSubErrorMessage("");

    setInvalidOutputCourses(false);
    setInvalidOutputPrereq(false);

    console.log("maxAdvisingID = " + maxAdvisingID);
    console.log("nextAdvisingID = " + nextAdvisingID);

    //var i = 0;

    try {
      // if (numClicks <= 0) {
      //   const url = 'https://sallg001-cs418-course-project.onrender.com/user/' + enteredEmail;
      //   //const url = 'http://localhost:8080/user/' + enteredEmail;
      //   //const url = import.meta.env.VITE_API_KEY + '/user/' + enteredEmail;
      //   1
      //   const response = await fetch(url);
      //   if (!response.ok) {
      //     throw new Error("Error occured");
      //   }
      //   const emailData = await response.json();
      //   setUserID(parseInt(emailData.data[0].ID));
      //   setUserID(parseInt(emailData.data[0].ID));
      //   setNumClicks(numClicks+1);
      //   throw new Error     ("Please try again");
      // }

      // const url = 'https://sallg001-cs418-course-project.onrender.com/user/' + enteredEmail;
      // //const url = 'http://localhost:8080/user/' + enteredEmail;
      // //const url = import.meta.env.VITE_API_KEY + '/user/' + enteredEmail;

      // const response = await fetch(url);
      // if (!response.ok) {
      //   throw new Error("Error occured");
      // }
      // const emailData = await response.json();
      // setUserID(parseInt(emailData.data[0].ID));
      // setUserID(parseInt(emailData.data[0].ID));

      let outputCourses = [];
      let outputPrereqs = [];

      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const concatDate = year + "-" + month + "-" + day;

      console.log("concatDate = " + concatDate);

      //setUserID('');

      //console.log("URL = " + url);

      console.log("userID = " + userID);
      console.log("enteredEmail = " + enteredEmail);
      console.log("userID = " + userID);
      console.log("enteredEmail = " + enteredEmail);

      //console.log("Test of all tests #1: " + prereqRows[0].dropdown);

      for (var h = 0; h < prereqRows.length; h++) {
        outputPrereqs.push(prereqRows[h].dropdown + 1);
      }
      for (var j = 0; j < courseRows.length; j++) {
        outputCourses.push(courseRows[j].dropdown);
      }
      console.log("outputPrereqs: " + outputPrereqs);
      console.log("outputCourses: " + outputCourses);

      for (var k = 0; k < outputPrereqs.length; k++) {
        if (outputPrereqs[k] === "" || outputPrereqs[k] === "NaN") {
          console.log("outputPrereqs[" + k + "] === invalid input");
          setInvalidOutputPrereq(true);
          break;
        } else {
          console.log("outputPrereqs[" + k + "] === valid input");
          setInvalidOutputPrereq(false);
        }
        console.log("invalidOutputPrereq = " + invalidOutputPrereq);
      }

      for (var l = 0; l < outputCourses.length; l++) {
        if (outputCourses[l] === "" || outputCourses[l] === "NaN") {
          console.log("outputCourses[" + l + "] === invalid input");
          setInvalidOutputCourses(true);
          break;
        } else {
          console.log("outputCourses[" + l + "] === valid input");
          setInvalidOutputCourses(false);
        }
        console.log("invalidOutputCourses = " + invalidOutputCourses);
      }

      console.log("invalidOutputPrereq (final) = " + invalidOutputPrereq);
      console.log("invalidOutputCourses (final) = " + invalidOutputCourses);

      console.log("lastTerm = " + lastTerm);
      console.log("currentTerm = " + currentTerm);
      console.log("Last GPA = " + lastGPA);
      console.log("userID = " + userID);
      console.log("enteredEmail = " + enteredEmail);

      if (currentTerm === lastTerm) {
        setSubErrorMessage(
          "The last term cannot be the same as the current term. Please try again",
        );
        throw new Error(
          "The last term cannot be the same as the current term. Please try again",
        );
      } else if (
        invalidOutputPrereq === true &&
        invalidOutputCourses === true
      ) {
        setSubErrorMessage(
          "Invalid courses and prerequisite input. Please try again",
        );
        throw new Error(
          "Invalid courses and prerequisite input. Please try again",
        );
      } else if (
        invalidOutputCourses === true &&
        invalidOutputPrereq === false
      ) {
        setSubErrorMessage("Invalid courses input. Please try again");
        throw new Error("Invalid courses input. Please try again");
      } else if (
        invalidOutputCourses === false &&
        invalidOutputPrereq === true
      ) {
        setSubErrorMessage("Invalid prerequisite input. Please try again");
        throw new Error("Invalid prerequisite input. Please try again");
      } else if (hasMatchingValues(outputCourses, outputPrereqs)) {
        setSubErrorMessage(
          "Courses and prerequisites can't be the same. Please try again",
        );
        throw new Error(
          "Courses and prerequisites can't be the same. Please try again",
        );
      } else if (hasDuplicates(outputPrereqs)) {
        setSubErrorMessage("Can't choose duplicate courses. Please try again");
        throw new Error("Can't choose duplicate courses. Please try again");
      } else if (hasDuplicates(outputCourses)) {
        setSubErrorMessage(
          "Can't choose duplicate prerequisites. Please try again",
        );
        throw new Error(
          "Can't choose duplicate prerequisites. Please try again",
        );
      }

      setStatus("Pending");

      //api POST request to fill in the "course_mapping" table
      try {
        for (var i = 0; i < outputCourses.length; i++) {
          const formBody = JSON.stringify({
            advising_id: nextAdvisingID,
            course_id: outputCourses[i],
          });
          const response = await fetch(
            "https://sallg001-cs418-course-project.onrender.com/user_registration/updateCourseMapping",
            {
              method: "POST",
              body: formBody,
              headers: {
                "content-type": "application/json",
              },
            },
          );
          if (!response.ok) {
            throw new Error(
              "Error occured while adding courses to advising records. Please try again.",
            );
          }
        }

        // api POST request to fill in the "prereq_mapping" table
        try {
          for (var a = 0; a < outputPrereqs.length; a++) {
            const formBody = JSON.stringify({
              advising_id: nextAdvisingID,
              prereq_id: outputPrereqs[a],
            });
            const response = await fetch(
              "https://sallg001-cs418-course-project.onrender.com/user_registration/updatePrereqMapping",
              {
                method: "POST",
                body: formBody,
                headers: {
                  "content-type": "application/json",
                },
              },
            );
            if (!response.ok) {
              throw new Error(
                "Error occured while adding courses to advising records. Please try again.",
              );
            }
          }
          // api POST request to fill in the "records" table
          try {
            const formBody = JSON.stringify({
              userID: userID,
              last_term: lastTerm,
              last_gpa: lastGPA,
              currentTerm: currentTerm,
              status: status,
              date_submitted: concatDate,
            });

            const response = await fetch(
              "https://sallg001-cs418-course-project.onrender.com/user_registration/updateRecords",
              {
                method: "POST",
                body: formBody,
                headers: {
                  "content-type": "application/json",
                },
              },
            );
            if (!response.ok) {
              throw new Error(
                "Error occured while adding user information to advising records. Please try again.",
              );
            }
            setClickStatus(true);
          } catch (error) {
            console.error("", error);
            setErrorMessage("" + error);
          }
        } catch (error) {
          console.error("", error);
          setErrorMessage("" + error);
        }
      } catch (error) {
        console.error("", error);
        setErrorMessage("" + error);
      }

      setSuccessMessage(
        "Registration information saved successfully! Redirecting to advising history...",
      );
      setTimeout(handleRedirecting, 1500);
    } catch (error) {
      console.error("", error);
      setErrorMessage("" + error);
    }
  };

  function handleRedirecting() {
    navigate("/advisingHistory");
  }

  return (
    <div className="mysqltesting-container">
      <div className="Title">
        <div className="mysqltesting-menu-container">
          <h1 className="text-center">Advising Request</h1>
          <form onSubmit={handleBackPage}>
            <button type="submit" className="btn btn-createAccount">
              Go back
            </button>
          </form>
        </div>
      </div>
      <div className="advising-portal-container">
        <div className="Title">
          <div className="Title">
            <div className="advising-user-information">
              <div className="testResultOutput">
                <h1 className="text-center">Enter your information:</h1>
                <div className="testResultOutput">
                  <div className="mb-3">
                    <label className="form-label">Last Term: </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setLastTerm(e.target.value)}
                      required
                    />
                  </div>
                  <label className="form-label">Last GPA: </label>
                  <input
                    type="number"
                    id="number-input"
                    step="0.1"
                    min="0"
                    max="4.0"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setLastGPA(e.target.value)}
                    required
                  />
                  <div className="mb-3">
                    <label className="form-label">Current Term: </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setCurrentTerm(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Title">
          <div className="prequisite-choices">
            <div className="testResultOutput">
              <h1 className="text-center">
                <p>Choose your prerequisites:</p>
              </h1>
              <div className="testResultOutput">
                <div>
                  <div>
                    {prereqRows.map((prereqRow, index) => (
                      <div key={index}>
                        <select
                          required
                          //showSearch={true}
                          id="dropdown"
                          onChange={(e) => handlePrereqInputChange(e, index)}
                          defaultValue={"-- select an option --"}
                        >
                          <option selected value>
                            {"-- select an option --"}
                          </option>
                          {prereqOptions.map((prereqOptions) => (
                            <option
                              key={prereqOptions.value}
                              value={prereqOptions.value}
                              label={prereqOptions.label}
                            ></option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  <button onClick={handlePrereqAddRow}>Add Prerequisite</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Title">
          <div className="course-plan-information">
            <div className="testResultOutput">
              <h1 className="text-center">Choose your courses:</h1>
              <div className="testResultOutput">
                <div>
                  <div>
                    {courseRows.map((courseRow, index) => (
                      <div key={index}>
                        <select
                          // showSearch={true}
                          required
                          id="dropdown"
                          onChange={(e) => handleCourseInputChange(e, index)}
                          defaultValue={"-- select an option --"}
                        >
                          <option selected value>
                            {"-- select an option --"}
                          </option>
                          {courseOptions.map((courseOptions) => (
                            <option
                              key={courseOptions.value}
                              value={courseOptions.value}
                              label={courseOptions.label}
                            ></option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleCourseAddRow}>Add Course</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}

        {/* {clickStatus ? (
          <button type="submit" className="large-btn" disabled>
          Submit
          </button>
          ) : ( */}
        <form onSubmit={handleSubmit}>
          <button type="submit" className="large-btn">
            Submit
          </button>
          {/* )} */}
        </form>
      </div>
    </div>
  );
}

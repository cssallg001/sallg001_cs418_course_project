import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function AdvisingPortal() {
  const navigate = useNavigate();

  const[lastTerm, setLastTerm] = useState('');
  const[currentTerm, setCurrentTerm] = useState('');
  const[lastGPA, setLastGPA] = useState('');

  const[courseArray, setCourseArray] = useState([]);
  const[prereqArray, setPrereqArray] = useState([]);
  
  const[successMessage, setSuccessMessage] = useState('');
  const[errorMessage, setErrorMessage] = useState('');

  function hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }

  function hasMatchingValues(arr1, arr2) {
    return arr1.some(value => arr2.includes(value));
  }

  // Section that sets prereq information
  const [prereqOptions, setPrereqOptions] = useState([]);
  const [prereqRows, setPrereqRows] = React.useState([
    {
      prereqDropdown: "",
      prereqValues: "",
      prereqLabels: ""
    },
  ]);

  const handlePrereqInputChange = (e, index) => { 
    const values = [...prereqRows];

    if (e.target.id === "prereqDropdown") {
      values[index].prereqValues = (parseInt(e.target.value)-1).toString();
      values[index].prereqLabels = e.target.label;
    }
    setPrereqRows(values);
    console.log(prereqRows);
  };

  const handlePrereqAddRow = () => {
    setPrereqRows([
      ...prereqRows,
      {
        prereqDropdown: "",
        prereqValues: "",
        prereqLabels: ""
      },
    ]);
  };

  useEffect(() => {
    const fetchPrereqData = async () => {
      const response = await fetch(
        //http://localhost:8080/prerequisites/prereqAdvisingPortalRequest"
        'https://sallg001-cs418-course-project.onrender.com/prerequisites/prereqAdvisingPortalRequest'
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
        courseDropdown: ""
    },
  ]);

  const handleCourseInputChange = (e, index) => {
    const values = [...courseRows];

    if (e.target.id === "courseDropdown") {
      values[index].courseDropdown = e.target.value;
    }
    setCourseRows(values);
    setCourseArray(JSON.stringify(courseRows.courseDropdown))
    console.log(courseRows);
  };

  const handleCourseAddRow = () => {
    setCourseRows([
      ...courseRows,
      {
        courseDropdown: ""
      },
    ]);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await fetch(
        //import.meta.env.VITE_API_KEY + '/course/courseAdvisingPortalRequest'
        //'http://localhost:8080/prerequisites/course/courseAdvisingPortalRequest'
        'https://sallg001-cs418-course-project.onrender.com/course/courseAdvisingPortalRequest'
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
    navigate("/dashboard");
  }
 
  const handleAdvisingEntryInformation = async (e) => {
    e.preventDefault();
    setAllSQLSuccessMessage("");
    setAllSQLErrorMessage("");
  };

  const [selectedPrereqOptions, setSelectedPrereqOptions] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLastTerm('');
    setCurrentTerm('');
    setLastGPA('');
    setCourseArray([]);
    setPrereqArray([]);



    try {
        // console.log("courseRows = " + <JSON className="stringify">  </JSON>(courseRows.courseDropdown));
        //setCourseArray(courseRows);
        console.log("courseArray = " + courseArray);


        if (prereqRows) {
            setPrereqArray(JSON.parse(prereqRows));
            console.log(prereqArray);
        }


        // if (hasMatchingValues())
        // {

        // }


 




 



 















        const formBody=JSON.stringify({
            email:enteredEmail,
            Password:enteredPassword
        })

        const response= await fetch('',{
            method:"POST",
            body:formBody,
            headers:{
                'content-type':'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error saving advising information');
        }












        const data = await response.json();











        if (data.message === "isAdmin") {
            setAdminStateVal('1');
        }












         else {
            // Show error message if login fails
            console.log('Error. Please try again.');
            setErrorMessage('Error. Please try again.');
        }











    } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('Invalid Credentials. Please try again.');
        setCourseArray([]);
        setPrereqArray([]);
    }

};










































































  return (
    <div className="mysqltesting-container">
      <div className="Title">
        <div className="mysqltesting-menu-container">
          <h1 className="text-center">Advising Portal</h1>
          <form onSubmit={handleBackPage}>
            <button type="submit" className="btn btn-createAccount">
              Go back
            </button>
          </form>
        </div>
      </div>
      <div className="advising-portal-container">
        <form onSubmit={handleAdvisingEntryInformation}>
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
                  {/* <DynamicPrereqButtonTable />   */}
                  <div>
                    <div>
                      {prereqRows.map((prereqRow, index) => (
                        <div key={index}>
                          <select
                            id="prereqDropdown"
                            onChange={(e) => handlePrereqInputChange(e, index)}
                            defaultValue={"-- select an option --"}
                          >
                            <option disabled selected value>
                              {"-- select an option --"}
                            </option>
                            {prereqOptions.map((prereqOptions) => (
                              <option
                                key={prereqOptions.value}
                                value={prereqOptions.value}
                                label={prereqOptions.label}
                              >
                              </option>
                            ))}
                          </select>
                        </div>
                      ))} 
                    </div>
                    <button onClick={handlePrereqAddRow}>
                      Add Prerequisite
                    </button>
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
                  {/* <DynamicCourseButtonTable /> */}
                  <div>
                    <div>
                      {courseRows.map((courseRow, index) => (
                        <div key={index}>
                          <select
                            id="courseDropdown"
                            onChange={(e) => handleCourseInputChange(e, index)}
                            defaultValue={"-- select an option --"}
                          >
                            <option disabled selected value>
                              {"-- select an option --"}
                            </option>
                            {courseOptions.map((courseOptions) => (
                              <option
                                key={courseOptions.value}
                                value={courseOptions.value}
                                label={courseOptions.label}
                              >
                              </option>
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
        </form>










































































        <form onSubmit={handleSubmit}>
            <button type="submit" className="large-btn">
                Submit
            </button>
        </form>




















































































      </div>
    </div>
  );
}

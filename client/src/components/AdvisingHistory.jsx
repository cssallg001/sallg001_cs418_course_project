import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function AdvisingHistory() {
  const navigate = useNavigate();


  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = "/public/user.png";
  }, []);


  
  function handleBackPage() {
    navigate("/advisingPortal");
  }

  function resetPage() {
    //setAdvisingHistoryReveal(false);
    window.location.reload();
  }

  const [userID, setUserID] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingPrereqs, setLoadingPrereqs] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [advisingData, setAdvisingData] = useState([]);
  const [advisingPrereqData, setAdvisingPrereqData] = useState([]);
  const [advisingCourseData, setAdvisingCourseData] = useState([]);

  const [advisingIDList, setAdvisingIDList] = useState([]);

  const [advisingHistoryReveal, setAdvisingHistoryReveal] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(false);

  const [advisingID, setAdvisingID] = useState("");

  const [editingState, setEditingState] = useState(false);
  const [prereqEditingState, setPrereqEditingState] = useState(false);
  const [courseEditingState, setCourseEditingState] = useState(false);




  //const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const storedID = localStorage.getItem("storedUserID");
    if (storedID) {
      const parsedData = storedID;
      setUserID(parsedData);
    }
  }, []);

  useEffect(() => {
    const storedID = localStorage.getItem("storedUserID");
    if (storedID) {
      const parsedData = storedID;
      setUserID(parsedData);
      //outputAdvisingHistory();
    }
  }, []);

  useEffect(() => {
    console.log("advisingHistoryReveal = " + advisingHistoryReveal);
    console.log(approvalStatus)
    const coursePrereqsDiv = document.getElementById("Course&PrereqOutputs");
    const editingDiv = document.getElementById("Course&PrereqEditing");
    const prereqsEditingDiv = document.getElementById("prereqEditing");
    const courseEditingDiv = document.getElementById("courseEditing");


    if (advisingHistoryReveal) {
      coursePrereqsDiv.style.display = "block";
    } else {
      coursePrereqsDiv.style.display = "none";
    }




  });

  function formatDate(mysqlDate) {
    const date = new Date(mysqlDate); // Convert MySQL date string to Date object

    // Use the Date object's methods to format the date
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`; // Customize the format as needed
  }

  useEffect(() => {
    const outputAdvisingHistory = async () => {
      setSuccessMessage("");
      setErrorMessage("");
      const storedID = localStorage.getItem("storedUserID");
      if (storedID) {
        const parsedData = storedID;
        setUserID(parsedData);
      }
      try {
        setLoadingHistory(true);

        console.log("userID = " + storedID);

        console.log("data fetch");
        const url =
          "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/" +
          storedID;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error occured");
        }
        const data = await response.json();

        data.data.forEach((item) => {
          const formattedDate = formatDate(item.date_submitted);
          item.date_submitted = formattedDate;
          console.log(formattedDate);

          advisingIDList.push(item.advising_id);
          console.log("advising_id = " + item.advising_id);
        });

        setAdvisingData(data.data);
        setLoadingHistory(false);
        console.log("Success!");
        setSuccessMessage("Success!");
      } catch (error) {
        setErrorMessage("Error occurred: Please try again");
      }
    };
    outputAdvisingHistory();
  }, []);

  const outputAdvisingHistoryPrereqs = async (e, id) => {
    //e.preventDefault();
    console.log("advisingID = " + id);

    setSuccessMessage("");
    setErrorMessage("");

    // for (var i = 0; i < advisingIDList.length; i++)
    //   {
    try {
      setLoadingPrereqs(true);
      // const id = advisingIDList[i];

      //console.log("advising_id [" + i + "] = " + advisingIDList[i]);

      //const id = advisingIDList[index];
      console.log("id = " + id);
      const url =
        "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/prereqs/" +
        String(id);
      const response = await fetch(url);

      console.log("prereq url = " + url);

      if (!response.ok) {
        throw new Error("Error occured");
      }
      const data = await response.json();
      setAdvisingPrereqData(data.data);
      setLoadingPrereqs(false);
      console.log("Success!");
      setSuccessMessage("Success!");
    } catch (error) {
      setErrorMessage("Prereq Error occurred: Please try again");
    }
    // }
  };

  const outputAdvisingHistoryCourses = async (e, id) => {
    //e.preventDefault();
    console.log("advisingID = " + id);
    setAdvisingIDList(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      setLoadingCourses(true);

      //const id = advisingIDList[index];
      const url =
        "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/courses/" +
        id;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error occured");
      }

      console.log("course url = " + url);

      const data = await response.json();

      setAdvisingCourseData(data.data);

      setLoadingCourses(false);

      console.log("Success!");
      setSuccessMessage("Success!");
    } catch (error) {
      setErrorMessage("Course Error occurred: Please try again");
    }
  };

  function outputHistory(e, index, id, advisingInfo) {

    let result = [...advisingData];

    if (result[index].status === "Pending") {
      setApprovalStatus(true);
    } else {
      setApprovalStatus(false);
    }


    let advisingIDVal = result[index].advising_id;
    console.log("advisingID = " + advisingIDVal);

    setAdvisingHistoryReveal(true);
    setAdvisingID(advisingIDVal);

    outputAdvisingHistoryPrereqs(advisingInfo, advisingIDVal);
    outputAdvisingHistoryCourses(advisingInfo, advisingIDVal);
  }















  function handleEditPrereqs (e, index, advisingID, prereqID, advisingPrereqs) {
    setEditingState(true);
    setPrereqEditingState(true);
    console.log("editingAdvisingID = " + advisingID);

    console.log("editingPrereqID = " + prereqID);
    
  }








  function handleEditCourses (e, index, advisingID, courseID, advisingCourses) {
    setEditingState(true);
    setCourseEditingState(true);
    console.log("editingAdvisingID = " + advisingID);

    console.log("editingCourseID = " + courseID);

  }











  return (
    <div className="mysqltesting-container">
      <div className="Title">
        <div className="mysqltesting-menu-container">
          <h1 className="text-center">Advising History</h1>
          <form onSubmit={handleBackPage}>
            <button type="submit" className="btn btn-createAccount">
              Go back
            </button>
          </form>
          {/* <form onSubmit={outputAdvisingHistory}>
            <button type="submit" className="py-4 px-4 font-bold">
              Reveal history
            </button>
          </form> */}
        </div>
      </div>

      <div className="advising-portal-container">
        <div className="Title">
          <div className="Title">
            <div className="Title">
              <div className="advising-user-information">
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="testResultOutput">
                  <h1 className="text-center">
                    <p>History</p>
                  </h1>
                  <div>
                    {loadingHistory ? (
                      <Fragment>loading...</Fragment>
                    ) : (
                      <table className="purpleTable th">
                        {/* <th>USER ID</th> */}
                        <th>Advising ID </th>
                        <th>Last Term </th>
                        <th>Last GPA </th>
                        <th>Current Term</th>
                        <th>Status </th>
                        <th>Date </th>
                        <th>Reveal</th>
                        {advisingData.map((advisingInfo, index) => {
                          return (
                            <Fragment>
                              <tbody>
                                <tr>
                                  <td>{advisingInfo.advising_id}</td>
                                  <td>{advisingInfo.last_term}</td>
                                  <td>{advisingInfo.last_gpa}</td>
                                  <td>{advisingInfo.current_term}</td>
                                  <td>{advisingInfo.status}</td>
                                  <td>{advisingInfo.date_submitted}</td>
                                  <td>
                                    <button
                                      type="submit"
                                      className="py-4 px-4 font-bold"
                                      onClick={(e) =>
                                        outputHistory(
                                          e,
                                          index,
                                          advisingInfo.advising_id,
                                          advisingInfo,
                                        )
                                      }
                                    >
                                      O
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </Fragment>
                          );
                        })}
                      </table>
                    )}
                  </div>

                  <form onSubmit={resetPage}>
            <button type="submit" className="btn btn-createAccount">
              Reload
            </button>
          </form>


                </div>
              </div>
            </div>
          </div>
        </div>





        <div id="Course&PrereqOutputs">
          <div className="history-output">
            <div className="Title">
              <div className="prequisite-history">
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="testResultOutput">
                  <h1 className="text-center">
                    <p>Prerequisites</p>
                  </h1>
                  <div>
                    {loadingPrereqs ? (
                      <Fragment>loading...</Fragment>
                    ) : (
                      <table className="orangeTable th">
                        {/* <th>USER ID</th> */}
                        <th>Advising ID </th>
                        <th>Prereq ID </th>
                        <th>Prerequisite Name </th>
                        {advisingPrereqData.map((advisingPrereqs, index) => {
                          return (
                            <Fragment>
                              <tbody>
                                <tr>
                                  <td>{advisingPrereqs.advising_id}</td>
                                  <td>{advisingPrereqs.prereq_id}</td>
                                  <td>{advisingPrereqs.prereqName}</td>
                                </tr>
                              </tbody>
                            </Fragment>
                          );
                        })}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="Title">
              <div className="course-history">
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="testResultOutput">
                  <h1 className="text-center">
                    <p>Courses</p>
                  </h1>
                  <div>
                    {loadingCourses ? (
                      <Fragment>loading...</Fragment>
                    ) : (
                      <table className="blueTable th">
                        {/* <th>USER ID</th> */}
                        <th>Advising ID </th>
                        <th>Course ID </th>
                        <th>Course Name </th>
                        {advisingCourseData.map((advisingCourses, index) => {
                          return (
                            <Fragment>
                              <tbody>
                                <tr>
                                  <td>{advisingCourses.advising_id}</td>
                                  <td>{advisingCourses.course_id}</td>
                                  <td>{advisingCourses.courseName}</td>
                                </tr> 
                              </tbody>
                            </Fragment>
                          );
                        })}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="editButtonDiv">
          <form onSubmit={handleEditEntry}>
            <button type="submit" className="large-btn">
              Edit
            </button>
          </form>
        </div> */}








        
      </div>
    </div>
  );
}

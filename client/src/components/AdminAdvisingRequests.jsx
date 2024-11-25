import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function AdminAdvisingRequests() {
  const navigate = useNavigate();


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [approvalSuccessMessage, setApprovalSuccessMessage] = useState("");
  const [approvalErrorMessage, setApprovalErrorMessage] = useState("");
  const [declineSuccessMessage, setDeclineSuccessMessage] = useState("");
  const [declineErrorMessage, setDeclineErrorMessage] = useState("");
  const [advisingRequestsData, setAdvisingRequestsData] = useState([]);
  const [advisingRequestReveal, setAdvisingRequestReveal] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingPrereqs, setLoadingPrereqs] = useState(false);
  const [advisingRequestsPrereqData, setAdvisingRequestsPrereqData] = useState([]);
  const [advisingRequestsCourseData, setAdvisingRequestsCourseData] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [advisingPrereqData, setAdvisingPrereqData] = useState([]);
  const [advisingCourseData, setAdvisingCourseData] = useState([]);
  const [advisingID, setAdvisingID] = useState("");
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [apporovalFeedbackVal, setApprovalFeedbackVal] = useState(false);
  const [declineFeedbackVal, setDeclineFeedbackVal] = useState(false);
  const [approvalFeedbackMessage, setApprovalFeedbackMessage] = useState("");
  const [declineFeedbackMessage, setDeclineFeedbackMessage] = useState("");

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = "/public/admin.png";
  }, []);

  useEffect(() => {
    document.title = "Admin - Course Advising";
  }, []);

  function handleBackPage() {
    navigate("/adminDashboard");
  }
 
  function resetPage() {
    // setApprovalFeedbackVal(false);
    // setDeclineFeedbackVal(false);
    // setEditStatus(false);
    // setApprovalErrorMessage("");
    // setApprovalErrorMessage("");
    // setSuccessMessage("");
    // setErrorMessage("");
    // setDeclineErrorMessage("");
    // setDeclineSuccessMessage("");
    // setAdvisingRequestReveal(false);
    window.location.reload();
  }

  useEffect(() => {
    console.log("advisingRequestReveal = " + advisingRequestReveal);
    //console.log(approvalStatus) 
    const coursePrereqsDiv = document.getElementById("Course&PrereqOutputs");
    const editStatusDiv = document.getElementById("editStatus");
    const approvalFeedback = document.getElementById("approvalFeedbackForm");
    const declineFeedback = document.getElementById("declineFeedbackForm");

    if (advisingRequestReveal) {
      coursePrereqsDiv.style.display = "block";
    } else {
      coursePrereqsDiv.style.display = "none"; 
    }

    if (editStatus && advisingRequestReveal) {
        editStatusDiv.style.display = "block";
    } else {
        editStatusDiv.style.display = "none";
    }

    if (apporovalFeedbackVal && editStatus && advisingRequestReveal) {
      approvalFeedback.style.display =  "block";
    } else {
      approvalFeedback.style.display = "none";
    }

    if (declineFeedbackVal && editStatus && advisingRequestReveal) {
      declineFeedback.style.display =  "block";
    } else {
      declineFeedback.style.display = "none";
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
    const outputAdvisingRequests = async () => {
      setSuccessMessage("");
      setErrorMessage("");
      try {
        setLoadingRequests(true);

        console.log("data fetch");
        const url =
          "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingRequests";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error occured");
        } 
        const data = await response.json();

        data.data.forEach((item) => {
          const formattedDate = formatDate(item.date_submitted);
          item.date_submitted = formattedDate;
          console.log(formattedDate);
        });

        setAdvisingRequestsData(data.data);
        setLoadingRequests(false);
        console.log("Success!");
        setSuccessMessage("Success!");
      } catch (error) {
        setErrorMessage("Error occurred: Please try again");
      }
    };
    outputAdvisingRequests();
  }, []);




  const outputAdvisingRequestsPrereqs = async (e, id) => {
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

  const outputAdvisingRequestsCourses = async (e, id) => {
    //e.preventDefault();

    setApprovalErrorMessage("");
    setApprovalErrorMessage("");
    setSuccessMessage("");
    setErrorMessage("");
    setDeclineErrorMessage("");
    setDeclineSuccessMessage("");

    console.log("advisingID = " + id);
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





  function outputRequests(e, index, id, advisingRequestsInfo) {
    setApprovalErrorMessage("");
    setApprovalErrorMessage("");
    setSuccessMessage("");
    setErrorMessage("");
    setDeclineErrorMessage("");
    setDeclineSuccessMessage("");

    let result = [...advisingRequestsData];

    if (result[index].status === "Pending") {
      setApprovalStatus(true);
      setEditStatus(true);
    } else {
      setApprovalStatus(false);
      setEditStatus(false);
    }

    let advisingIDVal = result[index].advising_id;
    let userIDVal = result[index].user_id;
    console.log("advisingID = " + advisingIDVal);
    console.log("userID = " + userIDVal);

    setAdvisingRequestReveal(true);
    setAdvisingID(advisingIDVal);
    setUserID(userIDVal);

    outputAdvisingRequestsPrereqs(advisingRequestsInfo, advisingIDVal);
    outputAdvisingRequestsCourses(advisingRequestsInfo, advisingIDVal);
  }




    const handleApprove = async (e) => {
        e.preventDefault(); 

        setApprovalErrorMessage("");
        setApprovalErrorMessage("");
        setSuccessMessage("");
        setErrorMessage("");
        setDeclineErrorMessage("");
        setDeclineSuccessMessage("");

        setApprovalFeedbackVal(true);
        setDeclineFeedbackVal(false);

        try {
          console.log("Function: 'handleApprove'");
          console.log("advisingID = " + advisingID);
          console.log("userID = " + userID);
          const url = "https://sallg001-cs418-course-project.onrender.com/user/getEmail/" + userID;
          console.log("url = " + url);
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error("Error occured");
          }
          const data = await response.json();
          await setUserEmail(data.data[0].email);
          await setUserName(data.data[0].name);
          console.log("userEmail = " + userEmail);
          console.log("name = " + userName);


















        } catch (error) {
            setErrorMessage("Approval error occurred: Please try again");
        }

    }
 


    const approvalRequest = async (e) => {
      e.preventDefault(); 

      setApprovalErrorMessage("");
      setApprovalErrorMessage("");
      setSuccessMessage("");
      setErrorMessage("");
      setDeclineErrorMessage("");
      setDeclineSuccessMessage("");


      console.log("userEmail = " + userEmail);

      try {
        const formBody = JSON.stringify({
          id: advisingID,
          email: userEmail,
          feedbackMessage: approvalFeedbackMessage,
        });
        const response = await fetch(
          "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingRequestApprove",
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
          throw new Error("Approval failed"); // Handle HTTP errors
        }
        setApprovalSuccessMessage("Successfully approved! Reloading...");
        setTimeout(resetPage, 2000);
      } catch (error) {
        console.error("Failed to approve", error);
        setApprovalErrorMessage("Failed to approve");
      }
  }




    const handleDeny = async (e) => {
        e.preventDefault(); 

        setApprovalErrorMessage("");
        setApprovalErrorMessage("");
        setSuccessMessage("");
        setErrorMessage("");
        setDeclineErrorMessage("");
        setDeclineSuccessMessage("");

        setApprovalFeedbackVal(false);
        setDeclineFeedbackVal(true);
        try {
            console.log("Function: 'handleDeny'");
            console.log("advisingID = " + advisingID);
            console.log("userID = " + userID);
            const url = "https://sallg001-cs418-course-project.onrender.com/user/getEmail/" + userID;
            console.log("url = " + url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error occured");
            }
            const data = await response.json();
            await setUserEmail(data.data[0].email);
            await setUserName(data.data[0].name);
            console.log("userEmail = " + userEmail);
            console.log("name = " + userName);
        } catch (error) {
            setErrorMessage("Decline error occurred: Please try again");
        }
    }



    const denyRequest = async (e) => {
        e.preventDefault(); 

        setApprovalErrorMessage("");
        setApprovalErrorMessage("");
        setSuccessMessage("");
        setErrorMessage("");
        setDeclineErrorMessage("");
        setDeclineSuccessMessage("");


        console.log("userEmail = " + userEmail);


        try {
          const formBody = JSON.stringify({
            id: advisingID,
            email: userEmail,
            feedbackMessage: declineFeedbackMessage,
          });
          const response = await fetch(
            "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingRequestDecline",
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
            throw new Error("Approval failed"); // Handle HTTP errors
          }
          setApprovalSuccessMessage("Successfully declined! Reloading...");
          setTimeout(resetPage, 2000);
        } catch (error) {
          console.error("Failed to decline", error);
          setApprovalErrorMessage("Failed to decline");
        }







    }

























  return (
    <div className="mysqltesting-container">
      <div className="Title">
        <div className="mysqltesting-menu-container">
          <h1 className="text-center">Admin - Advising Requests</h1>
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
                <div className="Title">
                <div className="advising-user-information">
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <div className="testResultOutput">
                    <h1 className="text-center">
                        <p>All Advising Requests</p>
                    </h1>
                    <div>
                        {loadingRequests ? (
                        <Fragment>loading...</Fragment>
                        ) : (
                        <table className="purpleTable th">
                            {/* <th>USER ID</th> */}
                            <th>Name</th>
                            <th>User ID</th>
                            <th>Advising ID</th>
                            <th>Term</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>View</th>
                            {advisingRequestsData.map((advisingRequestsInfo, index) => {
                            return (
                                <Fragment>
                                <tbody>
                                    <tr>
                                    <td>{advisingRequestsInfo.name}</td>
                                    <td>{advisingRequestsInfo.user_id}</td>
                                    <td>{advisingRequestsInfo.advising_id}</td>
                                    <td>{advisingRequestsInfo.current_term}</td>
                                    <td>{advisingRequestsInfo.status}</td>
                                    <td>{advisingRequestsInfo.date_submitted}</td>
                                    <td>
                                        <button
                                        type="submit"
                                        className="py-4 px-4 font-bold"
                                        onClick={(e) =>
                                            outputRequests(
                                            e,
                                            index,
                                            advisingRequestsInfo.advising_id,
                                            advisingRequestsInfo,
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

        <div id="editStatus">
          <div className="history-output">
                <form onSubmit={handleApprove}>
                    <button type="onSubmit" className="large-btn">
                        Approve
                    </button>
                </form> 
                <form onSubmit={handleDeny}>
                    <button type="onSubmit" className="large-btn">
                        Decline
                    </button>
                </form>
            </div>
            {declineErrorMessage && <p className="text-danger">{declineErrorMessage}</p>}
            {declineSuccessMessage&& <p className="text-success">{declineSuccessMessage}</p>}
            {approvalErrorMessage&& <p className="text-danger">{approvalErrorMessage}</p>}
            {approvalSuccessMessage&& <p className="text-success">{approvalSuccessMessage}</p>}

        </div>
        <div id="declineFeedbackForm">
            <div className="history-output">
                <form onSubmit={denyRequest}>
                    <div className="mb-3">
                        <label className="form-label">Decline Feedback: </label>
                        <input
                        type="text"
                        className="form-control"
                        value={declineFeedbackMessage}
                        onChange={(e) => setDeclineFeedbackMessage(e.target.value)} 
                        required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>        
        <div id="approvalFeedbackForm">
            <div className="history-output">
                <form onSubmit={approvalRequest}>
                    <div className="mb-3">
                        <label className="form-label">Approval Feedback: </label>
                        <input
                        type="text"
                        className="form-control"
                        value={approvalFeedbackMessage}
                        onChange={(e) => setApprovalFeedbackMessage(e.target.value)} 
                        required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
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








































      </div>
    </div>
  );
 
}
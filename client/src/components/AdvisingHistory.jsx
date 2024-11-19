import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function AdvisingHistory() {
  const navigate = useNavigate();

  function handleBackPage() {
    navigate("/advisingPortal");
  }

  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [advisingData, setAdvisingData] = useState([]);
  const [advisingPrereqData, setAdvisingPrereqData] = useState([]);
  const [advisingCourseData, setAdvisingCourseData] = useState([]);


  const [advisingIDList, setAdvisingIDList] = useState([]);


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

  function formatDate(mysqlDate) {
    const date = new Date(mysqlDate); // Convert MySQL date string to Date object

    // Use the Date object's methods to format the date
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`; // Customize the format as needed
  }
  
  const outputAdvisingHistory = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    const storedID = localStorage.getItem("storedUserID");
    if (storedID) {
      const parsedData = storedID;
      setUserID(parsedData);
    }
    try {
      setLoading(true);

      console.log("userID = " + storedID);

      console.log("data fetch");
      const url =
        "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/" + userID;
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
      setLoading(false);
      console.log("Success!");
      setSuccessMessage("Success!");
    } catch (error) {
      setErrorMessage("Error occurred: Please try again");
    }






  };

  const outputAdvisingHistoryCourses = async (e, id) => {
    //e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");


      try {
        setLoading(true);
    
          //const id = advisingIDList[index];
          const url =
          "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/courses" + JSON.stringify(id);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Error occured");
          }
          const data = await response.json();
          setAdvisingCourseData(data.data);
          setLoading(false);
          console.log("Success!");
          setSuccessMessage("Success!");


          try {
            setLoading(true);
            // const id = advisingIDList[i];
  
  
            //console.log("advising_id [" + i + "] = " + advisingIDList[i]);
  
            //const id = advisingIDList[index];
            console.log("id = " + id);
            const url =
            "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/prereqs" + id;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Error occured");
            }
            const data = await response.json();
            setAdvisingPrereqData(data.data);
            setLoading(false);
            console.log("Success!");
            setSuccessMessage("Success!");





            try {
              setLoading(true);
              // const id = advisingIDList[i];
    
    
              //console.log("advising_id [" + i + "] = " + advisingIDList[i]);
    
              //const id = advisingIDList[index];
              console.log("id = " + id);
              const url =
              "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/prereqs" + id;
              console.log("course url = " + url);

              const response = await fetch(url);

              if (!response.ok) {
                throw new Error("Error occured");
              }
              const data = await response.json();
              setAdvisingPrereqData(data.data);
              setLoading(false);
              console.log("Success!");
              setSuccessMessage("Success!");
            } catch (error) {
              setErrorMessage("Prereq Error occurred: Please try again");
            }





          } catch (error) {
            setErrorMessage("Prereq Error occurred: Please try again");
          }


        } catch (error) {
          setErrorMessage("Course Error occurred: Please try again");
        }
      
  };
 
  const outputAdvisingHistoryPrereqs = async (e, id) => {
    //e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // for (var i = 0; i < advisingIDList.length; i++)
    //   {
        try {
          setLoading(true);
          // const id = advisingIDList[i];


          //console.log("advising_id [" + i + "] = " + advisingIDList[i]);

          //const id = advisingIDList[index];
          console.log("id = " + id);
          const url =
          "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/prereqs" + id;
          const response = await fetch(url);

          console.log("prereq url = " + url);

          if (!response.ok) {
            throw new Error("Error occured");
          }
          const data = await response.json();
          setAdvisingPrereqData(data.data);
          setLoading(false);
          console.log("Success!");
          setSuccessMessage("Success!");
        } catch (error) {
          setErrorMessage("Prereq Error occurred: Please try again");
        }
      // }
  };


  // useEffect(() => {
  //   outputAdvisingHistoryCourses();
  // }, []);



  // useEffect(() => {
  //   outputAdvisingHistoryPrereqs();
  // }, []);


  function outputHistory (e, index, id, advisingData) {
    // e.preventDefault();
    outputAdvisingHistoryPrereqs(id);
    outputAdvisingHistoryCourses(id);
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
          <form onSubmit={outputAdvisingHistory}>
                  <button type="submit" className="py-4 px-4 font-bold">
                    Reveal history
                  </button>
          </form>
        </div>
      </div>

      <div className="mysql-mysqltests">
        <div className="Title">
          <div className="Title">
            <div className="Title">
              <div className="advisingHistoryTable">
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                  <div className="testResultOutput">
                    <h1 className="text-center">
                      <p>History</p>
                    </h1>
                    <div>
                      {loading ? (
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
                          {advisingData.map((advisingData, index) => {
                            return (
                              <Fragment key = {"advisingKey"}> 
                                <tbody>
                                  <tr>
                                    <td>{advisingData.advising_id}</td>
                                    <td>{advisingData.last_term}</td>
                                    <td>{advisingData.last_gpa}</td>
                                    <td>{advisingData.current_term}</td> 
                                    <td>{advisingData.status}</td>
                                    <td>{advisingData.date_submitted}</td>
                                    <td>
                                      <button type = "submit" className="py-4 px-4 font-bold" onClick={(e) => outputHistory(e, index, advisingData.advising_id, advisingData)}>
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
                  </div>
              </div>
            </div>
          </div>
        </div>
 






        <div className="Title">
          <div className="advisingHistoryTableEntries">
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <div className="testResultOutput">
                <h1 className="text-center">
                  <p>Prerequisites</p>
                </h1>
                <div>
                  {loading ? (
                    <Fragment>loading...</Fragment>
                  ) : (
                    <table className="orangeTable th">
                      {/* <th>USER ID</th> */}
                      <th>Advising ID </th>
                      <th>Prereq ID </th>
                      <th>Prerequisite Name </th>
                      {advisingData.map((advisingPrereqData, index) => {
                        return (
                          <Fragment key = {"prereqKey"}>
                            <tbody>
                              <tr>
                                <td>{advisingPrereqData.advising_id}</td>
                                <td>{advisingPrereqData.prereq_id}</td>
                                <td>{advisingPrereqData.prereqName}</td>
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
  );
}

import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function AdvisingHistory () {
    const navigate = useNavigate();

    function handleBackPage() {
        navigate('/advisingPortal');
    };








    const [userID, setUserID] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const [advisingData, setAdvisingData] = useState([]);
    const [advisingPrereqs, setAdvisingPrereqs] = useState([]);
    const [advisingCourses, setAdvisingCourses] = useState([]);

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

    const outputAdvisingHistory = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        const storedID = localStorage.getItem("storedUserID");
        if (storedID) {
          const parsedData = storedID;
          setUserID(parsedData);
        }
        try {
            setLoading(true);
            
            
            const url = "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/" + userID;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error occured");
            }
            const data = await response.json();
            setAdvisingData(data.data);
            setLoading(false);
            console.log("Success!");
            setSuccessMessage('Success!');
        } catch (error) {
            setErrorMessage('Error occurred: Please try again');
        }
    };

 


 

 


    const outputAdvisingHistoryCourses = async (e) => {
        setSuccessMessage('');
        setErrorMessage('');
        try {
            setLoading(true);
            
            
            const url = "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/courses" + advising_id;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error occured");
            }
            const data = await response.json();
            setAdvisingData(data.data);
            setLoading(false);
            console.log("Success!");
            setSuccessMessage('Success!');
        } catch (error) {
            setErrorMessage('Error occurred: Please try again');
        }
    };

    const outputAdvisingHistoryPrereqs = async (e) => {
        setSuccessMessage('');
        setErrorMessage('');
        try {
            setLoading(true);
            
            
            const url = "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory/prereqs" + advising_id;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error occured");
            }
            const data = await response.json();
            setAdvisingData(data.data);
            setLoading(false);
            console.log("Success!");
            setSuccessMessage('Success!');
        } catch (error) {
            setErrorMessage('Error occurred: Please try again');
        }
    };







































      


  
  

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
                </div>
            </div>

            <div className="mysql-mysqltests">
                <div className="Title">
                    <div className="Title">
                        <div className="Title">
                            <div className = "advisingHistoryTable">
                                <form onSubmit={outputAdvisingHistory}>
                                    <button type="submit" className="py-4 px-4 font-bold">
                                        Reveal history
                                    </button>
                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                    <div className = "testResultOutput">

                                    <div>
                                    {loading ? (
                                        <Fragment>loading...</Fragment>
                                    ) : (
 
                                    <table>
                                        {/* <th>USER ID</th> */}
                                        <th>ADVISING ID</th>
                                        <th>CURRENT TERM</th>
                                        <th>LAST TERM</th>
                                        <th>LAST GPA</th>
                                        <th>STATUS</th>
                                        <th>DATE</th>
                                        {/* <th>VIEW</th> */}
                                        {
                                            advisingData.map((advisingData) => {
                                                return (
                                                <Fragment>
 
                                                    <tbody>
                                                        <tr>
                                                            <td>{advisingData.advising_id}</td>
                                                            <td>{advisingData.last_term}</td>
                                                            <td>{advisingData.last_gpa}</td>
                                                            <td>{advisingData.current_term}</td>
                                                            <td>{advisingData.status}</td>
                                                            <td>{advisingData.date_submitted}</td>
                                                        </tr>
                                                    </tbody>
                                                </Fragment>

                                                )
                                            })
                                        }
                                    </table>
                                    )}
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>




            <div className="Title">
                    <div className = "mysql-prereqtest">

                    </div>
                </div>

            </div>




 








        </div>
    );
}


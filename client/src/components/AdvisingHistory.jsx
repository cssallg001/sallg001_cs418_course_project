import React, { useEffect, useState } from 'react';
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



    useEffect(() => {
        const storedID = localStorage.getItem("storedUserID");
        if (storedID) {
          const parsedData = storedID;
          setUserID(parsedData);
        }
    }, []);






    useEffect(() => {
        outputAdvisingHistory();
    }, []);

  

    const outputAdvisingHistory = async (e) => {
        setSuccessMessage('');
        setErrorMessage('');
        try {
            setLoading(true);
            const formBody = JSON.stringify({ 
                user_id: userID
              });
            const response = await fetch(
                "https://sallg001-cs418-course-project.onrender.com/user_registration/advisingHistory",
                {
                    method: "POST",
                    body: formBody,
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
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

            <div className="advising-portal-container">
                <div className="Title">
                    <div className="Title">
                        <div className="advising-user-information">
                            <form onSubmit={outputAdvisingHistory}>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


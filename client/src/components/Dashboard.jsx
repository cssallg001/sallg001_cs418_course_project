import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Dashboard () {
    const navigate = useNavigate();

    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = "/public/user.png";
      }, []);

    useEffect(() => {
    document.title = "User - Course Advising"
    }, []);

    const [userStateVal, setUserStateVal] = useState('');
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [enteredPassword1, setEnteredPassword1] = useState('');
    const [enteredPassword2, setEnteredPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [enteredOldPassword, setEnteredOldPassword] = useState('');
    const [inputtedEmail, setInputtedEmail] = useState('');
    
    useEffect(() => {
        const storedUserStateVal = localStorage.getItem('storedUserStateVal');
        if (storedUserStateVal) {
            const parsedData = storedUserStateVal;
            setUserStateVal(parsedData);
        }
    }, []);
    
    useEffect(() => {
        const storedFirstName = localStorage.getItem('storedFirstName');
        if (storedFirstName) {
            setFirstName(storedFirstName);
        }
    }, []);

    useEffect(() => {
        const storedLastName = localStorage.getItem('storedLastName');
        if (storedLastName) {
            setLastName(storedLastName);
        }
    }, []);

    useEffect(() => {
        const storedEmail = localStorage.getItem('storedEmail');
        if (storedEmail) {
            const parsedData = storedEmail;
            setEnteredEmail(parsedData);
        }
    }, []);

    useEffect(() => {
        const storedConfirmedPassword = localStorage.getItem('storedConfirmedPassword');
        if (storedConfirmedPassword) {
            const parsedData = storedConfirmedPassword;
            setConfirmedPassword(parsedData);
        }
    }, []);

    function handleBackPage() {
        navigate('/home');
    };

    function handleAdvisingPortal() {
        navigate('/advisingPortal');
    };

    function handleUpdateInformation() {
        navigate('/changeInformation');
    };
 
    return (
        <div className = "mysqltesting-container">
            <div className = "container">
                <div className="Title">
                    <h1 className="text-center">Dashboard</h1>
                    <div>
                        Welcome, {enteredEmail}!
                    </div>
                    <form onSubmit={handleUpdateInformation}>
                        <button type="submit" className="btn btn-createAccount">
                            Update Information
                        </button>
                    </form>
                    <form onSubmit={handleAdvisingPortal}>
                        <button type="submit" className="btn btn-createAccount">
                            Advising Portal
                        </button>
                    </form>
                    <form onSubmit={handleBackPage}>
                        <button type="submit" className="btn btn-createAccount">
                            Log out
                        </button>
                    </form>
                </div>
               
            </div>
        </div>
    );
};
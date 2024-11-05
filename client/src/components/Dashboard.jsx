import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Dashboard () {
    const navigate = useNavigate();

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
    
    
    const handleChangingInformation = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (inputtedEmail !== enteredEmail) {
            setPasswordError("Email is not correct");
            console.log(inputtedEmail);
            console.log(enteredEmail);
            return;
        } else if (enteredOldPassword !== confirmedPassword) {
            setPasswordError("Current password is incorrect");
            return;
        } else if (enteredPassword1 === enteredOldPassword || enteredPassword2 === enteredOldPassword) {
            setPasswordError("New password cannot match current password");
            return;
        } else if (enteredPassword1 !== enteredPassword2) {
            setPasswordError("New passwords do not match");
            return;
        } else {
            setNewPassword(enteredPassword1);
        }
        
        try {
            
            //const response= await fetch('https://sallg001-cs418-course-project.onrender.com/user/change-password',{
            const response= await fetch('http://localhost:8080/user/change-password',{
                method: 'POST',
                headers:{
                    'content-type':'application/json',
                },
                body: JSON.stringify({
                    email:inputtedEmail,
                    currentPassword:enteredOldPassword,
                    newPassword:enteredPassword1
                }),
            });
            
            if (!response.ok) {
                throw new Error('Password change failed'); // Handle HTTP errors
            }
            
            const data = await response.json();
            console.log('Fetched user data:', data); // Log the fetched data

            setConfirmedPassword(newPassword);
            // Check if Registration is successful
            setPasswordSuccess('Password changed successfully! Logging out...');
            setTimeout(handleBackPage, 2000);
        } catch (error) {
            console.error('Password Change Error', error);
            setPasswordError('Password Change Error');  
        }
    };

    function handleBackPage() {
        navigate('/home');
    };

    function handleAdvisingPortal() {
        navigate('/advisingPortal');
    };

    return (
        <div className = "mysqltesting-container">
            <div className = "dashboard-container">
                <div className="Title">
                    <h1 className="text-center">Dashboard</h1>
                    <div>
                        Welcome, {enteredEmail}!
                    </div>
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
                <div>
                <div className ="change-information-container">
                    <div className="Title">
                        <h2 className="text-center">Update Information</h2>
                            <form onSubmit={handleChangingInformation}>
                                <div className="mb-3">
                                    <label className="form-label">Confirm Email: </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={inputtedEmail}
                                        onChange={(e) => setInputtedEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Current Password: </label>
                                    <input
                                        type="Password"
                                        className="form-control"
                                        value={enteredOldPassword}
                                        onChange={(e) => setEnteredOldPassword(e.target.value)}
                                        required
                                        />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password: </label>
                                    <input
                                        type="Password"
                                        className="form-control"
                                        value={enteredPassword1}
                                        onChange={(e) => setEnteredPassword1(e.target.value)}
                                        required
                                        />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm New Password: </label>
                                    <input
                                        type="Password"
                                        className="form-control"
                                        value={enteredPassword2}
                                        onChange={(e) => setEnteredPassword2(e.target.value)}
                                        required
                                        />
                                </div>
                                {passwordError && <p className="text-danger">{passwordError}</p>}
                                {passwordSuccess && <p className="text-success">{passwordSuccess}</p>}
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
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
            const parsedData = JSON.parse(storedUserStateVal);
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
            const parsedData = JSON.parse(storedEmail);
            setEnteredEmail(parsedData);
        }
    }, []);

    useEffect(() => {
        const storedConfirmedPassword = localStorage.getItem('storedConfirmedPassword');
        if (storedConfirmedPassword) {
            const parsedData = JSON.parse(storedConfirmedPassword);
            setConfirmedPassword(parsedData);
        }
    }, []);
    
    
    
    const handleChangingInformation = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (enteredPassword1 !== enteredPassword2) {
            setPasswordError("New password does not match confirm password");
            return;
        } else {
            setNewPassword(enteredPassword1);
        }

        try {

            const response= await fetch('http://localhost:8080/user/change-password',{
                method: 'POST',
                headers:{
                    'content-type':'application/json',
                },
                body: JSON.stringify({
                    email:inputtedEmail,
                    currentPassword:enteredOldPassword,
                    newPassword:newPassword
                }),
            });
    
            if (!response.ok) {
                throw new Error('Password change failed'); // Handle HTTP errors
            }
            
            const data = await response.json();
            console.log('Fetched user data:', data); // Log the fetched data

            // Check if Registration is successful
                setPasswordSuccess('Password changed successfully!');
                navigate('/dashboard');
        } catch (error) {
            console.error('Password Change Error', error);
            setErrorMessage('Password Change Error');  
        }
            
        setErrorMessage(passwordError);  
    };






    function handleBackPage() {
        navigate('/home');
    };






    return (
        <div className = "dashboard-container">
            <div className="Title">
                <h1 className="text-center">Dashboard</h1>
                <div>
                    {userStateVal ? <p>Welcome back, {enteredEmail}!</p> : <p>Hello, {enteredEmail}! Welcome to your new dashboard!</p>}
                </div>
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
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            {passwordSuccess && <p className="text-success">{passwordSuccess}</p>}
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
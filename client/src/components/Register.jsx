import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';


export default function Register () {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword1, setEnteredPassword1] = useState('');
    const [enteredPassword2, setEnteredPassword2] = useState('');
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
    const navigate = useNavigate();
    const [userStateVal, setUserStateVal] = useState(false);
    const [errVal, setErrVal] = useState('');
    
    const [confirmedPassword, setConfirmedPassword] = useState('');
    
    /* 
        if userStateVal == 0, user came from registration screen
        else if userStateVal == 1, user came from login screen
        else, userStateVal is invalid
    */
    /* 
        if errVal === 0, passwords don't match
        else if errVal === 1, email already in use
        else, errVal is invalid
    */
    
    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            if (enteredPassword1 !== enteredPassword2)
            {
                setErrVal(0);
                throw new Error('Error: Passwords dddo not match');
            } else {
                setConfirmedPassword(enteredPassword1);
                const formBody=JSON.stringify({
                    email:enteredEmail,
                    password:confirmedPassword,
                    firstName:enteredFirstName,
                    lastName:enteredLastName
                })

                
                const response= await fetch('http://localhost:8080/user/register',{
                    method:"POST",
                    body:formBody,
                    headers:{
                        'content-type':'application/json'
                    }
                });
        
                if (!response.ok) {
                    setErrVal(1);
                    throw new Error('Registration failed: Email already in use'); // Handle HTTP errors
                }
                
                const data = await response.json();
                console.log('Fetched user data:', data); // Log the fetched data
                
                // Check if Registration is successful
                if (data.message === 'Account successfully registered') {
                    // If registration is successful, redirect to the profile page
                    setUserStateVal(0);
                    localStorage.setItem('storedUserData', JSON.stringify(data.user));
                    localStorage.setItem('storedFirstName', enteredFirstName);
                    localStorage.setItem('storedLastName', enteredLastName);
                    localStorage.setItem('storedUserStateVal', userStateVal);
                    console.log("userStateVal = " + userStateVal);
                    navigate('/authentication');
                } else {
                    // Show error message if registration fails
                    console.log('Error: Email already in use. Please try again.');
                    setErrorMessage('Error: Email already in use. Please try again.');
                }
            }
        } catch (error) {
            if (errVal === 0) {
                console.error('Registration Error: Passwords do not match', error);
                setErrorMessage('Error: Passwords do not match');
            } else if (errVal === 1) {
                console.error('Registration Error: Email already in use', error);
                setErrorMessage('Error: Email already in use. Please try again.');
            }
        }
    };

    function handleBackPage() {
        navigate('/home');
    };
    
    return (
        <div className="container mt-5">
            <h1 className="Title">Register</h1>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label className="form-label">First Name:  </label>
                    <input
                        type="text"
                        className="form-control"
                        value={enteredFirstName}
                        onChange={(e) => setEnteredFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={enteredLastName}
                        onChange={(e) => setEnteredLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email: </label>
                    <input
                        type="email"
                        className="form-control"
                        value={enteredEmail}
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password: </label>
                    <input
                        type="Password"
                        className="form-control"
                        value={enteredPassword1}
                        onChange={(e) => setEnteredPassword1(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password: </label>
                    <input
                        type="Password"
                        className="form-control"
                        value={enteredPassword2}
                        onChange={(e) => setEnteredPassword2(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
            <form onSubmit={handleRegister}>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
            <form onSubmit={handleBackPage}>
                <button type="submit" className="btn btn-createAccount">
                    Go back
                </button>
            </form>
        </div>
    );
};
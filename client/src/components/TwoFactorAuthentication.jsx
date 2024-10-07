import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function TwoFactorAuthentication () {
    const navigate = useNavigate();

    const [userStateVal, setUserStateVal] = useState(null);
    const [verificationState, setVerficationState] = useState(false);
    const [enteredVerificationVal, setEnteredVerificationVal] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [enteredEmail, setEnteredEmail] = useState(false);
    const [enteredFirstName, setEnteredFirstName] = useState(false);
    const [enteredLastName, setEnteredLastName] = useState(false);
    const [confirmedPassword, setConfirmedPassword] = useState(false);

    useEffect(() => {
        const storedUserStateVal = localStorage.getItem('storedUserStateVal');
        if (storedUserStateVal) {
            const parsedData = JSON.parse(storedUserStateVal);
            setUserStateVal(parsedData);
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
        const storedFirstName = localStorage.getItem('storedFirstName');
        if (storedFirstName) {
            const parsedData = storedFirstName;
            setEnteredFirstName(parsedData);
        }
    }, []);

    useEffect(() => {
        const storedLastName = localStorage.getItem('storedLastName');
        if (storedLastName) {
            const parsedData = storedLastName;
            setEnteredLastName(parsedData);
        }
    }, []);

    useEffect(() => {
        const storedConfirmedPassword = localStorage.getItem('storedConfirmedPassword');
        if (storedConfirmedPassword) {
            const parsedData = storedConfirmedPassword;
            setConfirmedPassword(parsedData);
        }
    }, []);







    const handleAuthentication = async (e) => {
        e.preventDefault();
        try {
            if (enteredVerificationVal === "1234567") { 
                if (userStateVal === 0)
                {
                    setRegistrationSuccess(true);
                    try {
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
                            throw new Error('Registration failed'); // Handle HTTP errors
                        }
                        
                        const data = await response.json();
                        console.log('Fetched user data:', data); // Log the fetched data
        
                        // Check if Registration is successful
                        if (data.message === 'Account successfully registered') {
                            navigate('/dashboard');
                            
                        } else {
                            // Show error message if registration fails
                            console.log('Registration Error');
                            setErrorMessage('Registration Error');
                        }
                    } catch (error) {
                        console.error('Registration Error', error);
                        setErrorMessage('Registration Error');  
                    }
                } else {
                    navigate('/dashboard');
                }
            } else {
                throw new Error ('Error: Invalid Verification Code');        
            }

        } catch (error) {
            console.error('Error during verification: ', error);
            setErrorMessage('Invalid verification code. Please try again');
        }
    };

    /*
        userStateVal:
            0 = Return to registration page
            1 = Return to login page OR Resetting password via login page
            2 = Resetting password via Dashboard
    */

    function handleBackPage() {
        setRegistrationSuccess(false);
        localStorage.setItem('storedRegistrationSuccess', JSON.stringify(registrationSuccess));
        if(userStateVal === 0) {
            navigate('/register');
        } else if (userStateVal === 1) {
            navigate('/login');
        } else if (userStateVal === 2) {
            navigate('/dashboard')
        } else {
            navigate('/home');
        }
    };


    return (
        <div className="container mt-5">
            <h1 className="Title">2-Factor-Authentication</h1>
            <form onSubmit={handleAuthentication}>
                <div className="mb-3">
                        <label className="form-label">Code: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={enteredVerificationVal}
                            onChange={(e) => setEnteredVerificationVal(e.target.value)}
                            required
                        />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">
                    Submit
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
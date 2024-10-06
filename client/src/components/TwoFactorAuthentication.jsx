import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function TwoFactorAuthentication () {
    const navigate = useNavigate();

    const [userStateVal, setUserStateVal] = useState(null);
    const [verificationState, setVerficationState] = useState(false);
    const [enteredVerificationVal, setEnteredVerificationVal] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error messages

    useEffect(() => {
        const storedUserStateVal = localStorage.getItem('storedUserStateVal');
        if (storedUserStateVal) {
            const parsedData = JSON.parse(storedUserStateVal);
            setUserStateVal(parsedData);
        }
    }, []);

    const handleAuthentication = async (e) => {
        e.preventDefault();
        try {
            if (enteredVerificationVal === "1234567") { 
                navigate('/dashboard');
            } else {
                throw new Error ('Verification Failed');
            }
            console.log('Invalid verification code. Please try again.');
            setErrorMessage('Invalid verification code. Please try again.');
        } catch (error) {
        console.error('Error during verification: ', error);
        setErrorMessage('Invalid verification code. Please try again');
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
            <a href="/home">
                <button type="createAccount" className="btn btn-createAccount">
                    Go back
                </button>
            </a>
        </div>
    );
};
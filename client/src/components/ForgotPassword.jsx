import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function ForgotPassword() {

    const [inputtedEmail, setInputtedEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const navigate = useNavigate();

    const handleResettingPassword = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        try {
            const response= await fetch('http://localhost:8080/user/forgot-password',{
                method: 'POST',
                headers:{
                    'content-type':'application/json',
                },
                body: JSON.stringify({ 
                    email:inputtedEmail
                }),
            });
            if (!response.ok) {
                throw new Error('Password reset failed'); // Handle HTTP errors
            }
            const data = await response.json();
            console.log('Fetched user data:', data); // Log the fetched data

            // Check if Registration is successful
                setPasswordSuccess('Password successfully reset!');
        } catch (error) {
            console.error('Password Reset Error', error);
            setErrorMessage('Password Reset Error');  
        }
        setErrorMessage(passwordError);  
    };

    function handleBackPage() {
        navigate('/home');
    };

    return (
    <div className = "dashboard-container">
        <div className="Title">
            <h1 className="text-center">Password Reset (In progress)</h1>
            <form onSubmit={handleResettingPassword}>
                <div className="mb-3">
                    <label className="form-label">Email: </label>
                    <input
                        type="email"
                        className="form-control"
                        value={inputtedEmail}
                        onChange={(e) => setInputtedEmail(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {passwordSuccess && <p className="text-success">{passwordSuccess}</p>}
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
    </div>
    );
};
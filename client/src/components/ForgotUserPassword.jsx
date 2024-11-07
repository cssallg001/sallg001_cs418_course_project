import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function ForgotUserPassword() {

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
            const response= await fetch(import.meta.env.VITE_API_KEY + '/user/forgot-password',{
            //const response= await fetch('http://localhost:8080/user/forgot-password',{
            //const response= await fetch('https://sallg001-cs418-course-project.onrender.com/user/forgot-password',{
                method: 'POST',
                headers:{
                    'content-type':'application/json',
                },
                body: JSON.stringify({ 
                    email:inputtedEmail
                }),
            });
            if (!response.ok) {
                setPasswordError('Password reset failed');  
                throw new Error('Password reset failed'); // Handle HTTP errors
            }
            const data = await response.json();
            console.log('Fetched user data:', data); // Log the fetched data
            setPasswordSuccess('Password successfully reset! A new password has been sent to your email.');
        } catch (error) {
            console.error('Password Reset Error', error);
            setPasswordError('Password Reset Error');  
        }
    };

    function handleBackPage() {
        navigate('/home');
    };

    return (
        <div className = "mysqltesting-container">
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
                        {passwordError && <p className="text-danger">{passwordError}</p>}
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
        </div>
    );
};
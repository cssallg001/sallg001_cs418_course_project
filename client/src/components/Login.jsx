import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';


export default function Login () {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
    const navigate = useNavigate();
    const [userStateVal, setUserStateVal] = useState(true);
    
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const formBody=JSON.stringify({
                email:enteredEmail,
                Password:enteredPassword
            })
    
            const response= await fetch('http://localhost:8080/user/login',{
                method:"POST",
                body:formBody,
                headers:{
                    'content-type':'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Login failed'); // Handle HTTP errors
            }
    
            const data = await response.json();
            console.log('Fetched user data:', data); // Log the fetched data

            // Check if login is successful
            if (data.data.length > 0) {
                // If login is successful, redirect to the profile page
                setUserStateVal(true);
                localStorage.setItem('storedUserData', JSON.stringify(data.user));
                localStorage.setItem('storedUserStateVal',JSON.stringify(userStateVal));
                localStorage.setItem('storedEmail',JSON.stringify(enteredEmail));
                console.log("userStateVal = " + userStateVal);
                navigate('/authentication');
            } else {
                // Show error message if login fails
                console.log('Invalid credentials. Please try again.');
                setErrorMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Invalid Credentials. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="Title">Login</h1>
            <form onSubmit={handleLogin}>
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
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">
                    Login
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
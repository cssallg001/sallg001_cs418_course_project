import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';


export default function Register () {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const formBody=JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
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
                throw new Error('Registration failed: Email already in use'); // Handle HTTP errors
            }
    
            const data = await response.json();
            console.log('Fetched user data:', data); // Log the fetched data

            // Check if Registration is successful
            if (data.message === 'Account successfully registered') {
                // If registration is successful, redirect to the profile page
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                // Show error message if registration fails
                console.log('Invalid credentials. Please try again.');
                setErrorMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error: Email already in use', error);
            setErrorMessage('Error: Email already in use. Please try again.');
        }
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
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">
                    Register
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
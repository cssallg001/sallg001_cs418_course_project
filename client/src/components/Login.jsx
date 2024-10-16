import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';


export default function Login () {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
    const navigate = useNavigate();
    const [userStateVal, setUserStateVal] = useState(true);
    const [adminStateVal, setAdminStateVal] = useState(false);
    
    
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


            if (data.message === "isAdmin") {
                setAdminStateVal('1');
            }




            // Check if login is successful
            if (data.message === "user logged in successfully") {
                // If login is successful, redirect to the authentication page
                setUserStateVal(true);
                localStorage.setItem('storedUserData', JSON.stringify(data.user));
                localStorage.setItem('storedUserStateVal', userStateVal);
                localStorage.setItem('storedEmail', enteredEmail);
                localStorage.setItem('storedConfirmedPassword', enteredPassword);
                localStorage.setItem('storedAdminStateVal', JSON.stringify(adminStateVal));
                console.log("userStateVal = " + userStateVal);
                console.log("adminStateVal = " + adminStateVal);
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

    function handleBackPage() {
        navigate('/home');
    };

    function handleForgotPassword() {
        navigate('/forgotUserPassword');
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
            <form onSubmit={handleForgotPassword}>
                <button type="submit" className="btn btn-createAccount">
                    Forgot password?
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
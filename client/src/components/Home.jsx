import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Home () {
    const navigate = useNavigate();

    function handleLoginPage() {
        navigate('/login');
    };

    function handleRegistrationPage() {
        navigate('/register');
    };

    function handleAboutPage() {
        navigate('/about');
    };

    return (
        <div className = "container">
            <div className="Title">
                <h1 className="text-center">Home</h1>
                <form onSubmit={handleLoginPage}>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                <form onSubmit={handleRegistrationPage}>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
                <form onSubmit={handleAboutPage}>
                    <button type="submit" className="btn btn-primary">
                        About
                    </button>
                </form>
            </div>
        </div>
    );
}


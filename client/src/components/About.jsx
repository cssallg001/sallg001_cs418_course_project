import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Home () {
    const navigate = useNavigate();

    function handleBackPage() {
        navigate('/home');
    };

    return (
        <div className = "container">
            <div className="Title">
                <h1 className="text-center">About</h1>

                <p>
                    CS 418 Course Project
                </p>
                <p>
                    By Sean Allgaier
                </p>

                <form onSubmit={handleBackPage}>
                    <button type="submit" className="btn btn-createAccount">
                        Go back
                    </button>
                </form>
            </div>
        </div>
    );
}


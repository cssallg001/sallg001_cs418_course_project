import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function AdvisingPortal () {
    const navigate = useNavigate();

    function handleBackPage() {
        navigate('/dashboard');
    };

    return (
        <div className = "mysqltesting-container">

            <div className = "mysqltesting-menu-container">
                <div className="Title">
                    <h1 className="text-center">Advising Portal</h1>






                    <form onSubmit={handleBackPage}>
                        <button type="submit" className="btn btn-createAccount">
                            Go back
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


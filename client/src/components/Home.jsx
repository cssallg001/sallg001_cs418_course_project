import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Home () {
    const navigate = useNavigate();
    return (
        <div class = "container">
            <div className="Title">
                <h1 className="text-center">Home</h1>
                <a href="/login">
                    <div class="button large-btn">
                        Login
                    </div>
                </a>
                <a href="/register">
                    <div class="button large-wide-btn">
                        Create Account
                    </div>
                </a>
            </div>
        </div>
    );
}


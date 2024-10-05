import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Dashboard () {
    const navigate = useNavigate();
    return (
        <div class = "container">
            <div className="Title">
                <h1 className="text-center">Dashboard</h1>
                <a href="/home">
                    <div class="button large-wide-btn">
                        Go home
                    </div>
                </a>
            </div>
        </div>
    );
}
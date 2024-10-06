import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Dashboard () {
    const navigate = useNavigate();

    const [userStateVal, setUserStateVal] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const storedUserStateVal = localStorage.getItem('storedUserStateVal');
        if (storedUserStateVal) {
            const parsedData = JSON.parse(storedUserStateVal);
            setUserStateVal(parsedData);
        }
    }, []);

    useEffect(() => {
        const storedFirstName = localStorage.getItem('storedFirstName');
        if (storedFirstName) {
            setFirstName(storedFirstName);
        }
    }, []);

    useEffect(() => {
        const storedLastName = localStorage.getItem('storedLastName');
        if (storedLastName) {
            setLastName(storedLastName);
        }
    }, []);

    function handleBackPage() {
        navigate('/home');
    };

    return (
        <div className = "dashboard-container">
            <div className="Title">
                <h1 className="text-center">Dashboard</h1>
                {/* <div>
                    Welcome, {outputName}!
                    </div> */}
                {/* <div>
                    {firstName && <p>First name: {firstName}</p>}
                    {lastName && <p>Last name: {lastName}</p>}
                </div> */}
                <div>
                    {userStateVal ? <p>Welcome back!</p> : <p>{firstName && <p>Hello, {firstName} {lastName}</p>}Welcome to your new dashboard!</p>}
                </div>
            <form onSubmit={handleBackPage}>
                <button type="submit" className="btn btn-createAccount">
                    Go back
                </button>
            </form>
            </div>
        </div>
    );
};
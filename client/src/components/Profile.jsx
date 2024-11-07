import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user')); // Get the logged-in user object

            if (!storedUser) {
                setErrorMessage('No user logged in');
                navigate('/login');
                return;
            }

            // Extract username and password from the user object
            const { email, password } = storedUser;

            try {
                // Fetch user data from the '/api/users' endpoint using POST method
                //const response = await fetch('http://localhost:8080/user', {
                const response = await fetch(import.meta.env.VITE_API_KEY + '/user', {
                    method: 'POST', // Use POST method to authenticate
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }), // Send username and password
                });

                // Check if the response is okay
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json(); // Parse the response as JSON

                // Check if user data exists
                if (data.user) {
                    setUser(data.user); // Set the user data to state
                } else {
                    setErrorMessage('User data not found');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setErrorMessage('Failed to load profile: ' + error.message); // Display the error message
            }
        };

        fetchUserProfile(); // Call the function to fetch user profile
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove the user data from localStorage
        navigate('/login'); // Redirect to login page
    };

    if (errorMessage) {
        return <p className="text-danger">{errorMessage}</p>; // Display error message if exists
    }

    if (!user) {
        return <p>Loading...</p>; // Show loading text while fetching data
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Profile</h1>
            <div className="card">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6> {/* Display email, if exists */}
                    <button className="btn btn-primary">Edit Profile</button>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
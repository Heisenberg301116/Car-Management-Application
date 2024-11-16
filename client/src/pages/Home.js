// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to Car Management App</h1>
            <p className="home-description">Manage your cars effortlessly!</p>
            <div className="home-buttons">
                <button className="home-button" onClick={() => navigate('/login')}>
                    Login
                </button>
                <button className="home-button" onClick={() => navigate('/signup')}>
                    Signup
                </button>
            </div>
        </div>
    );
};

export default Home;

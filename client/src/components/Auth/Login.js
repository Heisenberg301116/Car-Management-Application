import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './Login.css'; // Import the CSS file
import { DataContext } from '../../context/DataProvider'

const Login = () => {
    const { setloggedin } = useContext(DataContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // New state for message
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.login({ email, password });
            localStorage.setItem('token', response.data.token); // Store token
            setMessage('Login successful! Redirecting to cars...'); // Success message
            setMessageType('success');
            setloggedin(true)
            setTimeout(() => {
                navigate('/cars'); // Redirect to car list after a short delay
            }, 500);
        } catch (error) {
            setMessage('Login failed! Please check your credentials.'); // Error message
            setMessageType('error');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <div className="login-form">
                {message && (
                    <div className={`login-message ${messageType}`}>
                        {message}
                    </div>
                )}
                <input
                    type="email"
                    className="login-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;

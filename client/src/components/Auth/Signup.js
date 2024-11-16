import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './Signup.css'; // Import the CSS file
import { DataContext } from '../../context/DataProvider'

const Signup = () => {
    const { setloggedin } = useContext(DataContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State to store message
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true); // Set loading to true when the request starts
        try {
            // Attempt to signup the user
            await api.signup({ email, password });

            // On success, try to login the user immediately
            const response = await api.login({ email, password }); // Use the same credentials to login
            localStorage.setItem('token', response.data.token); // Store token in localStorage

            // Set success message and navigate
            setMessage('Signup successful! You are now logged in.');
            setMessageType('success');
            setloggedin(true)
            setTimeout(() => {
                navigate('/cars'); // Redirect to the cars list page after a brief delay
            }, 1500);
        } catch (error) {
            // Handle errors from signup or login
            if (error.response) {
                setMessage(error.response.data.error || 'Signup failed! Please check your details.');
            } else if (error.request) {
                setMessage('Signup failed! No response from server.');
            } else {
                setMessage('Signup failed! Something went wrong.');
            }
            setMessageType('error');
        } finally {
            setLoading(false); // Set loading to false once the request is finished (success or error)
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Signup</h2>
            <div className="signup-form">
                {message && (
                    <div className={`signup-message ${messageType}`}>
                        {message}
                    </div>
                )}
                <input
                    type="email"
                    className="signup-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="signup-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="signup-button" onClick={handleSignup} disabled={loading}>
                    {loading ? (
                        <span>Creating account, please wait !</span>
                    ) : (
                        'Signup'
                    )}
                </button>
            </div>
        </div>
    );
};

export default Signup;

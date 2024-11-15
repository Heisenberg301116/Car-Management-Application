import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.login({ email, password });
            localStorage.setItem('token', response.data.token); // Store token
            navigate('/cars'); // Redirect to car list
        } catch (error) {
            alert('Login failed!');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

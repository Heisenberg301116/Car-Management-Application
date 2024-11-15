import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await api.signup({ email, password });
            alert('Signup successful!');
            navigate('/login'); // Redirect to login
        } catch (error) {
            alert('Signup failed!');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;

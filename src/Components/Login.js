import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
import { TicketContext } from './TicketContext.js';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setTicketDetails } = useContext(TicketContext);
    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        try {
            const response = await axios.post(
                'http://localhost:4000/api/users/login', 
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            localStorage.setItem('token', response.data.token);
            setTicketDetails({
                username : username,
                source: '',
                destination: '',
                fare: 0,
                distance: 0,
                paymentMode: '',
                tickets: 0,
                transactionId: '',
                qrCode: ''
            });

            navigate("/");
        } catch (err) {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form">
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={handleUsername} />
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={handlePassword} />
                {error && <p className="error-message">{error}</p>}
                <button type='submit' onClick={handleSubmit}>Login</button>
            </form>
            <div className="login-footer">
                <span>Don't have an account?</span>
                <Link to="/register">Sign Up</Link>
            </div>
        </div>
    );
}

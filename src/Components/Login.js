import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
import { TicketContext } from './TicketContext.js';
import Loader from './Loader.js';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setTicketDetails } = useContext(TicketContext);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        setError('');
        try {
            const response = await axios.post(
                'https://metro-backend-eight.vercel.app/api/users/login',
                // "http://localhost:4000/api/users/login",
                { username, password }
            );
            localStorage.setItem('token', response.data.token);
            setLoader(false);
            setTicketDetails({
                username : username,
                source: '',
                destination: '',
                fare: 0,
                distance: 0,
                paymentMode: '',
                tickets: 0,
                transactionId: '',
                qrCode: '',
                journeyDate: ''
            });

            navigate("/");
        } catch (err) {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="container out">
            <div className='mb-3'>
                <img src={require('./images/hmrlogo.png')} width='150' height='150'></img>
            </div>
            <form className="login-form">
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={handleUsername} />
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={handlePassword} />
                {error && <p className="error-message">{error}</p>}
                <button type='submit' onClick={handleSubmit}>Login</button>
            </form>
                {loader && <Loader />}
            <div className="login-footer">
                <span>Don't have an account?</span>
                <Link to="/register">Sign Up</Link>
            </div>
        </div>
    );
}

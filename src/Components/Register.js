import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader.js';
import './css/Register.css';

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');

    const [error, setError] = useState('');

    const [loader, setLoader] = useState(false);

    const handlePasswordChange = (e) => {
        let value = e.target.value;
        if (value.length < 6) {
            setError('Password must be at least 6 characters long');
        } else {
            setError('');
        }
        if (
            value.length >= 6
        ) {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                // 'https://metro-backend-eight.vercel.app/api/users/register',
                'https://metro-backend-eight.vercel.app/api/users/register',
                { name, username, password, gmail, mobilenumber },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            setLoader(true);
            setTimeout(() => {
                setLoader(false);
                navigate('/login');
            }, 2000);
        } catch (err) {
            console.log('Error registering user. Please try again.');
        }
    };

    return (
        <div className="register-container">
             <div className='mb-3'>
                <img src={require('./images/hmrlogo.png')} width='150' height='150'></img>
            </div>
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <label>Username</label>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={handlePasswordChange} />
                <div className='text-center text-danger'>
                   {error && <p>{error}</p>}
                </div>
                <label>Gmail</label>
                <input type="email" placeholder="Gmail" onChange={(e) => setGmail(e.target.value)} />
                <label>Phone</label>
                <input type="number" placeholder="Phone" onChange={(e) => setMobilenumber(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {loader && <Loader />}
        </div>
    );
}

import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function Navbar() {

    const [user, setUser] = useState();
    const [login, setLogin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLogin(false);
                return;
            }

            try {
                try{
                    const response = await axios.post(
                        // 'http://localhost:4000/api/users/check', { token },
                        'https://metro-backend-eight.vercel.app/api/users/check', { token },
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                            withCredentials: true
                        }
                    );
                    if (response.status === 200) {
                        setLogin(true);
                    }
                    console.log(response);
                    setUser(response.data.name);

                }
                catch(err){
                    setLogin(false);    
                }
            } catch (err) {
                setLogin(false);
            }
        };

        checkLoginStatus();
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={require("./images/hmrlogo.png")} alt="Logo" height='50' width='50' />
                    <span className='ms-4'>HMR</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tickets">Tickets</Link>
                        </li>
                    </ul>
                    {login &&
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {/* <p>Welcome {user}</p> */}
                            <Link to="/account">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </Link>
                        </ul>
                    }
                    {!login &&
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    }

                </div>
            </div>
        </nav>
    )
}

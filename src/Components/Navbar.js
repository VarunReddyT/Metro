import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SuprSendInbox from '@suprsend/react-inbox'
import 'react-toastify/dist/ReactToastify.css'
import { TicketContext } from './TicketContext';
import { useContext } from 'react';

export default function Navbar() {

    const [user, setUser] = useState();
    const [login, setLogin] = useState(false);
    const [subscriberId, setSubscriberId] = useState();
    const location = useLocation();
    const { ticketDetails } = useContext(TicketContext);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLogin(false);
                return;
            }
            try {
                try {
                    const response = await axios.post(
                        // 'http://localhost:4000/api/users/check', { token }
                        'https://metro-backend-eight.vercel.app/api/users/check', { token },
                    );
                    if (response.status === 200) {
                        setLogin(true);
                    }
                    setUser(response.data.name);
                    console.log(response);

                }
                catch (err) {
                    setLogin(false);
                }
            } catch (err) {
                setLogin(false);
            }
        };

        checkLoginStatus();
    }, [location]);
    useEffect(() => {
        const generateSubscriberId = async () => {
            if (!login) return;
            try {
                // const subscriberResponse = await axios.post('http://localhost:4000/api/subsid/subsId_generate');
                const subscriberResponse = await axios.post('https://metro-backend-eight.vercel.app/api/subsid/subsId_generate',{distinct_id:ticketDetails.username});
                console.log(subscriberResponse);
                setSubscriberId(subscriberResponse.data);
            } catch (err) {
                console.log('Error generating subscriber id:', err);
            }
        };

        generateSubscriberId();
    }, [login, user]);

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
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {login && (
                            <SuprSendInbox 
                                theme={{ badge: { backgroundColor: 'pink', color: 'black', margin: '0px' },bell: { color: 'blue' },
                                header: { 
                                    container: { backgroundColor: '#0099ff' }, 
                                    headertext: {color: 'black'},
                                    markAllReadText : {color: 'black', fontWeight : 'bold'}
                                },
                                notification: { 
                                    actions: { container: { hoverBackgroundColor: '#349beb' } }, 
                                    expiresText: { color: 'red' },
                                    actionsMenuIcon: { color: 'blue' },
                                },
                                  }}
                                themeType='light / dark'
                                workspaceKey={process.env.REACT_APP_SUPRSEND_WORKSPACE_KEY}
                                subscriberId={subscriberId} 
                                distinctId={ticketDetails.username} 
                            />
                        )}
                    </ul>
                    {login &&
                        <ul className="navbar-nav mb-2 mb-lg-0">
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

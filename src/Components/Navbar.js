import React from 'react'
import './css/Navbar.css';
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav className='d-flex justify-content-center align-items-center'>
            <div className="tab-container mt-5">
                <Link type='button' to="/" className='btn'>Fare</Link>

                <Link type='button' to="/tickets" className='btn'>Tickets</Link>

                <Link type='button' to="/smartcard" className='btn'>Smart Card</Link>

            </div>

        </nav>
    )
}

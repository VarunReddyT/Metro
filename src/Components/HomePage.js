import React, { useState } from 'react';
import axios from 'axios';
import Compare from './Compare.js';
import Select from './Select.js';
import './Compare.css';
import './Navbar.css';
export default function HomePage() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [path, setPath] = useState('');
    const [fare, setFare] = useState('');
    const [distance, setDistance] = useState('');
    const [view, setView] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('source:', source);
        console.log('destination:', destination);
        try {
            const encodedSource = encodeURIComponent(source);
            const encodedDestination = encodeURIComponent(destination);
            const response = await axios.get(`https://metro-murex.vercel.app/path/${encodedSource}/${encodedDestination}`);
            setPath(response.data.path);
            setFare(response.data.fare);
            setDistance(response.data.distance);
            setView(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className="mainC">
                {/* <div className=''>
                    <h1 className='text-center p-2'>Hyderabad Metro Rail</h1>
                </div> */}

                <div className='det'>
                    <nav className='d-flex justify-content-center align-items-center'>
                        <div className="tab-container mt-5">
                            <button className='btn'>Fare</button>

                            <button className='btn'>Tickets</button>

                            <button className='btn'>Smart Card</button>

                        </div>

                    </nav>
                    <div className='d-flex justify-content-center details '>

                        <div>
                            <h3 className='text-center mt-5 trip'>Find Trip Details</h3>
                            <Select setDestination={setDestination} setSource={setSource} transition={true} />
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn btn-lg mt-4 check' onClick={handleSubmit}>Check</button>
                            </div>
                        </div>
                        {view && <div>
                            <img className='metImg' src={require("../images/hydM.png")} alt="HydM" />
                        </div>}
                        {!view && 
                        <div className='d-flex justify-content-center align-items-center journey'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Journey Details</h5>
                                <p className='card-text'>Path: {path}</p>
                                <p className='card-text'>Distance: {distance} km</p>
                                <p className='card-text'>Fare: ₹ {fare}</p>
                            </div>
                        </div>
                    </div>}
                         
                    </div>
                   
                </div>
            </div>
            <div>
                <Compare />
            </div>
        </>
    );
}

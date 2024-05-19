import React, { useState } from 'react';
import stations from './stations.js';
import axios from 'axios';
export default function HomePage() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [path, setPath] = useState('');
    const [fare, setFare] = useState('');
    const [distance, setDistance] = useState('');

    const handleSourceChange = (event) => {
        setSource(event.target.value);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('source:', source);
        console.log('destination:', destination);
        try {
            const response = await axios.get(`http://localhost:5000/path/${source}/${destination}`);
            setPath(response.data.path);
            setFare(response.data.fare);
            setDistance(response.data.distance);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="mainC">
            <div className=''>
                <h1 className='text-center p-2'>Hyderabad Metro Rail</h1>
            </div>
            <div className='d-flex justify-content-center details'>
                <div >
                    <h3 className='text-center mt-5'>Find Trip Details</h3>
                    <div className='d-flex select-container' >
                        <select name="source" id="source" className="form-control select-box" style={{ marginRight: '10px' }} onChange={handleSourceChange} required >
                            <option value="">Select Source</option>
                            {stations.map((station, index) => (
                                <option key={index} value={station}>{station}</option>
                            ))}
                        </select>
                        <select name="destination" id="destination" className="form-control select-box" onChange={handleDestinationChange} required>
                            <option value="">Select Destination</option>
                            {stations.map((station, index) => (
                                <option key={index} value={station}>{station}</option>
                            ))}
                        </select>


                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className='btn btn-lg mt-4' onClick={handleSubmit}>Check</button>
                    </div>
                </div>

                <div>
                    <img className='metImg' src="/Images/hydM.png" alt="HydM" />
                </div>
            </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='card mt-4'>
                        <div className='card-body'>
                            <h5 className='card-title'>Journey Details</h5>
                            <p className='card-text'>Path: {path}</p>
                            <p className='card-text'>Distance: {distance}</p>
                            <p className='card-text'>Fare: {fare}</p>
                        </div>
                    </div>
                </div>
        </div>
    );
}

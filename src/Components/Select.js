import React from 'react';
import stations from './stations.js';

export default function Select({ setSource, setDestination,transition }) {
    const handleSourceChange = (event) => {
        setSource(event.target.value);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    return (
        <div className={`d-flex select-container ${transition ? 'with-transition' : ''}`}>
            <div className='d-flex select-container'>
                <select
                    name="source"
                    id="source"
                    className="form-control select-box"
                    style={{ marginRight: '10px' }}
                    onChange={handleSourceChange}
                    required
                >
                    <option value="">Select Source</option>
                    {stations.map((station, index) => (
                        <option key={index} value={station}>{station}</option>
                    ))}
                </select>
                <select
                    name="destination"
                    id="destination"
                    className="form-control select-box"
                    onChange={handleDestinationChange}
                    required
                >
                    <option value="">Select Destination</option>
                    {stations.map((station, index) => (
                        <option key={index} value={station}>{station}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

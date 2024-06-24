import React, { useState } from 'react';
import axios from 'axios';
import Compare from './Compare.js';
import Select from './Select.js';
import './css/Compare.css';
import Navbar from './Navbar.js';
import Loader from './Loader.js';

export default function HomePage() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [path, setPath] = useState('');
    const [fare, setFare] = useState('');
    const [distance, setDistance] = useState('');
    const [view, setView] = useState(true);
    const [loader, setLoader] = useState(false);
    // const [text, setText] = useState('');
    // const [chatHistory, setChatHistory] = useState([]);
    // const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('source:', source);
        console.log('destination:', destination);
        setView(false);
        setLoader(true);
        try {
            const encodedSource = encodeURIComponent(source);
            const encodedDestination = encodeURIComponent(destination);
            const response = await axios.get(`https://metro-murex.vercel.app/path/${encodedSource}/${encodedDestination}`);
            setPath(response.data.path);
            setFare(response.data.fare);
            setDistance(response.data.distance);
            setView(false);
            setLoader(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // const handleApi = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     if (!text) return;

    //     const userMessage = { sender: 'user', text };
    //     setChatHistory([...chatHistory, userMessage]);

    //     try {
    //         const response = await axios.post('http://localhost:4000/api', { text });
    //         const botMessage = { sender: 'bot', text: response.data };
    //         setLoading(false);
    //         setChatHistory([...chatHistory, userMessage, botMessage]);
    //         setText('');
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // const handleText = (e) => {
    //     setText(e.target.value);
    // };

    return (
        <>
            <div className="mainC">
                <div className='det'>
                    <Navbar />
                    <div className='d-flex justify-content-center details '>
                        <div>
                            <h3 className='text-center mt-5 trip'>Find Trip Details</h3>
                            <Select setDestination={setDestination} setSource={setSource} transition={true} />
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn btn-lg mt-4 check' onClick={handleSubmit}>Check</button>
                            </div>
                        </div>
                        {view && !loader && <div>
                            <img className='metImg' src={require("./images/Hyd_metro.png")} alt="HydM" />
                        </div>}
                        {!view && loader &&
                            <div className='homeLoader'>
                                <Loader />
                            </div>
                        }
                        {!view && !loader &&
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
            {/* <div>
                <input type="text" value={text} onChange={handleText} />
                <button onClick={handleApi}>Submit</button>
                <div className="chat-container">
                    {chatHistory.map((message, index) => (
                        <div key={index} className={`chat-message ${message.sender}`}>
                            <p>{message.text}</p>
                        </div>
                    ))}
                    {loading && <Loader/>}
                </div>
            </div> */}
        </>
    );
}

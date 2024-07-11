import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Compare from './Compare.js';
import Select from './Select.js';
import './css/Compare.css';
import Loader from './Loader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import './css/Chatbot.css';

export default function HomePage() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [path, setPath] = useState('');
    const [fare, setFare] = useState('');
    const [distance, setDistance] = useState('');
    const [view, setView] = useState(true);
    const [loader, setLoader] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const [text, setText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const chatHistoryRef = useRef(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSubmit = async (event) => {
        event.preventDefault();
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

    const handleApi = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!text) return;

        const userMessage = { sender: 'user', text };
        setChatHistory([...chatHistory, userMessage]);

        try {
            // const response = await axios.post('http://localhost:4000/api/chat/response', { text });
            const response = await axios.post('https://metro-backend-eight.vercel.app/api/chat/response', { text });
            const botMessage = { sender: 'bot', text: response.data };
            setLoading(false);
            setChatHistory([...chatHistory, userMessage, botMessage]);
            setText('');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleText = (e) => {
        setText(e.target.value);
    };

    const toggleChat = () => {
        setChatVisible(!chatVisible);
    };

    return (
        <>
            <div className="mainC">
                <div className='det'>
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
                                <div className='card journey-card'>
                                    <div className='card-body'>
                                        <h5 className='card-title text-center' style={{ color: '#264143', fontWeight: 900 }}>Journey Details</h5>
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
            <div className={`chatbot-container ${chatVisible ? 'visible' : ''}`}>
                <div className="chatbot-header">
                    <h3>HMR</h3>
                    <button className='btn btn-light' onClick={toggleChat}>Close</button>
                </div>
                <div className="chatbot-body">
                    <div className="chat-history" ref={chatHistoryRef}>
                        {chatHistory.map((message, index) => (
                            <div key={index} className={`chat-message ${message.sender}`}>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    {loading && <Loader />}
                    <form onSubmit={handleApi} className="chat-input-form">
                        <input type="text" value={text} onChange={handleText} placeholder="Type your message..." />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
            <button className="chatbot-icon" onClick={toggleChat}>
                <FontAwesomeIcon icon={faRobot} size="2x" />
            </button>
        </>
    );
}

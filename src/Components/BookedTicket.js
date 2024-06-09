import React, { useEffect } from 'react'
import Loader2 from './Loader2'
import { useState, useContext } from 'react';
import axios from 'axios';
import { TicketContext } from './TicketContext.js';

export default function BookedTicket() {

  const [loader, setLoader] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const { ticketDetails } = useContext(TicketContext);

  useEffect(() => {
    const fetchTicket = async () => {
      setLoader(true);
      try {
        const response = await axios.get('https://metro-murex.vercel.app/qrcode');
        setQrCode(response.data.qrcode);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchTicket();
  }, []);

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='row'>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Booking Confirmed</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Scan the below QR at the metro station</h6>
            {loader ? <Loader2 /> : <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />}
            <div>
              <p className="card-text">Source: {ticketDetails.source}</p>
              <p className="card-text">Destination: {ticketDetails.destination}</p>
              <p className="card-text">Tickets: {ticketDetails.tickets}</p>
              <p className="card-text">Fare: {ticketDetails.fare}</p>
              <p className="card-text">Payment Mode: {ticketDetails.paymentMode}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

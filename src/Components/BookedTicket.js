import React, { useEffect, useState, useContext, useRef } from 'react';
import { TicketContext } from './TicketContext';
import axios from 'axios';
import Loader2 from './Loader2';
import './css/BookedTicket.css';

export default function BookedTicket() {
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ticketDetails } = useContext(TicketContext);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketDetails) return;
      setLoading(true);
      setError(null);

      try {
        const [qrResponse, ticketResponse, subsidResponse] = await Promise.all([
          axios.get('https://metro-murex.vercel.app/qrcode/ticket', {
            params: {
              start: ticketDetails.source,
              end: ticketDetails.destination
            }
          }),
          axios.post('https://metro-backend-eight.vercel.app/api/tickets/bookedticket', {
            username: ticketDetails.username,
            source: ticketDetails.source,
            destination: ticketDetails.destination,
            tickets: ticketDetails.tickets,
            fare: ticketDetails.fare,
            distance: ticketDetails.distance,
            transactionId: ticketDetails.transactionId,
            paymentMode: ticketDetails.paymentMode,
            qrCode: qrResponse.data.qrcode,
            journeyDate: ticketDetails.journeyDate
          }),
          axios.post('https://metro-backend-eight.vercel.app/api/subsid/trigger', {
            source: ticketDetails.source,
            destination: ticketDetails.destination
          })
        ]);

        const qrCode = qrResponse.data.qrcode;
        setQrCode(qrCode);

        const currentTicketDetails = {
          username: ticketDetails.username,
          source: ticketDetails.source,
          destination: ticketDetails.destination,
          tickets: ticketDetails.tickets,
          fare: ticketDetails.fare,
          paymentMode: ticketDetails.paymentMode,
          transactionId: ticketDetails.transactionId,
          distance: ticketDetails.distance,
          qrCode: qrResponse.data.qrcode,
          journeyDate: ticketDetails.journeyDate
        };

        const savedTicketDetails = JSON.parse(localStorage.getItem('ticketDetails'));
        if (!savedTicketDetails) {
          localStorage.setItem('ticketDetails', JSON.stringify(currentTicketDetails));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('There was an error confirming your ticket. Please try again.');
        setLoading(false);
      }
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchTicket();
    }
  }, [ticketDetails]);

  return (
    <div>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center flex-column">
          <div className="waiting-animation"></div>
          <h3>Confirming your ticket</h3>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div>
          <div className="alert alert-danger container" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
            </svg>
            This is a demo application and this is a randomly generated QR code. Please do not use this for any commercial purpose.
          </div>

          <div className='container d-flex justify-content-center align-items-center'>
            <div className='row'>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Booking Confirmed</h5>
                  <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
                  <div>
                    <p className="card-text">Source: {ticketDetails.source}</p>
                    <p className="card-text">Destination: {ticketDetails.destination}</p>
                    <p className="card-text">Number of Tickets: {ticketDetails.tickets}</p>
                    <p className="card-text">Fare: {ticketDetails.fare}</p>
                    <p className="card-text">Distance: {ticketDetails.distance} km</p>
                    <p className="card-text">Transaction ID: {ticketDetails.transactionId}</p>
                    <p className="card-text">Payment Mode: {ticketDetails.paymentMode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

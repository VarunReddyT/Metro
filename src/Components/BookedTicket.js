import React, { useEffect, useState, useContext } from 'react';
import Navbar from './Navbar';
import { TicketContext } from './TicketContext';
import Loader2 from './Loader2';
import axios from 'axios';

export default function BookedTicket() {
    const [qrCode, setQrCode] = useState('');
    const [loader, setLoader] = useState(false);
    const { ticketDetails } = useContext(TicketContext);

    useEffect(() => {
        const fetchTicket = async () => {
            setLoader(true);
            try {
                const savedTicketDetails = localStorage.getItem('ticketDetails');
                const currentTicketDetails = savedTicketDetails ? JSON.parse(savedTicketDetails) : ticketDetails;

                const response = await axios.get('https://metro-murex.vercel.app/qrcode/ticket',{
                  params: {
                    start: ticketDetails.source,
                    end: ticketDetails.destination
                  }
                });

                setQrCode(response.data.qrcode);

                const response2 = await axios.post('https://metro-backend-eight.vercel.app/api/tickets/bookedticket', {
                  username: currentTicketDetails.username,
                  source: currentTicketDetails.source,
                  destination: currentTicketDetails.destination,
                  tickets: currentTicketDetails.tickets,
                  fare: currentTicketDetails.fare,
                  paymentMode: currentTicketDetails.paymentMode,
                  transactionId: currentTicketDetails.transactionId,
                  distance: currentTicketDetails.distance,
                  qrCode: response.data.qrcode
                });

            } catch (error) {
                console.error('Error fetching QR code:', error);
            } finally {
                setLoader(false);
            }
        };

        fetchTicket();
    }, [ticketDetails]);

    return (
        <div>
          <Navbar />
        
        <div className='container d-flex justify-content-center align-items-center'>
        <div className='row'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Booking Confirmed</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Scan the below QR at the metro station</h6>
              {loader ? <Loader2 /> : <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />}
              <div>
                {/* <p className="card-text">Username: {ticketDetails.username}</p> */}
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
    );
}

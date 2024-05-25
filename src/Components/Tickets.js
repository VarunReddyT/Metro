import React, { useState } from 'react';
import Navbar from './Navbar';
import Select from './Select';
import './Tickets.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Tickets() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [tickets, setTickets] = useState(1);
  const [modalContent, setModalContent] = useState('');
  const [view, setView] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const navigate = useNavigate();

  const openModal = async (content) => {
    if(!check(source,destination,tickets)){
      alert("Please fill all the details");
      return;
    }
    setModalContent(content);
    setView(true);
    if(content === 'UPI') {
      try {
        const response = await axios.get('https://metro-murex.vercel.app/qrcode');
        setQrCode(response.data.qrcode);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    }
  };

  const closeModal = () => {
    setView(false);
  };

  const check = (source,destination,tickets) => {
    if(source === '' || destination === '' || tickets === 0){
      return false;
    }
    return true;
  }

  const handleCardPayment= (event) => {
    event.preventDefault();
   
    navigate('/payment');
  };

  const handleUPIPayment = (event) => {
    event.preventDefault();
    navigate('/booked-ticket');
  };

  const handleIncrement = () => {
    if (tickets < 10) {
      setTickets(tickets + 1);
    }
  };

  const handleDecrement = () => {
    if (tickets > 1) {
      setTickets(tickets - 1);
    }
  };

  console.log(source, destination);

  return (
    <div className="ticketsBody">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center">
        <div className="ticketDiv">
          <form className="formTicket">
            <h1>Ticket Booking</h1>
            <Select transition={false} setSource={setSource} setDestination={setDestination} />
            <div className="d-flex flex-column mt-4 ticket-count">
              <p>Select Number of Tickets</p>
              <div className="d-flex align-items-center">
                <input type="button" value="-" onClick={handleDecrement} />
                <input type="button" value={tickets} readOnly />
                <input type="button" value="+" onClick={handleIncrement} />
              </div>
            </div>
            <div className="mt-4">
              <button type="button" className="btn btn-primary sub-button" onClick={() => openModal('Card')}>
                Pay with Card
              </button>
              <button type="button" className="btn btn-primary sub-button" onClick={() => openModal('UPI')}>
                Pay with UPI
              </button>

              {view && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirmation</h5>
                      <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body ">
                      {modalContent === 'Card' ? (
                        <div>Please enter your card details to proceed with the payment.</div>
                      ) : (
                        <div>
                          <p>Open the Google Pay app and complete the transaction.</p>
                          {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />}
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary close-button" onClick={closeModal}>Close</button>
                      {modalContent === 'Card' ? (
                        <button type="button" className="btn btn-primary submit-button" onClick={handleCardPayment}>Proceed to Payment</button>
                      ) : (
                        <button type="button" className="btn btn-primary submit-button" onClick={handleUPIPayment}>I have completed the transaction</button>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

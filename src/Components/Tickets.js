import React, { useState } from 'react';
import Navbar from './Navbar';
import Select from './Select';
import './css/Tickets.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import CancelTransaction from './CancelTransaction';
import { TicketContext } from './TicketContext';
import { useContext } from 'react';

export default function Tickets() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [tickets, setTickets] = useState(1);
  const [modalContent, setModalContent] = useState('');
  const [view, setView] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [danger, setDanger] = useState(false);
  const navigate = useNavigate();
  const [transacId, setTransacId] = useState('');
  const [load, setLoad] = useState(false);
  const { setTicketDetails } = useContext(TicketContext);
  const mobileNumberPattern = /^[6-9]\d{9}$/;

  const openModal = async (content) => {
    if (!check(source, destination, tickets, mobileNumber)) {
      setDanger(true);
      return;
    }
    setDanger(false);
    setModalContent(content);
    setView(true);
    try{
      const encodedSource = encodeURIComponent(source);
      const encodedDestination = encodeURIComponent(destination);
      const response = await axios.get(`https://metro-murex.vercel.app/path/${encodedSource}/${encodedDestination}`);
      setTicketDetails({
        source: source,
        destination: destination,
        tickets: tickets,
        fare: tickets*response.data.fare,
        paymentMode : content
      });
      
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    if (content === 'UPI') {
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

  const check = (source, destination, tickets, mobileNumber) => {
    if (source === '' || destination === '' || tickets === 0 || mobileNumber === '' || mobileNumberError) {
      return false;
    }
    return true;
  };

  const handleCardPayment = (event) => {
    event.preventDefault();
    navigate('/payment');
  };

  const handleUPIPayment = (event) => {
    event.preventDefault();
    if(transacId === ''){
      alert('Please enter the transaction ID');
      return;
    }
    setLoad(true);
    setTimeout(() => {
      setLoad(false); 
      navigate('/bookedticket');
      }, 2000);
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

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (mobileNumberPattern.test(value)) {
      setMobileNumberError('');
    } else {
      setMobileNumberError('Invalid mobile number');
    }
    setMobileNumber(value);
  };

  return (
    <div className="ticketsBody">
        <Navbar />
        <CancelTransaction/>
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
              <input
                type="number"
                id="mobileNumber"
                placeholder='Mobile Number'
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                className="form-control"
              />
              {mobileNumberError && (
                <div className="alert alert-danger mt-2" role="alert">
                  {mobileNumberError}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button type="button" className="btn btn-primary sub-button" onClick={() => openModal('Card')}>
                Pay with Card
              </button>
              <button type="button" className="btn btn-primary sub2-button" onClick={() => openModal('UPI')}>
                Pay with UPI
              </button>
              {danger && (
                <div className="alert alert-danger mt-3" role="alert">
                  Please fill all the fields
                </div>
              )}
              {view && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirmation</h5>
                      <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                      {modalContent === 'Card' ? (
                        <div>Please enter your card details to proceed with the payment.</div>
                      ) : (
                        <div>
                          <p>Open the Google Pay app and complete the transaction.</p>
                          <div className='d-grid' style={{placeItems:'center'}}>
                            {!qrCode && <Loader />}
                          </div>
                          {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />}
                          <label></label>
                          <input type='text' placeholder='Enter Transaction Id' onChange={(e) => setTransacId(e.target.value)}required/>
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary close-button" onClick={closeModal}>Close</button>
                      {modalContent === 'Card' ? (
                        <button type="button" className="btn btn-primary submit-button" onClick={handleCardPayment}>Proceed to Payment</button>
                      ) : (
                        load ? <Loader /> : <button type="button" className="btn btn-primary submit-button" onClick={handleUPIPayment}>Submit</button>
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

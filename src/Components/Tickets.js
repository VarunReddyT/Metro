import React, { useState, useContext, useEffect } from 'react';
import Navbar from './Navbar';
import Select from './Select';
import './css/Tickets.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
// import CancelTransaction from './CancelTransaction';
import { TicketContext } from './TicketContext';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function Tickets() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [tickets, setTickets] = useState(1);
  const [modalContent, setModalContent] = useState('');
  const [view, setView] = useState(false);
  const [danger, setDanger] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState(dayjs().toDate());


  const { ticketDetails, setTicketDetails } = useContext(TicketContext);
  // const mobileNumberPattern = /^[6-9]\d{9}$/;

  const [fare, setFare] = useState(0);
  const [qr, setQr] = useState('');



  const generateTransactionId = (paymentMode) => {

    const timestamp = new Date().toISOString().replace(/^20/, '').replace(/[:-]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const randomComponent = Math.random().toString(36).substring(2, 6).toUpperCase();
    const result = `${paymentMode.substring(0, 3).toUpperCase()}${timestamp}${randomComponent}`;
    return result;

  };

  const checkLogin = async (content) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in. Please log in to continue.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        'https://metro-backend-eight.vercel.app/api/users/check',
        // 'http://localhost:4000/api/users/check',
        { token }
      );
      console.log(response);
    }
    catch (error) {
      alert('Session Expired. Please log in to continue.');
      navigate('/login');
    }

    if (content === 'Card') {
      openModal('Card');
    }
    else {
      openModal('UPI');
    }

  }


  const openModal = async (content) => {
    if (!check(source, destination, tickets)) {
      setDanger(true);
      return;
    }
    setDanger(false);
    setModalContent(content);
    setView(true);
    try {
      const encodedSource = encodeURIComponent(source);
      const encodedDestination = encodeURIComponent(destination);
      const response = await axios.get(`https://metro-murex.vercel.app/path/${encodedSource}/${encodedDestination}`);
      const paymentType = content;
      const transactionId = generateTransactionId(paymentType);
      setTicketDetails({
        username: ticketDetails.username,
        source: source,
        destination: destination,
        tickets: tickets,
        fare: tickets * response.data.fare,
        paymentMode: paymentType,
        transactionId: transactionId,
        distance: response.data.distance,
        journeyDate : date
      });
      setFare(tickets * response.data.fare);

    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    if (content === 'UPI') {
      const response = await axios.get(`https://metro-murex.vercel.app/qrcode/gpay`);
      setQr(response.data.qrcode);
    }
  };

  const closeModal = () => {
    setView(false);
  };

  const check = (source, destination, tickets, mobileNumber) => {
    if (source === '' || destination === '' || tickets === 0) {
      return false;
    }
    return true;
  };

  const handleUPIPayment = async () => {
    navigate('/bookedticket');
  }

  const handleCardPayment = (event) => {
    event.preventDefault();
    navigate('/payment');
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


  return (
    <div>
      {/* <Navbar /> */}
      <div className="ticketsBody">

        <div className="alert alert-danger" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
          </svg>
          This is a demo application. Please do not enter any sensitive information. Not for commercial use.
        </div>

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
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      'DatePicker'
                    ]}
                  >
                    <div className='d-flex text-center mt-3'>
                    <DemoItem>
                      <label>Pick Journey Date</label>
                      <DatePicker format='DD/MM/YYYY' onChange={(newDate) => setDate(newDate)} defaultValue={dayjs(new Date())} />
                    </DemoItem>
                    </div>
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="mt-4 payButtons">
                <button type="button" className="btn btn-primary sub-button" onClick={() => checkLogin('Card')}>
                  Pay with Card
                </button>
                <button type="button" className="btn btn-primary sub2-button" onClick={() => checkLogin('UPI')}>
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
                            <div>
                              {qr ? (
                                <div className='d-flex flex-column'>
                                  <div>
                                    <img src={`data:image/png;base64,${qr}`} alt="QR Code" />
                                  </div>
                                  <div>
                                    <p>Scan the QR code for payment (Dummy). Press Submit</p>
                                  </div>
                                </div>
                              ) : (
                                <Loader />
                              )}
                            </div>

                          </div>
                        )}
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary close-button" onClick={closeModal}>Close</button>
                        {modalContent === 'Card' ? (
                          <button type="button" className="btn btn-primary submit-button" onClick={handleCardPayment}>Proceed to Payment</button>
                        ) : ((
                          <button type="button" className="btn btn-primary submit-button" onClick={handleUPIPayment}>Proceed</button>
                        )
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
      <div className='justify-content-center d-flex'>
        {/* <CancelTransaction /> */}
      </div>
    </div>
  );

}
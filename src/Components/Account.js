import React, { useEffect, useState, useContext } from 'react';
import './css/Account.css';
import axios from 'axios';
import { TicketContext } from './TicketContext';

export default function Account() {
  const [activeButton, setActiveButton] = useState('Profile');
  const { ticketDetails } = useContext(TicketContext);
  const [userDetails, setUserDetails] = useState({});
  const [bookings, setBookings] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState('');
  const [isQRCodeExpired, setIsQRCodeExpired] = useState(false);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('https://metro-backend-eight.vercel.app/api/users/getuser', {
          params: {
            username: ticketDetails.username
          }
        });
        setUserDetails(response.data);
      } catch (error) {
          alert('You are not logged in. Please log in to continue.');
          window.location.href = '/login';
      }
    };

    fetchUserDetails();
  }, [ticketDetails.username]);

  useEffect(() => {
    if (activeButton === 'Bookings') {
      const fetchBookings = async () => {
        try {
          const response = await axios.get('https://metro-backend-eight.vercel.app/api/tickets/getticket', {
            params: {
              username: ticketDetails.username
            }
          });
          console.log(response.data);
          setBookings(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchBookings();
    }
  }, [activeButton, ticketDetails.username]);

  const closeModal = () => {
    setModal(false);
  }

  const openModal = (qrcode, journeyDate) => {
    const today = new Date();
    const journeyDateObj = new Date(journeyDate);

    today.setHours(0, 0, 0, 0);
    journeyDateObj.setHours(0, 0, 0, 0);

    if (today > journeyDateObj) {
      setIsQRCodeExpired(true);
    } else {
      setIsQRCodeExpired(false);
    }

    setSelectedQRCode(qrcode);
    setModal(true);
  }


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ticketDetails');
    window.location.reload();
  }
  return (
    <div className="account-container">
      <div className="container">
        <div className='row d-flex flex-column'>
          <section className="first-section border border-4 py-4">
            <div className='d-flex justify-content-between'>
              <button className={`btn ${activeButton === 'Profile' ? 'active' : ''}`} onClick={() => handleClick('Profile')}>
                Profile
              </button>
              <button className={`btn ${activeButton === 'Bookings' ? 'active' : ''}`} onClick={() => handleClick('Bookings')}>
                Bookings
              </button>
              <button className={`btn ${activeButton === 'Help' ? 'active' : ''}`} onClick={() => handleClick('Help')}>
                Help
              </button>
              <button className={`btn ${activeButton === 'Logout' ? 'active' : ''}`} onClick={() => handleClick('Logout')}>
                Logout
              </button>
            </div>
          </section>
          <section className="border border-4 py-4">
            <div className="profile-info">
              {activeButton === 'Profile' && (
                <>
                  <p><strong>Name : </strong>{userDetails.name}</p>
                  <p><strong>Username : </strong>{userDetails.username}</p>
                  <p><strong>Phone : </strong>+91{userDetails.mobilenumber}</p>
                  <p><strong>Email : </strong>{userDetails.gmail}</p>
                </>
              )}
              {activeButton === 'Bookings' && (
                <>
                  {bookings.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Source</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Tickets</th>
                            <th scope="col">Journey Date</th>
                            <th scope="col">Fare</th>
                            <th scope="col">Distance</th>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Payment Mode</th>
                            <th scope="col">QR Code</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking, index) => (
                            <tr key={index}>
                              <td>{booking.source}</td>
                              <td>{booking.destination}</td>
                              <td>{booking.tickets}</td>
                              <td>{new Date(booking.journeyDate).toLocaleDateString('en-GB')}</td>
                              <td>{booking.fare}</td>
                              <td>{booking.distance}</td>
                              <td>{booking.transactionId}</td>
                              <td>{booking.paymentMode}</td>
                              <td>
                                <button className='btn btn-secondary' onClick={() => openModal(booking.qrCode, booking.journeyDate)}>QR</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No bookings found.</p>
                  )}
                </>
              )}
              {activeButton === 'Help' && (
                <div>
                  <h1>Contact</h1>
                  <p>Email : development@gmail.com</p>
                  <p>Phone : 9876543210</p>
                </div>
              )}
              {activeButton === 'Logout' && (
                <>
                  <p>Are you sure you want to logout?</p>
                  <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <img
                src={`data:image/png;base64,${selectedQRCode}`}
                alt="QR Code"
                style={isQRCodeExpired ? { filter: 'blur(8px)' } : {}}
              />
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

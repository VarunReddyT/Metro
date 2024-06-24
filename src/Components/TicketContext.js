import React, { createContext, useState, useEffect } from 'react';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [ticketDetails, setTicketDetails] = useState({
    username: '',
    source: '',
    destination: '',
    fare: 0,
    distance: 0,
    paymentMode: '',
    tickets: 0,
    transactionId: '',
    qrCode: ''
  });

  useEffect(() => {
    const savedTicketDetails = localStorage.getItem('ticketDetails');
    if (savedTicketDetails) {
      setTicketDetails(JSON.parse(savedTicketDetails));
    }
  }, []);

  const updateTicketDetails = (details) => {
    localStorage.setItem('ticketDetails', JSON.stringify(details));
    setTicketDetails(details);
  };

  return (
    <TicketContext.Provider value={{ ticketDetails, setTicketDetails: updateTicketDetails }}>
      {children}
    </TicketContext.Provider>
  );
};

import React, { createContext, useState } from 'react';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [ticketDetails, setTicketDetails] = useState({
    source: '',
    destination: '',
    fare: 0,
    distance: 0,
    paymentMode: '',
    tickets: 0,
    
  });

  return (
    <TicketContext.Provider value={{ ticketDetails, setTicketDetails }}>
      {children}
    </TicketContext.Provider>
  );
};

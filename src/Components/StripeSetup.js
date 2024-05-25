import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51OyWHrSJBtYpRkSoysjaQDlY0xUgiUEX5p25nTg4ElAFomu9H5xxtMpud1iL9sgPjw6nYlVHR44hgRtvHhv8qKTU00nZredv8N');


const StripeSetup = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeSetup;

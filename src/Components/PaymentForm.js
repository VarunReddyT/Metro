import React, { useState } from 'react';
import './css/PaymentForm.css';
import { useNavigate } from 'react-router-dom';

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const navigate = useNavigate();

  const handlePay = () => {
    if(cardNumber === '' || expiryDate === '' || cvc === ''){
      alert('Please fill all the fields');
      return;
    }
    navigate('/bookedticket');
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    if (value.length > 19) {
      value = value.slice(0, 19);
    }
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 

    if (value.length > 2 && value.charAt(2) !== '/') {
      value = value.slice(0, 2) + '/' + value.slice(2);
    } else if (value.length === 4 && e.nativeEvent.inputType === 'deleteContentBackward') {
      value = value.slice(0, 2);
    }

    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    setExpiryDate(value);
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    setCvc(value);
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h1>Payment Details</h1>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            placeholder="Card Number"
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
          <input
            placeholder="MM/YY"
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC/CVV</label>
          <input
            placeholder="CVC/CVV"
            type="text"
            id="cvc"
            value={cvc}
            onChange={handleCvcChange}
            required
          />
        </div>
        <button type="submit" onClick={handlePay}>Pay</button>
      </form>
    </div>
  );
}

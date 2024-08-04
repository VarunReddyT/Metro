// server.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const stripe = Stripe('sk_test_51OyWHrSJBtYpRkSoXLIdtmMGvBxsTGgYLOuD3Bs0LgOqRLACRVkAB1T6IuMYXYYynIq8QT93Q15FdTSha4hCUr0f00PrXieOwG');

router.post('/create-payment-intent', async (req, res) => {
  const { amount, description } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      description,
      currency: 'inr',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

module.exports = router;